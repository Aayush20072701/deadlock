require('dotenv').config();
const mongoose = require('mongoose');
const Problem  = require('./models/Problem');
const User     = require('./models/User');
const bcrypt   = require('bcryptjs');

const problems = [
  {
    title: 'Two Sum',
    slug:  'two-sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nReturn the answer in any order.`,
    difficulty: 'easy',
    tags: ['array', 'hash-table'],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9' },
      { input: 'nums = [3,2,4], target = 6',     output: '[1,2]', explanation: '' },
    ],
    testCases: [
      { input: '2 7 11 15\n9', expectedOutput: '0 1', isHidden: false },
      { input: '3 2 4\n6',     expectedOutput: '1 2', isHidden: false },
      { input: '3 3\n6',       expectedOutput: '0 1', isHidden: true  },
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Your code here
    pass

import sys
data = sys.stdin.read().split()
n = len(data) - 1
nums = list(map(int, data[:n]))
target = int(data[n])
result = twoSum(nums, target)
print(*result)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}

int main() {
    vector<int> nums;
    int x;
    string line;
    getline(cin, line);
    istringstream iss(line);
    while (iss >> x) nums.push_back(x);
    int target; cin >> target;
    auto res = twoSum(nums, target);
    cout << res[0] << " " << res[1] << endl;
}`,
      java: `import java.util.*;

public class Main {
    static int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().trim().split(" ");
        int[] nums = Arrays.stream(parts).mapToInt(Integer::parseInt).toArray();
        int target = sc.nextInt();
        int[] res = twoSum(nums, target);
        System.out.println(res[0] + " " + res[1]);
    }
}`,
    },
  },
  {
    title: 'Valid Parentheses',
    slug:  'valid-parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: 'easy',
    tags: ['string', 'stack'],
    examples: [
      { input: 's = "()"',     output: 'true',  explanation: '' },
      { input: 's = "()[]{}"', output: 'true',  explanation: '' },
      { input: 's = "(]"',     output: 'false', explanation: '' },
    ],
    testCases: [
      { input: '()',      expectedOutput: 'true',  isHidden: false },
      { input: '()[{}]',  expectedOutput: 'true',  isHidden: false },
      { input: '(]',      expectedOutput: 'false', isHidden: true  },
      { input: '{[()]}',  expectedOutput: 'true',  isHidden: true  },
    ],
    starterCode: {
      python: `def isValid(s):
    # Your code here
    pass

import sys
s = sys.stdin.read().strip()
print(str(isValid(s)).lower())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    // Your code here
    return false;
}

int main() {
    string s; cin >> s;
    cout << (isValid(s) ? "true" : "false") << endl;
}`,
      java: `import java.util.*;

public class Main {
    static boolean isValid(String s) {
        // Your code here
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        System.out.println(isValid(s));
    }
}`,
    },
  },
  {
    title: 'Maximum Subarray',
    slug:  'maximum-subarray',
    description: `Given an integer array nums, find the subarray with the largest sum and return its sum.`,
    difficulty: 'medium',
    tags: ['array', 'dynamic-programming'],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6',  explanation: 'Subarray [4,-1,2,1] has sum 6' },
      { input: 'nums = [1]',                       output: '1',  explanation: '' },
    ],
    testCases: [
      { input: '-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6',  isHidden: false },
      { input: '1',                      expectedOutput: '1',  isHidden: false },
      { input: '5 4 -1 7 8',            expectedOutput: '23', isHidden: true  },
      { input: '-1 -2 -3',              expectedOutput: '-1', isHidden: true  },
    ],
    starterCode: {
      python: `def maxSubArray(nums):
    # Your code here
    pass

import sys
nums = list(map(int, sys.stdin.read().split()))
print(maxSubArray(nums))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Your code here
    return 0;
}

int main() {
    vector<int> nums;
    int x;
    while (cin >> x) nums.push_back(x);
    cout << maxSubArray(nums) << endl;
}`,
      java: `import java.util.*;

public class Main {
    static int maxSubArray(int[] nums) {
        // Your code here
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int[] nums = list.stream().mapToInt(i->i).toArray();
        System.out.println(maxSubArray(nums));
    }
}`,
    },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  await Problem.deleteMany({});
  await Problem.insertMany(problems);
  console.log(`✅ Seeded ${problems.length} problems`);

  // Create demo users
  const hash = await bcrypt.hash('password123', 10);
  await User.findOneAndUpdate(
    { email: 'alice@deadlock.gg' },
    { username: 'alice', email: 'alice@deadlock.gg', passwordHash: hash, rating: 1250, wins: 15, losses: 5 },
    { upsert: true }
  );
  await User.findOneAndUpdate(
    { email: 'bob@deadlock.gg' },
    { username: 'bob', email: 'bob@deadlock.gg', passwordHash: hash, rating: 1100, wins: 8, losses: 10 },
    { upsert: true }
  );
  console.log('✅ Seeded demo users (alice / bob, password: password123)');

  await mongoose.disconnect();
  console.log('🎉 Seed complete!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
