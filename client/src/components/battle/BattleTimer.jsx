import React, { useEffect, useState } from 'react';

export default function BattleTimer({ endsAt, freezeActive, onExpire }) {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, endsAt - Date.now());
      setLeft(ms);
      if (ms === 0 && onExpire) onExpire();
    };
    tick();
    const t = setInterval(tick, 500);
    return () => clearInterval(t);
  }, [endsAt]);

  const secs   = Math.floor(left / 1000);
  const m      = Math.floor(secs / 60);
  const s      = secs % 60;
  const urgent = secs < 120;

  return (
    <div className={`font-mono font-bold text-xl px-4 py-2 rounded-lg border transition-all ${
      freezeActive ? 'border-blue-400 text-blue-300 freeze-border bg-blue-950/30'
      : urgent      ? 'border-dl-danger text-dl-danger bg-red-950/30'
      :               'border-dl-border text-white bg-dl-surface'
    }`}>
      {freezeActive ? '🧊' : urgent ? '⏰' : '⏱'}{' '}
      {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
    </div>
  );
}
