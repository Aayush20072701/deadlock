require('dotenv').config();
const axios = require('axios');

async function main() {
  const res = await axios.get('https://codeforces.com/problemset/problem/2158/D', {
    timeout: 10000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  
  const html = res.data;
  const inputRegex = /<div class="input">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
  let m;
  while ((m = inputRegex.exec(html)) !== null) {
    console.log('RAW PRE CONTENT:');
    console.log(JSON.stringify(m[1].substring(0, 500)));
    console.log('---');
  }
}

main().catch(console.error);