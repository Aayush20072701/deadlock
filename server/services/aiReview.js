const axios = require('axios');

async function generateMatchReview({ problem, player1, player2, submissions }) {
  const getSub = (uid) => submissions.find((s) => String(s.userId) === String(uid));
  const p1Sub  = getSub(player1._id);
  const p2Sub  = getSub(player2._id);

  const prompt = `You are an expert competitive programmer reviewing a head-to-head coding battle.

## Problem: ${problem.title} (${problem.difficulty})
${problem.description}

## ${player1.username} — ${p1Sub?.verdict || 'No submission'} | ${p1Sub?.testsPassed || 0}/${p1Sub?.totalTests || 0} tests | ${p1Sub?.score || 0} pts
Language: ${p1Sub?.language || 'N/A'}
\`\`\`${p1Sub?.language || ''}
${p1Sub?.code || 'No submission'}
\`\`\`

## ${player2.username} — ${p2Sub?.verdict || 'No submission'} | ${p2Sub?.testsPassed || 0}/${p2Sub?.totalTests || 0} tests | ${p2Sub?.score || 0} pts
Language: ${p2Sub?.language || 'N/A'}
\`\`\`${p2Sub?.language || ''}
${p2Sub?.code || 'No submission'}
\`\`\`

Respond ONLY with a valid JSON object, no markdown, no extra text:
{
  "summary": "2-sentence battle summary",
  "player1Review": {
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "approach": "brief description of their approach",
    "strengths": ["strength 1", "strength 2"],
    "improvements": ["improvement 1", "improvement 2"]
  },
  "player2Review": {
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "approach": "brief description of their approach",
    "strengths": ["strength 1", "strength 2"],
    "improvements": ["improvement 1", "improvement 2"]
  },
  "optimalApproach": "brief description of the best solution",
  "keyTakeaway": "one key learning from this battle"
}`;

  try {
    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
      model: 'openrouter/auto',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001',
          'X-Title': 'Deadlock',
        },
        timeout: 30000,
      }
    );

    const text = res.data.choices[0].message.content.replace(/```json|```/g, '').trim();
    console.log('✅ AI review generated');
    return JSON.parse(text);
  } catch (err) {
    console.error('AI review error:', err.response?.data || err.message);
    return null;
  }
}

module.exports = { generateMatchReview };