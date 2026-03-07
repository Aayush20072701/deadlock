require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

async function fetchCFExamples(contestId, index) {
  const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
  const res = await axios.get(url, {
    timeout: 10000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = res.data;

  const examples = [];
  const inputRegex  = /<div class="input">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  const outputRegex = /<div class="output">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;

  const inputs = [], outputs = [];
  let m;

  const clean = (s) => s
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n')
    .trim();

  while ((m = inputRegex.exec(html))  !== null) inputs.push(clean(m[1]));
  while ((m = outputRegex.exec(html)) !== null) outputs.push(clean(m[1]));

  for (let i = 0; i < Math.min(inputs.length, outputs.length); i++) {
    examples.push({ input: inputs[i], output: outputs[i] });
  }
  return examples;
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected');

  const problems = await Problem.find({ source: 'codeforces' });
  console.log(`📋 Found ${problems.length} CF problems to re-fetch`);

  for (const p of problems) {
    try {
      console.log(`🔄 Re-fetching: ${p.title} (${p.cfContestId}${p.cfIndex})`);
      const examples = await fetchCFExamples(p.cfContestId, p.cfIndex);

      if (!examples.length) {
        console.log(`⚠️  No examples found for ${p.title}`);
        continue;
      }

      const testCases = examples.map((ex, idx) => ({
        input: ex.input,
        expectedOutput: ex.output,
        isHidden: idx >= 2,
      }));

      await Problem.findByIdAndUpdate(p._id, {
        testCases,
        examples: examples.slice(0, 2).map(ex => ({ input: ex.input, output: ex.output })),
      });

      console.log(`✅ Updated ${p.title} with ${examples.length} real test cases`);
      console.log(`   First input preview: ${examples[0].input.substring(0, 50).replace(/\n/g, '↵')}`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`❌ Failed for ${p.title}:`, err.message);
    }
  }

  console.log('\n🎉 Done!');
  await mongoose.disconnect();
}

main().catch(console.error);