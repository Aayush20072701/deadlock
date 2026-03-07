// Run: node seedDP.js
// Seeds 30 Dynamic Programming problems into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const problems = [

// ─── EASY (10) ───

{
  title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "easy", topic: "dp",
  tags: ["Math","Dynamic Programming","Memoization"],
  description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
  examples: [
    { input: "2", output: "2", explanation: "1+1 or 2" },
    { input: "3", output: "3", explanation: "1+1+1, 1+2, or 2+1" },
  ],
  testCases: [
    { input: "2",  expectedOutput: "2",          isHidden: false },
    { input: "3",  expectedOutput: "3",          isHidden: false },
    { input: "10", expectedOutput: "89",         isHidden: true  },
    { input: "45", expectedOutput: "1836311903", isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Fibonacci Number", slug: "fibonacci-number", difficulty: "easy", topic: "dp",
  tags: ["Math","Dynamic Programming","Recursion","Memoization"],
  description: "The Fibonacci numbers form the sequence: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Given `n`, calculate `F(n)`.",
  examples: [
    { input: "2", output: "1" },
    { input: "4", output: "3" },
    { input: "10", output: "55" },
  ],
  testCases: [
    { input: "2",  expectedOutput: "1",      isHidden: false },
    { input: "4",  expectedOutput: "3",      isHidden: false },
    { input: "10", expectedOutput: "55",     isHidden: true  },
    { input: "30", expectedOutput: "832040", isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Min Cost Climbing Stairs", slug: "min-cost-climbing-stairs", difficulty: "easy", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "You are given integer array `cost` where `cost[i]` is the cost of the `i`th step. Once you pay, you can climb 1 or 2 steps. You can start from index 0 or 1. Return the minimum cost to reach the top (beyond the last index).",
  examples: [
    { input: "10 15 20",                    output: "15" },
    { input: "1 100 1 1 1 100 1 1 100 1",   output: "6" },
  ],
  testCases: [
    { input: "10 15 20",                  expectedOutput: "15", isHidden: false },
    { input: "1 100 1 1 1 100 1 1 100 1", expectedOutput: "6",  isHidden: false },
    { input: "0 0",                       expectedOutput: "0",  isHidden: true  },
    { input: "1 2 3 4 5",                 expectedOutput: "6",  isHidden: true  },
  ],
  starterCode: {
    python: "cost = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> c;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) c.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] c = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "House Robber", slug: "house-robber", difficulty: "easy", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "You are a robber. Adjacent houses have a security system — you cannot rob two adjacent houses. Given integer array `nums` representing money in each house, return the maximum amount you can rob tonight.",
  examples: [
    { input: "1 2 3 1",   output: "4" },
    { input: "2 7 9 3 1", output: "12" },
  ],
  testCases: [
    { input: "1 2 3 1",   expectedOutput: "4",  isHidden: false },
    { input: "2 7 9 3 1", expectedOutput: "12", isHidden: false },
    { input: "2 1 1 2",   expectedOutput: "4",  isHidden: true  },
    { input: "1",         expectedOutput: "1",  isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Counting Bits", slug: "counting-bits", difficulty: "easy", topic: "dp",
  tags: ["Dynamic Programming","Bit Manipulation"],
  description: "Given integer `n`, return array `ans` of length `n+1` where `ans[i]` is the number of `1`s in the binary representation of `i`. Print space-separated.",
  examples: [
    { input: "2", output: "0 1 1" },
    { input: "5", output: "0 1 1 2 1 2" },
  ],
  testCases: [
    { input: "2", expectedOutput: "0 1 1",         isHidden: false },
    { input: "5", expectedOutput: "0 1 1 2 1 2",   isHidden: false },
    { input: "0", expectedOutput: "0",              isHidden: true  },
    { input: "8", expectedOutput: "0 1 1 2 1 2 2 3 1", isHidden: true },
  ],
  starterCode: {
    python: "n = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Tribonacci Number", slug: "tribonacci-number", difficulty: "easy", topic: "dp",
  tags: ["Math","Dynamic Programming","Memoization"],
  description: "The Tribonacci sequence: T(0)=0, T(1)=1, T(2)=1, T(n+3)=T(n)+T(n+1)+T(n+2). Given `n`, return `T(n)`.",
  examples: [
    { input: "4",  output: "4" },
    { input: "25", output: "1389537" },
  ],
  testCases: [
    { input: "4",  expectedOutput: "4",       isHidden: false },
    { input: "25", expectedOutput: "1389537", isHidden: false },
    { input: "0",  expectedOutput: "0",       isHidden: true  },
    { input: "37", expectedOutput: "2082876103", isHidden: true },
  ],
  starterCode: {
    python: "n = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Pascal's Triangle", slug: "pascals-triangle", difficulty: "easy", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "Given integer `numRows`, return the first `numRows` of Pascal's triangle. Print each row space-separated on its own line.",
  examples: [
    { input: "5", output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1" },
    { input: "1", output: "1" },
  ],
  testCases: [
    { input: "5", expectedOutput: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",                isHidden: false },
    { input: "1", expectedOutput: "1",                                                  isHidden: false },
    { input: "2", expectedOutput: "1\n1 1",                                             isHidden: true  },
    { input: "6", expectedOutput: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1", isHidden: true  },
  ],
  starterCode: {
    python: "numRows = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Maximum Subarray (Kadane's)", slug: "maximum-subarray-kadane", difficulty: "easy", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "Given integer array `nums`, find the subarray with the largest sum using Kadane's algorithm (DP), and return its sum.",
  examples: [
    { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "[4,-1,2,1] = 6" },
    { input: "5 4 -1 7 8",             output: "23" },
  ],
  testCases: [
    { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6",  isHidden: false },
    { input: "5 4 -1 7 8",             expectedOutput: "23", isHidden: false },
    { input: "-1",                     expectedOutput: "-1", isHidden: true  },
    { input: "-2 -1",                  expectedOutput: "-1", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here (Kadane's algorithm)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Divisor Game", slug: "divisor-game", difficulty: "easy", topic: "dp",
  tags: ["Math","Dynamic Programming","Brainteaser"],
  description: "Alice and Bob play a game with number `n`. On each turn the player picks any divisor `x` of `n` where `0 < x < n` and replaces `n` with `n - x`. The player who cannot move loses. Alice goes first. Return `true` if Alice wins with optimal play.",
  examples: [
    { input: "2", output: "true" },
    { input: "3", output: "false" },
  ],
  testCases: [
    { input: "2", expectedOutput: "true",  isHidden: false },
    { input: "3", expectedOutput: "false", isHidden: false },
    { input: "4", expectedOutput: "true",  isHidden: true  },
    { input: "1", expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Best Time to Buy and Sell Stock II", slug: "best-time-to-buy-and-sell-stock-ii", difficulty: "easy", topic: "dp",
  tags: ["Array","Dynamic Programming","Greedy"],
  description: "Given array `prices` where `prices[i]` is stock price on day `i`, return the maximum profit. You may buy and sell on multiple days but must sell before buying again (unlimited transactions).",
  examples: [
    { input: "7 1 5 3 6 4", output: "7" },
    { input: "1 2 3 4 5",   output: "4" },
    { input: "7 6 4 3 1",   output: "0" },
  ],
  testCases: [
    { input: "7 1 5 3 6 4", expectedOutput: "7", isHidden: false },
    { input: "1 2 3 4 5",   expectedOutput: "4", isHidden: false },
    { input: "7 6 4 3 1",   expectedOutput: "0", isHidden: true  },
    { input: "1 2",         expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "prices = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> p;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) p.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] p = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── MEDIUM (10) ───

{
  title: "Coin Change", slug: "coin-change", difficulty: "medium", topic: "dp",
  tags: ["Array","Dynamic Programming","Breadth-First Search"],
  description: "Given integer array `coins` of denominations and integer `amount`, return the fewest number of coins needed to make up that amount. If impossible, return `-1`.\n\nInput: line 1 is space-separated coin denominations, line 2 is amount.",
  examples: [
    { input: "1 5 2\n11", output: "3" },
    { input: "2\n3",      output: "-1" },
    { input: "1\n0",      output: "0" },
  ],
  testCases: [
    { input: "1 5 2\n11",   expectedOutput: "3",  isHidden: false },
    { input: "2\n3",        expectedOutput: "-1", isHidden: false },
    { input: "1\n0",        expectedOutput: "0",  isHidden: true  },
    { input: "1 2 5\n100",  expectedOutput: "20", isHidden: true  },
  ],
  starterCode: {
    python: "coins = list(map(int, input().split()))\namount = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> coins;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) coins.push_back(x);\n    int amount; cin >> amount;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] coins = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int amount = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", difficulty: "medium", topic: "dp",
  tags: ["Array","Binary Search","Dynamic Programming"],
  description: "Given integer array `nums`, return the length of the longest strictly increasing subsequence.",
  examples: [
    { input: "10 9 2 5 3 7 101 18", output: "4" },
    { input: "0 1 0 3 2 3",         output: "4" },
    { input: "7 7 7 7 7",           output: "1" },
  ],
  testCases: [
    { input: "10 9 2 5 3 7 101 18", expectedOutput: "4", isHidden: false },
    { input: "0 1 0 3 2 3",         expectedOutput: "4", isHidden: false },
    { input: "7 7 7 7 7",           expectedOutput: "1", isHidden: true  },
    { input: "1 3 6 7 9 4 10 5 6",  expectedOutput: "6", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Unique Paths", slug: "unique-paths", difficulty: "medium", topic: "dp",
  tags: ["Math","Dynamic Programming","Combinatorics"],
  description: "A robot starts at the top-left corner of an `m x n` grid. It can only move right or down. How many unique paths are there to reach the bottom-right corner?\n\nInput: two integers `m` and `n` on one line.",
  examples: [
    { input: "3 7", output: "28" },
    { input: "3 2", output: "3" },
  ],
  testCases: [
    { input: "3 7",   expectedOutput: "28",    isHidden: false },
    { input: "3 2",   expectedOutput: "3",     isHidden: false },
    { input: "1 1",   expectedOutput: "1",     isHidden: true  },
    { input: "10 10", expectedOutput: "48620", isHidden: true  },
  ],
  starterCode: {
    python: "m, n = map(int, input().split())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int m, n; cin >> m >> n;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt(), n = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Word Break", slug: "word-break", difficulty: "medium", topic: "dp",
  tags: ["Hash Table","String","Dynamic Programming","Trie","Memoization"],
  description: "Given string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of dictionary words.\n\nInput: line 1 is `s`, line 2 is space-separated dictionary words.",
  examples: [
    { input: "leetcode\nleet code",          output: "true" },
    { input: "applepenapple\napple pen",     output: "true" },
    { input: "catsandog\ncats dog sand and cat", output: "false" },
  ],
  testCases: [
    { input: "leetcode\nleet code",              expectedOutput: "true",  isHidden: false },
    { input: "applepenapple\napple pen",          expectedOutput: "true",  isHidden: false },
    { input: "catsandog\ncats dog sand and cat",  expectedOutput: "false", isHidden: true  },
    { input: "aaaaaaa\naaaa aaa",                 expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nwordDict = input().split()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s; cin.ignore();\n    string l; getline(cin, l);\n    vector<string> wd;\n    istringstream ss(l); string w;\n    while(ss >> w) wd.push_back(w);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        List<String> wd = Arrays.asList(sc.nextLine().split(\" \"));\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Partition Equal Subset Sum", slug: "partition-equal-subset-sum", difficulty: "medium", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "Given integer array `nums`, return `true` if you can partition it into two subsets with equal sum, or `false` otherwise.",
  examples: [
    { input: "1 5 11 5", output: "true" },
    { input: "1 2 3 5",  output: "false" },
  ],
  testCases: [
    { input: "1 5 11 5",     expectedOutput: "true",  isHidden: false },
    { input: "1 2 3 5",      expectedOutput: "false", isHidden: false },
    { input: "3 1 1 2 2 1",  expectedOutput: "true",  isHidden: true  },
    { input: "1 2 5",        expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Longest Common Subsequence", slug: "longest-common-subsequence", difficulty: "medium", topic: "dp",
  tags: ["String","Dynamic Programming"],
  description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If none exists, return `0`.\n\nInput: two lines.",
  examples: [
    { input: "abcde\nace", output: "3" },
    { input: "abc\nabc",   output: "3" },
    { input: "abc\ndef",   output: "0" },
  ],
  testCases: [
    { input: "abcde\nace", expectedOutput: "3", isHidden: false },
    { input: "abc\nabc",   expectedOutput: "3", isHidden: false },
    { input: "abc\ndef",   expectedOutput: "0", isHidden: true  },
    { input: "bsbininm\njmjkbkjkv", expectedOutput: "1", isHidden: true },
  ],
  starterCode: {
    python: "text1 = input()\ntext2 = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string t1, t2; cin >> t1 >> t2;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String t1 = sc.next(), t2 = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Coin Change II", slug: "coin-change-ii", difficulty: "medium", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "Given integer array `coins` and integer `amount`, return the number of combinations that make up that amount. If no combination is possible, return `0`.\n\nInput: line 1 is space-separated coins, line 2 is amount.",
  examples: [
    { input: "1 2 5\n5", output: "4" },
    { input: "2\n3",     output: "0" },
    { input: "10\n10",   output: "1" },
  ],
  testCases: [
    { input: "1 2 5\n5", expectedOutput: "4", isHidden: false },
    { input: "2\n3",     expectedOutput: "0", isHidden: false },
    { input: "10\n10",   expectedOutput: "1", isHidden: true  },
    { input: "1 2 3\n4", expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "coins = list(map(int, input().split()))\namount = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> coins;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) coins.push_back(x);\n    int amount; cin >> amount;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] coins = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int amount = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "House Robber II", slug: "house-robber-ii", difficulty: "medium", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "Houses are arranged in a circle — the first and last are adjacent. You cannot rob two adjacent houses. Given integer array `nums`, return the maximum amount you can rob.",
  examples: [
    { input: "2 3 2",   output: "3" },
    { input: "1 2 3 1", output: "4" },
    { input: "1 2 3",   output: "3" },
  ],
  testCases: [
    { input: "2 3 2",          expectedOutput: "3",   isHidden: false },
    { input: "1 2 3 1",        expectedOutput: "4",   isHidden: false },
    { input: "1 2 3",          expectedOutput: "3",   isHidden: true  },
    { input: "200 3 140 20 10", expectedOutput: "340", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Decode Ways (DP)", slug: "decode-ways-dp", difficulty: "medium", topic: "dp",
  tags: ["String","Dynamic Programming"],
  description: "A message `A-Z` maps to digits `1-26`. Given a string `s` of digits, return the number of ways to decode it using dynamic programming.",
  examples: [
    { input: "12",  output: "2", explanation: "'AB'(1,2) or 'L'(12)" },
    { input: "226", output: "3" },
    { input: "06",  output: "0" },
  ],
  testCases: [
    { input: "12",  expectedOutput: "2", isHidden: false },
    { input: "226", expectedOutput: "3", isHidden: false },
    { input: "0",   expectedOutput: "0", isHidden: true  },
    { input: "11106", expectedOutput: "2", isHidden: true },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Maximum Product Subarray (DP)", slug: "maximum-product-subarray-dp", difficulty: "medium", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "Given integer array `nums`, find the contiguous subarray with the largest product and return it. Track both max and min products at each index.",
  examples: [
    { input: "2 3 -2 4",  output: "6" },
    { input: "-2 0 -1",   output: "0" },
    { input: "-2 3 -4",   output: "24" },
  ],
  testCases: [
    { input: "2 3 -2 4",  expectedOutput: "6",  isHidden: false },
    { input: "-2 0 -1",   expectedOutput: "0",  isHidden: false },
    { input: "-2 3 -4",   expectedOutput: "24", isHidden: true  },
    { input: "0 2",       expectedOutput: "2",  isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── HARD (10) ───

{
  title: "Edit Distance", slug: "edit-distance-dp", difficulty: "hard", topic: "dp",
  tags: ["String","Dynamic Programming"],
  description: "Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert `word1` to `word2`.\n\nInput: two lines — word1, word2.",
  examples: [
    { input: "horse\nros",           output: "3" },
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
  title: "Burst Balloons", slug: "burst-balloons", difficulty: "hard", topic: "dp",
  tags: ["Array","Dynamic Programming"],
  description: "You have `n` balloons with numbers `nums[i]`. Bursting balloon `i` earns `nums[i-1] * nums[i] * nums[i+1]` coins (boundaries = 1). Return the maximum coins you can collect by bursting all balloons.\n\nThis requires interval DP.",
  examples: [
    { input: "3 1 5 8", output: "167" },
    { input: "1 5",     output: "10" },
  ],
  testCases: [
    { input: "3 1 5 8",       expectedOutput: "167",      isHidden: false },
    { input: "1 5",           expectedOutput: "10",       isHidden: false },
    { input: "1",             expectedOutput: "1",        isHidden: true  },
    { input: "35 16 83 87 84 59", expectedOutput: "1349958", isHidden: true },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) n.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Maximal Square", slug: "maximal-square-dp", difficulty: "hard", topic: "dp",
  tags: ["Array","Dynamic Programming","Matrix"],
  description: "Given an `m x n` binary matrix of `0`s and `1`s, find the largest square containing only `1`s and return its area.\n\nInput: line 1 is `m` and `n`, then `m` lines of space-separated 0/1.",
  examples: [
    { input: "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", output: "4" },
    { input: "1 1\n0", output: "0" },
  ],
  testCases: [
    { input: "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", expectedOutput: "4", isHidden: false },
    { input: "1 1\n0",                                           expectedOutput: "0", isHidden: false },
    { input: "1 1\n1",                                           expectedOutput: "1", isHidden: true  },
    { input: "2 2\n1 1\n1 1",                                    expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "m, n = map(int, input().split())\nmatrix = [input().split() for _ in range(m)]\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int m, n; cin >> m >> n;\n    vector<vector<int>> mat(m, vector<int>(n));\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++) cin >> mat[i][j];\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt(), n = sc.nextInt();\n        int[][] mat = new int[m][n];\n        for(int i=0;i<m;i++) for(int j=0;j<n;j++) mat[i][j]=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Palindrome Partitioning II (DP)", slug: "palindrome-partitioning-ii-dp", difficulty: "hard", topic: "dp",
  tags: ["String","Dynamic Programming"],
  description: "Given string `s`, return the minimum number of cuts to partition it so every substring is a palindrome.",
  examples: [
    { input: "aab",   output: "1" },
    { input: "a",     output: "0" },
    { input: "abcba", output: "0" },
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
  title: "Russian Doll Envelopes", slug: "russian-doll-envelopes", difficulty: "hard", topic: "dp",
  tags: ["Array","Binary Search","Dynamic Programming","Sorting"],
  description: "Each envelope has width and height. You can put one inside another only if both dimensions are strictly larger. Find the max number of envelopes you can nest.\n\nInput: line 1 is `n`, then `n` lines each with `width height`.",
  examples: [
    { input: "4\n5 4\n6 4\n6 7\n2 3", output: "3" },
  ],
  testCases: [
    { input: "4\n5 4\n6 4\n6 7\n2 3",   expectedOutput: "3", isHidden: false },
    { input: "1\n1 1",                   expectedOutput: "1", isHidden: false },
    { input: "3\n1 1\n2 2\n3 3",         expectedOutput: "3", isHidden: true  },
    { input: "4\n5 4\n5 3\n4 5\n4 4",   expectedOutput: "2", isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\nenvelopes = [tuple(map(int, input().split())) for _ in range(n)]\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    vector<pair<int,int>> e(n);\n    for(auto& p : e) cin >> p.first >> p.second;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] e = new int[n][2];\n        for(int i=0;i<n;i++){e[i][0]=sc.nextInt();e[i][1]=sc.nextInt();}\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Minimum Cost to Cut a Stick", slug: "minimum-cost-to-cut-a-stick", difficulty: "hard", topic: "dp",
  tags: ["Array","Dynamic Programming","Sorting"],
  description: "Given a stick of length `n` and array `cuts` of positions to cut, each cut costs the current length of the stick being cut. Return the minimum total cost to perform all cuts.\n\nInput: line 1 is `n`, line 2 is space-separated cut positions.",
  examples: [
    { input: "7\n1 3 4 5",  output: "16" },
    { input: "9\n5 6 1 4 2", output: "22" },
  ],
  testCases: [
    { input: "7\n1 3 4 5",   expectedOutput: "16", isHidden: false },
    { input: "9\n5 6 1 4 2", expectedOutput: "22", isHidden: false },
    { input: "25\n8 11 23",  expectedOutput: "35", isHidden: true  },
    { input: "10\n5",        expectedOutput: "10", isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\ncuts = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    vector<int> cuts;\n    string l; getline(cin, l); getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) cuts.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] cuts = Arrays.stream(sc.nextLine().trim().isEmpty() ? sc.nextLine().split(\" \") : sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Strange Printer", slug: "strange-printer", difficulty: "hard", topic: "dp",
  tags: ["String","Dynamic Programming"],
  description: "A strange printer can print a sequence of the same character in one turn at any positions. What is the minimum number of turns to print string `s`?",
  examples: [
    { input: "aaabbb", output: "2" },
    { input: "aba",    output: "2" },
    { input: "a",      output: "1" },
  ],
  testCases: [
    { input: "aaabbb", expectedOutput: "2", isHidden: false },
    { input: "aba",    expectedOutput: "2", isHidden: false },
    { input: "a",      expectedOutput: "1", isHidden: true  },
    { input: "tbgtgb", expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Minimum Falling Path Sum", slug: "minimum-falling-path-sum", difficulty: "hard", topic: "dp",
  tags: ["Array","Dynamic Programming","Matrix"],
  description: "Given an `n x n` matrix, return the minimum sum of any falling path. A falling path starts at any element in the first row and moves to the same or adjacent column in the next row.\n\nInput: line 1 is `n`, then `n` lines of `n` space-separated integers.",
  examples: [
    { input: "3\n2 1 3\n6 5 4\n7 8 9",          output: "13" },
    { input: "3\n-19 57 -63\n20 -10 86\n1 -53 69", output: "-128" },
  ],
  testCases: [
    { input: "3\n2 1 3\n6 5 4\n7 8 9",            expectedOutput: "13",   isHidden: false },
    { input: "3\n-19 57 -63\n20 -10 86\n1 -53 69", expectedOutput: "-128", isHidden: false },
    { input: "1\n7",                               expectedOutput: "7",    isHidden: true  },
    { input: "2\n1 2\n3 4",                        expectedOutput: "4",    isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\nmatrix = [list(map(int, input().split())) for _ in range(n)]\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    vector<vector<int>> m(n, vector<int>(n));\n    for(int i=0;i<n;i++) for(int j=0;j<n;j++) cin >> m[i][j];\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] m = new int[n][n];\n        for(int i=0;i<n;i++) for(int j=0;j<n;j++) m[i][j]=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Stone Game", slug: "stone-game-dp", difficulty: "hard", topic: "dp",
  tags: ["Array","Math","Dynamic Programming","Game Theory"],
  description: "Alice and Bob take turns (Alice first) picking the entire pile from either end of a row of piles. The player with the most stones wins. Both play optimally. Return `true` if Alice wins.\n\nInput: space-separated pile values on one line.",
  examples: [
    { input: "5 3 4 5", output: "true" },
    { input: "3 7 2 3", output: "true" },
  ],
  testCases: [
    { input: "5 3 4 5", expectedOutput: "true", isHidden: false },
    { input: "3 7 2 3", expectedOutput: "true", isHidden: false },
    { input: "1 2 3 4", expectedOutput: "true", isHidden: true  },
    { input: "1 1 1 1", expectedOutput: "true", isHidden: true  },
  ],
  starterCode: {
    python: "piles = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> p;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) p.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] p = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Distinct Subsequences (DP)", slug: "distinct-subsequences-dp", difficulty: "hard", topic: "dp",
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

];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Problem.deleteMany({ topic: 'dp' });
  console.log('Cleared existing dp problems');

  const inserted = await Problem.insertMany(problems);
  console.log(`✅ Inserted ${inserted.length} dp problems`);

  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });