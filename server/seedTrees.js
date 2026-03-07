// Run: node seedTrees.js
// Seeds 30 Tree problems into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const problems = [

// ─── EASY (10) ───

{
  title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\nInput: space-separated level-order values where `null` represents missing nodes.",
  examples: [
    { input: "3 9 20 null null 15 7", output: "3" },
    { input: "1 null 2",              output: "2" },
  ],
  testCases: [
    { input: "3 9 20 null null 15 7", expectedOutput: "3", isHidden: false },
    { input: "1 null 2",              expectedOutput: "2", isHidden: false },
    { input: "1",                     expectedOutput: "1", isHidden: true  },
    { input: "1 2 3 4 5 null null",   expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2);\n    return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2);\n        return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Invert Binary Tree", slug: "invert-binary-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, invert the tree (mirror it), and return its root. Print the level-order traversal of the result, using `null` for missing nodes (omit trailing nulls).",
  examples: [
    { input: "4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1" },
    { input: "2 1 3",         output: "2 3 1" },
    { input: "1",             output: "1" },
  ],
  testCases: [
    { input: "4 2 7 1 3 6 9", expectedOutput: "4 7 2 9 6 3 1", isHidden: false },
    { input: "2 1 3",         expectedOutput: "2 3 1",          isHidden: false },
    { input: "1",             expectedOutput: "1",              isHidden: true  },
    { input: "3 1 2",         expectedOutput: "3 2 1",          isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here — then print level-order, space-separated\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Symmetric Tree", slug: "symmetric-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center). Return `true` or `false`.",
  examples: [
    { input: "1 2 2 3 4 4 3",      output: "true" },
    { input: "1 2 2 null 3 null 3", output: "false" },
  ],
  testCases: [
    { input: "1 2 2 3 4 4 3",           expectedOutput: "true",  isHidden: false },
    { input: "1 2 2 null 3 null 3",     expectedOutput: "false", isHidden: false },
    { input: "1",                        expectedOutput: "true",  isHidden: true  },
    { input: "1 2 2 null null null null", expectedOutput: "true", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Diameter of Binary Tree", slug: "diameter-of-binary-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, return the length of the diameter — the longest path between any two nodes (the path may or may not pass through the root). The length is measured in number of edges.",
  examples: [
    { input: "1 2 3 4 5", output: "3", explanation: "Path: 4->2->1->3 or 5->2->1->3" },
    { input: "1 2",       output: "1" },
  ],
  testCases: [
    { input: "1 2 3 4 5",          expectedOutput: "3", isHidden: false },
    { input: "1 2",                 expectedOutput: "1", isHidden: false },
    { input: "1",                   expectedOutput: "0", isHidden: true  },
    { input: "1 2 3 null null 4 5", expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Path Sum", slug: "path-sum", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree and an integer `targetSum`, return `true` if there is a root-to-leaf path such that the sum of node values equals `targetSum`.\n\nInput: line 1 is level-order tree, line 2 is targetSum.",
  examples: [
    { input: "5 4 8 11 null 13 4 7 2 null null null 1\n22", output: "true" },
    { input: "1 2 3\n5",                                    output: "false" },
    { input: "null\n0",                                     output: "false" },
  ],
  testCases: [
    { input: "5 4 8 11 null 13 4 7 2 null null null 1\n22", expectedOutput: "true",  isHidden: false },
    { input: "1 2 3\n5",                                    expectedOutput: "false", isHidden: false },
    { input: "1 2\n1",                                      expectedOutput: "false", isHidden: true  },
    { input: "1 2\n3",                                      expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\ntargetSum = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    int targetSum; cin >> targetSum;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        int targetSum=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Same Tree", slug: "same-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the roots of two binary trees `p` and `q`, return `true` if they are structurally identical with the same node values.\n\nInput: two lines, each with level-order values.",
  examples: [
    { input: "1 2 3\n1 2 3",  output: "true" },
    { input: "1 2\n1 null 2", output: "false" },
    { input: "1 2 1\n1 1 2",  output: "false" },
  ],
  testCases: [
    { input: "1 2 3\n1 2 3",  expectedOutput: "true",  isHidden: false },
    { input: "1 2\n1 null 2", expectedOutput: "false", isHidden: false },
    { input: "1 2 1\n1 1 2",  expectedOutput: "false", isHidden: true  },
    { input: "null\nnull",     expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\np = build_tree(input().split())\nq = build_tree(input().split())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l1,l2; getline(cin,l1); getline(cin,l2);\n    auto parse=[](string& l){ istringstream ss(l); string t; vector<string> v; while(ss>>t) v.push_back(t); return v; };\n    auto vp=parse(l1), vq=parse(l2);\n    TreeNode* p=build(vp,0); TreeNode* q=build(vq,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode p=build(sc.nextLine().split(\" \"),0);\n        TreeNode q=build(sc.nextLine().split(\" \"),0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Subtree of Another Tree", slug: "subtree-of-another-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","String Matching","Binary Tree","Hash Function"],
  description: "Given roots of two trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and values as `subRoot`.\n\nInput: two lines — level-order values for root, then subRoot.",
  examples: [
    { input: "3 4 5 1 2\n4 1 2",                  output: "true" },
    { input: "3 4 5 1 2 null null null 0\n4 1 2", output: "false" },
  ],
  testCases: [
    { input: "3 4 5 1 2\n4 1 2",                  expectedOutput: "true",  isHidden: false },
    { input: "3 4 5 1 2 null null null 0\n4 1 2", expectedOutput: "false", isHidden: false },
    { input: "1\n1",                               expectedOutput: "true",  isHidden: true  },
    { input: "1 2 3\n2",                           expectedOutput: "true",  isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot    = build_tree(input().split())\nsubRoot = build_tree(input().split())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l1,l2; getline(cin,l1); getline(cin,l2);\n    auto parse=[](string& l){ istringstream ss(l); string t; vector<string> v; while(ss>>t) v.push_back(t); return v; };\n    auto vr=parse(l1), vs=parse(l2);\n    TreeNode* root=build(vr,0); TreeNode* subRoot=build(vs,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode root=build(sc.nextLine().split(\" \"),0);\n        TreeNode subRoot=build(sc.nextLine().split(\" \"),0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Balanced Binary Tree", slug: "balanced-binary-tree", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Tree"],
  description: "Given a binary tree, determine if it is height-balanced — where no node's left and right subtrees differ in height by more than one. Return `true` or `false`.",
  examples: [
    { input: "3 9 20 null null 15 7",   output: "true" },
    { input: "1 2 2 3 3 null null 4 4", output: "false" },
  ],
  testCases: [
    { input: "3 9 20 null null 15 7",    expectedOutput: "true",  isHidden: false },
    { input: "1 2 2 3 3 null null 4 4",  expectedOutput: "false", isHidden: false },
    { input: "null",                      expectedOutput: "true",  isHidden: true  },
    { input: "1 2 3 4 null null null 5",  expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Merge Two Binary Trees", slug: "merge-two-binary-trees", difficulty: "easy", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Merge two binary trees by overlapping them. For overlapping nodes, sum their values. Print the level-order traversal of the merged tree, omitting trailing nulls.\n\nInput: two lines — level-order values for each tree.",
  examples: [
    { input: "1 3 2 5\n2 1 3 null 4 null 7", output: "3 4 5 5 4 null 7" },
    { input: "1\n1 2",                        output: "2 2" },
  ],
  testCases: [
    { input: "1 3 2 5\n2 1 3 null 4 null 7", expectedOutput: "3 4 5 5 4 null 7", isHidden: false },
    { input: "1\n1 2",                        expectedOutput: "2 2",              isHidden: false },
    { input: "null\n1",                       expectedOutput: "1",                isHidden: true  },
    { input: "1 2\nnull",                     expectedOutput: "1 2",              isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot1 = build_tree(input().split())\nroot2 = build_tree(input().split())\n# Write your solution here — print level-order of merged tree\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l1,l2; getline(cin,l1); getline(cin,l2);\n    auto parse=[](string& l){ istringstream ss(l); string t; vector<string> v; while(ss>>t) v.push_back(t); return v; };\n    auto v1=parse(l1), v2=parse(l2);\n    TreeNode* r1=build(v1,0); TreeNode* r2=build(v2,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode r1=build(sc.nextLine().split(\" \"),0);\n        TreeNode r2=build(sc.nextLine().split(\" \"),0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Search in a Binary Search Tree", slug: "search-in-a-bst", difficulty: "easy", topic: "trees",
  tags: ["Tree","Binary Search Tree","Binary Tree"],
  description: "Given the root of a BST and an integer `val`, find the node with value `val`. Return the subtree rooted at that node (print its level-order), or `null` if not found.\n\nInput: line 1 is level-order BST, line 2 is val.",
  examples: [
    { input: "4 2 7 1 3\n2", output: "2 1 3" },
    { input: "4 2 7 1 3\n5", output: "null" },
  ],
  testCases: [
    { input: "4 2 7 1 3\n2", expectedOutput: "2 1 3", isHidden: false },
    { input: "4 2 7 1 3\n5", expectedOutput: "null",  isHidden: false },
    { input: "1\n1",         expectedOutput: "1",     isHidden: true  },
    { input: "4 2 7\n7",     expectedOutput: "7",     isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot = build_tree(input().split())\nval  = int(input())\n# Write your solution here — print level-order of found subtree or 'null'\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    int val; cin >> val;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode root=build(sc.nextLine().split(\" \"),0);\n        int val=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── MEDIUM (10) ───

{
  title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", difficulty: "medium", topic: "trees",
  tags: ["Tree","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, return its level-order traversal. Print each level on a new line with values space-separated.",
  examples: [
    { input: "3 9 20 null null 15 7", output: "3\n9 20\n15 7" },
    { input: "1",                     output: "1" },
    { input: "null",                  output: "" },
  ],
  testCases: [
    { input: "3 9 20 null null 15 7", expectedOutput: "3\n9 20\n15 7", isHidden: false },
    { input: "1",                     expectedOutput: "1",             isHidden: false },
    { input: "null",                  expectedOutput: "",              isHidden: true  },
    { input: "1 2 3 4 5",             expectedOutput: "1\n2 3\n4 5",  isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here — print each level on its own line\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Binary Tree Right Side View", slug: "binary-tree-right-side-view", difficulty: "medium", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, imagine standing on the right side — return the values of the nodes you can see ordered top to bottom. Print space-separated.",
  examples: [
    { input: "1 2 3 null 5 null 4", output: "1 3 4" },
    { input: "1 null 3",            output: "1 3" },
    { input: "null",                output: "" },
  ],
  testCases: [
    { input: "1 2 3 null 5 null 4", expectedOutput: "1 3 4", isHidden: false },
    { input: "1 null 3",            expectedOutput: "1 3",   isHidden: false },
    { input: "null",                expectedOutput: "",      isHidden: true  },
    { input: "1 2 3 4",             expectedOutput: "1 3 4", isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Lowest Common Ancestor of a BST", slug: "lowest-common-ancestor-bst", difficulty: "medium", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Search Tree","Binary Tree"],
  description: "Given a BST and two node values `p` and `q`, find their lowest common ancestor (the deepest node that has both as descendants, inclusive).\n\nInput: line 1 is level-order BST, line 2 is p, line 3 is q.",
  examples: [
    { input: "6 2 8 0 4 7 9 null null 3 5\n2\n8", output: "6" },
    { input: "6 2 8 0 4 7 9 null null 3 5\n2\n4", output: "2" },
  ],
  testCases: [
    { input: "6 2 8 0 4 7 9 null null 3 5\n2\n8", expectedOutput: "6", isHidden: false },
    { input: "6 2 8 0 4 7 9 null null 3 5\n2\n4", expectedOutput: "2", isHidden: false },
    { input: "2 1 3\n1\n3",                        expectedOutput: "2", isHidden: true  },
    { input: "2 1 3\n1\n2",                        expectedOutput: "2", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot = build_tree(input().split())\np = int(input())\nq = int(input())\n# Write your solution here — print the val of the LCA node\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    int p, q; cin >> p >> q;\n    // Write your solution here — print LCA val\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode root=build(sc.nextLine().split(\" \"),0);\n        int p=sc.nextInt(), q=sc.nextInt();\n        // Write your solution here — print LCA val\n    }\n}\n",
  },
},

{
  title: "Binary Tree Zigzag Level Order Traversal", slug: "binary-tree-zigzag-level-order", difficulty: "medium", topic: "trees",
  tags: ["Tree","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, return its zigzag level-order traversal — alternating left-to-right then right-to-left. Print each level on a new line.",
  examples: [
    { input: "3 9 20 null null 15 7", output: "3\n20 9\n15 7" },
    { input: "1",                     output: "1" },
    { input: "null",                  output: "" },
  ],
  testCases: [
    { input: "3 9 20 null null 15 7", expectedOutput: "3\n20 9\n15 7", isHidden: false },
    { input: "1",                     expectedOutput: "1",             isHidden: false },
    { input: "null",                  expectedOutput: "",              isHidden: true  },
    { input: "1 2 3 4 5",             expectedOutput: "1\n3 2\n4 5",  isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Construct Binary Tree from Preorder and Inorder", slug: "construct-binary-tree-preorder-inorder", difficulty: "medium", topic: "trees",
  tags: ["Array","Hash Table","Divide and Conquer","Tree","Binary Tree"],
  description: "Given `preorder` and `inorder` traversal arrays of a binary tree, construct and return the binary tree. Print the level-order traversal of the result.\n\nInput: two lines — preorder values, then inorder values.",
  examples: [
    { input: "3 9 20 15 7\n9 3 15 20 7", output: "3 9 20 null null 15 7" },
    { input: "-1\n-1",                    output: "-1" },
  ],
  testCases: [
    { input: "3 9 20 15 7\n9 3 15 20 7", expectedOutput: "3 9 20 null null 15 7", isHidden: false },
    { input: "-1\n-1",                    expectedOutput: "-1",                    isHidden: false },
    { input: "1 2\n2 1",                  expectedOutput: "1 2",                  isHidden: true  },
    { input: "1 2 3\n2 1 3",              expectedOutput: "1 2 3",                isHidden: true  },
  ],
  starterCode: {
    python: "preorder = list(map(int, input().split()))\ninorder  = list(map(int, input().split()))\n# Write your solution here — print level-order of constructed tree\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nint main(){\n    string l1,l2; getline(cin,l1); getline(cin,l2);\n    auto parse=[](string& l){ istringstream ss(l); int x; vector<int> v; while(ss>>x) v.push_back(x); return v; };\n    vector<int> pre=parse(l1), ino=parse(l2);\n    // Write your solution here — print level-order\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int[] pre=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        int[] ino=Arrays.stream(sc.nextLine().split(\" \")).mapToInt(Integer::parseInt).toArray();\n        // Write your solution here — print level-order\n    }\n}\n",
  },
},

{
  title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", difficulty: "medium", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Search Tree","Binary Tree"],
  description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). Return `true` or `false`. In a valid BST, left subtree values are strictly less than the node, and right subtree values are strictly greater.",
  examples: [
    { input: "2 1 3",               output: "true" },
    { input: "5 1 4 null null 3 6", output: "false" },
  ],
  testCases: [
    { input: "2 1 3",               expectedOutput: "true",  isHidden: false },
    { input: "5 1 4 null null 3 6", expectedOutput: "false", isHidden: false },
    { input: "1",                   expectedOutput: "true",  isHidden: true  },
    { input: "5 4 6 null null 3 7", expectedOutput: "false", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-a-bst", difficulty: "medium", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Search Tree","Binary Tree"],
  description: "Given the root of a BST and integer `k`, return the `k`th smallest value (1-indexed) among all node values.\n\nInput: line 1 is level-order BST, line 2 is k.",
  examples: [
    { input: "3 1 4 null 2\n1",          output: "1" },
    { input: "5 3 6 2 4 null null 1\n3", output: "3" },
  ],
  testCases: [
    { input: "3 1 4 null 2\n1",          expectedOutput: "1", isHidden: false },
    { input: "5 3 6 2 4 null null 1\n3", expectedOutput: "3", isHidden: false },
    { input: "1\n1",                      expectedOutput: "1", isHidden: true  },
    { input: "3 1 4 null 2\n3",           expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot = build_tree(input().split())\nk    = int(input())\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    int k; cin >> k;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode root=build(sc.nextLine().split(\" \"),0);\n        int k=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Count Good Nodes in Binary Tree", slug: "count-good-nodes-in-binary-tree", difficulty: "medium", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "A node `X` is 'good' if the path from root to `X` has no value greater than `X.val`. Given the root of a binary tree, return the count of good nodes.",
  examples: [
    { input: "3 1 4 3 null 1 5", output: "4" },
    { input: "3 3 null 4 2",     output: "3" },
    { input: "1",                output: "1" },
  ],
  testCases: [
    { input: "3 1 4 3 null 1 5",           expectedOutput: "4", isHidden: false },
    { input: "3 3 null 4 2",               expectedOutput: "3", isHidden: false },
    { input: "1",                          expectedOutput: "1", isHidden: true  },
    { input: "2 null 4 10 8 null null 4",  expectedOutput: "4", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Path Sum II", slug: "path-sum-ii", difficulty: "medium", topic: "trees",
  tags: ["Backtracking","Tree","Depth-First Search","Binary Tree"],
  description: "Given the root of a binary tree and `targetSum`, return all root-to-leaf paths where the sum equals `targetSum`. Print each path on a new line, space-separated. If none, print nothing.\n\nInput: line 1 is level-order tree, line 2 is targetSum.",
  examples: [
    { input: "5 4 8 11 null 13 4 7 2 null null 5 1\n22", output: "5 4 11 2\n5 8 4 5" },
    { input: "1 2 3\n5",                                  output: "" },
  ],
  testCases: [
    { input: "5 4 8 11 null 13 4 7 2 null null 5 1\n22", expectedOutput: "5 4 11 2\n5 8 4 5", isHidden: false },
    { input: "1 2 3\n5",                                  expectedOutput: "",                  isHidden: false },
    { input: "1 2\n3",                                    expectedOutput: "1 2",               isHidden: true  },
    { input: "1\n1",                                      expectedOutput: "1",                 isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot      = build_tree(input().split())\ntargetSum = int(input())\n# Write your solution here — print each path on its own line\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    int targetSum; cin >> targetSum;\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode root=build(sc.nextLine().split(\" \"),0);\n        int targetSum=sc.nextInt();\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Flatten Binary Tree to Linked List", slug: "flatten-binary-tree-to-linked-list", difficulty: "medium", topic: "trees",
  tags: ["Linked List","Stack","Tree","Depth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, flatten it to a linked list in-place using right pointers (all left pointers null), following pre-order traversal. Print the values space-separated.",
  examples: [
    { input: "1 2 5 3 4 null 6", output: "1 2 3 4 5 6" },
    { input: "null",             output: "" },
    { input: "0",               output: "0" },
  ],
  testCases: [
    { input: "1 2 5 3 4 null 6", expectedOutput: "1 2 3 4 5 6", isHidden: false },
    { input: "null",             expectedOutput: "",             isHidden: false },
    { input: "0",               expectedOutput: "0",            isHidden: true  },
    { input: "1 2 3",           expectedOutput: "1 2 3",        isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here — then print vals space-separated traversing right pointers\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

// ─── HARD (10) ───

{
  title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", difficulty: "hard", topic: "trees",
  tags: ["Dynamic Programming","Tree","Depth-First Search","Binary Tree"],
  description: "Given a binary tree, return the maximum path sum. A path is any sequence of nodes from some starting node to any node, traversing parent-child connections. Each node can appear at most once. The path does not need to pass through the root.",
  examples: [
    { input: "1 2 3",                   output: "6" },
    { input: "-10 9 20 null null 15 7", output: "42" },
  ],
  testCases: [
    { input: "1 2 3",                   expectedOutput: "6",  isHidden: false },
    { input: "-10 9 20 null null 15 7", expectedOutput: "42", isHidden: false },
    { input: "-3",                      expectedOutput: "-3", isHidden: true  },
    { input: "2 -1 -2",                 expectedOutput: "2",  isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", difficulty: "hard", topic: "trees",
  tags: ["String","Tree","Depth-First Search","Breadth-First Search","Design","Binary Tree"],
  description: "Design an algorithm to serialize a binary tree to a string and deserialize it back. Given a level-order input, serialize it, then deserialize it and print the level-order of the result.",
  examples: [
    { input: "1 2 3 null null 4 5", output: "1 2 3 null null 4 5" },
    { input: "null",               output: "null" },
  ],
  testCases: [
    { input: "1 2 3 null null 4 5", expectedOutput: "1 2 3 null null 4 5", isHidden: false },
    { input: "null",               expectedOutput: "null",                 isHidden: false },
    { input: "1",                  expectedOutput: "1",                   isHidden: true  },
    { input: "1 2 3 4 5",          expectedOutput: "1 2 3 4 5",           isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n\n# Implement serialize and deserialize, then:\n# data = serialize(root)\n# result = deserialize(data)\n# print level-order of result\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Implement serialize/deserialize, then print level-order of deserialized result\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Implement serialize/deserialize, then print level-order of deserialized result\n    }\n}\n",
  },
},

{
  title: "Lowest Common Ancestor of a Binary Tree", slug: "lowest-common-ancestor-binary-tree", difficulty: "hard", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Tree"],
  description: "Given a binary tree (not necessarily a BST) and two node values `p` and `q`, find their lowest common ancestor. You cannot use value ordering — you must search both subtrees.\n\nInput: line 1 is level-order tree, line 2 is p, line 3 is q.",
  examples: [
    { input: "3 5 1 6 2 0 8 null null 7 4\n5\n1", output: "3" },
    { input: "3 5 1 6 2 0 8 null null 7 4\n5\n4", output: "5" },
  ],
  testCases: [
    { input: "3 5 1 6 2 0 8 null null 7 4\n5\n1", expectedOutput: "3", isHidden: false },
    { input: "3 5 1 6 2 0 8 null null 7 4\n5\n4", expectedOutput: "5", isHidden: false },
    { input: "1 2\n1\n2",                         expectedOutput: "1", isHidden: true  },
    { input: "3 5 1\n5\n3",                        expectedOutput: "3", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nroot = build_tree(input().split())\np = int(input())\nq = int(input())\n# Write your solution here — print the val of the LCA\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    int p, q; cin >> p >> q;\n    // Write your solution here — print LCA val\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        TreeNode root=build(sc.nextLine().split(\" \"),0);\n        int p=sc.nextInt(), q=sc.nextInt();\n        // Write your solution here — print LCA val\n    }\n}\n",
  },
},

{
  title: "Binary Tree Cameras", slug: "binary-tree-cameras", difficulty: "hard", topic: "trees",
  tags: ["Dynamic Programming","Tree","Depth-First Search","Binary Tree"],
  description: "Place cameras on nodes of a binary tree such that every node is monitored. A camera at a node monitors its parent, itself, and its children. Return the minimum number of cameras needed.",
  examples: [
    { input: "0 0 null 0 0",                 output: "1" },
    { input: "0 0 null 0 null 0 null null 0", output: "2" },
  ],
  testCases: [
    { input: "0 0 null 0 0",                  expectedOutput: "1", isHidden: false },
    { input: "0 0 null 0 null 0 null null 0", expectedOutput: "2", isHidden: false },
    { input: "0",                             expectedOutput: "1", isHidden: true  },
    { input: "0 0 null null 0 null null",     expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Recover Binary Search Tree", slug: "recover-binary-search-tree", difficulty: "hard", topic: "trees",
  tags: ["Tree","Depth-First Search","Binary Search Tree","Binary Tree"],
  description: "Two nodes of a BST are swapped by mistake. Recover the tree without changing its structure. Print the corrected level-order traversal.",
  examples: [
    { input: "1 3 null null 2",  output: "3 1 null null 2" },
    { input: "3 1 4 null null 2", output: "2 1 4 null null 3" },
  ],
  testCases: [
    { input: "1 3 null null 2",   expectedOutput: "3 1 null null 2",   isHidden: false },
    { input: "3 1 4 null null 2", expectedOutput: "2 1 4 null null 3", isHidden: false },
    { input: "2 3 1",             expectedOutput: "2 1 3",             isHidden: true  },
    { input: "5 3 8 1 4 6 10 null null 2 null", expectedOutput: "5 3 8 1 2 6 10 null null 4 null", isHidden: true },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here — fix the BST in place, then print level-order\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here — fix then print level-order\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here — fix then print level-order\n    }\n}\n",
  },
},

{
  title: "Find Duplicate Subtrees", slug: "find-duplicate-subtrees", difficulty: "hard", topic: "trees",
  tags: ["Hash Table","Tree","Depth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, return the roots of all duplicate subtrees. Print the root val of each duplicate subtree, one per line (each reported once).",
  examples: [
    { input: "1 2 3 4 null 2 4 null null 4", output: "4\n2" },
    { input: "2 1 1",                        output: "1" },
    { input: "2 2 2 3 null 3 null",          output: "3\n2" },
  ],
  testCases: [
    { input: "1 2 3 4 null 2 4 null null 4", expectedOutput: "4\n2", isHidden: false },
    { input: "2 1 1",                        expectedOutput: "1",    isHidden: false },
    { input: "2 2 2 3 null 3 null",          expectedOutput: "3\n2", isHidden: true  },
    { input: "1",                            expectedOutput: "",     isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here — print root.val of each duplicate subtree, one per line\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Vertical Order Traversal of a Binary Tree", slug: "vertical-order-traversal-binary-tree", difficulty: "hard", topic: "trees",
  tags: ["Hash Table","Tree","Depth-First Search","Breadth-First Search","Sorting","Binary Tree"],
  description: "Given the root of a binary tree, return its vertical order traversal. Nodes at the same column are sorted by row then by value. Print all values space-separated left column to right.",
  examples: [
    { input: "3 9 20 null null 15 7", output: "9 3 15 20 7" },
    { input: "1 2 3 4 5 6 7",         output: "4 2 1 5 6 3 7" },
  ],
  testCases: [
    { input: "3 9 20 null null 15 7", expectedOutput: "9 3 15 20 7",   isHidden: false },
    { input: "1 2 3 4 5 6 7",         expectedOutput: "4 2 1 5 6 3 7", isHidden: false },
    { input: "1",                     expectedOutput: "1",             isHidden: true  },
    { input: "1 2 3 4 null null 5",   expectedOutput: "4 2 1 3 5",     isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Count Complete Tree Nodes", slug: "count-complete-tree-nodes", difficulty: "hard", topic: "trees",
  tags: ["Binary Search","Tree","Depth-First Search","Binary Tree"],
  description: "Given the root of a complete binary tree, return the number of nodes. A naive O(n) traversal is easy — the challenge is to solve it in O(log²n) by leveraging the completeness property.",
  examples: [
    { input: "1 2 3 4 5 6", output: "6" },
    { input: "null",        output: "0" },
    { input: "1",           output: "1" },
  ],
  testCases: [
    { input: "1 2 3 4 5 6",                   expectedOutput: "6",  isHidden: false },
    { input: "null",                          expectedOutput: "0",  isHidden: false },
    { input: "1",                             expectedOutput: "1",  isHidden: true  },
    { input: "1 2 3 4 5 6 7 8 9 10 11 12",   expectedOutput: "12", isHidden: true  },
  ],
  starterCode: {
    python: "def build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here — aim for O(log^2 n)\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here — aim for O(log^2 n)\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here — aim for O(log^2 n)\n    }\n}\n",
  },
},

{
  title: "Maximum Width of Binary Tree", slug: "maximum-width-of-binary-tree", difficulty: "hard", topic: "trees",
  tags: ["Tree","Depth-First Search","Breadth-First Search","Binary Tree"],
  description: "Given the root of a binary tree, return the maximum width of any level. Width is the length between the leftmost and rightmost non-null nodes (including nulls in between). Nodes are indexed as in a heap array.",
  examples: [
    { input: "1 3 2 5 3 null 9",           output: "4" },
    { input: "1 3 2 5 null null 9 6 null 7", output: "7" },
    { input: "1 3 2 5",                    output: "2" },
  ],
  testCases: [
    { input: "1 3 2 5 3 null 9",             expectedOutput: "4", isHidden: false },
    { input: "1 3 2 5 null null 9 6 null 7", expectedOutput: "7", isHidden: false },
    { input: "1 3 2 5",                      expectedOutput: "2", isHidden: true  },
    { input: "1",                            expectedOutput: "1", isHidden: true  },
  ],
  starterCode: {
    python: "from collections import deque\n\ndef build_tree(vals):\n    if not vals or vals[0] == 'null': return None\n    nodes = [None if v == 'null' else type('Node', (), {'val': int(v), 'left': None, 'right': None})() for v in vals]\n    kids = iter(nodes[1:])\n    for node in nodes:\n        if node:\n            node.left  = next(kids, None)\n            node.right = next(kids, None)\n    return nodes[0]\n\nvals = input().split()\nroot = build_tree(vals)\n# Write your solution here\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} };\nTreeNode* build(vector<string>& v, int i){\n    if(i>=(int)v.size()||v[i]==\"null\") return nullptr;\n    TreeNode* n=new TreeNode(stoi(v[i]));\n    n->left=build(v,2*i+1); n->right=build(v,2*i+2); return n;\n}\nint main(){\n    string l; getline(cin,l);\n    istringstream ss(l); string t; vector<string> v;\n    while(ss>>t) v.push_back(t);\n    TreeNode* root=build(v,0);\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }\n    static TreeNode build(String[] v, int i){\n        if(i>=v.length||v[i].equals(\"null\")) return null;\n        TreeNode n=new TreeNode(Integer.parseInt(v[i]));\n        n.left=build(v,2*i+1); n.right=build(v,2*i+2); return n;\n    }\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        String[] v=sc.nextLine().split(\" \");\n        TreeNode root=build(v,0);\n        // Write your solution here\n    }\n}\n",
  },
},

{
  title: "Sum of Distances in Tree", slug: "sum-of-distances-in-tree", difficulty: "hard", topic: "trees",
  tags: ["Tree","Depth-First Search","Graph","Dynamic Programming"],
  description: "Given an undirected tree with `n` nodes (0-indexed) and `n-1` edges, return an array `ans` where `ans[i]` is the sum of distances between node `i` and all other nodes. Print space-separated.\n\nInput: line 1 is `n`, then `n-1` lines each with two integers representing an edge.",
  examples: [
    { input: "6\n0 1\n0 2\n2 3\n2 4\n2 5", output: "8 12 6 10 10 10" },
    { input: "1",                           output: "0" },
    { input: "2\n1 0",                     output: "1 1" },
  ],
  testCases: [
    { input: "6\n0 1\n0 2\n2 3\n2 4\n2 5", expectedOutput: "8 12 6 10 10 10", isHidden: false },
    { input: "1",                           expectedOutput: "0",               isHidden: false },
    { input: "2\n1 0",                     expectedOutput: "1 1",             isHidden: true  },
    { input: "4\n0 1\n1 2\n2 3",           expectedOutput: "6 4 4 6",         isHidden: true  },
  ],
  starterCode: {
    python: "import sys\ninput_data = sys.stdin.read().split()\nidx = 0\nn = int(input_data[idx]); idx += 1\nedges = []\nfor _ in range(n - 1):\n    u, v = int(input_data[idx]), int(input_data[idx+1]); idx += 2\n    edges.append((u, v))\n# Write your solution here — print space-separated answer array\n",
    cpp: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin >> n;\n    vector<vector<int>> adj(n);\n    for(int i=0;i<n-1;i++){\n        int u,v; cin>>u>>v;\n        adj[u].push_back(v); adj[v].push_back(u);\n    }\n    // Write your solution here\n}\n",
    java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args){\n        Scanner sc=new Scanner(System.in);\n        int n=sc.nextInt();\n        List<List<Integer>> adj=new ArrayList<>();\n        for(int i=0;i<n;i++) adj.add(new ArrayList<>());\n        for(int i=0;i<n-1;i++){\n            int u=sc.nextInt(), v=sc.nextInt();\n            adj.get(u).add(v); adj.get(v).add(u);\n        }\n        // Write your solution here\n    }\n}\n",
  },
},

];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Problem.deleteMany({ topic: 'trees' });
  console.log('Cleared existing trees problems');

  const inserted = await Problem.insertMany(problems);
  console.log(`✅ Inserted ${inserted.length} trees problems`);

  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });