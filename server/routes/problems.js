const express  = require('express');
const Problem  = require('../models/Problem');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const problems = await Problem.find().select('title slug difficulty topic tags');
    res.json(problems);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const problem =
      (await Problem.findById(req.params.id).catch(() => null)) ||
      (await Problem.findOne({ slug: req.params.id }));

    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const obj = problem.toObject();

    // Add CF link if applicable
    if (obj.source === 'codeforces' && obj.cfContestId && obj.cfIndex) {
      obj.cfUrl = `https://codeforces.com/problemset/problem/${obj.cfContestId}/${obj.cfIndex}`;
    }

    // Hide hidden test cases from client
    obj.testCases = obj.testCases.filter(tc => !tc.isHidden);
    res.json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;