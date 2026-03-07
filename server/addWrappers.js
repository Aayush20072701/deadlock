require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const wrappers = {
  'two-sum': {
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <sstream>
using namespace std;
SOLUTION_CODE
int main() {
    string numsLine, targetLine;
    getline(cin, numsLine);
    getline(cin, targetLine);
    int target = stoi(targetLine);
    vector<int> nums;
    stringstream ss(numsLine.substr(1, numsLine.size()-2));
    string token;
    while(getline(ss, token, ',')) nums.push_back(stoi(token));
    Solution sol;
    auto res = sol.twoSum(nums, target);
    cout << "[" << res[0] << "," << res[1] << "]" << endl;
    return 0;
}`,
    python: `SOLUTION_CODE
import sys
lines = sys.stdin.read().strip().split('\n')
nums = list(map(int, lines[0].strip('[]').split(',')))
target = int(lines[1])
sol = Solution()
print(sol.twoSum(nums, target))`,
    java: `import java.util.*;
SOLUTION_CODE
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String numsLine = sc.nextLine().trim();
        int target = Integer.parseInt(sc.nextLine().trim());
        numsLine = numsLine.substring(1, numsLine.length()-1);
        String[] parts = numsLine.split(",");
        int[] nums = new int[parts.length];
        for(int i=0;i<parts.length;i++) nums[i] = Integer.parseInt(parts[i].trim());
        Solution sol = new Solution();
        int[] res = sol.twoSum(nums, target);
        System.out.println("[" + res[0] + "," + res[1] + "]");
    }
}`
  },
  'valid-parentheses': {
    cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;
SOLUTION_CODE
int main() {
    string s;
    getline(cin, s);
    Solution sol;
    cout << (sol.isValid(s) ? "true" : "false") << endl;
    return 0;
}`,
    python: `SOLUTION_CODE
import sys
s = sys.stdin.read().strip()
sol = Solution()
print(str(sol.isValid(s)).lower())`,
    java: `import java.util.*;
SOLUTION_CODE
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        Solution sol = new Solution();
        System.out.println(sol.isValid(s));
    }
}`
  },
  'maximum-subarray': {
    cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <climits>
using namespace std;
SOLUTION_CODE
int main() {
    string line;
    getline(cin, line);
    vector<int> nums;
    stringstream ss(line.substr(1, line.size()-2));
    string token;
    while(getline(ss, token, ',')) nums.push_back(stoi(token));
    Solution sol;
    cout << sol.maxSubArray(nums) << endl;
    return 0;
}`,
    python: `SOLUTION_CODE
import sys
nums = list(map(int, sys.stdin.read().strip().strip('[]').split(',')))
sol = Solution()
print(sol.maxSubArray(nums))`,
    java: `import java.util.*;
SOLUTION_CODE
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length()-1);
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for(int i=0;i<parts.length;i++) nums[i] = Integer.parseInt(parts[i].trim());
        Solution sol = new Solution();
        System.out.println(sol.maxSubArray(nums));
    }
}`
  },
};

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected');

  for (const [slug, wrapper] of Object.entries(wrappers)) {
    const result = await Problem.findOneAndUpdate(
      { slug },
      { $set: { codeWrapper: wrapper, topic: slug === 'valid-parentheses' ? 'stack' : 'arrays' } },
      { new: true }
    );
    if (result) console.log('✅ Updated:', result.title);
    else console.log('❌ Not found:', slug);
  }

  await mongoose.disconnect();
  console.log('Done!');
}

main().catch(console.error);