const Problem = require('../models/Problem');

/**
 * Get random problems from the seeded MongoDB database.
 * No Codeforces API calls, no AI generation — just your seeded problems.
 *
 * @param {string} topic      - e.g. 'arrays', 'dp', 'graphs'
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 * @param {number} count      - how many problems to return
 */
async function getProblemsForBattle(topic, difficulty, count) {
  // 1. Exact match: topic + difficulty
  let problems = await Problem.aggregate([
    { $match: { topic: topic.toLowerCase(), difficulty: difficulty.toLowerCase() } },
    { $sample: { size: count } }
  ]);

  // 2. Relax difficulty if not enough problems
  if (problems.length < count) {
    console.log(`⚠️  Only ${problems.length} ${difficulty} ${topic} problems. Trying any difficulty...`);
    problems = await Problem.aggregate([
      { $match: { topic: topic.toLowerCase() } },
      { $sample: { size: count } }
    ]);
  }

  // 3. Relax topic if still not enough
  if (problems.length < count) {
    console.log(`⚠️  Only ${problems.length} ${topic} problems. Trying any topic...`);
    problems = await Problem.aggregate([
      { $match: { difficulty: difficulty.toLowerCase() } },
      { $sample: { size: count } }
    ]);
  }

  // 4. Last resort — any problem at all
  if (!problems.length) {
    console.log(`⚠️  No problems matched filters. Grabbing any available...`);
    problems = await Problem.aggregate([{ $sample: { size: count } }]);
  }

  if (!problems.length) {
    throw new Error(`No problems in the database! Please run the seed scripts first (node seedArrays.js, node seedDP.js, etc.)`);
  }

  return problems;
}

/**
 * Get all available topics that have problems in the DB
 */
async function getAvailableTopics() {
  const topics = await Problem.distinct('topic');
  return topics.sort();
}

/**
 * Get problem count per topic/difficulty
 */
async function getProblemStats() {
  const stats = await Problem.aggregate([
    { $group: { _id: { topic: '$topic', difficulty: '$difficulty' }, count: { $sum: 1 } } },
    { $sort: { '_id.topic': 1, '_id.difficulty': 1 } }
  ]);
  return stats;
}

module.exports = { getProblemsForBattle, getAvailableTopics, getProblemStats };