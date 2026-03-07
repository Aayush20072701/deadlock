import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestResultsPanel({ submitResult, isJudging }) {
  if (isJudging) {
    return (
      <div className="flex items-center gap-3 p-4 bg-dl-surface rounded-lg border border-dl-border">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-dl-accent border-t-transparent rounded-full flex-shrink-0" />
        <span className="text-dl-muted text-sm">Running test cases…</span>
      </div>
    );
  }
  if (!submitResult) return null;

  const { results, passed, total, allPassed, score } = submitResult;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <div className={`flex items-center justify-between p-3 rounded-lg border ${
          allPassed ? 'bg-green-950/30 border-green-500/40' : 'bg-red-950/30 border-red-500/40'
        }`}>
          <span className={`font-bold ${allPassed ? 'text-green-400' : 'text-red-400'}`}>
            {allPassed ? '✅ All Accepted!' : `❌ ${passed}/${total} Passed`}
          </span>
          <span className="text-dl-accent font-bold font-mono">+{score} pts</span>
        </div>

        <div className="space-y-1.5 max-h-52 overflow-y-auto">
          {results.map((r, i) => (
            <div key={i} className={`flex items-start gap-2 p-2.5 rounded text-xs ${
              r.passed ? 'bg-green-950/20' : 'bg-red-950/20'
            }`}>
              <span>{r.passed ? '✅' : '❌'}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">Test {i + 1}</div>
                {!r.passed && r.stderr && (
                  <div className="text-orange-400 font-mono truncate">Error: {r.stderr.slice(0, 100)}</div>
                )}
                {!r.passed && !r.stderr && (
                  <div className="text-red-400 font-mono">
                    Expected: {r.expectedOutput} | Got: {r.actualOutput || '(empty)'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
