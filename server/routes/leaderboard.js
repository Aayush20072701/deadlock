const express = require('express');
const User    = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('username rating wins losses')
      .sort({ rating: -1 })
      .limit(50);

    res.json(users.map((u, i) => ({
      rank: i + 1,
      id: u._id,
      username: u.username,
      rating: u.rating,
      wins: u.wins,
      losses: u.losses,
      winRate: u.wins + u.losses > 0
        ? Math.round((u.wins / (u.wins + u.losses)) * 100) : 0,
    })));
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
