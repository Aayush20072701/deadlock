require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const problems = await Problem.find({}, { title: 1, topic: 1, difficulty: 1, source: 1 });
  console.log(JSON.stringify(problems, null, 2));
  await mongoose.disconnect();
});