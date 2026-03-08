import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { useAuthStore, useBattleStore } from '../store/store';
import { getSocket } from '../socket/socket';
import BattleTimer      from '../components/battle/BattleTimer';
import PowerUpPanel     from '../components/battle/PowerUpPanel';
import TestResultsPanel from '../components/battle/TestResultsPanel';

const POWERUP_WINDOW_SECS = 15;

export default function BattlePage() {
  const navigate = useNavigate();
  const user     = useAuthStore((s) => s.user);
  const {
    roomId, problem, opponent, endsAt,
    myCode, myLanguage, myScore, myTestsPassed, wrongSubmissions, lastPowerupAt,
    opponentScore, opponentTestsPassed,
    fogActive, freezeActive,
    isJudging, submitResult,
    setCode, setLanguage, setBattle, setFog, setJudging, setSubmitResult,
  } = useBattleStore();

  const [fogMsg,    setFogMsg]    = useState(null);
  const [freezeMsg, setFreezeMsg] = useState(null);
  const [tab,       setTab]       = useState('problem');
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);

  // Multi-problem state
  const [currentProblem,  setCurrentProblem]  = useState(problem);
  const [problemIdx,      setProblemIdx]       = useState(0);
  const [totalProblems,   setTotalProblems]    = useState(1);
  const [oppProblemIdx,   setOppProblemIdx]    = useState(0);

  // Power-up window state (shown after solving a question)
  const [powerupWindow,      setPowerupWindow]      = useState(false);
  const [powerupCountdown,   setPowerupCountdown]   = useState(POWERUP_WINDOW_SECS);
  const [pendingNextProblem, setPendingNextProblem] = useState(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (!roomId || !problem) navigate('/');
    setCurrentProblem(problem);
  }, []);

  useEffect(() => {
    if (currentProblem?.starterCode?.[myLanguage]) setCode(currentProblem.starterCode[myLanguage]);
  }, [myLanguage, currentProblem]);

  // ── Socket listeners ──────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('battle:fogActivated', ({ duration, activatedBy }) => {
      setFog(true); setFogMsg(`🌫️ ${activatedBy} activated Fog!`);
      setTimeout(() => { setFog(false); setFogMsg(null); }, duration);
    });

    socket.on('battle:freezeActivated', ({ duration, activatedBy }) => {
      setFreezeMsg(`🧊 ${activatedBy} activated Freeze!`);
      setTimeout(() => setFreezeMsg(null), duration);
    });

    socket.on('battle:opponentProgress', ({ testsPassed, score, problemIdx: oppIdx, totalProblems: tot }) => {
      setBattle({ opponentTestsPassed: testsPassed, opponentScore: score });
      if (oppIdx !== undefined) setOppProblemIdx(oppIdx);
      if (tot !== undefined) setTotalProblems(tot);
    });

    socket.on('battle:judging', () => setJudging(true));

    socket.on('battle:submitResult', (result) => {
      setJudging(false);
      setSubmitResult(result);
      setBattle({ myScore: result.score + myScore, myTestsPassed: result.passed });
      if (result.powerupReset) setBattle({ lastPowerupAt: null });
      if (!result.allPassed) setBattle({ wrongSubmissions: wrongSubmissions + 1 });
      setTab('results');
    });

    socket.on('battle:runResult', (result) => {
      setIsRunning(false);
      setRunResult(result);
      setTab('run');
    });

    // ── Intercept next problem — show power-up window first ──
    socket.on('battle:nextProblem', ({ problemIdx: idx, totalProblems: tot, problem: nextProb }) => {
      // Unlock power-ups immediately on solve
      setBattle({ lastPowerupAt: null });
      // Store the transition, show the window
      setPendingNextProblem({ idx, tot, problem: nextProb });
      setPowerupWindow(true);
      setPowerupCountdown(POWERUP_WINDOW_SECS);
    });

    socket.on('battle:ended', ({ reason, winnerId, matchId }) => {
      clearInterval(countdownRef.current);
      setBattle({ battleStatus: 'ended', matchResult: { reason, winnerId } });
      navigate(`/results/${matchId}`);
    });

    socket.on('battle:error', ({ message }) => {
      setJudging(false); setIsRunning(false);
      alert(message);
    });

    return () => {
      ['battle:fogActivated','battle:freezeActivated','battle:opponentProgress',
       'battle:judging','battle:submitResult','battle:runResult','battle:nextProblem',
       'battle:ended','battle:error'].forEach(e => socket.off(e));
    };
  }, [myScore, wrongSubmissions, myLanguage]);

  // ── Countdown tick when power-up window is open ───────────────
  useEffect(() => {
    if (!powerupWindow) return;
    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setPowerupCountdown(prev => {
        if (prev <= 1) { clearInterval(countdownRef.current); advanceToNext(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, [powerupWindow]);

  function advanceToNext() {
    if (!pendingNextProblem) return;
    clearInterval(countdownRef.current);
    const { idx, tot, problem: nextProb } = pendingNextProblem;
    setPowerupWindow(false);
    setPendingNextProblem(null);
    setCurrentProblem(nextProb);
    setProblemIdx(idx);
    setTotalProblems(tot);
    setCode(nextProb?.starterCode?.[myLanguage] || '');
    setSubmitResult(null);
    setRunResult(null);
    setTab('problem');
    setBattle({ myTestsPassed: 0 });
  }

  function handleEditorChange(val) {
    setCode(val);
    getSocket()?.emit('battle:codeUpdate', { roomId });
  }

  function handleRun() {
    if (isRunning || isJudging) return;
    setIsRunning(true); setRunResult(null);
    getSocket()?.emit('battle:run', { roomId, code: myCode, language: myLanguage });
    setTab('run');
  }

  function handleSubmit() {
    if (isJudging || isRunning) return;
    getSocket()?.emit('battle:submit', { roomId, code: myCode, language: myLanguage });
  }

  function handlePowerup(type) {
    getSocket()?.emit('battle:powerup', { roomId, type });
    setBattle({ lastPowerupAt: Date.now() });
  }

  function handleLangChange(lang) {
    setLanguage(lang);
    if (currentProblem?.starterCode?.[lang]) setCode(currentProblem.starterCode[lang]);
  }

  const total        = currentProblem?.testCases?.length || 0;
  const visibleTests = currentProblem?.testCases?.filter(tc => !tc.isHidden) || [];

  return (
    <div className="h-screen bg-dl-bg flex flex-col overflow-hidden">

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <header className="border-b border-dl-border px-4 py-2 flex items-center justify-between flex-shrink-0 bg-dl-surface/50 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-extrabold text-dl-accent whitespace-nowrap">⚔️ DEADLOCK</span>
          {currentProblem && (
            <span className="text-sm text-dl-muted truncate">
              {currentProblem.title}
              <span className={`ml-2 badge-${currentProblem.difficulty}`}>{currentProblem.difficulty}</span>
            </span>
          )}
          {totalProblems > 1 && (
            <div className="flex items-center gap-1 ml-2">
              {Array.from({ length: totalProblems }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${
                  i < problemIdx ? 'bg-green-400'
                  : i === problemIdx ? 'bg-dl-accent'
                  : 'bg-dl-border'
                }`} />
              ))}
              <span className="text-xs text-dl-muted ml-1">{problemIdx + 1}/{totalProblems}</span>
            </div>
          )}
        </div>

        {endsAt && <BattleTimer endsAt={endsAt} freezeActive={freezeActive} />}

        <div className="flex items-center gap-4 text-sm flex-shrink-0">
          <div className="text-right">
            <div className="font-bold text-white">{user?.username}</div>
            <div className="text-dl-accent font-mono text-xs">
              {myScore}pts · Q{problemIdx + 1} · {myTestsPassed}/{total}✓
            </div>
          </div>
          <div className="text-dl-border font-bold">VS</div>
          <div>
            <div className="font-bold text-white">{opponent?.username || '???'}</div>
            <div className="text-dl-danger font-mono text-xs">
              {opponentScore}pts · Q{oppProblemIdx + 1} · {opponentTestsPassed}/{total}✓
            </div>
          </div>
        </div>
      </header>

      {/* ── Fog / Freeze notifications ────────────────────────────── */}
      <AnimatePresence>
        {fogMsg && (
          <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-xl">
            {fogMsg}
          </motion.div>
        )}
        {freezeMsg && (
          <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold shadow-xl">
            {freezeMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── POWER-UP WINDOW (after solving a question) ───────────── */}
      <AnimatePresence>
        {powerupWindow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-dl-surface border border-green-400/40 rounded-2xl p-8 w-96 shadow-2xl"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">✅</div>
                <h2 className="text-2xl font-extrabold text-green-400">Question Solved!</h2>
                <p className="text-dl-muted text-sm mt-1">
                  Use a power-up before advancing to the next question
                </p>
              </div>

              {/* Power-up buttons */}
              <div className="space-y-3 mb-6">
                {[
                  { type: 'freeze', emoji: '🧊', label: 'Freeze', desc: "Freeze opponent's submit for 10s", color: 'cyan' },
                  { type: 'fog',    emoji: '🌫️', label: 'Fog',    desc: "Obscure opponent's editor for 15s", color: 'blue' },
                ].map(({ type, emoji, label, desc, color }) => {
                  const colorMap = {
                    cyan: 'border-cyan-400/60 hover:bg-cyan-500/15 text-cyan-300 hover:border-cyan-300',
                    blue: 'border-blue-400/60 hover:bg-blue-500/15 text-blue-300 hover:border-blue-300',
                  };
                  return (
                    <motion.button
                      key={type}
                      onClick={() => { handlePowerup(type); advanceToNext(); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${colorMap[color]}`}
                    >
                      <span className="text-3xl">{emoji}</span>
                      <div className="text-left">
                        <div className="font-bold text-sm">{label}</div>
                        <div className="text-xs opacity-70">{desc}</div>
                      </div>
                      <span className="ml-auto text-xs opacity-60 font-mono">USE →</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Skip + countdown */}
              <div className="flex items-center gap-3">
                <button
                  onClick={advanceToNext}
                  className="flex-1 py-2.5 rounded-xl border border-dl-border text-dl-muted hover:text-white hover:border-white/30 transition-all text-sm font-medium"
                >
                  Skip →
                </button>
                <div className="flex flex-col items-center min-w-[48px]">
                  <div className="text-2xl font-mono font-bold text-dl-accent">{powerupCountdown}</div>
                  <div className="text-[10px] text-dl-muted">auto</div>
                </div>
              </div>

              {/* Countdown bar */}
              <div className="mt-3 h-1 bg-dl-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-400"
                  animate={{ width: `${(powerupCountdown / POWERUP_WINDOW_SECS) * 100}%` }}
                  transition={{ duration: 0.9, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main layout ──────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left panel */}
        <div className="w-96 flex-shrink-0 border-r border-dl-border flex flex-col">
          <div className="flex border-b border-dl-border">
            {['problem', 'run', 'results'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-xs font-medium capitalize transition-colors ${
                  tab === t ? 'text-dl-accent border-b-2 border-dl-accent' : 'text-dl-muted hover:text-white'
                }`}>
                {t === 'results' && submitResult ? 'Submit ✓' : t === 'run' && runResult ? 'Run ✓' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">

            {tab === 'problem' && currentProblem && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">{currentProblem.title}</h2>
                  {currentProblem.cfContestId && (
                    <a href={`https://codeforces.com/problemset/problem/${currentProblem.cfContestId}/${currentProblem.cfIndex}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-xs text-dl-accent hover:underline whitespace-nowrap ml-2">CF ↗</a>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`badge-${currentProblem.difficulty} text-xs`}>{currentProblem.difficulty}</span>
                  {currentProblem.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-dl-muted bg-dl-surface px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-dl-text leading-relaxed whitespace-pre-wrap">{currentProblem.description}</p>
                {currentProblem.examples?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-dl-muted uppercase tracking-wider mb-2">Examples</h3>
                    {currentProblem.examples.map((ex, i) => (
                      <div key={i} className="bg-dl-surface rounded-lg p-3 text-xs font-mono space-y-1 mb-2">
                        <div><span className="text-dl-muted">Input: </span><span className="text-white whitespace-pre">{ex.input}</span></div>
                        <div><span className="text-dl-muted">Output: </span><span className="text-dl-success whitespace-pre">{ex.output}</span></div>
                        {ex.explanation && <div className="text-dl-muted mt-1">{ex.explanation}</div>}
                      </div>
                    ))}
                  </div>
                )}
                {visibleTests.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-dl-muted uppercase tracking-wider mb-2">Sample Test Cases</h3>
                    {visibleTests.map((tc, i) => (
                      <div key={i} className="bg-dl-surface rounded-lg p-3 text-xs font-mono space-y-1 mb-2">
                        <div><span className="text-dl-muted">Input: </span><span className="text-white whitespace-pre">{tc.input}</span></div>
                        <div><span className="text-dl-muted">Expected: </span><span className="text-dl-success whitespace-pre">{tc.expectedOutput}</span></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'run' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">
                  {isRunning ? '⏳ Running on sample tests...' : '▶ Run Results'}
                </h3>
                {isRunning && (
                  <div className="flex items-center gap-2 text-dl-muted text-sm">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-dl-accent border-t-transparent rounded-full" />
                    Testing {visibleTests.length} sample case{visibleTests.length !== 1 ? 's' : ''}...
                  </div>
                )}
                {runResult && !isRunning && (
                  <div className="space-y-3">
                    <div className={`text-sm font-bold ${runResult.allPassed ? 'text-green-400' : 'text-red-400'}`}>
                      {runResult.allPassed ? '✅ All sample tests passed!' : `❌ ${runResult.passed}/${runResult.total} passed`}
                    </div>
                    {runResult.results?.map((r, i) => (
                      <div key={i} className={`rounded-lg p-3 text-xs border ${r.passed ? 'border-green-400/30 bg-green-400/5' : 'border-red-400/30 bg-red-400/5'}`}>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-white">Test {i + 1}</span>
                          <span className={r.passed ? 'text-green-400' : 'text-red-400'}>{r.passed ? '✅ Passed' : '❌ Failed'}</span>
                        </div>
                        <div className="font-mono space-y-1">
                          <div><span className="text-dl-muted">Input: </span><span className="text-white whitespace-pre">{visibleTests[i]?.input}</span></div>
                          <div><span className="text-dl-muted">Expected: </span><span className="text-green-400 whitespace-pre">{r.expectedOutput}</span></div>
                          <div><span className="text-dl-muted">Got: </span><span className={r.passed ? 'text-green-400' : 'text-red-400'}>{r.actualOutput || '(empty)'}</span></div>
                          {r.stderr && <div className="text-red-400 mt-1 break-all">Error: {r.stderr.substring(0, 200)}</div>}
                        </div>
                      </div>
                    ))}
                    {runResult.allPassed && <p className="text-dl-muted text-xs">✨ Hit Submit to run against all hidden tests!</p>}
                  </div>
                )}
                {!runResult && !isRunning && <p className="text-dl-muted text-sm">Click Run to test against sample cases.</p>}
              </div>
            )}

            {tab === 'results' && (
              <TestResultsPanel submitResult={submitResult} isJudging={isJudging} />
            )}
          </div>
        </div>

        {/* Center — editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-dl-border bg-dl-surface/30">
            <div className="flex gap-1">
              {['python', 'cpp', 'java'].map((lang) => (
                <button key={lang} onClick={() => handleLangChange(lang)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    myLanguage === lang ? 'bg-dl-accent text-white' : 'text-dl-muted hover:text-white hover:bg-dl-border'
                  }`}>{lang}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleRun} disabled={isRunning || isJudging || !myCode?.trim()}
                className={`py-1.5 px-5 text-sm rounded font-semibold border transition-all ${
                  isRunning || isJudging || !myCode?.trim()
                    ? 'border-dl-border text-dl-muted cursor-not-allowed'
                    : 'border-green-500 text-green-400 hover:bg-green-500/10'
                }`}>
                {isRunning ? '⏳ Running...' : '▶ Run'}
              </button>
              <button onClick={handleSubmit} disabled={isJudging || isRunning || !myCode?.trim()}
                className="btn-primary py-1.5 px-5 text-sm">
                {isJudging ? '⏳ Judging…' : '🚀 Submit'}
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <Editor height="100%" language={myLanguage === 'cpp' ? 'cpp' : myLanguage}
              value={myCode} theme="vs-dark" onChange={handleEditorChange}
              options={{ fontSize: 14, fontFamily: '"JetBrains Mono", "Fira Code", monospace', minimap: { enabled: false }, lineNumbers: 'on', scrollBeyondLastLine: false, wordWrap: 'on', tabSize: 4, automaticLayout: true }} />
            <AnimatePresence>
              {fogActive && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fog-overlay rounded-none">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🌫️</div>
                    <p className="text-white font-bold text-xl">Fog Active!</p>
                    <p className="text-dl-muted text-sm mt-1">Your editor is obscured for 15 seconds</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-52 flex-shrink-0 border-l border-dl-border p-4 flex flex-col gap-6">
          <PowerUpPanel onActivate={handlePowerup} testsPassed={myTestsPassed} lastPowerupAt={lastPowerupAt} />

          {totalProblems > 1 && (
            <div>
              <h3 className="text-xs font-semibold text-dl-muted uppercase tracking-wider mb-2">Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-dl-muted">You</span>
                  <span className="text-dl-accent">Q{problemIdx + 1}/{totalProblems}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-dl-muted">Opponent</span>
                  <span className="text-dl-danger">Q{oppProblemIdx + 1}/{totalProblems}</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs font-semibold text-dl-muted uppercase tracking-wider mb-3">Opponent</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-dl-muted">Score</span><span className="text-dl-danger font-mono font-bold">{opponentScore}</span></div>
              <div className="flex justify-between"><span className="text-dl-muted">Tests</span><span className="text-white font-mono">{opponentTestsPassed}/{total}</span></div>
            </div>
            <div className="mt-3 h-1.5 bg-dl-border rounded-full overflow-hidden">
              <motion.div className="h-full bg-dl-danger" animate={{ width: total > 0 ? `${(opponentTestsPassed/total)*100}%` : '0%' }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-dl-muted uppercase tracking-wider mb-2">My Progress</h3>
            <div className="h-1.5 bg-dl-border rounded-full overflow-hidden">
              <motion.div className="h-full bg-dl-accent" animate={{ width: total > 0 ? `${(myTestsPassed/total)*100}%` : '0%' }} transition={{ duration: 0.4 }} />
            </div>
            <div className="text-xs text-dl-muted mt-1.5">{myTestsPassed}/{total} passed</div>
            {wrongSubmissions > 0 && <div className="text-xs text-dl-danger mt-1">⚠️ {wrongSubmissions} wrong (-{wrongSubmissions*25}pts)</div>}
          </div>
        </div>
      </div>
    </div>
  );
}