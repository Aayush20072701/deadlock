import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, useBattleStore } from '../store/store';
import { getSocket } from '../socket/socket';
import api from '../utils/api';

export default function ResultsPage() {
  const { matchId } = useParams();
  const navigate    = useNavigate();
  const user        = useAuthStore((s) => s.user);
  const [match, setMatch]       = useState(null);
  const [aiReview, setAiReview] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get(`/api/matches/${matchId}`)
      .then(({ data }) => { setMatch(data); if (data.aiReview) setAiReview(data.aiReview); })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Listen for AI review arriving later
    const socket = getSocket();
    if (socket) {
      socket.on('battle:aiReview', ({ matchId: mid, aiReview: review }) => {
        if (mid === matchId) setAiReview(review);
      });
    }
    return () => socket?.off('battle:aiReview');
  }, [matchId]);

  if (loading) return (
    <div className="min-h-screen bg-dl-bg flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-2 border-dl-accent border-t-transparent rounded-full" />
    </div>
  );

  const isWinner = match?.winner?._id === user?.id || String(match?.winner) === String(user?.id);
  const isDraw   = !match?.winner;
  const myId     = user?.id;
  const mySub    = match?.submissions?.find((s) => String(s.userId) === String(myId));
  const oppSub   = match?.submissions?.find((s) => String(s.userId) !== String(myId));
  const opponent = String(match?.player1?._id) === String(myId) ? match?.player2 : match?.player1;

  const myReviewKey  = String(match?.player1?._id) === String(myId) ? 'player1Review' : 'player2Review';
  const oppReviewKey = myReviewKey === 'player1Review' ? 'player2Review' : 'player1Review';

  return (
    <div className="min-h-screen bg-dl-bg p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Result banner */}
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className={`card text-center py-10 border-2 ${
            isDraw ? 'border-dl-warning' : isWinner ? 'border-dl-success' : 'border-dl-danger'
          }`}>
          <div className="text-6xl mb-3">{isDraw ? '🤝' : isWinner ? '🏆' : '💀'}</div>
          <h1 className="text-4xl font-extrabold text-white mb-2">
            {isDraw ? 'Draw!' : isWinner ? 'Victory!' : 'Defeated'}
          </h1>
          <p className="text-dl-muted">
            {isDraw ? 'Both players tied.' : isWinner
              ? `You defeated ${opponent?.username}!`
              : `${opponent?.username} won this one.`}
          </p>
        </motion.div>

        {/* Score cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'You', sub: mySub, accent: 'border-dl-accent/40' },
            { label: opponent?.username || 'Opponent', sub: oppSub, accent: 'border-dl-border' },
          ].map(({ label, sub, accent }) => (
            <div key={label} className={`card border-2 ${accent}`}>
              <h3 className="font-bold text-white mb-3">{label}</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Score',    sub?.score || 0,    'text-dl-accent font-mono font-bold'],
                  ['Tests',    `${sub?.testsPassed || 0}/${sub?.totalTests || 0}`, 'text-white'],
                  ['Verdict',  sub?.verdict?.replace('_',' ') || 'No submission', 'text-dl-muted'],
                  ['Language', sub?.language || '—', 'text-white font-mono'],
                ].map(([k, v, cls]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-dl-muted">{k}</span>
                    <span className={cls}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Review */}
        {aiReview ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤖</span>
              <h2 className="text-lg font-bold text-white">AI Code Review</h2>
              <span className="text-xs text-dl-muted ml-1">powered by Gemini</span>
            </div>

            {aiReview.summary && (
              <p className="text-dl-muted text-sm mb-5 leading-relaxed">{aiReview.summary}</p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { key: myReviewKey,  label: 'Your Code',              color: 'text-dl-accent' },
                { key: oppReviewKey, label: `${opponent?.username}'s Code`, color: 'text-dl-danger' },
              ].map(({ key, label, color }) => {
                const r = aiReview[key];
                if (!r) return null;
                return (
                  <div key={key} className="bg-dl-surface rounded-lg p-4 space-y-3">
                    <h4 className={`font-bold text-sm ${color}`}>{label}</h4>
                    <div className="text-xs space-y-1">
                      <div><span className="text-dl-muted">Time: </span><span className="font-mono text-white">{r.timeComplexity}</span></div>
                      <div><span className="text-dl-muted">Space: </span><span className="font-mono text-white">{r.spaceComplexity}</span></div>
                    </div>
                    <p className="text-xs text-dl-text">{r.approach}</p>
                    {r.strengths?.length > 0 && (
                      <div>
                        <p className="text-xs text-dl-success font-semibold mb-1">✅ Strengths</p>
                        <ul className="text-xs text-dl-muted space-y-0.5">{r.strengths.map((s,i) => <li key={i}>• {s}</li>)}</ul>
                      </div>
                    )}
                    {r.improvements?.length > 0 && (
                      <div>
                        <p className="text-xs text-dl-warning font-semibold mb-1">💡 Improvements</p>
                        <ul className="text-xs text-dl-muted space-y-0.5">{r.improvements.map((s,i) => <li key={i}>• {s}</li>)}</ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {aiReview.keyTakeaway && (
              <div className="bg-dl-accent/10 border border-dl-accent/30 rounded-lg p-3 text-sm">
                <span className="text-dl-accent font-semibold">💡 Key Takeaway: </span>
                <span className="text-dl-text">{aiReview.keyTakeaway}</span>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="card text-center text-dl-muted py-6">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              🤖 Gemini is reviewing your code…
            </motion.div>
          </div>
        )}

        <div className="flex gap-4 justify-center pt-2">
          <button onClick={() => navigate('/')} className="btn-primary px-10">⚔️ Play Again</button>
          <button onClick={() => navigate('/leaderboard')} className="btn-ghost">🏆 Leaderboard</button>
        </div>
      </div>
    </div>
  );
}
