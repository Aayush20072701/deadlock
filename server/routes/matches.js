const express = require('express');
const Match   = require('../models/Match');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/user/history', authenticate, async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ player1: req.user.id }, { player2: req.user.id }],
      status: 'completed',
    })
      .populate('problem', 'title difficulty')
      .populate('player1', 'username')
      .populate('player2', 'username')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(matches);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('problem', 'title slug difficulty description')
      .populate('player1', 'username rating')
      .populate('player2', 'username rating')
      .populate('winner', 'username');
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
