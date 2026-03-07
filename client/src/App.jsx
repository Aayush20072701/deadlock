import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/store';
import LoginPage       from './pages/LoginPage';
import RegisterPage    from './pages/RegisterPage';
import LobbyPage       from './pages/LobbyPage';
import BattlePage      from './pages/BattlePage';
import ResultsPage     from './pages/ResultsPage';
import LeaderboardPage from './pages/LeaderboardPage';

function Guard({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"           element={<LoginPage />} />
      <Route path="/register"        element={<RegisterPage />} />
      <Route path="/"                element={<Guard><LobbyPage /></Guard>} />
      <Route path="/battle"          element={<Guard><BattlePage /></Guard>} />
      <Route path="/results/:matchId" element={<Guard><ResultsPage /></Guard>} />
      <Route path="/leaderboard"     element={<Guard><LeaderboardPage /></Guard>} />
      <Route path="*"                element={<Navigate to="/" replace />} />
    </Routes>
  );
}
