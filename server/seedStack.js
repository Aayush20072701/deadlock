// Run: node seedStack.js
// Seeds 30 Stack problems into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const problems = [

// ─── EASY (10) ───

{
  title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "easy", topic: "stack",
  tags: ["String","Stack"],
  description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets are closed by the same type of brackets.\n- Open brackets are closed in the correct order.\n- Every close bracket has a corresponding open bracket.",
  examples: [
    { input: "()", output: "true" },
    { input: "()[]{}", output: "true" },
    { input: "(]", output: "false" },
  ],
  testCases: [
    { input: "()",     expectedOutput: "true",  isHidden: false },
    { input: "()[]{}", expectedOutput: "true",  isHidden: false },
    { input: "(]",     expectedOutput: "false", isHidden: true  },
    { input: "{[]}",   expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Min Stack", slug: "min-stack", difficulty: "easy", topic: "stack",
  tags: ["Stack","Design"],
  description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nInput: each line is an operation:\n- `push X` — push X onto stack\n- `pop` — remove top\n- `top` — print top element\n- `getMin` — print current minimum\n\nFor `top` and `getMin`, print the result.",
  examples: [
    { input: "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", output: "-3\n0\n-2" },
  ],
  testCases: [
    { input: "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expectedOutput: "-3\n0\n-2", isHidden: false },
    { input: "push 5\npush 3\npush 7\ngetMin\ntop",               expectedOutput: "3\n7",      isHidden: false },
    { input: "push 2\npush 2\ngetMin\npop\ngetMin",               expectedOutput: "2\n2",      isHidden: true  },
    { input: "push 1\ntop\ngetMin",                               expectedOutput: "1\n1",      isHidden: true  },
  ],
  starterCode: {
    python: `import sys
lines = sys.stdin.read().strip().split('\\n')
# Implement MinStack and process each operation
stack = []
min_stack = []
for line in lines:
    parts = line.split()
    op = parts[0]
    # Write your solution here
`,
    cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){
    string line;
    // Implement MinStack, process each line
    while(getline(cin, line)){
        // Write your solution here
    }
}
`,
    java: `import java.util.*;
public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        // Implement MinStack, process each line
        while(sc.hasNextLine()){
            String line = sc.nextLine();
            // Write your solution here
        }
    }
}
`,
  },
},

{
  title: "Baseball Game", slug: "baseball-game", difficulty: "easy", topic: "stack",
  tags: ["Array","Stack","Simulation"],
  description: "You are keeping score for a baseball game with unusual rules. Each operation is one of:\n- Integer `x`: record `x` points.\n- `'+'`: record sum of the last two scores.\n- `'D'`: record double the last score.\n- `'C'`: invalidate the last score.\n\nReturn the sum of all scores. Input: space-separated operations on one line.",
  examples: [
    { input: "5 2 C D +",          output: "30" },
    { input: "5 -2 4 C D 9 + +",   output: "27" },
  ],
  testCases: [
    { input: "5 2 C D +",        expectedOutput: "30", isHidden: false },
    { input: "5 -2 4 C D 9 + +", expectedOutput: "27", isHidden: false },
    { input: "1 C",              expectedOutput: "0",  isHidden: true  },
    { input: "3 7 2 + + C",      expectedOutput: "10", isHidden: true  },
  ],
  starterCode: {
    python: "ops = input().split()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<string> ops;\n    string w, line; getline(cin, line);\n    istringstream ss(line);\n    while(ss >> w) ops.push_back(w);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String[] ops = sc.nextLine().split(\" \");\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Backspace String Compare", slug: "backspace-string-compare", difficulty: "easy", topic: "stack",
  tags: ["Two Pointers","String","Stack","Simulation"],
  description: "Given two strings `s` and `t`, return `true` if they are equal when typed into empty text editors. `'#'` means a backspace character.\n\nInput: two lines — s, then t.",
  examples: [
    { input: "ab#c\nad#c",  output: "true" },
    { input: "ab##\nc#d#",  output: "true" },
    { input: "a#c\nb",      output: "false" },
  ],
  testCases: [
    { input: "ab#c\nad#c",  expectedOutput: "true",  isHidden: false },
    { input: "ab##\nc#d#",  expectedOutput: "true",  isHidden: false },
    { input: "a##c\n#a#c",  expectedOutput: "true",  isHidden: true  },
    { input: "a#c\nb",      expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\nt = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s, t; getline(cin, s); getline(cin, t);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine(), t = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Next Greater Element I", slug: "next-greater-element-i", difficulty: "easy", topic: "stack",
  tags: ["Array","Hash Table","Stack","Monotonic Stack"],
  description: "Given two arrays `nums1` and `nums2` where `nums1` is a subset of `nums2`, for each element in `nums1` find the next greater element in `nums2` (first element to its right that is greater). Return -1 if none exists. Print results space-separated.\n\nInput: two lines of space-separated integers.",
  examples: [
    { input: "4 1 2\n1 3 4 2", output: "-1 3 -1" },
    { input: "2 4\n1 2 3 4",   output: "3 -1" },
  ],
  testCases: [
    { input: "4 1 2\n1 3 4 2",      expectedOutput: "-1 3 -1",          isHidden: false },
    { input: "2 4\n1 2 3 4",         expectedOutput: "3 -1",             isHidden: false },
    { input: "1 3 5 2 4\n6 5 4 3 2 1", expectedOutput: "-1 -1 -1 -1 -1", isHidden: true },
    { input: "1\n1 2",               expectedOutput: "2",                isHidden: true  },
  ],
  starterCode: {
    python: "nums1 = list(map(int, input().split()))\nnums2 = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> n1, n2;\n    string l; getline(cin, l); istringstream s1(l);\n    int x; while(s1 >> x) n1.push_back(x);\n    getline(cin, l); istringstream s2(l);\n    while(s2 >> x) n2.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] n1 = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int[] n2 = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Remove Outermost Parentheses", slug: "remove-outermost-parentheses", difficulty: "easy", topic: "stack",
  tags: ["String","Stack"],
  description: "A valid parentheses string is primitive if it is nonempty and cannot be split into two nonempty valid strings. Remove the outermost parentheses of every primitive string in the decomposition of `s`.",
  examples: [
    { input: "(()())(())",        output: "()()()" },
    { input: "(()())(())(((())))", output: "()()()()(())" },
    { input: "()()",              output: "" },
  ],
  testCases: [
    { input: "(()())(())",        expectedOutput: "()()()",      isHidden: false },
    { input: "(()())(())(((())))", expectedOutput: "()()()()(())", isHidden: false },
    { input: "()()",              expectedOutput: "",            isHidden: true  },
    { input: "((()))",            expectedOutput: "(())",        isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Make The String Great", slug: "make-the-string-great", difficulty: "easy", topic: "stack",
  tags: ["String","Stack"],
  description: "Given string `s` of lower and upper case English letters, repeatedly remove adjacent pairs where one is lowercase and the other is the uppercase version of the same letter (e.g. `'aA'` or `'Aa'`). Return the resulting string.",
  examples: [
    { input: "leEeetcode", output: "leetcode" },
    { input: "abBAcC",     output: "" },
    { input: "s",          output: "s" },
  ],
  testCases: [
    { input: "leEeetcode", expectedOutput: "leetcode", isHidden: false },
    { input: "abBAcC",     expectedOutput: "",         isHidden: false },
    { input: "s",          expectedOutput: "s",        isHidden: true  },
    { input: "Pp",         expectedOutput: "",         isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Maximum Nesting Depth of Parentheses", slug: "maximum-nesting-depth-of-parentheses", difficulty: "easy", topic: "stack",
  tags: ["String","Stack"],
  description: "Given a valid parenthesization string `s`, return its nesting depth (maximum number of nested open parentheses at any point).",
  examples: [
    { input: "(1+(2*3)+((8)/4))+1", output: "3" },
    { input: "(1)+((2))+(((3)))",   output: "3" },
  ],
  testCases: [
    { input: "(1+(2*3)+((8)/4))+1", expectedOutput: "3", isHidden: false },
    { input: "(1)+((2))+(((3)))",   expectedOutput: "3", isHidden: false },
    { input: "1+(2*3)/(2-1)",       expectedOutput: "1", isHidden: true  },
    { input: "()",                  expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Final Prices With a Special Discount", slug: "final-prices-with-a-special-discount", difficulty: "easy", topic: "stack",
  tags: ["Array","Stack","Monotonic Stack"],
  description: "Given array `prices`, for each item `i` you get a discount equal to `prices[j]` where `j` is the smallest index after `i` with `prices[j] <= prices[i]`. If no such `j`, no discount. Return final prices. Print space-separated.",
  examples: [
    { input: "8 4 6 2 3",  output: "4 2 4 2 3" },
    { input: "1 2 3 4 5",  output: "1 2 3 4 5" },
    { input: "10 1 1 6",   output: "9 0 1 6" },
  ],
  testCases: [
    { input: "8 4 6 2 3", expectedOutput: "4 2 4 2 3", isHidden: false },
    { input: "1 2 3 4 5", expectedOutput: "1 2 3 4 5", isHidden: false },
    { input: "10 1 1 6",  expectedOutput: "9 0 1 6",   isHidden: true  },
    { input: "5 5 5 5",   expectedOutput: "0 0 0 5",   isHidden: true  },
  ],
  starterCode: {
    python: "prices = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> p;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) p.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] prices = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Crawler Log Folder", slug: "crawler-log-folder", difficulty: "easy", topic: "stack",
  tags: ["Array","String","Stack"],
  description: "Each log operation is:\n- `\"../\"` — move to parent folder (stay at root if already there).\n- `\"./\"` — stay in current folder.\n- `\"x/\"` — move into child folder named `x`.\n\nGiven a list of operations, return the minimum number of operations to go back to the main folder. Input: space-separated operations on one line.",
  examples: [
    { input: "d1/ d2/ ../ d3/ ./", output: "2" },
    { input: "d1/ ../ ../ ../",    output: "0" },
    { input: "d1/ d2/ d3/",        output: "3" },
  ],
  testCases: [
    { input: "d1/ d2/ ../ d3/ ./", expectedOutput: "2", isHidden: false },
    { input: "d1/ ../ ../ ../",    expectedOutput: "0", isHidden: false },
    { input: "./",                 expectedOutput: "0", isHidden: true  },
    { input: "d1/ d2/ d3/",       expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "logs = input().split()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<string> logs;\n    string w, line; getline(cin, line);\n    istringstream ss(line);\n    while(ss >> w) logs.push_back(w);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String[] logs = sc.nextLine().split(\" \");\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── MEDIUM (10) ───

{
  title: "Daily Temperatures", slug: "daily-temperatures", difficulty: "medium", topic: "stack",
  tags: ["Array","Stack","Monotonic Stack"],
  description: "Given an array of integers `temperatures`, return an array `answer` where `answer[i]` is the number of days until a warmer temperature. If no future day is warmer, `answer[i] = 0`. Print space-separated.",
  examples: [
    { input: "73 74 75 71 69 72 76 73", output: "1 1 4 2 1 1 0 0" },
    { input: "30 40 50 60",             output: "1 1 1 0" },
    { input: "30 60 90",                output: "1 1 0" },
  ],
  testCases: [
    { input: "73 74 75 71 69 72 76 73",          expectedOutput: "1 1 4 2 1 1 0 0",       isHidden: false },
    { input: "30 40 50 60",                       expectedOutput: "1 1 1 0",               isHidden: false },
    { input: "30 60 90",                          expectedOutput: "1 1 0",                 isHidden: true  },
    { input: "89 62 70 58 47 47 46 76 100 70",    expectedOutput: "8 1 5 4 3 2 1 1 0 0",  isHidden: true  },
  ],
  starterCode: {
    python: "temperatures = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> t;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) t.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] t = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Decode String", slug: "decode-string", difficulty: "medium", topic: "stack",
  tags: ["String","Stack","Recursion"],
  description: "Given an encoded string, return its decoded string. The encoding rule is `k[encoded_string]` meaning `encoded_string` is repeated exactly `k` times. You may assume the input is always valid.",
  examples: [
    { input: "3[a]2[bc]",  output: "aaabcbc" },
    { input: "3[a2[c]]",   output: "accaccacc" },
    { input: "2[abc]3[cd]ef", output: "abcabccdcdcdef" },
  ],
  testCases: [
    { input: "3[a]2[bc]",    expectedOutput: "aaabcbc",        isHidden: false },
    { input: "3[a2[c]]",     expectedOutput: "accaccacc",      isHidden: false },
    { input: "2[abc]3[cd]ef", expectedOutput: "abcabccdcdcdef", isHidden: true },
    { input: "10[a]",        expectedOutput: "aaaaaaaaaa",     isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Evaluate Reverse Polish Notation", slug: "evaluate-reverse-polish-notation", difficulty: "medium", topic: "stack",
  tags: ["Array","Math","Stack"],
  description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are `+`, `-`, `*`, `/` (integer division truncating toward zero).\n\nInput: tokens space-separated on one line.",
  examples: [
    { input: "2 1 + 3 *",           output: "9" },
    { input: "4 13 5 / +",          output: "6" },
    { input: "10 6 9 3 + -11 * / * 17 + 5 +", output: "22" },
  ],
  testCases: [
    { input: "2 1 + 3 *",                      expectedOutput: "9",  isHidden: false },
    { input: "4 13 5 / +",                      expectedOutput: "6",  isHidden: false },
    { input: "10 6 9 3 + -11 * / * 17 + 5 +",  expectedOutput: "22", isHidden: true  },
    { input: "3 11 5 + *",                      expectedOutput: "48", isHidden: true  },
  ],
  starterCode: {
    python: "tokens = input().split()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<string> tokens;\n    string w, l; getline(cin, l);\n    istringstream ss(l);\n    while(ss >> w) tokens.push_back(w);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String[] tokens = sc.nextLine().split(\" \");\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Asteroid Collision", slug: "asteroid-collision", difficulty: "medium", topic: "stack",
  tags: ["Array","Stack","Simulation"],
  description: "Given an array of asteroids (positive = moving right, negative = moving left), simulate collisions. When two asteroids meet, the smaller explodes; equal size both explode. Return the state after all collisions. Print space-separated (empty line if all destroyed).",
  examples: [
    { input: "5 10 -5",    output: "5 10" },
    { input: "8 -8",       output: "" },
    { input: "10 2 -5",    output: "10" },
    { input: "-2 -1 1 2",  output: "-2 -1 1 2" },
  ],
  testCases: [
    { input: "5 10 -5",   expectedOutput: "5 10",    isHidden: false },
    { input: "8 -8",      expectedOutput: "",        isHidden: false },
    { input: "10 2 -5",   expectedOutput: "10",      isHidden: true  },
    { input: "-2 -1 1 2", expectedOutput: "-2 -1 1 2", isHidden: true },
  ],
  starterCode: {
    python: "asteroids = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> a;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) a.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] a = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Remove K Digits", slug: "remove-k-digits", difficulty: "medium", topic: "stack",
  tags: ["String","Stack","Greedy","Monotonic Stack"],
  description: "Given string `num` representing a non-negative integer, and integer `k`, remove `k` digits to make the resulting number as small as possible. Return the result as a string with no leading zeros (use `\"0\"` if result is zero).\n\nInput: line 1 is num, line 2 is k.",
  examples: [
    { input: "1432219\n3", output: "1219" },
    { input: "10200\n1",   output: "200" },
    { input: "10\n2",      output: "0" },
  ],
  testCases: [
    { input: "1432219\n3", expectedOutput: "1219", isHidden: false },
    { input: "10200\n1",   expectedOutput: "200",  isHidden: false },
    { input: "10\n2",      expectedOutput: "0",    isHidden: true  },
    { input: "112\n1",     expectedOutput: "11",   isHidden: true  },
  ],
  starterCode: {
    python: "num = input()\nk = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string num; int k;\n    cin >> num >> k;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String num = sc.next(); int k = sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Car Fleet", slug: "car-fleet", difficulty: "medium", topic: "stack",
  tags: ["Array","Stack","Sorting","Monotonic Stack"],
  description: "There are `n` cars going to the same destination. `position[i]` and `speed[i]` represent position and speed of car `i`. Cars can't pass each other. A fleet is cars driving at same position/speed. Return the number of car fleets that arrive.\n\nInput: line 1 is target, line 2 is positions, line 3 is speeds.",
  examples: [
    { input: "12\n10 8 0 5 3\n2 4 1 1 3", output: "3" },
    { input: "10\n3\n3",                   output: "1" },
  ],
  testCases: [
    { input: "12\n10 8 0 5 3\n2 4 1 1 3", expectedOutput: "3", isHidden: false },
    { input: "10\n3\n3",                   expectedOutput: "1", isHidden: false },
    { input: "100\n0 2 4\n4 2 1",          expectedOutput: "1", isHidden: true  },
    { input: "10\n6 8\n3 2",               expectedOutput: "2", isHidden: true  },
  ],
  starterCode: {
    python: "target = int(input())\nposition = list(map(int, input().split()))\nspeed = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int target; cin >> target;\n    vector<int> pos, spd;\n    string l; getline(cin, l); getline(cin, l);\n    istringstream s1(l); int x;\n    while(s1 >> x) pos.push_back(x);\n    getline(cin, l); istringstream s2(l);\n    while(s2 >> x) spd.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int target = sc.nextInt();\n        int[] pos = Arrays.stream(sc.nextLine().trim().isEmpty() ? sc.nextLine().split(\" \") : sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int[] spd = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "132 Pattern", slug: "132-pattern", difficulty: "medium", topic: "stack",
  tags: ["Array","Binary Search","Stack","Monotonic Stack"],
  description: "Given integer array `nums`, return `true` if there is a 132 pattern — a subsequence of three integers `nums[i] < nums[k] < nums[j]` with `i < j < k`. Otherwise return `false`.",
  examples: [
    { input: "1 2 3 4",  output: "false" },
    { input: "3 1 4 2",  output: "true" },
    { input: "-1 3 2 0", output: "true" },
  ],
  testCases: [
    { input: "1 2 3 4",      expectedOutput: "false", isHidden: false },
    { input: "3 1 4 2",      expectedOutput: "true",  isHidden: false },
    { input: "-1 3 2 0",     expectedOutput: "true",  isHidden: true  },
    { input: "1 0 1 -4 -3",  expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] nums = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Simplify Path", slug: "simplify-path", difficulty: "medium", topic: "stack",
  tags: ["String","Stack"],
  description: "Given an absolute Unix-style path `path`, simplify it:\n- `'.'` = current directory\n- `'..'` = parent directory\n- Multiple slashes treated as one\n\nReturn the simplified canonical path.",
  examples: [
    { input: "/home/",           output: "/home" },
    { input: "/../",             output: "/" },
    { input: "/home//foo/",      output: "/home/foo" },
    { input: "/a/./b/../../c/",  output: "/c" },
  ],
  testCases: [
    { input: "/home/",          expectedOutput: "/home",     isHidden: false },
    { input: "/../",            expectedOutput: "/",         isHidden: false },
    { input: "/home//foo/",     expectedOutput: "/home/foo", isHidden: true  },
    { input: "/a/./b/../../c/", expectedOutput: "/c",        isHidden: true  },
  ],
  starterCode: {
    python: "path = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string path; getline(cin, path);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String path = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Online Stock Span", slug: "online-stock-span", difficulty: "medium", topic: "stack",
  tags: ["Stack","Design","Monotonic Stack","Data Stream"],
  description: "The stock span for a given day is the maximum number of consecutive days before today (including today) where the price was less than or equal to today's price.\n\nGiven space-separated prices, print the span for each price. Print spans space-separated.",
  examples: [
    { input: "100 80 60 70 60 75 85", output: "1 1 1 2 1 4 6" },
    { input: "31 41 48 59 79",        output: "1 2 3 4 5" },
  ],
  testCases: [
    { input: "100 80 60 70 60 75 85",          expectedOutput: "1 1 1 2 1 4 6",    isHidden: false },
    { input: "31 41 48 59 79",                  expectedOutput: "1 2 3 4 5",        isHidden: false },
    { input: "28 14 28 35 46 53 66 80 87 88",   expectedOutput: "1 1 3 4 5 6 7 8 9 10", isHidden: true },
    { input: "1 2 1",                           expectedOutput: "1 2 1",            isHidden: true  },
  ],
  starterCode: {
    python: "prices = list(map(int, input().split()))\n# Compute span for each price and print all spans space-separated\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> prices;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) prices.push_back(x);\n    // Compute spans\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] prices = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Compute spans\n    }\n}\n",
  },
},

{
  title: "Number of Visible People in a Queue", slug: "number-of-visible-people-in-a-queue", difficulty: "medium", topic: "stack",
  tags: ["Array","Stack","Monotonic Stack"],
  description: "There are `n` people in a queue with given `heights`. Person at index `i` can see person at index `j` (j > i) if everyone between them is shorter than both. Return how many people each person can see. Print space-separated.",
  examples: [
    { input: "10 6 8 5 11 9", output: "3 1 2 1 1 0" },
    { input: "5 1 2 3 10",    output: "4 1 2 1 0" },
  ],
  testCases: [
    { input: "10 6 8 5 11 9", expectedOutput: "3 1 2 1 1 0", isHidden: false },
    { input: "5 1 2 3 10",    expectedOutput: "4 1 2 1 0",   isHidden: false },
    { input: "3 1 2",         expectedOutput: "2 1 0",        isHidden: true  },
    { input: "1 2 3",         expectedOutput: "1 1 0",        isHidden: true  },
  ],
  starterCode: {
    python: "heights = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> h;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) h.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] h = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── HARD (10) ───

{
  title: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram-stack", difficulty: "hard", topic: "stack",
  tags: ["Array","Stack","Monotonic Stack"],
  description: "Given array `heights` where each bar has width 1, return the area of the largest rectangle in the histogram. Use a stack-based O(n) approach.",
  examples: [
    { input: "2 1 5 6 2 3", output: "10" },
    { input: "2 4",          output: "4" },
  ],
  testCases: [
    { input: "2 1 5 6 2 3",   expectedOutput: "10", isHidden: false },
    { input: "2 4",           expectedOutput: "4",  isHidden: false },
    { input: "6 2 5 4 5 1 6", expectedOutput: "12", isHidden: true  },
    { input: "1 1 1 1",       expectedOutput: "4",  isHidden: true  },
  ],
  starterCode: {
    python: "heights = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> h;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) h.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] h = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Maximal Rectangle", slug: "maximal-rectangle", difficulty: "hard", topic: "stack",
  tags: ["Array","Dynamic Programming","Stack","Matrix","Monotonic Stack"],
  description: "Given a `rows x cols` binary matrix of `0`s and `1`s, find the largest rectangle containing only `1`s and return its area.\n\nInput: line 1 is `rows cols`, then `rows` lines each of space-separated 0/1.",
  examples: [
    { input: "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", output: "6" },
    { input: "1 1\n0", output: "0" },
    { input: "1 1\n1", output: "1" },
  ],
  testCases: [
    { input: "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", expectedOutput: "6", isHidden: false },
    { input: "1 1\n0",                                           expectedOutput: "0", isHidden: false },
    { input: "1 1\n1",                                           expectedOutput: "1", isHidden: true  },
    { input: "2 2\n1 1\n1 1",                                    expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "r, c = map(int, input().split())\nmatrix = [input().split() for _ in range(r)]\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int r, c; cin >> r >> c;\n    vector<vector<int>> m(r, vector<int>(c));\n    for(int i = 0; i < r; i++)\n        for(int j = 0; j < c; j++) cin >> m[i][j];\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt(), c = sc.nextInt();\n        int[][] m = new int[r][c];\n        for(int i=0;i<r;i++) for(int j=0;j<c;j++) m[i][j]=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Trapping Rain Water", slug: "trapping-rain-water-stack", difficulty: "hard", topic: "stack",
  tags: ["Array","Stack","Monotonic Stack"],
  description: "Given `n` non-negative integers representing an elevation map (each bar width = 1), compute how much water it can trap after raining. Use a stack-based approach.",
  examples: [
    { input: "0 1 0 2 1 0 1 3 2 1 2 1", output: "6" },
    { input: "4 2 0 3 2 5",             output: "9" },
  ],
  testCases: [
    { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6",  isHidden: false },
    { input: "4 2 0 3 2 5",             expectedOutput: "9",  isHidden: false },
    { input: "3 0 0 2 0 4",             expectedOutput: "10", isHidden: true  },
    { input: "1 2 3 4 5",               expectedOutput: "0",  isHidden: true  },
  ],
  starterCode: {
    python: "height = list(map(int, input().split()))\n# Write your solution here (stack approach)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> h;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) h.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] h = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Basic Calculator", slug: "basic-calculator", difficulty: "hard", topic: "stack",
  tags: ["Math","String","Stack","Recursion"],
  description: "Given a string `s` representing a valid expression with `+`, `-`, `(`, `)`, and spaces (no `*` or `/`), implement a calculator to evaluate it.",
  examples: [
    { input: "1 + 1",             output: "2" },
    { input: " 2-1 + 2 ",        output: "3" },
    { input: "(1+(4+5+2)-3)+(6+8)", output: "23" },
  ],
  testCases: [
    { input: "1 + 1",              expectedOutput: "2",  isHidden: false },
    { input: " 2-1 + 2 ",         expectedOutput: "3",  isHidden: false },
    { input: "(1+(4+5+2)-3)+(6+8)", expectedOutput: "23", isHidden: true },
    { input: "- (3 + (4 + 5))",   expectedOutput: "-12", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Sum of Subarray Minimums", slug: "sum-of-subarray-minimums", difficulty: "hard", topic: "stack",
  tags: ["Array","Dynamic Programming","Stack","Monotonic Stack"],
  description: "Given integer array `arr`, find the sum of `min(b)` for every subarray `b` of `arr`. Return the answer modulo `10^9 + 7`.",
  examples: [
    { input: "3 1 2 4",        output: "17" },
    { input: "11 81 94 43 3",  output: "444" },
  ],
  testCases: [
    { input: "3 1 2 4",       expectedOutput: "17",  isHidden: false },
    { input: "11 81 94 43 3", expectedOutput: "444", isHidden: false },
    { input: "1",             expectedOutput: "1",   isHidden: true  },
    { input: "1 2 3",         expectedOutput: "10",  isHidden: true  },
  ],
  starterCode: {
    python: "arr = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> a;\n    string l; getline(cin, l);\n    istringstream ss(l); int x;\n    while(ss >> x) a.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        int[] a = Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Score of Parentheses", slug: "score-of-parentheses", difficulty: "hard", topic: "stack",
  tags: ["String","Stack"],
  description: "Given balanced parentheses string `s`, compute its score:\n- `()` = 1\n- `AB` = score(A) + score(B)\n- `(A)` = 2 × score(A)",
  examples: [
    { input: "()",        output: "1" },
    { input: "(())",      output: "2" },
    { input: "()()",      output: "2" },
    { input: "(()(()))",  output: "6" },
  ],
  testCases: [
    { input: "()",       expectedOutput: "1", isHidden: false },
    { input: "(()(()))", expectedOutput: "6", isHidden: false },
    { input: "()()",     expectedOutput: "2", isHidden: true  },
    { input: "((()))",   expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Remove Duplicate Letters", slug: "remove-duplicate-letters-stack", difficulty: "hard", topic: "stack",
  tags: ["String","Stack","Greedy","Monotonic Stack"],
  description: "Given string `s`, remove duplicate letters so every letter appears exactly once. The result must be the smallest in lexicographical order among all possible results. Use a greedy stack approach.",
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
    python: "s = input()\n# Write your solution here (greedy + stack)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Number of Atoms", slug: "number-of-atoms", difficulty: "hard", topic: "stack",
  tags: ["Hash Table","String","Stack","Sorting"],
  description: "Given a chemical formula string, return the count of each atom. Elements start with an uppercase letter, followed by optional lowercase letters. Counts may follow. Formulas can be nested in parentheses.\n\nReturn a string of elements sorted alphabetically with their counts (omit count of 1).",
  examples: [
    { input: "H2O",           output: "H2O" },
    { input: "Mg(OH)2",       output: "H2MgO2" },
    { input: "K4(ON(SO3)2)2", output: "K4N2O14S4" },
  ],
  testCases: [
    { input: "H2O",           expectedOutput: "H2O",     isHidden: false },
    { input: "Mg(OH)2",       expectedOutput: "H2MgO2",  isHidden: false },
    { input: "K4(ON(SO3)2)2", expectedOutput: "K4N2O14S4", isHidden: true },
    { input: "Be32",          expectedOutput: "Be32",    isHidden: true  },
  ],
  starterCode: {
    python: "formula = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string formula; cin >> formula;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String formula = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Minimum Swaps to Make String Balanced", slug: "minimum-swaps-to-make-string-balanced", difficulty: "hard", topic: "stack",
  tags: ["Two Pointers","String","Stack","Greedy"],
  description: "Given a string `s` of even length consisting of exactly `n/2` `'['` and `n/2` `']'`, return the minimum number of swaps to make it balanced.",
  examples: [
    { input: "][",     output: "1" },
    { input: "]]][[[", output: "2" },
    { input: "[]",     output: "0" },
  ],
  testCases: [
    { input: "][",        expectedOutput: "1", isHidden: false },
    { input: "]]][[[",    expectedOutput: "2", isHidden: false },
    { input: "[]",        expectedOutput: "0", isHidden: true  },
    { input: "]]]][[[[",  expectedOutput: "2", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin >> s;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Basic Calculator II", slug: "basic-calculator-ii", difficulty: "hard", topic: "stack",
  tags: ["Math","String","Stack"],
  description: "Given a string `s` representing a valid expression with `+`, `-`, `*`, `/`, and spaces (no parentheses), implement a calculator to evaluate it. Integer division truncates toward zero.",
  examples: [
    { input: "3+2*2",    output: "7" },
    { input: " 3/2 ",   output: "1" },
    { input: " 3+5 / 2", output: "5" },
  ],
  testCases: [
    { input: "3+2*2",     expectedOutput: "7", isHidden: false },
    { input: " 3/2 ",    expectedOutput: "1", isHidden: false },
    { input: " 3+5 / 2", expectedOutput: "5", isHidden: true  },
    { input: "14-3/2",   expectedOutput: "13", isHidden: true  },
  ],
  starterCode: {
    python: "s = input()\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin, s);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your solution here\n    }\n}\n",
  },
},

];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Problem.deleteMany({ topic: 'stack' });
  console.log('Cleared existing stack problems');

  const inserted = await Problem.insertMany(problems);
  console.log(`✅ Inserted ${inserted.length} stack problems`);

  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });