import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useBattleStore } from '../store/store';
import { getSocket, connectSocket } from '../socket/socket';

const TOPICS = [
  { value: 'arrays',  label: '📦 Arrays' },
  { value: 'strings', label: '🔤 Strings' },
  { value: 'stack',   label: '📚 Stack' },
  { value: 'dp',      label: '🧩 Dynamic Programming' },
  { value: 'trees',   label: '🌳 Trees' },
  { value: 'graphs',  label: '🕸️ Graphs' },
];

const DIFFICULTIES = [
  { value: 'easy',   label: '🟢 Easy',   color: 'text-green-400 border-green-400' },
  { value: 'medium', label: '🟡 Medium', color: 'text-yellow-400 border-yellow-400' },
  { value: 'hard',   label: '🔴 Hard',   color: 'text-red-400 border-red-400' },
];

const TIMERS = [
  { value: 5,   label: '5 min' },
  { value: 15,  label: '15 min' },
  { value: 30,  label: '30 min' },
  { value: 60,  label: '1 hr' },
  { value: 120, label: '2 hrs' },
  { value: 180, label: '3 hrs' },
];

const QUESTION_COUNTS = [1, 2, 3, 4, 5];

export default function LobbyPage() {
  const user      = useAuthStore((s) => s.user);
  const token     = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { battleStatus, setBattle, resetBattle } = useBattleStore();

  const [queueTime, setQueueTime]     = useState(0);
  const [phase, setPhase]             = useState('idle'); // idle | settings | queuing | waiting
  const [mySettings, setMySettings]   = useState({ topic: '', difficulty: '', timer: 30, questionCount: 1 });
  const [oppSettings, setOppSettings] = useState(null);
  const [settingsLocked, setSettingsLocked] = useState(false);
  const [mismatch, setMismatch]       = useState('');
  const [opponentName, setOpponentName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    resetBattle();
    const socket = connectSocket(token);

    // Opponent joined queue
    socket.on('lobby:opponentJoined', ({ username }) => {
      setOpponentName(username);
    });

    // Opponent updated their settings
    socket.on('lobby:opponentSettings', (settings) => {
      setOppSettings(settings);
      setMismatch('');
    });

    // Both confirmed — match is starting
    socket.on('battle:matched', async ({ roomId, matchId, problem, problemIdx, totalProblems, endsAt, opponent }) => {
      setBattle({ roomId, matchId, problem, opponent, endsAt, battleStatus: 'active' });
      navigate('/battle');
    });

    // Settings mismatch error
    socket.on('lobby:mismatch', ({ message }) => {
      setMismatch(message);
    });

    return () => {
      socket.off('lobby:opponentJoined');
      socket.off('lobby:opponentSettings');
      socket.off('battle:matched');
      socket.off('lobby:mismatch');
    };
  }, []);

  useEffect(() => {
    let t;
    if (phase === 'settings' || phase === 'queuing' || phase === 'waiting') {
      t = setInterval(() => setQueueTime((n) => n + 1), 1000);
    } else {
      setQueueTime(0);
    }
    return () => clearInterval(t);
  }, [phase]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  function enterQueue() {
    getSocket()?.emit('queue:join');
    setBattle({ battleStatus: 'queuing' });
    setPhase('settings');
  }

  function leaveQueue() {
    getSocket()?.emit('queue:leave');
    setBattle({ battleStatus: 'idle' });
    setPhase('idle');
    setMySettings({ topic: '', difficulty: '', timer: 30, questionCount: 1 });
    setOppSettings(null);
    setSettingsLocked(false);
    setMismatch('');
  }

  function updateSetting(key, value) {
    if (settingsLocked) return;
    const updated = { ...mySettings, [key]: value };
    setMySettings(updated);
    // Broadcast to opponent in real time
    if (updated.topic && updated.difficulty) {
      getSocket()?.emit('lobby:settings', updated);
    }
  }

  function confirmSettings() {
    if (!mySettings.topic) return setMismatch('Please select a topic!');
    if (!mySettings.difficulty) return setMismatch('Please select a difficulty!');
    setSettingsLocked(true);
    setMismatch('');
    getSocket()?.emit('lobby:confirm', mySettings);
    setPhase('waiting');
  }

  const settingsComplete = mySettings.topic && mySettings.difficulty;
  const bothConfirmed = settingsLocked && oppSettings;

  return (
    <div className="min-h-screen bg-dl-bg">
      {/* Header */}
      <header className="border-b border-dl-border px-6 py-4 flex items-center justify-between">
        <span className="text-2xl font-extrabold text-white">⚔️ <span className="text-dl-accent">DEADLOCK</span></span>
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/leaderboard')} className="text-dl-muted hover:text-white text-sm transition-colors">
            🏆 Leaderboard
          </button>
          <span className="text-sm text-dl-muted">
            <span className="text-white font-semibold">{user?.username}</span>
            <span className="ml-2 text-dl-accent font-mono">⭐ {user?.rating || 1000}</span>
          </span>
          <button onClick={() => { clearAuth(); navigate('/login'); }}
            className="text-dl-muted hover:text-dl-danger text-sm transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-5xl font-extrabold text-white mb-3">
            Ready to <span className="text-dl-accent">Battle?</span>
          </h2>
          <p className="text-dl-muted text-lg">Head-to-head competitive coding. Real-time. No mercy.</p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── IDLE ── */}
          {phase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="card text-center mb-8">
              <div className="text-6xl mb-4">⚔️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Find a Match</h3>
              <p className="text-dl-muted mb-6 text-sm">Get matched with an opponent, then customize your battle settings.</p>
              <button onClick={enterQueue} className="btn-primary text-base px-14 py-3">Enter Queue</button>
            </motion.div>
          )}

          {/* ── SETTINGS ── */}
          {(phase === 'settings' || phase === 'waiting') && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Queue status */}
              <div className="card text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-dl-accent border-t-transparent rounded-full" />
                  <span className="text-lg font-bold text-dl-accent">
                    {phase === 'waiting' ? 'Waiting for opponent to confirm...' : 'Searching for opponent...'}
                  </span>
                </div>
                <div className="text-4xl font-mono font-bold text-white mb-3">{fmt(queueTime)}</div>
                <button onClick={leaveQueue} className="btn-ghost text-sm">Leave Queue</button>
              </div>

              {/* Settings grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* My settings */}
                <div className="card">
                  <h3 className="text-white font-bold text-lg mb-4">
                    ⚙️ Your Settings
                    {settingsLocked && <span className="ml-2 text-green-400 text-sm">✅ Confirmed</span>}
                  </h3>

                  {/* Topic */}
                  <div className="mb-4">
                    <label className="text-dl-muted text-sm mb-2 block">Topic</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TOPICS.map(t => (
                        <button key={t.value}
                          onClick={() => updateSetting('topic', t.value)}
                          disabled={settingsLocked}
                          className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                            mySettings.topic === t.value
                              ? 'border-dl-accent text-dl-accent bg-dl-accent/10'
                              : 'border-dl-border text-dl-muted hover:border-dl-accent/50'
                          } ${settingsLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="mb-4">
                    <label className="text-dl-muted text-sm mb-2 block">Difficulty</label>
                    <div className="flex gap-2">
                      {DIFFICULTIES.map(d => (
                        <button key={d.value}
                          onClick={() => updateSetting('difficulty', d.value)}
                          disabled={settingsLocked}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                            mySettings.difficulty === d.value
                              ? `${d.color} bg-white/5`
                              : 'border-dl-border text-dl-muted hover:border-dl-accent/50'
                          } ${settingsLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="mb-4">
                    <label className="text-dl-muted text-sm mb-2 block">Time Limit</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIMERS.map(t => (
                        <button key={t.value}
                          onClick={() => updateSetting('timer', t.value)}
                          disabled={settingsLocked}
                          className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                            mySettings.timer === t.value
                              ? 'border-dl-accent text-dl-accent bg-dl-accent/10'
                              : 'border-dl-border text-dl-muted hover:border-dl-accent/50'
                          } ${settingsLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question count */}
                  <div className="mb-6">
                    <label className="text-dl-muted text-sm mb-2 block">Questions per Player</label>
                    <div className="flex gap-2">
                      {QUESTION_COUNTS.map(n => (
                        <button key={n}
                          onClick={() => updateSetting('questionCount', n)}
                          disabled={settingsLocked}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${
                            mySettings.questionCount === n
                              ? 'border-dl-accent text-dl-accent bg-dl-accent/10'
                              : 'border-dl-border text-dl-muted hover:border-dl-accent/50'
                          } ${settingsLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {!settingsLocked && (
                    <button
                      onClick={confirmSettings}
                      disabled={!settingsComplete}
                      className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                        settingsComplete
                          ? 'btn-primary'
                          : 'bg-dl-border text-dl-muted cursor-not-allowed'
                      }`}>
                      ✅ Confirm Settings
                    </button>
                  )}
                </div>

                {/* Opponent settings */}
                <div className="card">
                  <h3 className="text-white font-bold text-lg mb-4">
                    👤 Opponent Settings
                    {opponentName && <span className="ml-2 text-dl-muted text-sm">({opponentName})</span>}
                  </h3>

                  {oppSettings ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-dl-muted">Topic</span>
                        <span className={`font-medium ${oppSettings.topic === mySettings.topic ? 'text-green-400' : 'text-red-400'}`}>
                          {TOPICS.find(t => t.value === oppSettings.topic)?.label || oppSettings.topic}
                          {oppSettings.topic !== mySettings.topic && ' ⚠️'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dl-muted">Difficulty</span>
                        <span className={`font-medium ${oppSettings.difficulty === mySettings.difficulty ? 'text-green-400' : 'text-red-400'}`}>
                          {DIFFICULTIES.find(d => d.value === oppSettings.difficulty)?.label || oppSettings.difficulty}
                          {oppSettings.difficulty !== mySettings.difficulty && ' ⚠️'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dl-muted">Time Limit</span>
                        <span className="text-white font-medium">{oppSettings.timer} min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dl-muted">Questions</span>
                        <span className="text-white font-medium">{oppSettings.questionCount}</span>
                      </div>

                      {/* Match indicator */}
                      {oppSettings.topic && oppSettings.difficulty && (
                        <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                          oppSettings.topic === mySettings.topic
                            ? 'bg-green-400/10 text-green-400 border border-green-400/30'
                            : 'bg-red-400/10 text-red-400 border border-red-400/30'
                        }`}>
                          {oppSettings.topic === mySettings.topic
                            ? '✅ Topic matches! Confirm to start.'
                            : '⚠️ Topic must match your opponent!'}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-dl-muted">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 border-2 border-dl-border border-t-dl-muted rounded-full mb-3" />
                      <p className="text-sm">Waiting for opponent...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mismatch error */}
              {mismatch && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-red-400/10 border border-red-400/30 text-red-400 text-center py-3 px-4 rounded-lg text-sm mb-4">
                  ⚠️ {mismatch}
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Feature grid - only show when idle */}
        {phase === 'idle' && (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: '⚡', title: 'Real-time', desc: 'See opponent progress live as you race to solve.' },
              { icon: '🌫️', title: 'Power-ups', desc: 'Fog or freeze your opponent. Strategy matters.' },
              { icon: '🤖', title: 'AI Review', desc: 'AI-powered code analysis after every match.' },
            ].map((f) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card text-center">
                <div className="text-3xl mb-2">{f.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                <div className="text-dl-muted text-xs">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}