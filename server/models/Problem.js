const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  topic: {
    type: String,
    enum: [
      'arrays', 'strings', 'stack', 'dp',
      'trees', 'graphs',
    ],
    required: true,
  },
  tags:   [String],
  source: { type: String, default: 'custom' },

  // These are only used for old Codeforces problems (can be ignored for seeded problems)
  cfContestId: { type: Number },
  cfIndex:     { type: String },

  examples: [{
    input:       String,
    output:      String,
    explanation: String,
  }],

  testCases: [{
    input:          String,
    expectedOutput: String,
    isHidden:       { type: Boolean, default: false },
  }],

  starterCode: {
    cpp:    String,
    java:   String,
    python: String,
  },

  codeWrapper: {
    cpp:    String,
    java:   String,
    python: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);