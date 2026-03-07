import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/store';
import api from '../utils/api';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user     = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/leaderboard')
      .then(({ data }) => setLeaders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const medal = (r) => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : r;

  return (
    <div className="min-h-screen bg-dl-bg p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">🏆 Leaderboard</h1>
            <p className="text-dl-muted mt-1 text-sm">Top competitive coders</p>
          </div>
          <button onClick={() => navigate('/')} className="btn-ghost">← Back</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-dl-accent border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="space-y-2">
            {leaders.map((entry, i) => (
              <motion.div key={entry.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`card flex items-center gap-4 ${String(entry.id) === String(user?.id) ? 'border-dl-accent/50' : ''}`}>
                <div className="w-10 text-center font-bold text-lg text-dl-muted">{medal(entry.rank)}</div>
                <div className="flex-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    {entry.username}
                    {String(entry.id) === String(user?.id) && <span className="text-xs text-dl-accent">(you)</span>}
                  </div>
                  <div className="text-xs text-dl-muted">{entry.wins}W · {entry.losses}L · {entry.winRate}% WR</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-dl-accent font-mono text-lg">{entry.rating}</div>
                  <div className="text-xs text-dl-muted">rating</div>
                </div>
              </motion.div>
            ))}
            {leaders.length === 0 && (
              <div className="text-center text-dl-muted py-12">No battles yet. Be the first to compete!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
