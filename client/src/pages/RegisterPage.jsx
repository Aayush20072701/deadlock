import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/store';
import { connectSocket } from '../socket/socket';
import api from '../utils/api';

export default function RegisterPage() {
  const [form, setForm]       = useState({ username: '', email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth  = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/api/auth/register', form);
      setAuth(data.user, data.token);
      connectSocket(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-dl-bg flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            ⚔️ <span className="text-dl-accent">DEADLOCK</span>
          </h1>
          <p className="text-dl-muted mt-2 text-sm">Join the arena.</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-white mb-6">Create Account</h2>
          {error && (
            <div className="bg-red-950/40 border border-red-500/40 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { field: 'username', type: 'text',     label: 'Username' },
              { field: 'email',    type: 'email',    label: 'Email' },
              { field: 'password', type: 'password', label: 'Password' },
            ].map(({ field, type, label }) => (
              <div key={field}>
                <label className="block text-xs text-dl-muted mb-1.5 uppercase tracking-wider">{label}</label>
                <input type={type} value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="input" required />
              </div>
            ))}
            <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-dl-muted text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-dl-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
