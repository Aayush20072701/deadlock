// Run: node seedStrings.js
// Seeds 30 String problems into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const problems = [

// ─── EASY (10) ───

{
  title: "Valid Palindrome", slug: "valid-palindrome", difficulty: "easy", topic: "strings",
  tags: ["Two Pointers","String"],
  description: "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
  examples: [
    { input: "A man, a plan, a canal: Panama", output: "true", explanation: "After filtering: 'amanaplanacanalpanama'" },
    { input: "race a car", output: "false" },
    { input: " ", output: "true" },
  ],
  testCases: [
    { input: "A man, a plan, a canal: Panama", expectedOutput: "true",  isHidden: false },
    { input: "race a car",                     expectedOutput: "false", isHidden: false },
    { input: " ",                              expectedOutput: "true",  isHidden: true  },
    { input: "Was it a car or a cat I saw?",   expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Valid Anagram", slug: "valid-anagram", difficulty: "easy", topic: "strings",
  tags: ["Hash Table","String","Sorting"],
  description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nInput: two lines — first `s`, then `t`.",
  examples: [
    { input: "anagram\nnagaram", output: "true" },
    { input: "rat\ncar",         output: "false" },
  ],
  testCases: [
    { input: "anagram\nnagaram", expectedOutput: "true",  isHidden: false },
    { input: "rat\ncar",         expectedOutput: "false", isHidden: false },
    { input: "a\na",             expectedOutput: "true",  isHidden: true  },
    { input: "ab\nba",           expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nt = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, t; cin >> s >> t;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(), t = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Reverse String", slug: "reverse-string", difficulty: "easy", topic: "strings",
  tags: ["Two Pointers","String"],
  description: "Write a function that reverses a string. The input is a single line of text. Print the reversed string.",
  examples: [
    { input: "hello",  output: "olleh" },
    { input: "Hannah", output: "hannaH" },
  ],
  testCases: [
    { input: "hello",   expectedOutput: "olleh",   isHidden: false },
    { input: "Hannah",  expectedOutput: "hannaH",  isHidden: false },
    { input: "A",       expectedOutput: "A",        isHidden: true  },
    { input: "abcdefg", expectedOutput: "gfedcba",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "First Unique Character in a String", slug: "first-unique-character-in-a-string", difficulty: "easy", topic: "strings",
  tags: ["Hash Table","String","Queue"],
  description: "Given a string `s`, find the first non-repeating character and return its index. If it does not exist, return `-1`.",
  examples: [
    { input: "leetcode",     output: "0" },
    { input: "loveleetcode", output: "2" },
    { input: "aabb",         output: "-1" },
  ],
  testCases: [
    { input: "leetcode",     expectedOutput: "0",  isHidden: false },
    { input: "loveleetcode", expectedOutput: "2",  isHidden: false },
    { input: "aabb",         expectedOutput: "-1", isHidden: true  },
    { input: "aadadaad",     expectedOutput: "-1", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Is Subsequence", slug: "is-subsequence", difficulty: "easy", topic: "strings",
  tags: ["Two Pointers","String","Dynamic Programming"],
  description: "Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise. A subsequence deletes some characters without changing relative order.\n\nInput: two lines — first `s`, then `t`.",
  examples: [
    { input: "abc\nahbgdc", output: "true" },
    { input: "axc\nahbgdc", output: "false" },
  ],
  testCases: [
    { input: "abc\nahbgdc", expectedOutput: "true",  isHidden: false },
    { input: "axc\nahbgdc", expectedOutput: "false", isHidden: false },
    { input: "\nb",         expectedOutput: "true",  isHidden: true  },
    { input: "ace\nabcde",  expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nt = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, t; getline(cin, s); getline(cin, t);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine(), t = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Roman to Integer", slug: "roman-to-integer", difficulty: "easy", topic: "strings",
  tags: ["Hash Table","Math","String"],
  description: "Given a roman numeral string `s`, convert it to an integer.\n\nValues: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. If a smaller value precedes a larger value, subtract it (e.g. IV=4, IX=9).",
  examples: [
    { input: "III",     output: "3" },
    { input: "LVIII",   output: "58" },
    { input: "MCMXCIV", output: "1994" },
  ],
  testCases: [
    { input: "III",     expectedOutput: "3",    isHidden: false },
    { input: "LVIII",   expectedOutput: "58",   isHidden: false },
    { input: "MCMXCIV", expectedOutput: "1994", isHidden: true  },
    { input: "IX",      expectedOutput: "9",    isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Longest Common Prefix", slug: "longest-common-prefix", difficulty: "easy", topic: "strings",
  tags: ["String","Trie"],
  description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.\n\nInput: space-separated words on one line. Output the prefix (empty line if none).",
  examples: [
    { input: "flower flow flight", output: "fl" },
    { input: "dog racecar car",    output: "" },
  ],
  testCases: [
    { input: "flower flow flight",    expectedOutput: "fl",    isHidden: false },
    { input: "dog racecar car",       expectedOutput: "",      isHidden: false },
    { input: "interview inter interval", expectedOutput: "inter", isHidden: true },
    { input: "abc abc abc",           expectedOutput: "abc",   isHidden: true  },
  ],
  starterCode: {
    python: "strs = input().split()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<string> strs;\n    string line; getline(cin, line);\n    istringstream ss(line);\n    string w; while(ss >> w) strs.push_back(w);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String[] strs = sc.nextLine().split(\" \");\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Count and Say", slug: "count-and-say", difficulty: "easy", topic: "strings",
  tags: ["String"],
  description: "The count-and-say sequence: each term is built by reading off the digits of the previous term.\n\n1→\"1\", 2→\"11\", 3→\"21\", 4→\"1211\", 5→\"111221\"\n\nGiven integer `n`, return the `n`th term.",
  examples: [
    { input: "1", output: "1" },
    { input: "4", output: "1211" },
    { input: "5", output: "111221" },
  ],
  testCases: [
    { input: "1", expectedOutput: "1",      isHidden: false },
    { input: "4", expectedOutput: "1211",   isHidden: false },
    { input: "5", expectedOutput: "111221", isHidden: true  },
    { input: "6", expectedOutput: "312211", isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Reverse Words in a String", slug: "reverse-words-in-a-string", difficulty: "easy", topic: "strings",
  tags: ["Two Pointers","String"],
  description: "Given input string `s`, reverse the order of the words. Words are separated by spaces. Return the words in reverse order joined by a single space (no leading/trailing spaces).",
  examples: [
    { input: "the sky is blue",  output: "blue is sky the" },
    { input: "  hello world  ", output: "world hello" },
    { input: "a good   example", output: "example good a" },
  ],
  testCases: [
    { input: "the sky is blue",  expectedOutput: "blue is sky the", isHidden: false },
    { input: "  hello world  ", expectedOutput: "world hello",      isHidden: false },
    { input: "a good   example", expectedOutput: "example good a",  isHidden: true  },
    { input: "coding is fun",   expectedOutput: "fun is coding",    isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Ransom Note", slug: "ransom-note", difficulty: "easy", topic: "strings",
  tags: ["Hash Table","String","Counting"],
  description: "Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed using letters from `magazine`. Each letter in `magazine` can only be used once.\n\nInput: two lines — ransomNote, then magazine.",
  examples: [
    { input: "a\nb",    output: "false" },
    { input: "aa\naab", output: "true" },
  ],
  testCases: [
    { input: "a\nb",    expectedOutput: "false", isHidden: false },
    { input: "aa\naab", expectedOutput: "true",  isHidden: false },
    { input: "aab\naabb", expectedOutput: "true", isHidden: true },
    { input: "bg\nefjbdfbdgfjhhaiigfhbaejahgfbbgbjagbddfgdiaigdadhcfcj", expectedOutput: "true", isHidden: true },
  ],
  starterCode: {
    python: "ransomNote = input()\nmagazine = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string r, m; cin >> r >> m;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String r = sc.next(), m = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── MEDIUM (10) ───

{
  title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", difficulty: "medium", topic: "strings",
  tags: ["Hash Table","String","Sliding Window"],
  description: "Given a string `s`, find the length of the longest substring without repeating characters.",
  examples: [
    { input: "abcabcbb", output: "3", explanation: "'abc' has length 3" },
    { input: "bbbbb",    output: "1" },
    { input: "pwwkew",   output: "3" },
  ],
  testCases: [
    { input: "abcabcbb", expectedOutput: "3", isHidden: false },
    { input: "bbbbb",    expectedOutput: "1", isHidden: false },
    { input: "pwwkew",   expectedOutput: "3", isHidden: true  },
    { input: "",         expectedOutput: "0", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Longest Palindromic Substring", slug: "longest-palindromic-substring", difficulty: "medium", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "Given a string `s`, return the longest palindromic substring. If multiple answers of same length, return the first (leftmost) one.",
  examples: [
    { input: "babad",   output: "bab" },
    { input: "cbbd",    output: "bb" },
    { input: "racecar", output: "racecar" },
  ],
  testCases: [
    { input: "babad",   expectedOutput: "bab",     isHidden: false },
    { input: "cbbd",    expectedOutput: "bb",      isHidden: false },
    { input: "a",       expectedOutput: "a",        isHidden: true  },
    { input: "racecar", expectedOutput: "racecar",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "String to Integer (atoi)", slug: "string-to-integer-atoi", difficulty: "medium", topic: "strings",
  tags: ["String"],
  description: "Implement `myAtoi(string s)` which converts a string to a 32-bit signed integer:\n1. Skip leading whitespace.\n2. Check optional sign (`+` or `-`).\n3. Read digits until non-digit or end.\n4. Clamp to `[-2^31, 2^31 - 1]`.",
  examples: [
    { input: "42",              output: "42" },
    { input: "   -42",          output: "-42" },
    { input: "4193 with words", output: "4193" },
  ],
  testCases: [
    { input: "42",               expectedOutput: "42",          isHidden: false },
    { input: "   -42",           expectedOutput: "-42",         isHidden: false },
    { input: "4193 with words",  expectedOutput: "4193",        isHidden: true  },
    { input: "-91283472332",     expectedOutput: "-2147483648", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Decode Ways", slug: "decode-ways", difficulty: "medium", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "A message `A-Z` maps to digits `1-26`. Given a string `s` of digits, return the number of ways to decode it.",
  examples: [
    { input: "12",  output: "2", explanation: "'AB'(1,2) or 'L'(12)" },
    { input: "226", output: "3" },
    { input: "06",  output: "0" },
  ],
  testCases: [
    { input: "12",  expectedOutput: "2", isHidden: false },
    { input: "226", expectedOutput: "3", isHidden: false },
    { input: "0",   expectedOutput: "0", isHidden: true  },
    { input: "06",  expectedOutput: "0", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement", difficulty: "medium", topic: "strings",
  tags: ["Hash Table","String","Sliding Window"],
  description: "Given string `s` and integer `k`, you can replace any character up to `k` times. Return the length of the longest substring containing the same letter after at most `k` replacements.\n\nInput: line 1 is `s`, line 2 is `k`.",
  examples: [
    { input: "ABAB\n2",    output: "4" },
    { input: "AABABBA\n1", output: "4" },
  ],
  testCases: [
    { input: "ABAB\n2",    expectedOutput: "4", isHidden: false },
    { input: "AABABBA\n1", expectedOutput: "4", isHidden: false },
    { input: "ABCD\n2",    expectedOutput: "4", isHidden: true  },
    { input: "AAAA\n0",    expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nk = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; int k; cin >> s >> k;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(); int k = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Find All Anagrams in a String", slug: "find-all-anagrams-in-a-string", difficulty: "medium", topic: "strings",
  tags: ["Hash Table","String","Sliding Window"],
  description: "Given strings `s` and `p`, return all start indices of `p`'s anagrams in `s`. Print indices space-separated (empty line if none).\n\nInput: two lines — `s`, then `p`.",
  examples: [
    { input: "cbaebabacd\nabc", output: "0 6" },
    { input: "abab\nab",        output: "0 1 2" },
  ],
  testCases: [
    { input: "cbaebabacd\nabc", expectedOutput: "0 6",   isHidden: false },
    { input: "abab\nab",        expectedOutput: "0 1 2", isHidden: false },
    { input: "aa\nb",           expectedOutput: "",      isHidden: true  },
    { input: "baa\naa",         expectedOutput: "1",     isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\np = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, p; cin >> s >> p;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(), p = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Palindromic Substrings", slug: "palindromic-substrings", difficulty: "medium", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "Given string `s`, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters.",
  examples: [
    { input: "abc", output: "3" },
    { input: "aaa", output: "6" },
  ],
  testCases: [
    { input: "abc", expectedOutput: "3", isHidden: false },
    { input: "aaa", expectedOutput: "6", isHidden: false },
    { input: "a",   expectedOutput: "1", isHidden: true  },
    { input: "aba", expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Group Anagrams", slug: "group-anagrams", difficulty: "medium", topic: "strings",
  tags: ["Hash Table","String","Sorting"],
  description: "Given an array of strings `strs`, group the anagrams together.\n\nInput: space-separated strings on one line. Output each group on a new line, words within a group sorted alphabetically, groups sorted by their first word.",
  examples: [
    { input: "eat tea tan ate nat bat", output: "ate eat tea\nbat\nant nat tan" },
    { input: "a",                       output: "a" },
  ],
  testCases: [
    { input: "eat tea tan ate nat bat", expectedOutput: "ate eat tea\nbat\nant nat tan", isHidden: false },
    { input: "a",                       expectedOutput: "a",                             isHidden: false },
    { input: "abc cba bca",             expectedOutput: "abc bca cba",                   isHidden: true  },
    { input: "ab ba c",                 expectedOutput: "ab ba\nc",                      isHidden: true  },
  ],
  starterCode: {
    python: "strs = input().split()\n# Write your solution here\n# Print each group sorted, groups sorted by first element\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<string> strs;\n    string line; getline(cin, line);\n    istringstream ss(line);\n    string w; while(ss >> w) strs.push_back(w);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String[] strs = sc.nextLine().split(\" \");\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Zigzag Conversion", slug: "zigzag-conversion", difficulty: "medium", topic: "strings",
  tags: ["String"],
  description: "The string `\"PAYPALISHIRING\"` written in a zigzag pattern on a given number of rows, read line by line, produces `\"PAHNAPLSIIGYIR\"`.\n\nGiven string `s` and integer `numRows`, return the string written in zigzag pattern.\n\nInput: line 1 is `s`, line 2 is `numRows`.",
  examples: [
    { input: "PAYPALISHIRING\n3", output: "PAHNAPLSIIGYIR" },
    { input: "PAYPALISHIRING\n4", output: "PINALSIGYAHRPI" },
    { input: "A\n1",             output: "A" },
  ],
  testCases: [
    { input: "PAYPALISHIRING\n3", expectedOutput: "PAHNAPLSIIGYIR", isHidden: false },
    { input: "PAYPALISHIRING\n4", expectedOutput: "PINALSIGYAHRPI", isHidden: false },
    { input: "A\n1",              expectedOutput: "A",              isHidden: true  },
    { input: "AB\n1",             expectedOutput: "AB",             isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nnumRows = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; int numRows; cin >> s >> numRows;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(); int numRows = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Repeated Substring Pattern", slug: "repeated-substring-pattern", difficulty: "medium", topic: "strings",
  tags: ["String","String Matching"],
  description: "Given string `s`, check if it can be constructed by taking a substring and appending multiple copies of it. Return `true` or `false`.",
  examples: [
    { input: "abab",         output: "true" },
    { input: "aba",          output: "false" },
    { input: "abcabcabcabc", output: "true" },
  ],
  testCases: [
    { input: "abab",         expectedOutput: "true",  isHidden: false },
    { input: "aba",          expectedOutput: "false", isHidden: false },
    { input: "abcabcabcabc", expectedOutput: "true",  isHidden: true  },
    { input: "abaababaab",   expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── HARD (10) ───

{
  title: "Minimum Window Substring", slug: "minimum-window-substring", difficulty: "hard", topic: "strings",
  tags: ["Hash Table","String","Sliding Window"],
  description: "Given strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included. If no such substring, return `\"\"`.\n\nInput: line 1 is `s`, line 2 is `t`.",
  examples: [
    { input: "ADOBECODEBANC\nABC", output: "BANC" },
    { input: "a\na",               output: "a" },
    { input: "a\nb",               output: "" },
  ],
  testCases: [
    { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC", isHidden: false },
    { input: "a\na",               expectedOutput: "a",    isHidden: false },
    { input: "a\nb",               expectedOutput: "",     isHidden: true  },
    { input: "AAAAAB\nAB",         expectedOutput: "AB",   isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nt = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, t; getline(cin, s); getline(cin, t);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine(), t = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Regular Expression Matching", slug: "regular-expression-matching", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming","Recursion"],
  description: "Implement regex matching with `'.'` and `'*'`:\n- `'.'` matches any single character.\n- `'*'` matches zero or more of the preceding element.\n\nMatching must cover the entire string.\n\nInput: line 1 is `s`, line 2 is `p`.",
  examples: [
    { input: "aa\na",   output: "false" },
    { input: "aa\na*",  output: "true" },
    { input: "ab\n.*",  output: "true" },
  ],
  testCases: [
    { input: "aa\na",    expectedOutput: "false", isHidden: false },
    { input: "aa\na*",   expectedOutput: "true",  isHidden: false },
    { input: "ab\n.*",   expectedOutput: "true",  isHidden: true  },
    { input: "aab\nc*a*b", expectedOutput: "true", isHidden: true },
  ],
  starterCode: {
    python: "s = input()\np = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, p; cin >> s >> p;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(), p = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Wildcard Matching", slug: "wildcard-matching", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming","Greedy","Recursion"],
  description: "Implement wildcard matching with `'?'` and `'*'`:\n- `'?'` matches any single character.\n- `'*'` matches any sequence of characters (including empty).\n\nInput: line 1 is `s`, line 2 is `p`.",
  examples: [
    { input: "aa\na",    output: "false" },
    { input: "aa\n*",    output: "true" },
    { input: "adceb\n*a*b", output: "true" },
  ],
  testCases: [
    { input: "aa\na",       expectedOutput: "false", isHidden: false },
    { input: "aa\n*",       expectedOutput: "true",  isHidden: false },
    { input: "cb\n?a",      expectedOutput: "false", isHidden: true  },
    { input: "adceb\n*a*b", expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\np = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, p; cin >> s >> p;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(), p = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Edit Distance", slug: "edit-distance", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert `word1` to `word2`.\n\nInput: two lines — word1, word2.",
  examples: [
    { input: "horse\nros",        output: "3" },
    { input: "intention\nexecution", output: "5" },
  ],
  testCases: [
    { input: "horse\nros",           expectedOutput: "3", isHidden: false },
    { input: "intention\nexecution", expectedOutput: "5", isHidden: false },
    { input: "a\nb",                 expectedOutput: "1", isHidden: true  },
    { input: "kitten\nsitting",      expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "word1 = input()\nword2 = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string w1, w2; getline(cin, w1); getline(cin, w2);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String w1 = sc.nextLine(), w2 = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Longest Valid Parentheses", slug: "longest-valid-parentheses", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming","Stack"],
  description: "Given a string containing just `'('` and `')'`, return the length of the longest valid (well-formed) parentheses substring.",
  examples: [
    { input: "(()",    output: "2" },
    { input: ")()())", output: "4" },
    { input: "",       output: "0" },
  ],
  testCases: [
    { input: "(()",    expectedOutput: "2", isHidden: false },
    { input: ")()())", expectedOutput: "4", isHidden: false },
    { input: "",       expectedOutput: "0", isHidden: true  },
    { input: "()(())", expectedOutput: "6", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Palindrome Partitioning II", slug: "palindrome-partitioning-ii", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "Given string `s`, partition it so every substring is a palindrome. Return the minimum number of cuts needed.",
  examples: [
    { input: "aab", output: "1" },
    { input: "a",   output: "0" },
    { input: "ab",  output: "1" },
  ],
  testCases: [
    { input: "aab",    expectedOutput: "1", isHidden: false },
    { input: "a",      expectedOutput: "0", isHidden: false },
    { input: "aaabaa", expectedOutput: "1", isHidden: true  },
    { input: "abcba",  expectedOutput: "0", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Distinct Subsequences", slug: "distinct-subsequences", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "Given strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.\n\nInput: two lines — s, then t.",
  examples: [
    { input: "rabbbit\nrabbit", output: "3" },
    { input: "babgbag\nbag",    output: "5" },
  ],
  testCases: [
    { input: "rabbbit\nrabbit", expectedOutput: "3", isHidden: false },
    { input: "babgbag\nbag",    expectedOutput: "5", isHidden: false },
    { input: "a\nb",            expectedOutput: "0", isHidden: true  },
    { input: "aaa\naa",         expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nt = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, t; cin >> s >> t;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(), t = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Interleaving String", slug: "interleaving-string", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`. Return `true` or `false`.\n\nInput: three lines — s1, s2, s3.",
  examples: [
    { input: "aabcc\ndbbca\naadbbcbcac",  output: "true" },
    { input: "aabcc\ndbbca\naadbbbaccc", output: "false" },
    { input: "\n\n",                     output: "true" },
  ],
  testCases: [
    { input: "aabcc\ndbbca\naadbbcbcac",  expectedOutput: "true",  isHidden: false },
    { input: "aabcc\ndbbca\naadbbbaccc", expectedOutput: "false", isHidden: false },
    { input: "\n\n",                     expectedOutput: "true",  isHidden: true  },
    { input: "a\nb\nab",                 expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s1 = input()\ns2 = input()\ns3 = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s1, s2, s3;\n    getline(cin, s1); getline(cin, s2); getline(cin, s3);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s1 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String s2 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String s3 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Scramble String", slug: "scramble-string", difficulty: "hard", topic: "strings",
  tags: ["String","Dynamic Programming"],
  description: "We can scramble string `s` by splitting at any non-empty prefix, optionally swapping the two parts, then recursively scrambling each part.\n\nGiven `s1` and `s2` of equal length, return `true` if `s2` is a scrambled string of `s1`.\n\nInput: two lines.",
  examples: [
    { input: "great\nrgeat", output: "true" },
    { input: "abcde\ncaebd", output: "false" },
    { input: "a\na",         output: "true" },
  ],
  testCases: [
    { input: "great\nrgeat", expectedOutput: "true",  isHidden: false },
    { input: "abcde\ncaebd", expectedOutput: "false", isHidden: false },
    { input: "a\na",         expectedOutput: "true",  isHidden: true  },
    { input: "abc\nbca",     expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s1 = input()\ns2 = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s1, s2; cin >> s1 >> s2;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s1 = sc.next(), s2 = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Remove Duplicate Letters", slug: "remove-duplicate-letters", difficulty: "hard", topic: "strings",
  tags: ["String","Stack","Greedy","Monotonic Stack"],
  description: "Given string `s`, remove duplicate letters so every letter appears once. The result must be the smallest in lexicographical order among all possible results.",
  examples: [
    { input: "bcabc",    output: "abc" },
    { input: "cbacdcbc", output: "acdb" },
  ],
  testCases: [
    { input: "bcabc",    expectedOutput: "abc",  isHidden: false },
    { input: "cbacdcbc", expectedOutput: "acdb", isHidden: false },
    { input: "abcd",     expectedOutput: "abcd", isHidden: true  },
    { input: "bbcaac",   expectedOutput: "bac",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Problem.deleteMany({ topic: 'strings' });
  console.log('Cleared existing string problems');

  const inserted = await Problem.insertMany(problems);
  console.log(`✅ Inserted ${inserted.length} string problems`);

  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });