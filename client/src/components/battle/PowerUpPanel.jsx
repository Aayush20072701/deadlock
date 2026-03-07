import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

const POWERUPS = [
  {
    type: 'freeze',
    emoji: '🧊',
    label: 'Freeze',
    description: "Freeze opponent's submit for 10s",
    color: 'cyan',
  },
  {
    type: 'fog',
    emoji: '🌫️',
    label: 'Fog',
    description: "Obscure opponent's editor for 15s",
    color: 'blue',
  },
];

export default function PowerUpPanel({ onActivate, testsPassed, lastPowerupAt }) {
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [justUsed,     setJustUsed]     = useState(null);

  useEffect(() => {
    const tick = () => {
      if (!lastPowerupAt) { setCooldownLeft(0); return; }
      const remaining = COOLDOWN_MS - (Date.now() - lastPowerupAt);
      setCooldownLeft(remaining > 0 ? remaining : 0);
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [lastPowerupAt]);

  const onCooldown = cooldownLeft > 0;
  const needsTest  = (testsPassed || 0) < 1;
  const isDisabled = onCooldown || needsTest;

  function handleClick(type) {
    if (isDisabled) return;
    onActivate(type);
    setJustUsed(type);
    setTimeout(() => setJustUsed(null), 2000);
  }

  const totalSecs = Math.ceil(cooldownLeft / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs  = totalSecs % 60;
  const cooldownDisplay = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  const cooldownPct = (cooldownLeft / COOLDOWN_MS) * 100;

  return (
    <div>
      <h3 className="text-xs font-semibold text-dl-muted uppercase tracking-wider mb-3">
        ⚡ Power-Ups
      </h3>

      {/* Status */}
      <div className="mb-3 text-xs">
        {needsTest ? (
          <div className="flex items-center gap-1.5 text-yellow-400/80 bg-yellow-400/10 rounded-lg px-2 py-1.5">
            <span>🔒</span>
            <span>Pass a test to unlock</span>
          </div>
        ) : onCooldown ? (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-orange-400/80 bg-orange-400/10 rounded-lg px-2 py-1.5">
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                ⏳
              </motion.span>
              <span className="font-mono font-bold">{cooldownDisplay}</span>
            </div>
            <div className="text-[10px] text-dl-muted px-1 leading-tight">
              Pass a test to unlock early
            </div>
            {/* Cooldown bar */}
            <div className="h-1 bg-dl-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-400"
                animate={{ width: `${cooldownPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-green-400/80 bg-green-400/10 rounded-lg px-2 py-1.5">
            <span>✅</span>
            <span>Ready to use!</span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        {POWERUPS.map(({ type, emoji, label, description, color }) => {
          const isJust = justUsed === type;
          const colorMap = {
            cyan: 'border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300',
            blue: 'border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 text-blue-300',
          };
          const activeStyle   = colorMap[color];
          const disabledStyle = 'border-dl-border text-dl-muted cursor-not-allowed opacity-40';

          return (
            <motion.button
              key={type}
              onClick={() => handleClick(type)}
              disabled={isDisabled}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              className={`w-full rounded-lg border px-3 py-2.5 text-left transition-all text-xs
                ${isDisabled ? disabledStyle : activeStyle}
                ${isJust ? 'ring-1 ring-white/30' : ''}
              `}
            >
              <div className="flex items-center gap-2 font-semibold mb-0.5">
                <span className="text-base">{emoji}</span>
                <span>{isJust ? '✓ Used!' : label}</span>
              </div>
              <div className="text-[10px] opacity-70 leading-tight pl-6">
                {description}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Usage hint */}
      {!onCooldown && !needsTest && (
        <p className="text-[10px] text-dl-muted mt-2 leading-tight px-1">
          After use: 5min cooldown, or pass a test to unlock early.
        </p>
      )}
    </div>
  );
}