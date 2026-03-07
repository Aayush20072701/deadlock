require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

// Problems that have non-deterministic outputs — delete these
const BAD_TITLES = [
  'Palindrome Flipping',
  'Fancy Number',
  'Holiday Wall Ornaments',
  'Polycarp and String Transformation',
  'Dima and Text Messages',
  'Rap God',
  'And Yet Another Bracket Sequence',
  'The Next Good String',
];

const TAG_TO_TOPIC = {
  'arrays': 'arrays', 'array': 'arrays',
  'strings': 'strings', 'string processing': 'strings',
  'stack': 'stack',
  'dp': 'dp', 'dynamic programming': 'dp',
  'trees': 'trees', 'tree': 'trees',
  'graphs': 'graphs', 'graph': 'graphs',
  'dfs and similar': 'graphs', 'bfs': 'graphs',
};

function getDifficulty(rating) {
  if (rating <= 1200) return 'easy';
  if (rating <= 1800) return 'medium';
  return 'hard';
}

const clean = (s) => s
  .replace(/<div[^>]*>/gi, '')
  .replace(/<\/div>/gi, '\n')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  .replace(/\n{3,}/g, '\n')
  .trim();

async function fetchExamples(contestId, index) {
  const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
  const res = await axios.get(url, {
    timeout: 10000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = res.data;
  const inputRegex  = /<div class="input">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  const outputRegex = /<div class="output">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  const inputs = [], outputs = [];
  let m;
  while ((m = inputRegex.exec(html))  !== null) inputs.push(clean(m[1]));
  while ((m = outputRegex.exec(html)) !== null) outputs.push(clean(m[1]));
  const examples = [];
  for (let i = 0; i < Math.min(inputs.length, outputs.length); i++) {
    examples.push({ input: inputs[i], output: outputs[i] });
  }
  return examples;
}

function isOutputDeterministic(examples, tags) {
  // Skip constructive/interactive/special judge problems
  const badTags = ['constructive algorithms', 'interactive', 'special judge'];
  if (badTags.some(t => tags.map(x => x.toLowerCase()).includes(t))) return false;
  // Skip if any output has pairs of numbers (operation sequences)
  return !examples.some(ex => {
    const lines = ex.output.trim().split('\n');
    if (lines.length > 2) return true;
    if (lines.some(l => /^\d+ \d+$/.test(l.trim()))) return true;
    return false;
  });
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected\n');

  // Delete bad problems
  for (const title of BAD_TITLES) {
    const r = await Problem.deleteOne({ title });
    if (r.deletedCount) console.log(`🗑️  Deleted: ${title}`);
  }

  console.log('\n📥 Fetching good replacement problems...\n');

  const res = await axios.get('https://codeforces.com/api/problemset.problems', { timeout: 15000 });
  const all = res.data.result.problems;

  // Target: strings problems, medium difficulty (1300-1800), no constructive
  const candidates = all.filter(p =>
    p.rating >= 1300 && p.rating <= 1800 &&
    p.tags.some(t => ['strings', 'string processing'].includes(t.toLowerCase())) &&
    !p.tags.some(t => ['constructive algorithms', 'interactive', 'special judge'].includes(t.toLowerCase()))
  ).sort(() => Math.random() - 0.5);

  let added = 0;
  for (let i = 0; i < candidates.length && added < 6; i++) {
    const cf = candidates[i];
    const slug = `cf-${cf.contestId}-${cf.index}`.toLowerCase();
    if (await Problem.findOne({ slug })) continue;

    try {
      console.log(`🔄 Trying: ${cf.name}...`);
      const examples = await fetchExamples(cf.contestId, cf.index);
      if (!examples.length) { console.log('   ⏭️  No examples'); continue; }
      if (!isOutputDeterministic(examples, cf.tags)) { console.log('   ⏭️  Non-deterministic output'); continue; }

      const testCases = examples.map((ex, idx) => ({
        input: ex.input, expectedOutput: ex.output, isHidden: idx >= 2,
      }));

      await Problem.create({
        title: cf.name, slug,
        description: `Click "Open Problem on Codeforces" to read the full problem statement.\n\nTags: ${cf.tags.join(', ')}\nDifficulty Rating: ${cf.rating}`,
        difficulty: getDifficulty(cf.rating),
        topic: 'strings', tags: cf.tags, source: 'codeforces',
        cfContestId: cf.contestId, cfIndex: cf.index,
        examples: examples.slice(0, 2).map(ex => ({ input: ex.input, output: ex.output })),
        testCases,
        starterCode: {
          cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // your code here\n    return 0;\n}`,
          python: `import sys\ninput=sys.stdin.readline\n# your code here`,
          java: `import java.util.*;\nimport java.io.*;\npublic class Main{\n    public static void main(String[] args) throws IOException{\n        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));\n        // your code here\n    }\n}`,
        },
      });

      console.log(`   ✅ Added: ${cf.name} (${examples.length} test cases)`);
      added++;
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
  }

  console.log(`\n🎉 Done! Added ${added} clean problems.`);
  await mongoose.disconnect();
}

main().catch(console.error);