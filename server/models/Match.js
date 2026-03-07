const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code:        String,
  language:    { type: String, enum: ['python', 'cpp', 'java'] },
  verdict:     String,
  testsPassed: { type: Number, default: 0 },
  totalTests:  { type: Number, default: 0 },
  score:       { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
});

const matchSchema = new mongoose.Schema({
  problem:      { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  player1:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  player2:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  winner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status:       { type: String, enum: ['active', 'completed'], default: 'active' },
  player1Score: { type: Number, default: 0 },
  player2Score: { type: Number, default: 0 },
  submissions:  [submissionSchema],
  aiReview:     { type: mongoose.Schema.Types.Mixed, default: null },
  startedAt:    { type: Date, default: Date.now },
  endedAt:      { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
