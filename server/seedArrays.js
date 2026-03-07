// Run: node seedArrays.js
// Seeds 30 Array problems into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const problems = [
// ─── EASY ───
{
  title: "Two Sum", slug: "two-sum", difficulty: "easy", topic: "arrays",
  tags: ["Array","Hash Table"],
  description: "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Return smaller index first.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "0 1", explanation: "nums[0] + nums[1] = 9" },
    { input: "nums = [3,2,4], target = 6", output: "1 2" },
  ],
  testCases: [
    { input: "2 7 11 15\n9",  expectedOutput: "0 1", isHidden: false },
    { input: "3 2 4\n6",      expectedOutput: "1 2", isHidden: false },
    { input: "3 3\n6",        expectedOutput: "0 1", isHidden: true  },
    { input: "1 5 3 7 2\n9",  expectedOutput: "1 4", isHidden: true  },
  ],
  starterCode: {
    python: `nums = list(map(int, input().split()))
target = int(input())
# Write your solution here
`,
    cpp: `#include<bits/stdc++.h>
using namespace std;
int main(){
    vector<int> nums;
    string line; getline(cin,line);
    istringstream ss(line);
    int x; while(ss>>x) nums.push_back(x);
    int target; cin>>target;
    // Write your solution here
}
`,
    java: `import java.util.*;
public class Main{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int[] nums=Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int target=sc.nextInt();
        // Write your solution here
    }
}
`,
  },
},
{
  title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", difficulty: "easy", topic: "arrays",
  tags: ["Array","Dynamic Programming"],
  description: "Given an array `prices` where `prices[i]` is the stock price on day `i`, return the maximum profit from a single buy then sell. Return `0` if no profit is possible.",
  examples: [
    { input: "prices = [7,1,5,3,6,4]", output: "5" },
    { input: "prices = [7,6,4,3,1]",   output: "0" },
  ],
  testCases: [
    { input: "7 1 5 3 6 4", expectedOutput: "5", isHidden: false },
    { input: "7 6 4 3 1",   expectedOutput: "0", isHidden: false },
    { input: "1 2",         expectedOutput: "1", isHidden: true  },
    { input: "2 4 1 7",     expectedOutput: "6", isHidden: true  },
  ],
  starterCode: {
    python: "prices = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> p;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) p.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] prices=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Contains Duplicate", slug: "contains-duplicate", difficulty: "easy", topic: "arrays",
  tags: ["Array","Hash Table","Sorting"],
  description: "Given an integer array `nums`, return `true` if any value appears at least twice, or `false` if all elements are distinct.",
  examples: [
    { input: "nums = [1,2,3,1]", output: "true" },
    { input: "nums = [1,2,3,4]", output: "false" },
  ],
  testCases: [
    { input: "1 2 3 1",           expectedOutput: "true",  isHidden: false },
    { input: "1 2 3 4",           expectedOutput: "false", isHidden: false },
    { input: "1 1 1 3 3 4 3 2 4 2", expectedOutput: "true", isHidden: true },
    { input: "5",                 expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Missing Number", slug: "missing-number", difficulty: "easy", topic: "arrays",
  tags: ["Array","Math","Bit Manipulation"],
  description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing.",
  examples: [
    { input: "nums = [3,0,1]",           output: "2" },
    { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
  ],
  testCases: [
    { input: "3 0 1",             expectedOutput: "2", isHidden: false },
    { input: "0 1",               expectedOutput: "2", isHidden: false },
    { input: "9 6 4 2 3 5 7 0 1", expectedOutput: "8", isHidden: true  },
    { input: "0",                 expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "easy", topic: "arrays",
  tags: ["Array","Divide and Conquer","Dynamic Programming"],
  description: "Given an integer array `nums`, find the subarray with the largest sum and return its sum.",
  examples: [
    { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] = 6" },
    { input: "nums = [1]", output: "1" },
  ],
  testCases: [
    { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6",  isHidden: false },
    { input: "1",                      expectedOutput: "1",  isHidden: false },
    { input: "5 4 -1 7 8",             expectedOutput: "23", isHidden: true  },
    { input: "-1 -2 -3",               expectedOutput: "-1", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Move Zeroes", slug: "move-zeroes", difficulty: "easy", topic: "arrays",
  tags: ["Array","Two Pointers"],
  description: "Given an integer array `nums`, move all `0`s to the end while maintaining relative order of non-zero elements. Print the result space-separated.",
  examples: [
    { input: "nums = [0,1,0,3,12]", output: "1 3 12 0 0" },
    { input: "nums = [0]",          output: "0" },
  ],
  testCases: [
    { input: "0 1 0 3 12",       expectedOutput: "1 3 12 0 0",    isHidden: false },
    { input: "0",                expectedOutput: "0",             isHidden: false },
    { input: "1 0 0 2 0 3",      expectedOutput: "1 2 3 0 0 0",  isHidden: true  },
    { input: "4 2 4 0 0 3 0 5 1 0", expectedOutput: "4 2 4 3 5 1 0 0 0 0", isHidden: true },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\nprint(*nums)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n    for(int i=0;i<(int)nums.size();i++) cout<<nums[i]<<\" \\n\"[i==(int)nums.size()-1];\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n        StringBuilder sb=new StringBuilder();\n        for(int i=0;i<nums.length;i++){if(i>0)sb.append(\" \");sb.append(nums[i]);}\n        System.out.println(sb);\n    }\n}\n",
  },
},
{
  title: "Squares of a Sorted Array", slug: "squares-of-a-sorted-array", difficulty: "easy", topic: "arrays",
  tags: ["Array","Two Pointers","Sorting"],
  description: "Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order. Print space-separated.",
  examples: [
    { input: "nums = [-4,-1,0,3,10]", output: "0 1 9 16 100" },
    { input: "nums = [-7,-3,2,3,11]", output: "4 9 9 49 121" },
  ],
  testCases: [
    { input: "-4 -1 0 3 10", expectedOutput: "0 1 9 16 100",  isHidden: false },
    { input: "-7 -3 2 3 11", expectedOutput: "4 9 9 49 121",  isHidden: false },
    { input: "-5 -3 -2 -1",  expectedOutput: "1 4 9 25",      isHidden: true  },
    { input: "1 2 3",        expectedOutput: "1 4 9",          isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Running Sum of 1d Array", slug: "running-sum-of-1d-array", difficulty: "easy", topic: "arrays",
  tags: ["Array","Prefix Sum"],
  description: "Given an array `nums`, return the running sum where `runningSum[i] = sum(nums[0]...nums[i])`. Print space-separated.",
  examples: [
    { input: "nums = [1,2,3,4]",   output: "1 3 6 10" },
    { input: "nums = [1,1,1,1,1]", output: "1 2 3 4 5" },
  ],
  testCases: [
    { input: "1 2 3 4",   expectedOutput: "1 3 6 10",    isHidden: false },
    { input: "1 1 1 1 1", expectedOutput: "1 2 3 4 5",   isHidden: false },
    { input: "3 1 2 10 1",expectedOutput: "3 4 6 16 17", isHidden: true  },
    { input: "5",         expectedOutput: "5",            isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Find Pivot Index", slug: "find-pivot-index", difficulty: "easy", topic: "arrays",
  tags: ["Array","Prefix Sum"],
  description: "Given `nums`, find the pivot index where the sum of all numbers to the left equals the sum to the right. Return the leftmost such index, or `-1` if none.",
  examples: [
    { input: "nums = [1,7,3,6,5,6]", output: "3" },
    { input: "nums = [1,2,3]",       output: "-1" },
  ],
  testCases: [
    { input: "1 7 3 6 5 6", expectedOutput: "3",  isHidden: false },
    { input: "1 2 3",       expectedOutput: "-1", isHidden: false },
    { input: "2 1 -1",      expectedOutput: "0",  isHidden: true  },
    { input: "0",           expectedOutput: "0",  isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Majority Element", slug: "majority-element", difficulty: "easy", topic: "arrays",
  tags: ["Array","Hash Table","Divide and Conquer","Sorting"],
  description: "Given array `nums` of size `n`, return the majority element (appears more than `n/2` times). It always exists.",
  examples: [
    { input: "nums = [3,2,3]",           output: "3" },
    { input: "nums = [2,2,1,1,1,2,2]",   output: "2" },
  ],
  testCases: [
    { input: "3 2 3",       expectedOutput: "3", isHidden: false },
    { input: "2 2 1 1 1 2 2", expectedOutput: "2", isHidden: false },
    { input: "6 5 5",       expectedOutput: "5", isHidden: true  },
    { input: "1 1 1 2 2",   expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── MEDIUM ───
{
  title: "Product of Array Except Self", slug: "product-of-array-except-self", difficulty: "medium", topic: "arrays",
  tags: ["Array","Prefix Sum"],
  description: "Given integer array `nums`, return array where `answer[i]` is the product of all elements except `nums[i]`. No division. O(n) time. Print space-separated.",
  examples: [
    { input: "nums = [1,2,3,4]",       output: "24 12 8 6" },
    { input: "nums = [-1,1,0,-3,3]",   output: "0 0 9 0 0" },
  ],
  testCases: [
    { input: "1 2 3 4",   expectedOutput: "24 12 8 6", isHidden: false },
    { input: "-1 1 0 -3 3", expectedOutput: "0 0 9 0 0", isHidden: false },
    { input: "2 3 4 5",   expectedOutput: "60 40 30 24", isHidden: true },
    { input: "1 0",       expectedOutput: "0 1",        isHidden: true },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "3Sum", slug: "3sum", difficulty: "medium", topic: "arrays",
  tags: ["Array","Two Pointers","Sorting"],
  description: "Given integer array `nums`, return all unique triplets that sum to 0. Print each triplet space-separated on a new line (sorted). Sort triplets lexicographically. Empty output if none.",
  examples: [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "-1 -1 2\n-1 0 1" },
    { input: "nums = [0,0,0]",          output: "0 0 0" },
  ],
  testCases: [
    { input: "-1 0 1 2 -1 -4", expectedOutput: "-1 -1 2\n-1 0 1", isHidden: false },
    { input: "0 0 0",          expectedOutput: "0 0 0",            isHidden: false },
    { input: "0 1 1",          expectedOutput: "",                  isHidden: true  },
    { input: "-2 0 1 1 2",     expectedOutput: "-2 0 2\n-2 1 1",   isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Container With Most Water", slug: "container-with-most-water", difficulty: "medium", topic: "arrays",
  tags: ["Array","Two Pointers","Greedy"],
  description: "Given integer array `height` of length `n`, find two lines that together with the x-axis forms a container holding the most water. Return the max water.",
  examples: [
    { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
    { input: "height = [1,1]",                output: "1" },
  ],
  testCases: [
    { input: "1 8 6 2 5 4 8 3 7", expectedOutput: "49", isHidden: false },
    { input: "1 1",               expectedOutput: "1",  isHidden: false },
    { input: "4 3 2 1 4",         expectedOutput: "16", isHidden: true  },
    { input: "1 2 1",             expectedOutput: "2",  isHidden: true  },
  ],
  starterCode: {
    python: "height = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> h;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) h.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] height=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Jump Game", slug: "jump-game", difficulty: "medium", topic: "arrays",
  tags: ["Array","Dynamic Programming","Greedy"],
  description: "Given integer array `nums` where `nums[i]` is your max jump from index `i`, return `true` if you can reach the last index starting from index 0.",
  examples: [
    { input: "nums = [2,3,1,1,4]", output: "true" },
    { input: "nums = [3,2,1,0,4]", output: "false" },
  ],
  testCases: [
    { input: "2 3 1 1 4", expectedOutput: "true",  isHidden: false },
    { input: "3 2 1 0 4", expectedOutput: "false", isHidden: false },
    { input: "0",         expectedOutput: "true",  isHidden: true  },
    { input: "1 0 2",     expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Merge Intervals", slug: "merge-intervals", difficulty: "medium", topic: "arrays",
  tags: ["Array","Sorting"],
  description: "Given an array of intervals, merge all overlapping intervals and return the non-overlapping result.\n\nInput: line 1 is n, then n lines each `start end`. Output each merged interval on its own line.",
  examples: [
    { input: "4\n1 3\n2 6\n8 10\n15 18", output: "1 6\n8 10\n15 18" },
    { input: "2\n1 4\n4 5",              output: "1 5" },
  ],
  testCases: [
    { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "1 6\n8 10\n15 18", isHidden: false },
    { input: "2\n1 4\n4 5",              expectedOutput: "1 5",              isHidden: false },
    { input: "1\n1 4",                   expectedOutput: "1 4",              isHidden: true  },
    { input: "3\n1 4\n2 3\n5 7",         expectedOutput: "1 4\n5 7",         isHidden: true  },
  ],
  starterCode: {
    python: "n = int(input())\nintervals = [list(map(int, input().split())) for _ in range(n)]\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<pair<int,int>> intervals(n);\n    for(auto& p : intervals) cin>>p.first>>p.second;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt();\n        int[][] intervals=new int[n][2];\n        for(int i=0;i<n;i++){intervals[i][0]=sc.nextInt();intervals[i][1]=sc.nextInt();}\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Sort Colors", slug: "sort-colors", difficulty: "medium", topic: "arrays",
  tags: ["Array","Two Pointers","Sorting"],
  description: "Given array `nums` of 0s (red), 1s (white), 2s (blue), sort in-place so same colors are adjacent in red-white-blue order. No library sort. Print result space-separated.",
  examples: [
    { input: "nums = [2,0,2,1,1,0]", output: "0 0 1 1 2 2" },
    { input: "nums = [2,0,1]",       output: "0 1 2" },
  ],
  testCases: [
    { input: "2 0 2 1 1 0", expectedOutput: "0 0 1 1 2 2", isHidden: false },
    { input: "2 0 1",       expectedOutput: "0 1 2",        isHidden: false },
    { input: "0",           expectedOutput: "0",            isHidden: true  },
    { input: "1 2 0 2 1 0 0", expectedOutput: "0 0 0 1 1 2 2", isHidden: true },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\nprint(*nums)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n    for(int i=0;i<(int)nums.size();i++) cout<<nums[i]<<\" \\n\"[i==(int)nums.size()-1];\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n        StringBuilder sb=new StringBuilder();\n        for(int i=0;i<nums.length;i++){if(i>0)sb.append(\" \");sb.append(nums[i]);}\n        System.out.println(sb);\n    }\n}\n",
  },
},
{
  title: "Subarray Sum Equals K", slug: "subarray-sum-equals-k", difficulty: "medium", topic: "arrays",
  tags: ["Array","Hash Table","Prefix Sum"],
  description: "Given integer array `nums` and integer `k`, return the total number of subarrays whose sum equals `k`.\n\nInput: line 1 is nums, line 2 is k.",
  examples: [
    { input: "1 1 1\n2", output: "2" },
    { input: "1 2 3\n3", output: "2" },
  ],
  testCases: [
    { input: "1 1 1\n2",   expectedOutput: "2", isHidden: false },
    { input: "1 2 3\n3",   expectedOutput: "2", isHidden: false },
    { input: "1\n0",       expectedOutput: "0", isHidden: true  },
    { input: "-1 -1 1\n0", expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\nk = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    int k; cin>>k;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int k=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Find the Duplicate Number", slug: "find-the-duplicate-number", difficulty: "medium", topic: "arrays",
  tags: ["Array","Two Pointers","Bit Manipulation"],
  description: "Given array `nums` of `n+1` integers in range `[1,n]` with exactly one duplicate, return the duplicate. O(1) space, no modifying the array.",
  examples: [
    { input: "nums = [1,3,4,2,2]", output: "2" },
    { input: "nums = [3,1,3,4,2]", output: "3" },
  ],
  testCases: [
    { input: "1 3 4 2 2",           expectedOutput: "2", isHidden: false },
    { input: "3 1 3 4 2",           expectedOutput: "3", isHidden: false },
    { input: "1 1",                 expectedOutput: "1", isHidden: true  },
    { input: "2 5 9 6 9 3 8 9 7 1", expectedOutput: "9", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Rotate Array", slug: "rotate-array", difficulty: "medium", topic: "arrays",
  tags: ["Array","Math","Two Pointers"],
  description: "Given integer array `nums`, rotate it right by `k` steps. Print result space-separated.\n\nInput: line 1 is nums, line 2 is k.",
  examples: [
    { input: "1 2 3 4 5 6 7\n3", output: "5 6 7 1 2 3 4" },
    { input: "-1 -100 3 99\n2",  output: "3 99 -1 -100" },
  ],
  testCases: [
    { input: "1 2 3 4 5 6 7\n3", expectedOutput: "5 6 7 1 2 3 4", isHidden: false },
    { input: "-1 -100 3 99\n2",  expectedOutput: "3 99 -1 -100",  isHidden: false },
    { input: "1 2\n3",           expectedOutput: "2 1",            isHidden: true  },
    { input: "1 2 3\n0",         expectedOutput: "1 2 3",          isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\nk = int(input())\n# Write your solution here\nprint(*nums)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    int k; cin>>k;\n    // Write your solution here\n    for(int i=0;i<(int)nums.size();i++) cout<<nums[i]<<\" \\n\"[i==(int)nums.size()-1];\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int k=sc.nextInt();\n        // Write your solution here\n        StringBuilder sb=new StringBuilder();\n        for(int i=0;i<nums.length;i++){if(i>0)sb.append(\" \");sb.append(nums[i]);}\n        System.out.println(sb);\n    }\n}\n",
  },
},
{
  title: "Top K Frequent Elements", slug: "top-k-frequent-elements", difficulty: "medium", topic: "arrays",
  tags: ["Array","Hash Table","Divide and Conquer","Sorting","Heap"],
  description: "Given integer array `nums` and integer `k`, return the `k` most frequent elements. Print in ascending order.\n\nInput: line 1 is nums, line 2 is k.",
  examples: [
    { input: "1 1 1 2 2 3\n2", output: "1 2" },
    { input: "1\n1",           output: "1" },
  ],
  testCases: [
    { input: "1 1 1 2 2 3\n2", expectedOutput: "1 2",  isHidden: false },
    { input: "1\n1",           expectedOutput: "1",    isHidden: false },
    { input: "4 1 -1 2 -1 2 3\n2", expectedOutput: "-1 2", isHidden: true },
    { input: "5 5 4 4 3\n2",   expectedOutput: "4 5", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\nk = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    int k; cin>>k;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int k=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── HARD ───
{
  title: "Trapping Rain Water", slug: "trapping-rain-water", difficulty: "hard", topic: "arrays",
  tags: ["Array","Two Pointers","Dynamic Programming","Stack","Monotonic Stack"],
  description: "Given `n` non-negative integers representing an elevation map (each bar width = 1), compute how much water it can trap after raining.",
  examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
    { input: "height = [4,2,0,3,2,5]",              output: "9" },
  ],
  testCases: [
    { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6", isHidden: false },
    { input: "4 2 0 3 2 5",             expectedOutput: "9", isHidden: false },
    { input: "3 0 2 0 4",               expectedOutput: "7", isHidden: true  },
    { input: "1 0 1",                   expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "height = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> h;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) h.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] height=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Sliding Window Maximum", slug: "sliding-window-maximum", difficulty: "hard", topic: "arrays",
  tags: ["Array","Queue","Sliding Window","Heap","Monotonic Queue"],
  description: "Given integer array `nums` and integer `k`, return the max value of each sliding window of size `k`. Print space-separated.\n\nInput: line 1 is nums, line 2 is k.",
  examples: [
    { input: "1 3 -1 -3 5 3 6 7\n3", output: "3 3 5 5 6 7" },
    { input: "1\n1",                  output: "1" },
  ],
  testCases: [
    { input: "1 3 -1 -3 5 3 6 7\n3", expectedOutput: "3 3 5 5 6 7", isHidden: false },
    { input: "1\n1",                  expectedOutput: "1",           isHidden: false },
    { input: "9 11\n2",               expectedOutput: "11",          isHidden: true  },
    { input: "4 -2 1 5 3 6\n3",       expectedOutput: "4 5 5 6",     isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\nk = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    int k; cin>>k;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int k=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "First Missing Positive", slug: "first-missing-positive", difficulty: "hard", topic: "arrays",
  tags: ["Array","Hash Table"],
  description: "Given unsorted integer array `nums`, return the smallest missing positive integer. Must run in O(n) time and O(1) auxiliary space.",
  examples: [
    { input: "nums = [1,2,0]",     output: "3" },
    { input: "nums = [3,4,-1,1]",  output: "2" },
  ],
  testCases: [
    { input: "1 2 0",       expectedOutput: "3", isHidden: false },
    { input: "3 4 -1 1",    expectedOutput: "2", isHidden: false },
    { input: "7 8 9 11 12", expectedOutput: "1", isHidden: true  },
    { input: "1 2 3",       expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram", difficulty: "hard", topic: "arrays",
  tags: ["Array","Stack","Monotonic Stack"],
  description: "Given integer array `heights` where each bar has width 1, return the area of the largest rectangle in the histogram.",
  examples: [
    { input: "heights = [2,1,5,6,2,3]", output: "10" },
    { input: "heights = [2,4]",          output: "4" },
  ],
  testCases: [
    { input: "2 1 5 6 2 3", expectedOutput: "10", isHidden: false },
    { input: "2 4",         expectedOutput: "4",  isHidden: false },
    { input: "6 2 5 4 5 1 6", expectedOutput: "12", isHidden: true },
    { input: "1 1 1 1",     expectedOutput: "4",  isHidden: true  },
  ],
  starterCode: {
    python: "heights = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> h;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) h.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] heights=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Longest Consecutive Sequence", slug: "longest-consecutive-sequence", difficulty: "hard", topic: "arrays",
  tags: ["Array","Hash Table","Union Find"],
  description: "Given unsorted array `nums`, return the length of the longest consecutive elements sequence. Must be O(n).",
  examples: [
    { input: "nums = [100,4,200,1,3,2]",           output: "4" },
    { input: "nums = [0,3,7,2,5,8,4,6,0,1]",       output: "9" },
  ],
  testCases: [
    { input: "100 4 200 1 3 2",       expectedOutput: "4", isHidden: false },
    { input: "0 3 7 2 5 8 4 6 0 1",   expectedOutput: "9", isHidden: false },
    { input: "1 2 0 1",               expectedOutput: "3", isHidden: true  },
    { input: "0",                     expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Maximum Product Subarray", slug: "maximum-product-subarray", difficulty: "hard", topic: "arrays",
  tags: ["Array","Dynamic Programming"],
  description: "Given integer array `nums`, find the subarray with the largest product and return the product.",
  examples: [
    { input: "nums = [2,3,-2,4]",  output: "6" },
    { input: "nums = [-2,0,-1]",   output: "0" },
  ],
  testCases: [
    { input: "2 3 -2 4",  expectedOutput: "6",  isHidden: false },
    { input: "-2 0 -1",   expectedOutput: "0",  isHidden: false },
    { input: "-2 3 -4",   expectedOutput: "24", isHidden: true  },
    { input: "0 2",       expectedOutput: "2",  isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Find Minimum in Rotated Sorted Array", slug: "find-minimum-in-rotated-sorted-array", difficulty: "hard", topic: "arrays",
  tags: ["Array","Binary Search"],
  description: "Given a sorted array rotated between 1 and n times, find the minimum element. Must be O(log n).",
  examples: [
    { input: "nums = [3,4,5,1,2]",        output: "1" },
    { input: "nums = [4,5,6,7,0,1,2]",    output: "0" },
  ],
  testCases: [
    { input: "3 4 5 1 2",       expectedOutput: "1",  isHidden: false },
    { input: "4 5 6 7 0 1 2",   expectedOutput: "0",  isHidden: false },
    { input: "11 13 15 17",     expectedOutput: "11", isHidden: true  },
    { input: "2 1",             expectedOutput: "1",  isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Count of Smaller Numbers After Self", slug: "count-of-smaller-numbers-after-self", difficulty: "hard", topic: "arrays",
  tags: ["Array","Binary Search","Divide and Conquer","Binary Indexed Tree","Merge Sort"],
  description: "Given integer array `nums`, return array `counts` where `counts[i]` is the number of smaller elements to the right of `nums[i]`. Print space-separated.",
  examples: [
    { input: "nums = [5,2,6,1]", output: "2 1 1 0" },
    { input: "nums = [-1]",      output: "0" },
  ],
  testCases: [
    { input: "5 2 6 1",   expectedOutput: "2 1 1 0",   isHidden: false },
    { input: "-1",        expectedOutput: "0",          isHidden: false },
    { input: "-1 -1",     expectedOutput: "0 0",        isHidden: true  },
    { input: "1 9 7 8 5", expectedOutput: "0 3 1 1 0", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "Jump Game II", slug: "jump-game-ii", difficulty: "hard", topic: "arrays",
  tags: ["Array","Dynamic Programming","Greedy"],
  description: "Given integer array `nums`, return the minimum number of jumps to reach the last index. `nums[i]` is your max jump from index `i`. You can always reach the end.",
  examples: [
    { input: "nums = [2,3,1,1,4]", output: "2" },
    { input: "nums = [2,3,0,1,4]", output: "2" },
  ],
  testCases: [
    { input: "2 3 1 1 4", expectedOutput: "2", isHidden: false },
    { input: "2 3 0 1 4", expectedOutput: "2", isHidden: false },
    { input: "1",         expectedOutput: "0", isHidden: true  },
    { input: "1 1 1 1",   expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here\n    }\n}\n",
  },
},
{
  title: "4Sum", slug: "4sum", difficulty: "hard", topic: "arrays",
  tags: ["Array","Two Pointers","Sorting"],
  description: "Given integer array `nums` and integer `target`, return all unique quadruplets `[a,b,c,d]` such that `a+b+c+d == target`. Print each quadruplet space-separated on a new line, sorted lexicographically.\n\nInput: line 1 is nums, line 2 is target.",
  examples: [
    { input: "1 0 -1 0 -2 2\n0", output: "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1" },
    { input: "2 2 2 2 2\n8",     output: "2 2 2 2" },
  ],
  testCases: [
    { input: "1 0 -1 0 -2 2\n0", expectedOutput: "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1", isHidden: false },
    { input: "2 2 2 2 2\n8",     expectedOutput: "2 2 2 2",                         isHidden: false },
    { input: "0 0 0 0\n0",       expectedOutput: "0 0 0 0",                         isHidden: true  },
    { input: "1 2 3 4\n100",     expectedOutput: "",                                isHidden: true  },
  ],
  starterCode: {
    python: "nums = list(map(int, input().split()))\ntarget = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    vector<int> nums;\n    string line; getline(cin,line);\n    istringstream ss(line);\n    int x; while(ss>>x) nums.push_back(x);\n    long long target; cin>>target;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main{\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] nums=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int target=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Remove existing array problems to avoid duplicates
  await Problem.deleteMany({ topic: 'arrays' });
  console.log('Cleared existing array problems');

  const inserted = await Problem.insertMany(problems);
  console.log(`✅ Inserted ${inserted.length} array problems`);

  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });