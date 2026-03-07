function calculateScore({ testsPassed, totalTests, timeElapsedMs, wrongSubmissions = 0 }) {
  if (totalTests === 0) return 0;
  const secs = timeElapsedMs / 1000;
  let score  = 0;

  if (testsPassed === totalTests) {
    score += 500;
    if (secs < 300)      score += 200; // < 5 min
    else if (secs < 600) score += 100; // < 10 min
    else if (secs < 900) score += 50;  // < 15 min
  } else {
    score += testsPassed * 50; // partial credit
  }

  score -= wrongSubmissions * 25; // wrong submission penalty
  return Math.max(0, score);
}

function eloChange(winnerRating, loserRating, K = 32) {
  const expected = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
  return {
    winnerChange: Math.round(K * (1 - expected)),
    loserChange:  Math.round(K * (0 - (1 - expected))),
  };
}

module.exports = { calculateScore, eloChange };
