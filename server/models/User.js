const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  rating:       { type: Number, default: 1000 },
  wins:         { type: Number, default: 0 },
  losses:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
