const jwt     = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const Problem = require('../models/Problem');
const Match   = require('../models/Match');
const User    = require('../models/User');
const { setRoom, getRoom, deleteRoom, enqueue, dequeue, popPair } = require('../services/redis');
const { runAllTestCases }           = require('../services/codeExecution');
const { calculateScore, eloChange } = require('../services/scoring');
const { generateMatchReview }       = require('../services/aiReview');

const POWERUP_CD_MS = 60 * 1000;

// Lobby helpers — stored in Redis using same setRoom/getRoom with prefixed keys
const lobbySet = (key, val) => setRoom('lobby:' + key, val);
const lobbyGet = (key)      => getRoom('lobby:' + key);
const lobbyDel = (key)      => deleteRoom('lobby:' + key);

function initBattleSocket(io) {

  io.use((socket, next) => {
    try {
      const decoded = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET);
      socket.userId   = String(decoded.id);
      socket.username = decoded.username;
      next();
    } catch { next(new Error('Authentication error')); }
  });

  io.on('connection', (socket) => {
    console.log(`⚡ ${socket.username} connected [${socket.id}]`);

    // ── QUEUE ────────────────────────────────────────────────
    socket.on('queue:join', async () => {
      await enqueue(socket.userId, socket.id);
      socket.emit('queue:joined');
      await tryPair(io, socket);
    });

    socket.on('queue:leave', async () => {
      await dequeue(socket.userId);
      await cleanupLobby(io, socket.userId);
      socket.emit('queue:left');
    });

    // ── LOBBY: real-time settings broadcast ──────────────────
    socket.on('lobby:settings', async (settings) => {
      const pair = await lobbyGet(`pair:${socket.userId}`);
      if (!pair) return;
      const opp = io.sockets.sockets.get(pair.oppSocketId);
      if (opp) opp.emit('lobby:opponentSettings', settings);
    });

    // ── LOBBY: confirm settings ───────────────────────────────
    socket.on('lobby:confirm', async (settings) => {
      try {
        const pair = await lobbyGet(`pair:${socket.userId}`);
        if (!pair) {
          console.log(`⚠️  No pair found for ${socket.username} (${socket.userId})`);
          return socket.emit('lobby:mismatch', { message: 'Session expired. Please leave queue and rejoin.' });
        }

        const { lobbyId, pairedWith, oppSocketId } = pair;

        // Save my confirmed settings
        await lobbySet(`settings:${lobbyId}:${socket.userId}`, { ...settings, socketId: socket.id });

        // Notify opponent of my settings
        const opp = io.sockets.sockets.get(oppSocketId);
        if (opp) opp.emit('lobby:opponentSettings', settings);

        // Check if opponent also confirmed
        const mySettings  = await lobbyGet(`settings:${lobbyId}:${socket.userId}`);
        const oppSettings = await lobbyGet(`settings:${lobbyId}:${pairedWith}`);

        console.log(`📋 Lobby ${lobbyId}: me=${!!mySettings} opp=${!!oppSettings}`);

        if (!oppSettings) {
          console.log(`⏳ Waiting for opponent to confirm...`);
          return;
        }

        // Both confirmed — validate topics match
        if (mySettings.topic !== oppSettings.topic) {
          await lobbyDel(`settings:${lobbyId}:${socket.userId}`);
          socket.emit('lobby:mismatch', { message: `Topic mismatch! You: "${mySettings.topic}", Opponent: "${oppSettings.topic}". Please match topics.` });
          if (opp) opp.emit('lobby:mismatch', { message: `Topic mismatch! Re-confirm with a matching topic.` });
          return;
        }

        // Start the match!
        const timerMins = Math.min(Math.max(Number(mySettings.timer) || 30, 5), 180);
        const BATTLE_MS = timerMins * 60 * 1000;
        const qCount    = Math.min(Math.max(Number(mySettings.questionCount) || 1, 1), 5);

        console.log(`✅ Starting: ${socket.userId} vs ${pairedWith} | ${mySettings.topic} | ${timerMins}min | ${qCount}Q`);

        // Cleanup lobby state before starting
        await lobbyDel(`settings:${lobbyId}:${socket.userId}`);
        await lobbyDel(`settings:${lobbyId}:${pairedWith}`);
        await lobbyDel(`pair:${socket.userId}`);
        await lobbyDel(`pair:${pairedWith}`);

        await startMatch(io,
          { id: socket.userId, socketId: mySettings.socketId,  difficulty: mySettings.difficulty  || 'medium' },
          { id: pairedWith,    socketId: oppSettings.socketId, difficulty: oppSettings.difficulty || 'medium' },
          { topic: mySettings.topic, BATTLE_MS, qCount }
        );

      } catch (err) {
        console.error('lobby:confirm error:', err);
        socket.emit('battle:error', { message: 'Something went wrong. Please try again.' });
      }
    });

    // ── RUN (visible tests, no penalty) ──────────────────────
    socket.on('battle:run', async ({ roomId, code, language }) => {
      try {
        const room = await getRoom(roomId);
        if (!room || room.status !== 'active') return;
        const pState     = room.players[socket.userId];
        const problemIdx = pState?.currentProblem || 0;
        const problemId  = room.problemIds?.[problemIdx] || room.problemId;
        const problem    = await Problem.findById(problemId);
        if (!problem) return;
        const visibleTests = problem.testCases.filter(tc => !tc.isHidden);
        if (!visibleTests.length)
          return socket.emit('battle:runResult', { results: [], passed: 0, total: 0, allPassed: false });
        const { results, passed, total, allPassed } = await runAllTestCases(code, language, visibleTests);
        socket.emit('battle:runResult', { results, passed, total, allPassed });
      } catch (err) {
        console.error('Run error:', err);
        socket.emit('battle:error', { message: 'Run failed.' });
      }
    });

    // ── SUBMIT ────────────────────────────────────────────────
    socket.on('battle:submit', async ({ roomId, code, language }) => {
      try {
        const room = await getRoom(roomId);
        if (!room || room.status !== 'active') return;
        const pState     = room.players[socket.userId];
        const problemIdx = pState?.currentProblem || 0;
        const problemId  = room.problemIds?.[problemIdx] || room.problemId;

        if (pState?.frozenUntil && Date.now() < pState.frozenUntil)
          return socket.emit('battle:error', { message: '🧊 You are frozen!' });

        socket.emit('battle:judging');

        const [match, problem] = await Promise.all([
          Match.findById(room.matchId),
          Problem.findById(problemId),
        ]);
        if (!match || !problem) return;

        const { results, passed, total, allPassed } = await runAllTestCases(code, language, problem.testCases);
        const wrongSubs = (pState?.wrongSubmissions || 0) + (allPassed ? 0 : 1);
        const score = calculateScore({ testsPassed: passed, totalTests: total, timeElapsedMs: Date.now() - room.startedAt, wrongSubmissions: wrongSubs });
        const verdict = allPassed ? 'accepted' : results.some(r => r.stderr) ? 'runtime_error' : 'wrong_answer';

        match.submissions.push({ userId: socket.userId, code, language, verdict, testsPassed: passed, totalTests: total, score });
        const isP1 = String(match.player1) === socket.userId;
        if (isP1) match.player1Score = (match.player1Score || 0) + (allPassed ? score : 0);
        else      match.player2Score = (match.player2Score || 0) + (allPassed ? score : 0);
        await match.save();

        room.players[socket.userId] = { ...pState, testsPassed: passed, score: (pState.score || 0) + (allPassed ? score : 0), wrongSubmissions: wrongSubs };

        if (allPassed) {
          const nextIdx       = problemIdx + 1;
          const totalProblems = room.problemIds?.length || 1;
          if (nextIdx >= totalProblems) {
            await setRoom(roomId, room);
            socket.emit('battle:submitResult', { results, passed, total, allPassed, score, verdict });
            socket.to(roomId).emit('battle:opponentProgress', { testsPassed: passed, totalTests: total, score: room.players[socket.userId].score, problemIdx: nextIdx, totalProblems });
            return await endMatch(io, roomId, room, socket.userId, 'solved');
          }
          room.players[socket.userId].currentProblem = nextIdx;
          room.players[socket.userId].testsPassed    = 0;
          await setRoom(roomId, room);
          const nextProblem = await Problem.findById(room.problemIds[nextIdx]);
          socket.emit('battle:submitResult', { results, passed, total, allPassed, score, verdict });
          socket.emit('battle:nextProblem', { problemIdx: nextIdx, totalProblems, problem: nextProblem });
          socket.to(roomId).emit('battle:opponentProgress', { testsPassed: passed, totalTests: total, score: room.players[socket.userId].score, problemIdx: nextIdx, totalProblems });
        } else {
          await setRoom(roomId, room);
          socket.emit('battle:submitResult', { results, passed, total, allPassed, score, verdict });
          socket.to(roomId).emit('battle:opponentProgress', { testsPassed: passed, totalTests: total, score: room.players[socket.userId].score, problemIdx, totalProblems: room.problemIds?.length || 1 });
        }
      } catch (err) {
        console.error('Submit error:', err);
        socket.emit('battle:error', { message: 'Execution failed. Try again.' });
      }
    });

    // ── CODE UPDATE ───────────────────────────────────────────
    socket.on('battle:codeUpdate', ({ roomId }) => {
      socket.to(roomId).emit('battle:opponentActivity', { timestamp: Date.now() });
    });

    // ── POWER-UPS ─────────────────────────────────────────────
    socket.on('battle:powerup', async ({ roomId, type }) => {
      const room = await getRoom(roomId);
      if (!room || room.status !== 'active') return;
      const pState = room.players[socket.userId];
      const now    = Date.now();
      if (pState?.lastPowerupAt && now - pState.lastPowerupAt < POWERUP_CD_MS)
        return socket.emit('battle:error', { message: '⏳ Power-up on cooldown!' });
      if (!pState || (pState.testsPassed < 1 && (pState.currentProblem || 0) < 1))
        return socket.emit('battle:error', { message: '❌ Pass at least one test first!' });
      room.players[socket.userId].lastPowerupAt = now;
      if (type === 'fog') {
        socket.to(roomId).emit('battle:fogActivated', { duration: 15000, activatedBy: socket.username });
        socket.emit('battle:powerupUsed', { type: 'fog' });
      } else if (type === 'freeze') {
        const oppId = Object.keys(room.players).find(id => id !== socket.userId);
        if (oppId) { room.players[oppId].frozenUntil = now + 10000; socket.to(roomId).emit('battle:freezeActivated', { duration: 10000, activatedBy: socket.username }); socket.emit('battle:powerupUsed', { type: 'freeze' }); }
      }
      await setRoom(roomId, room);
    });

    socket.on('disconnect', async () => {
      console.log(`💨 ${socket.username} disconnected`);
      await dequeue(socket.userId);
    });
  });
}

// ── Pair two players ─────────────────────────────────────────
async function tryPair(io, socket) {
  const pair = await popPair();
  if (!pair) return;
  const [p1, p2] = pair;
  if (p1.userId === p2.userId) { await enqueue(p1.userId, p1.socketId); return; }

  const [player1, player2] = await Promise.all([User.findById(p1.userId), User.findById(p2.userId)]);
  if (!player1 || !player2) return;

  const lobbyId = uuid();
  await lobbySet(`pair:${p1.userId}`, { pairedWith: p2.userId, oppSocketId: p2.socketId, lobbyId });
  await lobbySet(`pair:${p2.userId}`, { pairedWith: p1.userId, oppSocketId: p1.socketId, lobbyId });

  const s1 = io.sockets.sockets.get(p1.socketId);
  const s2 = io.sockets.sockets.get(p2.socketId);
  if (s1) s1.emit('lobby:opponentJoined', { username: player2.username, rating: player2.rating });
  if (s2) s2.emit('lobby:opponentJoined', { username: player1.username, rating: player1.rating });

  console.log(`🤝 Paired: ${player1.username} & ${player2.username} | Lobby: ${lobbyId}`);
}

async function cleanupLobby(io, userId) {
  const pair = await lobbyGet(`pair:${userId}`);
  if (!pair) return;
  const { pairedWith, oppSocketId, lobbyId } = pair;
  const opp = io.sockets.sockets.get(oppSocketId);
  if (opp) opp.emit('lobby:opponentLeft');
  await lobbyDel(`settings:${lobbyId}:${userId}`);
  await lobbyDel(`settings:${lobbyId}:${pairedWith}`);
  await lobbyDel(`pair:${userId}`);
  await lobbyDel(`pair:${pairedWith}`);
}

// ── Start match ───────────────────────────────────────────────
async function startMatch(io, p1, p2, { topic, BATTLE_MS, qCount }) {
  const [player1, player2] = await Promise.all([User.findById(p1.id), User.findById(p2.id)]);
  if (!player1 || !player2) throw new Error('Players not found');

  let problems = await Problem.find({ topic }).lean();
  if (problems.length < qCount) {
    const extra = await Problem.find({ topic: { $ne: topic } }).lean();
    problems = [...problems, ...extra];
  }
  if (!problems.length) throw new Error('No problems in database! Seed problems first.');

  problems = problems.sort(() => Math.random() - 0.5).slice(0, Math.min(qCount, problems.length));
  const problemIds = problems.map(p => String(p._id));

  const match = await Match.create({ problem: problems[0]._id, player1: player1._id, player2: player2._id, status: 'active', startedAt: new Date() });

  const roomId    = uuid();
  const startedAt = Date.now();

  await setRoom(roomId, {
    roomId, matchId: String(match._id), problemIds,
    status: 'active', startedAt, endsAt: startedAt + BATTLE_MS,
    players: {
      [String(player1._id)]: { socketId: p1.socketId, username: player1.username, currentProblem: 0, testsPassed: 0, score: 0, wrongSubmissions: 0 },
      [String(player2._id)]: { socketId: p2.socketId, username: player2.username, currentProblem: 0, testsPassed: 0, score: 0, wrongSubmissions: 0 },
    },
  });

  const s1 = io.sockets.sockets.get(p1.socketId);
  const s2 = io.sockets.sockets.get(p2.socketId);
  if (s1) s1.join(roomId);
  if (s2) s2.join(roomId);

  const payload = { roomId, matchId: String(match._id), problem: problems[0], problemIdx: 0, totalProblems: problems.length, endsAt: startedAt + BATTLE_MS };
  if (s1) s1.emit('battle:matched', { ...payload, opponent: { id: player2._id, username: player2.username, rating: player2.rating } });
  if (s2) s2.emit('battle:matched', { ...payload, opponent: { id: player1._id, username: player1.username, rating: player1.rating } });

  console.log(`⚔️  ${player1.username} vs ${player2.username} | ${topic} | ${problems.length}Q | Room: ${roomId}`);
  setTimeout(() => endMatch(io, roomId, null, null, 'timeout'), BATTLE_MS);
}

// ── End match ─────────────────────────────────────────────────
async function endMatch(io, roomId, room, winnerId, reason) {
  if (!room) room = await getRoom(roomId);
  if (!room || room.status === 'completed') return;
  room.status = 'completed';
  await setRoom(roomId, room);

  const match = await Match.findById(room.matchId).populate('player1').populate('player2').populate('problem');
  if (!match) return;

  if (!winnerId) {
    const scores = Object.entries(room.players).map(([id, p]) => ({ id, score: p.score || 0, solved: p.currentProblem || 0 })).sort((a, b) => b.solved - a.solved || b.score - a.score);
    if (scores[0].score > scores[1].score || scores[0].solved > scores[1].solved) winnerId = scores[0].id;
  }

  const loserId = winnerId ? (winnerId === String(match.player1._id) ? String(match.player2._id) : String(match.player1._id)) : null;
  match.status = 'completed'; match.winner = winnerId || null; match.endedAt = new Date();
  await match.save();

  if (winnerId && loserId) {
    const winner = match.player1._id.toString() === winnerId ? match.player1 : match.player2;
    const loser  = winner._id.toString() === match.player1._id.toString() ? match.player2 : match.player1;
    const { winnerChange, loserChange } = eloChange(winner.rating, loser.rating);
    await User.findByIdAndUpdate(winnerId, { $inc: { rating: winnerChange, wins: 1 } });
    await User.findByIdAndUpdate(loserId,  { $inc: { rating: loserChange,  losses: 1 } });
  }

  io.to(roomId).emit('battle:ended', { reason, winnerId, matchId: room.matchId, scores: { [String(match.player1._id)]: room.players[String(match.player1._id)]?.score || 0, [String(match.player2._id)]: room.players[String(match.player2._id)]?.score || 0 } });

  try {
    const aiReview = await generateMatchReview({ problem: match.problem, player1: match.player1, player2: match.player2, submissions: match.submissions });
    if (aiReview) { match.aiReview = aiReview; await match.save(); io.to(roomId).emit('battle:aiReview', { matchId: room.matchId, aiReview }); }
  } catch (err) { console.error('AI review failed:', err.message); }

  setTimeout(() => deleteRoom(roomId), 5 * 60 * 1000);
}

module.exports = { initBattleSocket };