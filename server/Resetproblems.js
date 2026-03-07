require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('✅ Connected');
  
  // Delete all old custom problems with wrong/missing topics
  const deleted = await Problem.deleteMany({ source: { $ne: 'codeforces' } });
  console.log(`🗑️  Deleted ${deleted.deletedCount} old problems`);

  // Also delete CF problems with bad test cases (AAA BBB type)
  const cfDeleted = await Problem.deleteMany({ source: 'codeforces' });
  console.log(`🗑️  Deleted ${cfDeleted.deletedCount} old CF problems`);

  console.log('✅ Database clean — ready for fresh problems!');
  await mongoose.disconnect();
});