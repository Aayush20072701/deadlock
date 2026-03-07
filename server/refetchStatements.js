require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const cleanHtml = (s) => s
  .replace(/<div[^>]*>/gi, '')
  .replace(/<\/div>/gi, '\n')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<p[^>]*>/gi, '\n')
  .replace(/<\/p>/gi, '\n')
  .replace(/<li[^>]*>/gi, '\n• ')
  .replace(/<\/li>/gi, '')
  .replace(/<ul[^>]*>|<\/ul>/gi, '')
  .replace(/<ol[^>]*>|<\/ol>/gi, '')
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

async function fetchStatement(contestId, index) {
  const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
  const res = await axios.get(url, { timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = res.data;

  let description = '';

  const stmtMatch = html.match(/<div class="problem-statement">([\s\S]*?)(?:<div class="input-specification"|<div class="note">|$)/);
  if (stmtMatch) {
    const bodyHtml = stmtMatch[1].replace(/<div class="header">[\s\S]*?<\/div>\s*<\/div>/, '');
    description += cleanHtml(bodyHtml) + '\n\n';
  }

  const inputSpecMatch = html.match(/<div class="input-specification">([\s\S]*?)<\/div>\s*<div class="output-specification">/);
  if (inputSpecMatch) description += 'Input\n' + cleanHtml(inputSpecMatch[1].replace(/<div class="section-title">[^<]*<\/div>/, '')) + '\n\n';

  const outputSpecMatch = html.match(/<div class="output-specification">([\s\S]*?)<\/div>\s*(?:<div class="sample-tests">|<div class="note">)/);
  if (outputSpecMatch) description += 'Output\n' + cleanHtml(outputSpecMatch[1].replace(/<div class="section-title">[^<]*<\/div>/, '')) + '\n\n';

  const noteMatch = html.match(/<div class="note">([\s\S]*?)<\/div>\s*<\/div>/);
  if (noteMatch) description += 'Note\n' + cleanHtml(noteMatch[1].replace(/<div class="section-title">[^<]*<\/div>/, ''));

  // Also re-fetch examples with proper newlines
  const inputRegex  = /<div class="input">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  const outputRegex = /<div class="output">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  const inputs = [], outputs = [];
  let m;
  while ((m = inputRegex.exec(html))  !== null) inputs.push(cleanHtml(m[1]));
  while ((m = outputRegex.exec(html)) !== null) outputs.push(cleanHtml(m[1]));
  const examples = [];
  for (let i = 0; i < Math.min(inputs.length, outputs.length); i++) {
    examples.push({ input: inputs[i], output: outputs[i] });
  }

  return { description: description.trim(), examples };
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected\n');

  const problems = await Problem.find({ source: 'codeforces' });
  console.log(`📋 Re-fetching statements for ${problems.length} problems...\n`);

  for (const p of problems) {
    try {
      console.log(`🔄 ${p.title}...`);
      const { description, examples } = await fetchStatement(p.cfContestId, p.cfIndex);

      const testCases = examples.map((ex, idx) => ({
        input: ex.input, expectedOutput: ex.output, isHidden: idx >= 2,
      }));

      await Problem.findByIdAndUpdate(p._id, {
        description,
        examples: examples.slice(0, 2).map(ex => ({ input: ex.input, output: ex.output })),
        testCases,
      });

      const preview = description.substring(0, 80).replace(/\n/g, ' ');
      console.log(`   ✅ Done — "${preview}..."`);
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    }
  }

  console.log('\n🎉 All done!');
  await mongoose.disconnect();
}

main().catch(console.error);