const axios = require('axios');

const JUDGE0_URL = 'https://ce.judge0.com/submissions?base64_encoded=true&wait=true';

const LANG_MAP = { cpp: 54, python: 71, java: 62 };

const b64encode = (str) => Buffer.from(str).toString('base64');
const b64decode = (str) => str ? Buffer.from(str, 'base64').toString('utf8') : '';

async function runCode(code, language, stdin) {
  stdin = stdin || '';
  const languageId = LANG_MAP[language];
  if (!languageId) throw new Error('Unsupported language: ' + language);

  const res = await axios.post(JUDGE0_URL, {
    source_code: b64encode(code),
    language_id: languageId,
    stdin: b64encode(stdin),
  }, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
  });

  const { stdout, stderr, compile_output, status } = res.data;
  return {
    stdout:     b64decode(stdout),
    stderr:     b64decode(stderr) || b64decode(compile_output) || '',
    exitCode:   status?.id === 3 ? 0 : 1,
    statusDesc: status?.description || '',
  };
}

async function runAllTestCases(code, language, testCases, problem) {
  const results = [];

  // If problem has a codeWrapper (all seeded problems do), inject user code into it
  let fullCode = code;
  if (problem?.codeWrapper?.[language]) {
    const wrapper = problem.codeWrapper[language];
    if (wrapper.includes('SOLUTION_CODE')) {
      fullCode = wrapper.replace('SOLUTION_CODE', code);
    } else if (wrapper.includes('${SOLUTION_CODE}')) {
      fullCode = wrapper.replace('${SOLUTION_CODE}', code);
    } else {
      // fallback: append wrapper after code
      fullCode = code + '\n' + wrapper;
    }
  }
  // If no codeWrapper — run code as-is (full program, handles its own I/O)

  for (const tc of testCases) {
    try {
      const result = await runCode(fullCode, language, tc.input);

      const normalize = (s) => s.trim().split('\n').map(l => l.trim()).join('\n');
      const actual    = normalize(result.stdout);
      const expected  = normalize(tc.expectedOutput);
      const passed    = actual === expected && result.exitCode === 0;

      results.push({
        passed,
        actualOutput:   actual,
        expectedOutput: expected,
        stderr:         result.stderr,
        status:         passed ? 'Accepted' : result.stderr ? 'Runtime Error' : 'Wrong Answer',
      });
    } catch (err) {
      results.push({
        passed:         false,
        actualOutput:   '',
        expectedOutput: tc.expectedOutput,
        stderr:         err.message,
        status:         'Error',
      });
    }
  }

  const passed    = results.filter(r => r.passed).length;
  const total     = results.length;
  const allPassed = passed === total;
  return { results, passed, total, allPassed };
}

module.exports = { runCode, runAllTestCases };