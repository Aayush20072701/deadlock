require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const graphProblems = [
  // ─── EASY (10) ───────────────────────────────────────────────

  {
    title: 'Find if Path Exists in Graph',
    slug: 'find-if-path-exists-in-graph',
    difficulty: 'easy',
    topic: 'graphs',
    description: `There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1. The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi.

Given two integers source and destination, find out whether there is a valid path that exists from vertex source to vertex destination.

**Example 1:**
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true

**Example 2:**
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false`,
    inputFormat: 'First line: n. Second line: M (number of edges). Next M lines: u v. Last line: source destination',
    outputFormat: 'true or false',
    testCases: [
      { input: '3\n3\n0 1\n1 2\n2 0\n0 2', expectedOutput: 'true', isHidden: false },
      { input: '6\n5\n0 1\n0 2\n3 5\n5 4\n4 3\n0 5', expectedOutput: 'false', isHidden: false },
      { input: '1\n0\n0 0', expectedOutput: 'true', isHidden: true },
      { input: '4\n2\n0 1\n2 3\n0 3', expectedOutput: 'false', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
n = int(input())
m = int(input())
adj = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v); adj[v].append(u)
source, destination = map(int, input().split())

def validPath(n, adj, source, destination):
    if source == destination: return True
    visited = {source}
    q = deque([source])
    while q:
        node = q.popleft()
        for nei in adj[node]:
            if nei == destination: return True
            if nei not in visited:
                visited.add(nei); q.append(nei)
    return False

print(str(validPath(n, adj, source, destination)).lower())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n, m; cin >> n >> m;
    vector<vector<int>> adj(n);
    for(int i = 0; i < m; i++){
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    int src, dst; cin >> src >> dst;
    if(src == dst){ cout << "true"; return 0; }
    vector<bool> vis(n, false);
    queue<int> q; q.push(src); vis[src] = true;
    while(!q.empty()){
        int node = q.front(); q.pop();
        for(int nei : adj[node]){
            if(nei == dst){ cout << "true"; return 0; }
            if(!vis[nei]){ vis[nei] = true; q.push(nei); }
        }
    }
    cout << "false";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for(int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for(int i = 0; i < m; i++){
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(u).add(v); adj.get(v).add(u);
        }
        int src = sc.nextInt(), dst = sc.nextInt();
        if(src == dst){ System.out.println("true"); return; }
        boolean[] vis = new boolean[n];
        Queue<Integer> q = new LinkedList<>(); q.add(src); vis[src] = true;
        while(!q.isEmpty()){
            int node = q.poll();
            for(int nei : adj.get(node)){
                if(nei == dst){ System.out.println("true"); return; }
                if(!vis[nei]){ vis[nei] = true; q.add(nei); }
            }
        }
        System.out.println("false");
    }
}`
    }
  },

  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'easy',
    topic: 'graphs',
    description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
Input: grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
Output: 1

**Example 2:**
Input: grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
Output: 3`,
    inputFormat: 'First line: m n. Next m lines: space-separated 0/1 values',
    outputFormat: 'Single integer',
    testCases: [
      { input: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', expectedOutput: '1', isHidden: false },
      { input: '4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1', expectedOutput: '3', isHidden: false },
      { input: '1 1\n1', expectedOutput: '1', isHidden: true },
      { input: '2 2\n0 0\n0 0', expectedOutput: '0', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
m, n = map(int, input().split())
grid = [list(map(int, input().split())) for _ in range(m)]

def numIslands(grid):
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                count += 1
                # BFS to mark entire island
                q = deque([(i, j)])
                grid[i][j] = 0
                while q:
                    r, c = q.popleft()
                    for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                        nr, nc = r+dr, c+dc
                        if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]==1:
                            grid[nr][nc] = 0; q.append((nr, nc))
    return count

print(numIslands(grid))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m, n; cin >> m >> n;
    vector<vector<int>> g(m, vector<int>(n));
    for(auto& r : g) for(auto& c : r) cin >> c;
    int count = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    for(int i = 0; i < m; i++) for(int j = 0; j < n; j++){
        if(g[i][j] == 1){
            count++;
            queue<pair<int,int>> q; q.push({i,j}); g[i][j] = 0;
            while(!q.empty()){
                auto [r,c] = q.front(); q.pop();
                for(int d = 0; d < 4; d++){
                    int nr = r+dx[d], nc = c+dy[d];
                    if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]==1){ g[nr][nc]=0; q.push({nr,nc}); }
                }
            }
        }
    }
    cout << count;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), n = sc.nextInt();
        int[][] g = new int[m][n];
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) g[i][j]=sc.nextInt();
        int count=0, []dx={0,0,1,-1}, []dy={1,-1,0,0};
        for(int i=0;i<m;i++) for(int j=0;j<n;j++){
            if(g[i][j]==1){
                count++;
                Queue<int[]> q=new LinkedList<>(); q.add(new int[]{i,j}); g[i][j]=0;
                while(!q.isEmpty()){
                    int[]p=q.poll();
                    for(int d=0;d<4;d++){
                        int nr=p[0]+dx[d],nc=p[1]+dy[d];
                        if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]==1){g[nr][nc]=0;q.add(new int[]{nr,nc});}
                    }
                }
            }
        }
        System.out.println(count);
    }
}`
    }
  },

  {
    title: 'Flood Fill',
    slug: 'flood-fill',
    difficulty: 'easy',
    topic: 'graphs',
    description: `An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.

**Example 1:**
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]`,
    inputFormat: 'First line: m n. Next m lines: space-separated pixel values. Last line: sr sc color',
    outputFormat: 'm lines of space-separated integers',
    testCases: [
      { input: '3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2', expectedOutput: '2 2 2\n2 2 0\n2 0 1', isHidden: false },
      { input: '2 2\n0 0\n0 0\n0 0 2', expectedOutput: '2 2\n2 2', isHidden: false },
      { input: '1 1\n1\n0 0 5', expectedOutput: '5', isHidden: true },
      { input: '3 3\n0 0 0\n0 1 1\n0 1 1\n1 1 3', expectedOutput: '0 0 0\n0 3 3\n0 3 3', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
m, n = map(int, input().split())
image = [list(map(int, input().split())) for _ in range(m)]
sr, sc, color = map(int, input().split())

def floodFill(image, sr, sc, color):
    orig = image[sr][sc]
    if orig == color: return image
    q = deque([(sr, sc)])
    image[sr][sc] = color
    while q:
        r, c = q.popleft()
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0<=nr<len(image) and 0<=nc<len(image[0]) and image[nr][nc]==orig:
                image[nr][nc] = color; q.append((nr, nc))
    return image

result = floodFill(image, sr, sc, color)
for row in result: print(*row)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m,n; cin>>m>>n;
    vector<vector<int>> img(m,vector<int>(n));
    for(auto&r:img) for(auto&c:r) cin>>c;
    int sr,sc,color; cin>>sr>>sc>>color;
    int orig=img[sr][sc];
    if(orig!=color){
        int dx[]={0,0,1,-1},dy[]={1,-1,0,0};
        queue<pair<int,int>> q; q.push({sr,sc}); img[sr][sc]=color;
        while(!q.empty()){
            auto[r,c]=q.front();q.pop();
            for(int d=0;d<4;d++){
                int nr=r+dx[d],nc=c+dy[d];
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&img[nr][nc]==orig){img[nr][nc]=color;q.push({nr,nc});}
            }
        }
    }
    for(int i=0;i<m;i++){for(int j=0;j<n;j++) cout<<img[i][j]<<(j+1<n?" ":"\n");}
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int m=sc.nextInt(),n=sc.nextInt();
        int[][]img=new int[m][n];
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) img[i][j]=sc.nextInt();
        int sr=sc.nextInt(),scc=sc.nextInt(),color=sc.nextInt();
        int orig=img[sr][scc];
        if(orig!=color){
            int[]dx={0,0,1,-1},dy={1,-1,0,0};
            Queue<int[]> q=new LinkedList<>(); q.add(new int[]{sr,scc}); img[sr][scc]=color;
            while(!q.isEmpty()){
                int[]p=q.poll();
                for(int d=0;d<4;d++){
                    int nr=p[0]+dx[d],nc=p[1]+dy[d];
                    if(nr>=0&&nr<m&&nc>=0&&nc<n&&img[nr][nc]==orig){img[nr][nc]=color;q.add(new int[]{nr,nc});}
                }
            }
        }
        for(int i=0;i<m;i++){StringBuilder sb=new StringBuilder();for(int j=0;j<n;j++) sb.append(img[i][j]).append(j+1<n?" ":"");System.out.println(sb);}
    }
}`
    }
  },

  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    difficulty: 'easy',
    topic: 'graphs',
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list of its neighbors.

For simplicity, the graph is represented as an adjacency list. Given the node count and edges, clone the graph and print adjacency list of cloned graph sorted by node value.

**Example:**
Input: n = 4, edges = [[1,2],[1,4],[2,3],[3,4]]
Output: 1:[2,4] 2:[1,3] 3:[2,4] 4:[1,3]`,
    inputFormat: 'First line: n. Second line: M. Next M lines: u v',
    outputFormat: 'Each node and its sorted neighbors: node:[n1,n2,...]',
    testCases: [
      { input: '4\n4\n1 2\n1 4\n2 3\n3 4', expectedOutput: '1:[2,4]\n2:[1,3]\n3:[2,4]\n4:[1,3]', isHidden: false },
      { input: '1\n0', expectedOutput: '1:[]', isHidden: false },
      { input: '2\n1\n1 2', expectedOutput: '1:[2]\n2:[1]', isHidden: true },
      { input: '3\n3\n1 2\n2 3\n3 1', expectedOutput: '1:[2,3]\n2:[1,3]\n3:[1,2]', isHidden: true },
    ],
    starterCode: {
      python: `from collections import defaultdict, deque
n = int(input())
m = int(input())
adj = defaultdict(list)
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v); adj[v].append(u)

# Clone and print
clone = {i: sorted(adj[i]) for i in range(1, n+1)}
for node in range(1, n+1):
    print(f"{node}:{clone[node]}")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,m; cin>>n>>m;
    map<int,vector<int>> adj;
    for(int i=1;i<=n;i++) adj[i]={};
    for(int i=0;i<m;i++){
        int u,v; cin>>u>>v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    for(auto&[node,nei]:adj){
        sort(nei.begin(),nei.end());
        cout<<node<<":[";
        for(int i=0;i<nei.size();i++) cout<<nei[i]<<(i+1<(int)nei.size()?",":"");
        cout<<"]\n";
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),m=sc.nextInt();
        Map<Integer,List<Integer>> adj=new TreeMap<>();
        for(int i=1;i<=n;i++) adj.put(i,new ArrayList<>());
        for(int i=0;i<m;i++){
            int u=sc.nextInt(),v=sc.nextInt();
            adj.get(u).add(v); adj.get(v).add(u);
        }
        for(Map.Entry<Integer,List<Integer>> e:adj.entrySet()){
            List<Integer> nei=e.getValue(); Collections.sort(nei);
            StringBuilder sb=new StringBuilder();
            sb.append(e.getKey()).append(":[");
            for(int i=0;i<nei.size();i++) sb.append(nei.get(i)).append(i+1<nei.size()?",":"");
            sb.append("]"); System.out.println(sb);
        }
    }
}`
    }
  },

  {
    title: 'Island Perimeter',
    slug: 'island-perimeter',
    difficulty: 'easy',
    topic: 'graphs',
    description: `You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

**Example:**
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16`,
    inputFormat: 'First line: m n. Next m lines: space-separated 0/1',
    outputFormat: 'Single integer: perimeter',
    testCases: [
      { input: '4 4\n0 1 0 0\n1 1 1 0\n0 1 0 0\n1 1 0 0', expectedOutput: '16', isHidden: false },
      { input: '1 1\n1', expectedOutput: '4', isHidden: false },
      { input: '1 4\n1 1 1 1', expectedOutput: '10', isHidden: true },
      { input: '2 2\n1 1\n1 1', expectedOutput: '8', isHidden: true },
    ],
    starterCode: {
      python: `m, n = map(int, input().split())
grid = [list(map(int, input().split())) for _ in range(m)]

def islandPerimeter(grid):
    perimeter = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                perimeter += 4
                if i > 0 and grid[i-1][j] == 1: perimeter -= 2
                if j > 0 and grid[i][j-1] == 1: perimeter -= 2
    return perimeter

print(islandPerimeter(grid))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m,n; cin>>m>>n;
    vector<vector<int>> g(m,vector<int>(n));
    for(auto&r:g) for(auto&c:r) cin>>c;
    int p=0;
    for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]){
        p+=4;
        if(i>0&&g[i-1][j]) p-=2;
        if(j>0&&g[i][j-1]) p-=2;
    }
    cout<<p;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int m=sc.nextInt(),n=sc.nextInt();
        int[][]g=new int[m][n];
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) g[i][j]=sc.nextInt();
        int p=0;
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]==1){
            p+=4;
            if(i>0&&g[i-1][j]==1) p-=2;
            if(j>0&&g[i][j-1]==1) p-=2;
        }
        System.out.println(p);
    }
}`
    }
  },

  {
    title: 'Number of Connected Components in an Undirected Graph',
    slug: 'number-of-connected-components',
    difficulty: 'easy',
    topic: 'graphs',
    description: `You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

**Example 1:**
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

**Example 2:**
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1`,
    inputFormat: 'First line: n. Second line: M. Next M lines: u v',
    outputFormat: 'Single integer',
    testCases: [
      { input: '5\n3\n0 1\n1 2\n3 4', expectedOutput: '2', isHidden: false },
      { input: '5\n4\n0 1\n1 2\n2 3\n3 4', expectedOutput: '1', isHidden: false },
      { input: '4\n0', expectedOutput: '4', isHidden: true },
      { input: '6\n3\n0 1\n2 3\n4 5', expectedOutput: '3', isHidden: true },
    ],
    starterCode: {
      python: `n = int(input())
m = int(input())
parent = list(range(n))
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]; x = parent[x]
    return x
def union(a, b):
    a, b = find(a), find(b)
    if a != b: parent[a] = b

for _ in range(m):
    u, v = map(int, input().split())
    union(u, v)

print(len(set(find(i) for i in range(n))))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
vector<int> par;
int find(int x){ return par[x]==x?x:par[x]=find(par[x]); }
int main(){
    int n,m; cin>>n>>m;
    par.resize(n); iota(par.begin(),par.end(),0);
    for(int i=0;i<m;i++){
        int u,v; cin>>u>>v;
        int pu=find(u),pv=find(v);
        if(pu!=pv) par[pu]=pv;
    }
    set<int> comps;
    for(int i=0;i<n;i++) comps.insert(find(i));
    cout<<comps.size();
}`,
      java: `import java.util.*;
public class Main {
    static int[] par;
    static int find(int x){ return par[x]==x?x:(par[x]=find(par[x])); }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),m=sc.nextInt();
        par=new int[n]; for(int i=0;i<n;i++) par[i]=i;
        for(int i=0;i<m;i++){
            int u=sc.nextInt(),v=sc.nextInt();
            int pu=find(u),pv=find(v);
            if(pu!=pv) par[pu]=pv;
        }
        Set<Integer> comps=new HashSet<>();
        for(int i=0;i<n;i++) comps.add(find(i));
        System.out.println(comps.size());
    }
}`
    }
  },

  {
    title: 'Max Area of Island',
    slug: 'max-area-of-island',
    difficulty: 'easy',
    topic: 'graphs',
    description: `You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

**Example:**
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6`,
    inputFormat: 'First line: m n. Next m lines: space-separated 0/1',
    outputFormat: 'Single integer',
    testCases: [
      { input: '4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 0 1 1\n0 0 0 1 1', expectedOutput: '4', isHidden: false },
      { input: '1 1\n0', expectedOutput: '0', isHidden: false },
      { input: '3 3\n1 0 0\n0 1 0\n0 0 1', expectedOutput: '1', isHidden: true },
      { input: '3 4\n1 1 1 0\n0 1 0 0\n0 0 1 1', expectedOutput: '4', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
m, n = map(int, input().split())
grid = [list(map(int, input().split())) for _ in range(m)]

def maxAreaOfIsland(grid):
    max_area = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                area = 0
                q = deque([(i, j)]); grid[i][j] = 0
                while q:
                    r, c = q.popleft(); area += 1
                    for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                        nr, nc = r+dr, c+dc
                        if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]==1:
                            grid[nr][nc]=0; q.append((nr,nc))
                max_area = max(max_area, area)
    return max_area

print(maxAreaOfIsland(grid))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m,n; cin>>m>>n;
    vector<vector<int>> g(m,vector<int>(n));
    for(auto&r:g) for(auto&c:r) cin>>c;
    int best=0,dx[]={0,0,1,-1},dy[]={1,-1,0,0};
    for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]){
        int area=0; queue<pair<int,int>> q; q.push({i,j}); g[i][j]=0;
        while(!q.empty()){
            auto[r,c]=q.front();q.pop();area++;
            for(int d=0;d<4;d++){int nr=r+dx[d],nc=c+dy[d];if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]){g[nr][nc]=0;q.push({nr,nc});}}
        }
        best=max(best,area);
    }
    cout<<best;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int m=sc.nextInt(),n=sc.nextInt();
        int[][]g=new int[m][n];
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) g[i][j]=sc.nextInt();
        int best=0; int[]dx={0,0,1,-1},dy={1,-1,0,0};
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]==1){
            int area=0; Queue<int[]> q=new LinkedList<>(); q.add(new int[]{i,j}); g[i][j]=0;
            while(!q.isEmpty()){
                int[]p=q.poll(); area++;
                for(int d=0;d<4;d++){int nr=p[0]+dx[d],nc=p[1]+dy[d];if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]==1){g[nr][nc]=0;q.add(new int[]{nr,nc});}}
            }
            best=Math.max(best,area);
        }
        System.out.println(best);
    }
}`
    }
  },

  {
    title: 'Find Center of Star Graph',
    slug: 'find-center-of-star-graph',
    difficulty: 'easy',
    topic: 'graphs',
    description: `There is an undirected star graph consisting of n nodes labeled from 1 to n. A star graph is a graph where there is one center node and exactly n - 1 edges that connect the center node with every other node.

You are given a 2D integer array edges where each edges[i] = [ui, vi] indicates that there is an edge between the nodes ui and vi. Return the center of the given star graph.

**Example 1:**
Input: edges = [[1,2],[2,3],[4,2]]
Output: 2

**Example 2:**
Input: edges = [[1,2],[5,1],[1,3],[1,4]]
Output: 1`,
    inputFormat: 'First line: M (number of edges). Next M lines: u v',
    outputFormat: 'Single integer: center node',
    testCases: [
      { input: '3\n1 2\n2 3\n4 2', expectedOutput: '2', isHidden: false },
      { input: '4\n1 2\n5 1\n1 3\n1 4', expectedOutput: '1', isHidden: false },
      { input: '2\n3 1\n2 1', expectedOutput: '1', isHidden: true },
      { input: '4\n5 2\n5 3\n5 4\n5 1', expectedOutput: '5', isHidden: true },
    ],
    starterCode: {
      python: `m = int(input())
edges = [list(map(int, input().split())) for _ in range(m)]
# Center appears in every edge - check first two edges
e1, e2 = edges[0], edges[1]
if e1[0] in e2: print(e1[0])
else: print(e1[1])`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m; cin>>m;
    vector<pair<int,int>> edges(m);
    for(auto&[u,v]:edges) cin>>u>>v;
    auto[a,b]=edges[0]; auto[c,d]=edges[1];
    cout<<(a==c||a==d?a:b);
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int m=sc.nextInt();
        int[][]edges=new int[m][2];
        for(int i=0;i<m;i++){edges[i][0]=sc.nextInt();edges[i][1]=sc.nextInt();}
        int a=edges[0][0],b=edges[0][1],c=edges[1][0],d=edges[1][1];
        System.out.println(a==c||a==d?a:b);
    }
}`
    }
  },

  {
    title: 'Ransom Note',
    slug: 'ransom-note-graph',
    difficulty: 'easy',
    topic: 'graphs',
    description: `Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

**Example 1:**
Input: ransomNote = "a", magazine = "b"
Output: false

**Example 2:**
Input: ransomNote = "aa", magazine = "aab"
Output: true`,
    inputFormat: 'First line: ransomNote. Second line: magazine',
    outputFormat: 'true or false',
    testCases: [
      { input: 'a\nb', expectedOutput: 'false', isHidden: false },
      { input: 'aa\naab', expectedOutput: 'true', isHidden: false },
      { input: 'abc\naabbcc', expectedOutput: 'true', isHidden: true },
      { input: 'aab\nab', expectedOutput: 'false', isHidden: true },
    ],
    starterCode: {
      python: `from collections import Counter
ransom = input().strip()
magazine = input().strip()
mc = Counter(magazine)
rc = Counter(ransom)
print(str(all(rc[c] <= mc[c] for c in rc)).lower())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string r,m; cin>>r>>m;
    int cnt[26]={};
    for(char c:m) cnt[c-'a']++;
    for(char c:r) if(--cnt[c-'a']<0){cout<<"false";return 0;}
    cout<<"true";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        String r=sc.next(),m=sc.next();
        int[]cnt=new int[26];
        for(char c:m.toCharArray()) cnt[c-'a']++;
        for(char c:r.toCharArray()) if(--cnt[c-'a']<0){System.out.println("false");return;}
        System.out.println("true");
    }
}`
    }
  },

  {
    title: 'Count Odd Numbers in an Interval Range',
    slug: 'count-odd-numbers-interval',
    difficulty: 'easy',
    topic: 'graphs',
    description: `Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

**Example 1:**
Input: low = 3, high = 7
Output: 3 (3, 5, 7)

**Example 2:**
Input: low = 8, high = 10
Output: 1 (9)`,
    inputFormat: 'Single line: low high',
    outputFormat: 'Single integer',
    testCases: [
      { input: '3 7', expectedOutput: '3', isHidden: false },
      { input: '8 10', expectedOutput: '1', isHidden: false },
      { input: '1 1', expectedOutput: '1', isHidden: true },
      { input: '0 100', expectedOutput: '50', isHidden: true },
    ],
    starterCode: {
      python: `low, high = map(int, input().split())
print((high + 1) // 2 - low // 2)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){ int l,h; cin>>l>>h; cout<<(h+1)/2-l/2; }`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int l=sc.nextInt(),h=sc.nextInt();
        System.out.println((h+1)/2-l/2);
    }
}`
    }
  },

  // ─── MEDIUM (10) ─────────────────────────────────────────────

  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'medium',
    topic: 'graphs',
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return true if you can finish all courses. Otherwise, return false.

**Example 1:**
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true

**Example 2:**
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false`,
    inputFormat: 'First line: numCourses. Second line: M. Next M lines: a b',
    outputFormat: 'true or false',
    testCases: [
      { input: '2\n1\n1 0', expectedOutput: 'true', isHidden: false },
      { input: '2\n2\n1 0\n0 1', expectedOutput: 'false', isHidden: false },
      { input: '5\n4\n1 0\n2 0\n3 1\n4 3', expectedOutput: 'true', isHidden: true },
      { input: '3\n3\n0 1\n1 2\n2 0', expectedOutput: 'false', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
n = int(input())
m = int(input())
adj = [[] for _ in range(n)]
indegree = [0] * n
for _ in range(m):
    a, b = map(int, input().split())
    adj[b].append(a); indegree[a] += 1

def canFinish(n, adj, indegree):
    q = deque([i for i in range(n) if indegree[i] == 0])
    count = 0
    while q:
        node = q.popleft(); count += 1
        for nei in adj[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0: q.append(nei)
    return count == n

print(str(canFinish(n, adj, indegree)).lower())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,m; cin>>n>>m;
    vector<vector<int>> adj(n); vector<int> indeg(n,0);
    for(int i=0;i<m;i++){
        int a,b; cin>>a>>b; adj[b].push_back(a); indeg[a]++;
    }
    queue<int> q; for(int i=0;i<n;i++) if(!indeg[i]) q.push(i);
    int cnt=0;
    while(!q.empty()){
        int u=q.front();q.pop();cnt++;
        for(int v:adj[u]) if(--indeg[v]==0) q.push(v);
    }
    cout<<(cnt==n?"true":"false");
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),m=sc.nextInt();
        List<List<Integer>> adj=new ArrayList<>();
        int[]indeg=new int[n];
        for(int i=0;i<n;i++) adj.add(new ArrayList<>());
        for(int i=0;i<m;i++){int a=sc.nextInt(),b=sc.nextInt();adj.get(b).add(a);indeg[a]++;}
        Queue<Integer> q=new LinkedList<>();
        for(int i=0;i<n;i++) if(indeg[i]==0) q.add(i);
        int cnt=0;
        while(!q.isEmpty()){int u=q.poll();cnt++;for(int v:adj.get(u))if(--indeg[v]==0)q.add(v);}
        System.out.println(cnt==n?"true":"false");
    }
}`
    }
  },

  {
    title: 'Number of Provinces',
    slug: 'number-of-provinces',
    difficulty: 'medium',
    topic: 'graphs',
    description: `There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

**Example 1:**
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

**Example 2:**
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3`,
    inputFormat: 'First line: n. Next n lines: space-separated row of isConnected matrix',
    outputFormat: 'Single integer',
    testCases: [
      { input: '3\n1 1 0\n1 1 0\n0 0 1', expectedOutput: '2', isHidden: false },
      { input: '3\n1 0 0\n0 1 0\n0 0 1', expectedOutput: '3', isHidden: false },
      { input: '4\n1 1 0 0\n1 1 1 0\n0 1 1 0\n0 0 0 1', expectedOutput: '2', isHidden: true },
      { input: '1\n1', expectedOutput: '1', isHidden: true },
    ],
    starterCode: {
      python: `n = int(input())
mat = [list(map(int, input().split())) for _ in range(n)]
visited = [False] * n

def dfs(i):
    visited[i] = True
    for j in range(n):
        if mat[i][j] == 1 and not visited[j]: dfs(j)

count = 0
for i in range(n):
    if not visited[i]: dfs(i); count += 1
print(count)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int n; vector<vector<int>> mat; vector<bool> vis;
void dfs(int i){ vis[i]=true; for(int j=0;j<n;j++) if(mat[i][j]&&!vis[j]) dfs(j); }
int main(){
    cin>>n; mat.assign(n,vector<int>(n)); vis.assign(n,false);
    for(auto&r:mat) for(auto&c:r) cin>>c;
    int cnt=0; for(int i=0;i<n;i++) if(!vis[i]){dfs(i);cnt++;}
    cout<<cnt;
}`,
      java: `import java.util.*;
public class Main {
    static int n; static int[][]mat; static boolean[]vis;
    static void dfs(int i){vis[i]=true;for(int j=0;j<n;j++)if(mat[i][j]==1&&!vis[j])dfs(j);}
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        n=sc.nextInt(); mat=new int[n][n]; vis=new boolean[n];
        for(int i=0;i<n;i++) for(int j=0;j<n;j++) mat[i][j]=sc.nextInt();
        int cnt=0; for(int i=0;i<n;i++) if(!vis[i]){dfs(i);cnt++;}
        System.out.println(cnt);
    }
}`
    }
  },

  {
    title: 'Pacific Atlantic Water Flow',
    slug: 'pacific-atlantic-water-flow',
    difficulty: 'medium',
    topic: 'graphs',
    description: `There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

Water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans. Return sorted by row then column.

**Example:**
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`,
    inputFormat: 'First line: m n. Next m lines: space-separated heights',
    outputFormat: 'Each qualifying cell on its own line: r c',
    testCases: [
      { input: '5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4', expectedOutput: '0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0', isHidden: false },
      { input: '1 1\n1', expectedOutput: '0 0', isHidden: false },
      { input: '2 2\n1 2\n4 3', expectedOutput: '0 1\n1 0\n1 1', isHidden: true },
      { input: '3 3\n3 3 3\n3 1 3\n3 3 3', expectedOutput: '0 0\n0 1\n0 2\n1 0\n1 2\n2 0\n2 1\n2 2', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
m, n = map(int, input().split())
heights = [list(map(int, input().split())) for _ in range(m)]

def pacificAtlantic(heights):
    def bfs(starts):
        visited = set(starts)
        q = deque(starts)
        while q:
            r, c = q.popleft()
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = r+dr, c+dc
                if 0<=nr<m and 0<=nc<n and (nr,nc) not in visited and heights[nr][nc]>=heights[r][c]:
                    visited.add((nr,nc)); q.append((nr,nc))
        return visited
    pacific = bfs([(i,0) for i in range(m)] + [(0,j) for j in range(n)])
    atlantic = bfs([(i,n-1) for i in range(m)] + [(m-1,j) for j in range(n)])
    return sorted(pacific & atlantic)

for r, c in pacificAtlantic(heights): print(r, c)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int m,n; vector<vector<int>> h;
int dx[]={0,0,1,-1},dy[]={1,-1,0,0};
set<pair<int,int>> bfs(vector<pair<int,int>> starts){
    set<pair<int,int>> vis(starts.begin(),starts.end());
    queue<pair<int,int>> q; for(auto s:starts) q.push(s);
    while(!q.empty()){auto[r,c]=q.front();q.pop();for(int d=0;d<4;d++){int nr=r+dx[d],nc=c+dy[d];if(nr>=0&&nr<m&&nc>=0&&nc<n&&!vis.count({nr,nc})&&h[nr][nc]>=h[r][c]){vis.insert({nr,nc});q.push({nr,nc});}}}
    return vis;
}
int main(){
    cin>>m>>n; h.assign(m,vector<int>(n)); for(auto&r:h) for(auto&c:r) cin>>c;
    vector<pair<int,int>> pac,atl;
    for(int i=0;i<m;i++){pac.push_back({i,0});atl.push_back({i,n-1});}
    for(int j=0;j<n;j++){pac.push_back({0,j});atl.push_back({m-1,j});}
    auto p=bfs(pac),a=bfs(atl);
    for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(p.count({i,j})&&a.count({i,j})) cout<<i<<" "<<j<<"\n";
}`,
      java: `import java.util.*;
public class Main {
    static int m,n; static int[][]h; static int[]dx={0,0,1,-1},dy={1,-1,0,0};
    static Set<String> bfs(List<int[]> starts){
        Set<String> vis=new HashSet<>(); Queue<int[]> q=new LinkedList<>();
        for(int[]s:starts){String k=s[0]+","+s[1];if(vis.add(k))q.add(s);}
        while(!q.isEmpty()){int[]p=q.poll();for(int d=0;d<4;d++){int nr=p[0]+dx[d],nc=p[1]+dy[d];String k=nr+","+nc;if(nr>=0&&nr<m&&nc>=0&&nc<n&&!vis.contains(k)&&h[nr][nc]>=h[p[0]][p[1]]){vis.add(k);q.add(new int[]{nr,nc});}}}
        return vis;
    }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in); m=sc.nextInt();n=sc.nextInt();
        h=new int[m][n]; for(int i=0;i<m;i++) for(int j=0;j<n;j++) h[i][j]=sc.nextInt();
        List<int[]> pac=new ArrayList<>(),atl=new ArrayList<>();
        for(int i=0;i<m;i++){pac.add(new int[]{i,0});atl.add(new int[]{i,n-1});}
        for(int j=0;j<n;j++){pac.add(new int[]{0,j});atl.add(new int[]{m-1,j});}
        Set<String> p=bfs(pac),a=bfs(atl);
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(p.contains(i+","+j)&&a.contains(i+","+j)) System.out.println(i+" "+j);
    }
}`
    }
  },

  {
    title: 'Surrounded Regions',
    slug: 'surrounded-regions',
    difficulty: 'medium',
    topic: 'graphs',
    description: `Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region. 'O's on the border and 'O's connected to border 'O's are not flipped.

**Example:**
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]`,
    inputFormat: 'First line: m n. Next m lines: space-separated characters (X or O)',
    outputFormat: 'm lines of space-separated characters',
    testCases: [
      { input: '4 4\nX X X X\nX O O X\nX X O X\nX O X X', expectedOutput: 'X X X X\nX X X X\nX X X X\nX O X X', isHidden: false },
      { input: '1 1\nX', expectedOutput: 'X', isHidden: false },
      { input: '3 3\nX X X\nX O X\nX X X', expectedOutput: 'X X X\nX X X\nX X X', isHidden: true },
      { input: '3 3\nX O X\nO O O\nX O X', expectedOutput: 'X O X\nO O O\nX O X', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
m, n = map(int, input().split())
board = [input().split() for _ in range(m)]

def solve(board):
    def bfs(r, c):
        q = deque([(r,c)]); board[r][c] = 'S'
        while q:
            x, y = q.popleft()
            for dx, dy in [(0,1),(0,-1),(1,0),(-1,0)]:
                nx, ny = x+dx, y+dy
                if 0<=nx<len(board) and 0<=ny<len(board[0]) and board[nx][ny]=='O':
                    board[nx][ny]='S'; q.append((nx,ny))
    for i in range(len(board)):
        for j in [0, len(board[0])-1]:
            if board[i][j]=='O': bfs(i,j)
    for j in range(len(board[0])):
        for i in [0, len(board)-1]:
            if board[i][j]=='O': bfs(i,j)
    for i in range(len(board)):
        for j in range(len(board[0])):
            board[i][j] = 'X' if board[i][j]!='S' else 'O'

solve(board)
for row in board: print(' '.join(row))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m,n; cin>>m>>n;
    vector<vector<char>> b(m,vector<char>(n));
    for(auto&r:b) for(auto&c:r){string s;cin>>s;c=s[0];}
    int dx[]={0,0,1,-1},dy[]={1,-1,0,0};
    auto bfs=[&](int r,int c){
        queue<pair<int,int>> q; q.push({r,c}); b[r][c]='S';
        while(!q.empty()){auto[x,y]=q.front();q.pop();for(int d=0;d<4;d++){int nx=x+dx[d],ny=y+dy[d];if(nx>=0&&nx<m&&ny>=0&&ny<n&&b[nx][ny]=='O'){b[nx][ny]='S';q.push({nx,ny});}}}
    };
    for(int i=0;i<m;i++){if(b[i][0]=='O')bfs(i,0);if(b[i][n-1]=='O')bfs(i,n-1);}
    for(int j=0;j<n;j++){if(b[0][j]=='O')bfs(0,j);if(b[m-1][j]=='O')bfs(m-1,j);}
    for(int i=0;i<m;i++){for(int j=0;j<n;j++){b[i][j]=(b[i][j]=='S'?'O':'X');cout<<b[i][j]<<(j+1<n?" ":"\n");}}
}`,
      java: `import java.util.*;
public class Main {
    static int m,n; static char[][]b; static int[]dx={0,0,1,-1},dy={1,-1,0,0};
    static void bfs(int r,int c){Queue<int[]>q=new LinkedList<>();q.add(new int[]{r,c});b[r][c]='S';while(!q.isEmpty()){int[]p=q.poll();for(int d=0;d<4;d++){int nx=p[0]+dx[d],ny=p[1]+dy[d];if(nx>=0&&nx<m&&ny>=0&&ny<n&&b[nx][ny]=='O'){b[nx][ny]='S';q.add(new int[]{nx,ny});}}}}
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in); m=sc.nextInt();n=sc.nextInt(); b=new char[m][n];
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) b[i][j]=sc.next().charAt(0);
        for(int i=0;i<m;i++){if(b[i][0]=='O')bfs(i,0);if(b[i][n-1]=='O')bfs(i,n-1);}
        for(int j=0;j<n;j++){if(b[0][j]=='O')bfs(0,j);if(b[m-1][j]=='O')bfs(m-1,j);}
        for(int i=0;i<m;i++){StringBuilder sb=new StringBuilder();for(int j=0;j<n;j++){b[i][j]=(b[i][j]=='S'?'O':'X');sb.append(b[i][j]).append(j+1<n?" ":"");}System.out.println(sb);}
    }
}`
    }
  },

  {
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    difficulty: 'medium',
    topic: 'graphs',
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

**Example 1:**
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]

**Example 2:**
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]`,
    inputFormat: 'First line: numCourses. Second line: M. Next M lines: a b',
    outputFormat: 'Space-separated course order, or empty line if impossible',
    testCases: [
      { input: '2\n1\n1 0', expectedOutput: '0 1', isHidden: false },
      { input: '2\n2\n1 0\n0 1', expectedOutput: '', isHidden: false },
      { input: '4\n4\n1 0\n2 0\n3 1\n3 2', expectedOutput: '0 1 2 3', isHidden: true },
      { input: '1\n0', expectedOutput: '0', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
n = int(input())
m = int(input())
adj = [[] for _ in range(n)]
indegree = [0]*n
for _ in range(m):
    a, b = map(int, input().split())
    adj[b].append(a); indegree[a] += 1
q = deque([i for i in range(n) if indegree[i]==0])
order = []
while q:
    u = q.popleft(); order.append(u)
    for v in adj[u]:
        indegree[v] -= 1
        if indegree[v]==0: q.append(v)
print(' '.join(map(str, order)) if len(order)==n else '')`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,m; cin>>n>>m;
    vector<vector<int>> adj(n); vector<int> indeg(n,0);
    for(int i=0;i<m;i++){int a,b;cin>>a>>b;adj[b].push_back(a);indeg[a]++;}
    queue<int> q; for(int i=0;i<n;i++) if(!indeg[i]) q.push(i);
    vector<int> order;
    while(!q.empty()){int u=q.front();q.pop();order.push_back(u);for(int v:adj[u]) if(--indeg[v]==0) q.push(v);}
    if((int)order.size()!=n){cout<<"";return 0;}
    for(int i=0;i<n;i++) cout<<order[i]<<(i+1<n?" ":"\n");
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),m=sc.nextInt();
        List<List<Integer>> adj=new ArrayList<>(); int[]indeg=new int[n];
        for(int i=0;i<n;i++) adj.add(new ArrayList<>());
        for(int i=0;i<m;i++){int a=sc.nextInt(),b=sc.nextInt();adj.get(b).add(a);indeg[a]++;}
        Queue<Integer> q=new LinkedList<>(); for(int i=0;i<n;i++) if(indeg[i]==0) q.add(i);
        List<Integer> order=new ArrayList<>();
        while(!q.isEmpty()){int u=q.poll();order.add(u);for(int v:adj.get(u))if(--indeg[v]==0)q.add(v);}
        if(order.size()!=n){System.out.println("");return;}
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<n;i++) sb.append(order.get(i)).append(i+1<n?" ":"");
        System.out.println(sb);
    }
}`
    }
  },

  {
    title: 'Redundant Connection',
    slug: 'redundant-connection',
    difficulty: 'medium',
    topic: 'graphs',
    description: `In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

**Example 1:**
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

**Example 2:**
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]`,
    inputFormat: 'First line: n. Next n lines: u v',
    outputFormat: 'Two integers: u v',
    testCases: [
      { input: '3\n1 2\n1 3\n2 3', expectedOutput: '2 3', isHidden: false },
      { input: '5\n1 2\n2 3\n3 4\n1 4\n1 5', expectedOutput: '1 4', isHidden: false },
      { input: '4\n1 2\n2 3\n3 4\n4 2', expectedOutput: '4 2', isHidden: true },
      { input: '3\n1 2\n2 3\n1 3', expectedOutput: '1 3', isHidden: true },
    ],
    starterCode: {
      python: `n = int(input())
parent = list(range(n+1))
def find(x):
    while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]
    return x
def union(a,b):
    a,b=find(a),find(b)
    if a==b: return False
    parent[a]=b; return True

for _ in range(n):
    u,v=map(int,input().split())
    if not union(u,v): print(u,v); break`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
vector<int> par;
int find(int x){return par[x]==x?x:par[x]=find(par[x]);}
int main(){
    int n;cin>>n;par.resize(n+1);iota(par.begin(),par.end(),0);
    for(int i=0;i<n;i++){
        int u,v;cin>>u>>v;
        int pu=find(u),pv=find(v);
        if(pu==pv){cout<<u<<" "<<v;return 0;}
        par[pu]=pv;
    }
}`,
      java: `import java.util.*;
public class Main {
    static int[]par;
    static int find(int x){return par[x]==x?x:(par[x]=find(par[x]));}
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(); par=new int[n+1]; for(int i=0;i<=n;i++) par[i]=i;
        for(int i=0;i<n;i++){
            int u=sc.nextInt(),v=sc.nextInt();
            int pu=find(u),pv=find(v);
            if(pu==pv){System.out.println(u+" "+v);return;}
            par[pu]=pv;
        }
    }
}`
    }
  },

  {
    title: 'Evaluate Division',
    slug: 'evaluate-division',
    difficulty: 'medium',
    topic: 'graphs',
    description: `You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer does not exist, return -1.0.

**Example:**
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.0, 0.5, -1.0, 1.0, -1.0]`,
    inputFormat: 'First line: N equations. Next N lines: A B value. Next line: Q queries. Next Q lines: C D',
    outputFormat: 'Space-separated answers rounded to 5 decimal places',
    testCases: [
      { input: '2\na b 2.0\nb c 3.0\n5\na c\nb a\na e\na a\nx x', expectedOutput: '6.00000 0.50000 -1.00000 1.00000 -1.00000', isHidden: false },
      { input: '1\na b 0.5\n2\na b\nb a', expectedOutput: '0.50000 2.00000', isHidden: false },
      { input: '2\nx y 3.0\ny z 2.0\n2\nx z\nz x', expectedOutput: '6.00000 0.16667', isHidden: true },
      { input: '1\na b 2.0\n1\na a', expectedOutput: '1.00000', isHidden: true },
    ],
    starterCode: {
      python: `from collections import defaultdict, deque
n = int(input())
graph = defaultdict(dict)
for _ in range(n):
    parts = input().split()
    a, b, val = parts[0], parts[1], float(parts[2])
    graph[a][b] = val; graph[b][a] = 1/val

def bfs(src, dst):
    if src not in graph or dst not in graph: return -1.0
    if src == dst: return 1.0
    visited = {src}; q = deque([(src, 1.0)])
    while q:
        node, prod = q.popleft()
        if node == dst: return prod
        for nei, val in graph[node].items():
            if nei not in visited: visited.add(nei); q.append((nei, prod*val))
    return -1.0

q = int(input())
results = []
for _ in range(q):
    c, d = input().split()
    results.append(f'{bfs(c,d):.5f}')
print(' '.join(results))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n;
    map<string,map<string,double>> g;
    for(int i=0;i<n;i++){
        string a,b; double v; cin>>a>>b>>v;
        g[a][b]=v; g[b][a]=1.0/v;
    }
    auto bfs=[&](string src,string dst)->double{
        if(!g.count(src)||!g.count(dst)) return -1;
        if(src==dst) return 1;
        map<string,bool> vis; queue<pair<string,double>> q;
        q.push({src,1}); vis[src]=true;
        while(!q.empty()){
            auto[node,prod]=q.front();q.pop();
            if(node==dst) return prod;
            for(auto&[nei,val]:g[node]) if(!vis[nei]){vis[nei]=true;q.push({nei,prod*val});}
        }
        return -1;
    };
    int qn; cin>>qn;
    cout<<fixed<<setprecision(5);
    for(int i=0;i<qn;i++){string c,d;cin>>c>>d;if(i) cout<<" ";cout<<bfs(c,d);}
    cout<<"\n";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        Map<String,Map<String,Double>> g=new HashMap<>();
        for(int i=0;i<n;i++){
            String a=sc.next(),b=sc.next(); double v=sc.nextDouble();
            g.computeIfAbsent(a,x->new HashMap<>()).put(b,v);
            g.computeIfAbsent(b,x->new HashMap<>()).put(a,1.0/v);
        }
        int q=sc.nextInt(); List<String> res=new ArrayList<>();
        for(int i=0;i<q;i++){
            String c=sc.next(),d=sc.next();
            if(!g.containsKey(c)||!g.containsKey(d)){res.add("-1.00000");continue;}
            if(c.equals(d)){res.add("1.00000");continue;}
            Map<String,Boolean> vis=new HashMap<>(); Queue<Object[]> bq=new LinkedList<>();
            bq.add(new Object[]{c,1.0}); vis.put(c,true); double ans=-1;
            while(!bq.isEmpty()){Object[]p=bq.poll();String node=(String)p[0];double prod=(double)p[1];if(node.equals(d)){ans=prod;break;}for(Map.Entry<String,Double>e:g.get(node).entrySet())if(!vis.getOrDefault(e.getKey(),false)){vis.put(e.getKey(),true);bq.add(new Object[]{e.getKey(),prod*e.getValue()});}}
            res.add(String.format("%.5f",ans));
        }
        System.out.println(String.join(" ",res));
    }
}`
    }
  },

  {
    title: 'Minimum Number of Vertices to Reach All Nodes',
    slug: 'minimum-vertices-reach-all-nodes',
    difficulty: 'medium',
    topic: 'graphs',
    description: `Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.

Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists.

**Example 1:**
Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
Output: [0,3]

**Example 2:**
Input: n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
Output: [0,2,3]`,
    inputFormat: 'First line: n. Second line: M. Next M lines: from to',
    outputFormat: 'Space-separated sorted vertex list',
    testCases: [
      { input: '6\n5\n0 1\n0 2\n2 5\n3 4\n4 2', expectedOutput: '0 3', isHidden: false },
      { input: '5\n5\n0 1\n2 1\n3 1\n1 4\n2 4', expectedOutput: '0 2 3', isHidden: false },
      { input: '3\n0', expectedOutput: '0 1 2', isHidden: true },
      { input: '4\n3\n0 1\n1 2\n2 3', expectedOutput: '0', isHidden: true },
    ],
    starterCode: {
      python: `n = int(input())
m = int(input())
has_incoming = set()
for _ in range(m):
    f, t = map(int, input().split())
    has_incoming.add(t)
result = sorted([i for i in range(n) if i not in has_incoming])
print(*result)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,m; cin>>n>>m;
    set<int> has_in;
    for(int i=0;i<m;i++){int f,t;cin>>f>>t;has_in.insert(t);}
    for(int i=0;i<n;i++) if(!has_in.count(i)) cout<<i<<" ";
    cout<<"\n";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),m=sc.nextInt();
        Set<Integer> hasIn=new HashSet<>();
        for(int i=0;i<m;i++){sc.nextInt();hasIn.add(sc.nextInt());}
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<n;i++) if(!hasIn.contains(i)) sb.append(i).append(" ");
        System.out.println(sb.toString().trim());
    }
}`
    }
  },

  {
    title: 'Is Graph Bipartite',
    slug: 'is-graph-bipartite',
    difficulty: 'medium',
    topic: 'graphs',
    description: `There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to.

The graph does not contain self-edges and there are no repeated edges.

A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.

Return true if and only if it is bipartite.

**Example 1:**
Input: graph = [[1,2,3],[0,2],[1,3],[0,2]]
Output: false

**Example 2:**
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true`,
    inputFormat: 'First line: n. Next n lines: degree followed by neighbors',
    outputFormat: 'true or false',
    testCases: [
      { input: '4\n3 1 2 3\n2 0 2\n2 1 3\n2 0 2', expectedOutput: 'false', isHidden: false },
      { input: '4\n2 1 3\n2 0 2\n2 1 3\n2 0 2', expectedOutput: 'true', isHidden: false },
      { input: '2\n1 1\n1 0', expectedOutput: 'true', isHidden: true },
      { input: '3\n2 1 2\n2 0 2\n2 0 1', expectedOutput: 'false', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque
n = int(input())
adj = []
for _ in range(n):
    row = list(map(int, input().split()))
    adj.append(row[1:row[0]+1])

color = [-1]*n
def bfs(start):
    q = deque([start]); color[start]=0
    while q:
        u=q.popleft()
        for v in adj[u]:
            if color[v]==-1: color[v]=1-color[u]; q.append(v)
            elif color[v]==color[u]: return False
    return True

result = all(bfs(i) for i in range(n) if color[i]==-1)
print(str(result).lower())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n;
    vector<vector<int>> adj(n);
    for(int i=0;i<n;i++){int d;cin>>d;adj[i].resize(d);for(auto&x:adj[i])cin>>x;}
    vector<int> color(n,-1); bool ok=true;
    for(int i=0;i<n&&ok;i++){
        if(color[i]==-1){
            queue<int> q; q.push(i); color[i]=0;
            while(!q.empty()&&ok){
                int u=q.front();q.pop();
                for(int v:adj[u]){if(color[v]==-1){color[v]=1-color[u];q.push(v);}else if(color[v]==color[u])ok=false;}
            }
        }
    }
    cout<<(ok?"true":"false");
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(); List<List<Integer>> adj=new ArrayList<>();
        for(int i=0;i<n;i++){int d=sc.nextInt();List<Integer>row=new ArrayList<>();for(int j=0;j<d;j++)row.add(sc.nextInt());adj.add(row);}
        int[]color=new int[n]; Arrays.fill(color,-1); boolean ok=true;
        for(int i=0;i<n&&ok;i++){
            if(color[i]==-1){
                Queue<Integer>q=new LinkedList<>();q.add(i);color[i]=0;
                while(!q.isEmpty()&&ok){int u=q.poll();for(int v:adj.get(u)){if(color[v]==-1){color[v]=1-color[u];q.add(v);}else if(color[v]==color[u])ok=false;}}
            }
        }
        System.out.println(ok?"true":"false");
    }
}`
    }
  },

  // ─── HARD (10) ───────────────────────────────────────────────

  {
    title: 'Word Ladder II',
    slug: 'word-ladder-ii',
    difficulty: 'hard',
    topic: 'graphs',
    description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence where each adjacent pair of words differs by exactly one letter and every word is in the dictionary.

Given beginWord, endWord, and wordList, return all the shortest transformation sequences from beginWord to endWord. Each sequence should be returned as a list of the words. Return the results sorted lexicographically.

**Example 1:**
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]

**Example 2:**
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []`,
    inputFormat: 'First line: beginWord. Second line: endWord. Third line: space-separated wordList',
    outputFormat: 'Each path on its own line, words space-separated. Empty if none.',
    testCases: [
      { input: 'hit\ncog\nhot dot dog lot log cog', expectedOutput: 'hit hot dot dog cog\nhit hot lot log cog', isHidden: false },
      { input: 'hit\ncog\nhot dot dog lot log', expectedOutput: '', isHidden: false },
      { input: 'a\nc\na b c', expectedOutput: 'a c', isHidden: true },
      { input: 'red\ntax\nted tex tax tad den rex pee', expectedOutput: 'red ted tad tax\nred ted tex tax\nred rex tex tax', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque, defaultdict

beginWord = input().strip()
endWord = input().strip()
wordList = input().split()

def findLadders(beginWord, endWord, wordList):
    wordSet = set(wordList)
    if endWord not in wordSet: return []
    layer = {beginWord: [[beginWord]]}
    while layer:
        wordSet -= set(layer.keys())
        new_layer = defaultdict(list)
        for word, paths in layer.items():
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    nw = word[:i]+c+word[i+1:]
                    if nw in wordSet:
                        new_layer[nw] += [p+[nw] for p in paths]
        if endWord in new_layer:
            return sorted([' '.join(p) for p in new_layer[endWord]])
        layer = new_layer
    return []

result = findLadders(beginWord, endWord, wordList)
print('\n'.join(result) if result else '')`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    string bw,ew,line; cin>>bw>>ew; cin.ignore(); getline(cin,line);
    istringstream iss(line); set<string> ws; string w;
    while(iss>>w) ws.insert(w);
    if(!ws.count(ew)){return 0;}
    map<string,vector<vector<string>>> layer; layer[bw]={{bw}};
    bool found=false;
    while(!layer.empty()&&!found){
        for(auto&[k,_]:layer) ws.erase(k);
        map<string,vector<vector<string>>> nl;
        for(auto&[word,paths]:layer){
            string nw=word;
            for(int i=0;i<(int)nw.size();i++){char orig=nw[i];for(char c='a';c<='z';c++){nw[i]=c;if(ws.count(nw)){for(auto p:paths){auto np=p;np.push_back(nw);nl[nw].push_back(np);}if(nw==ew)found=true;}nw[i]=orig;}}
        }
        layer=nl;
    }
    if(layer.count(ew)){
        vector<string> res;
        for(auto&p:layer[ew]){string s;for(int i=0;i<(int)p.size();i++)s+=p[i]+(i+1<(int)p.size()?" ":"");res.push_back(s);}
        sort(res.begin(),res.end());
        for(auto&s:res) cout<<s<<"\n";
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        String bw=sc.nextLine().trim(),ew=sc.nextLine().trim();
        Set<String> ws=new HashSet<>(Arrays.asList(sc.nextLine().trim().split(" ")));
        if(!ws.contains(ew)){return;}
        Map<String,List<List<String>>> layer=new HashMap<>(); layer.put(bw,new ArrayList<>(List.of(new ArrayList<>(List.of(bw)))));
        boolean found=false;
        while(!layer.isEmpty()&&!found){
            ws.removeAll(layer.keySet());
            Map<String,List<List<String>>> nl=new HashMap<>();
            for(Map.Entry<String,List<List<String>>> e:layer.entrySet()){
                String word=e.getKey(); char[]arr=word.toCharArray();
                for(int i=0;i<arr.length;i++){char orig=arr[i];for(char c='a';c<='z';c++){arr[i]=c;String nw=new String(arr);if(ws.contains(nw)){nl.computeIfAbsent(nw,x->new ArrayList<>());for(List<String>p:e.getValue()){List<String>np=new ArrayList<>(p);np.add(nw);nl.get(nw).add(np);}if(nw.equals(ew))found=true;}arr[i]=orig;}}
            }
            layer=nl;
        }
        if(layer.containsKey(ew)){
            List<String> res=new ArrayList<>();
            for(List<String>p:layer.get(ew)) res.add(String.join(" ",p));
            Collections.sort(res);
            for(String s:res) System.out.println(s);
        }
    }
}`
    }
  },

  {
    title: 'Critical Connections in a Network',
    slug: 'critical-connections-network',
    difficulty: 'hard',
    topic: 'graphs',
    description: `There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

**Example:**
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]`,
    inputFormat: 'First line: n. Second line: M. Next M lines: u v',
    outputFormat: 'Each critical edge on its own line: u v (sorted per edge, edges sorted)',
    testCases: [
      { input: '4\n4\n0 1\n1 2\n2 0\n1 3', expectedOutput: '1 3', isHidden: false },
      { input: '2\n1\n0 1', expectedOutput: '0 1', isHidden: false },
      { input: '5\n5\n0 1\n1 2\n2 0\n2 3\n3 4', expectedOutput: '2 3\n3 4', isHidden: true },
      { input: '3\n3\n0 1\n1 2\n2 0', expectedOutput: '', isHidden: true },
    ],
    starterCode: {
      python: `import sys
sys.setrecursionlimit(100000)
n = int(input())
m = int(input())
adj = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v); adj[v].append(u)

disc = [-1]*n; low = [-1]*n; timer = [0]; result = []

def dfs(u, parent):
    disc[u] = low[u] = timer[0]; timer[0] += 1
    for v in adj[u]:
        if v == parent: continue
        if disc[v] == -1:
            dfs(v, u)
            low[u] = min(low[u], low[v])
            if low[v] > disc[u]: result.append((min(u,v), max(u,v)))
        else:
            low[u] = min(low[u], disc[v])

for i in range(n):
    if disc[i] == -1: dfs(i, -1)

for u, v in sorted(result): print(u, v)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int n; vector<vector<int>> adj; vector<int> disc,low; int timer_=0;
vector<pair<int,int>> res;
void dfs(int u,int par){
    disc[u]=low[u]=timer_++;
    for(int v:adj[u]){
        if(v==par) continue;
        if(disc[v]==-1){dfs(v,u);low[u]=min(low[u],low[v]);if(low[v]>disc[u])res.push_back({min(u,v),max(u,v)});}
        else low[u]=min(low[u],disc[v]);
    }
}
int main(){
    int m; cin>>n>>m; adj.resize(n); disc.assign(n,-1); low.assign(n,-1);
    for(int i=0;i<m;i++){int u,v;cin>>u>>v;adj[u].push_back(v);adj[v].push_back(u);}
    for(int i=0;i<n;i++) if(disc[i]==-1) dfs(i,-1);
    sort(res.begin(),res.end());
    for(auto[u,v]:res) cout<<u<<" "<<v<<"\n";
}`,
      java: `import java.util.*;
public class Main {
    static int n,timer=0; static List<List<Integer>> adj; static int[]disc,low; static List<int[]> res=new ArrayList<>();
    static void dfs(int u,int par){
        disc[u]=low[u]=timer++;
        for(int v:adj.get(u)){
            if(v==par)continue;
            if(disc[v]==-1){dfs(v,u);low[u]=Math.min(low[u],low[v]);if(low[v]>disc[u])res.add(new int[]{Math.min(u,v),Math.max(u,v)});}
            else low[u]=Math.min(low[u],disc[v]);
        }
    }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        n=sc.nextInt();int m=sc.nextInt(); adj=new ArrayList<>(); disc=new int[n]; low=new int[n]; Arrays.fill(disc,-1);
        for(int i=0;i<n;i++) adj.add(new ArrayList<>());
        for(int i=0;i<m;i++){int u=sc.nextInt(),v=sc.nextInt();adj.get(u).add(v);adj.get(v).add(u);}
        for(int i=0;i<n;i++) if(disc[i]==-1) dfs(i,-1);
        res.sort((a,b)->a[0]!=b[0]?a[0]-b[0]:a[1]-b[1]);
        for(int[]e:res) System.out.println(e[0]+" "+e[1]);
    }
}`
    }
  },

  {
    title: 'Alien Dictionary',
    slug: 'alien-dictionary',
    difficulty: 'hard',
    topic: 'graphs',
    description: `There is a new alien language that uses the English alphabet. However, the order of letters is unknown to you.

You are given a list of strings words from the alien language's dictionary. Assume the dictionary is sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in the order they appear in the language. If there is no solution, return "". If there are multiple solutions, return any of them.

**Example 1:**
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"

**Example 2:**
Input: words = ["z","x"]
Output: "zx"

**Example 3:**
Input: words = ["z","x","z"]
Output: "" (invalid)`,
    inputFormat: 'First line: N. Next N lines: each word',
    outputFormat: 'Single string with the ordering, or empty string',
    testCases: [
      { input: '5\nwrt\nwrf\ner\nett\nrftt', expectedOutput: 'wertf', isHidden: false },
      { input: '2\nz\nx', expectedOutput: 'zx', isHidden: false },
      { input: '3\nz\nx\nz', expectedOutput: '', isHidden: true },
      { input: '2\nabc\nab', expectedOutput: '', isHidden: true },
    ],
    starterCode: {
      python: `from collections import deque, defaultdict
n = int(input())
words = [input().strip() for _ in range(n)]

def alienOrder(words):
    chars = set(''.join(words))
    adj = defaultdict(set); indegree = {c:0 for c in chars}
    for i in range(len(words)-1):
        w1, w2 = words[i], words[i+1]
        min_len = min(len(w1),len(w2))
        if len(w1)>len(w2) and w1[:min_len]==w2[:min_len]: return ""
        for j in range(min_len):
            if w1[j]!=w2[j]:
                if w2[j] not in adj[w1[j]]:
                    adj[w1[j]].add(w2[j]); indegree[w2[j]]+=1
                break
    q = deque([c for c in indegree if indegree[c]==0])
    result = []
    while q:
        c = q.popleft(); result.append(c)
        for nei in adj[c]:
            indegree[nei]-=1
            if indegree[nei]==0: q.append(nei)
    return ''.join(result) if len(result)==len(chars) else ""

print(alienOrder(words))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n; vector<string> words(n); for(auto&w:words) cin>>w;
    set<char> chars; for(auto&w:words) for(char c:w) chars.insert(c);
    map<char,set<char>> adj; map<char,int> indeg; for(char c:chars) indeg[c]=0;
    bool invalid=false;
    for(int i=0;i<n-1&&!invalid;i++){
        string&w1=words[i],&w2=words[i+1]; int ml=min(w1.size(),w2.size());
        if(w1.size()>w2.size()&&w1.substr(0,ml)==w2.substr(0,ml)){invalid=true;break;}
        for(int j=0;j<(int)ml;j++) if(w1[j]!=w2[j]){if(!adj[w1[j]].count(w2[j])){adj[w1[j]].insert(w2[j]);indeg[w2[j]]++;}break;}
    }
    if(invalid){cout<<"";return 0;}
    queue<char> q; for(char c:chars) if(!indeg[c]) q.push(c);
    string res;
    while(!q.empty()){char c=q.front();q.pop();res+=c;for(char nei:adj[c]) if(--indeg[nei]==0) q.push(nei);}
    cout<<(res.size()==chars.size()?res:"");
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(); sc.nextLine(); String[]words=new String[n];
        for(int i=0;i<n;i++) words[i]=sc.nextLine().trim();
        Set<Character> chars=new LinkedHashSet<>(); for(String w:words) for(char c:w.toCharArray()) chars.add(c);
        Map<Character,Set<Character>> adj=new HashMap<>(); Map<Character,Integer> indeg=new HashMap<>();
        for(char c:chars){adj.put(c,new HashSet<>());indeg.put(c,0);}
        boolean invalid=false;
        for(int i=0;i<n-1&&!invalid;i++){
            String w1=words[i],w2=words[i+1]; int ml=Math.min(w1.length(),w2.length());
            if(w1.length()>w2.length()&&w1.substring(0,ml).equals(w2.substring(0,ml))){invalid=true;break;}
            for(int j=0;j<ml;j++) if(w1.charAt(j)!=w2.charAt(j)){char a=w1.charAt(j),b=w2.charAt(j);if(!adj.get(a).contains(b)){adj.get(a).add(b);indeg.put(b,indeg.get(b)+1);}break;}
        }
        if(invalid){System.out.println("");return;}
        Queue<Character> q=new LinkedList<>(); for(char c:chars) if(indeg.get(c)==0) q.add(c);
        StringBuilder res=new StringBuilder();
        while(!q.isEmpty()){char c=q.poll();res.append(c);for(char nei:adj.get(c))if(indeg.merge(nei,-1,Integer::sum)==0)q.add(nei);}
        System.out.println(res.length()==chars.size()?res.toString():"");
    }
}`
    }
  },

  {
    title: 'Minimum Cost to Connect All Points',
    slug: 'minimum-cost-connect-all-points',
    difficulty: 'hard',
    topic: 'graphs',
    description: `You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

**Example 1:**
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20

**Example 2:**
Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18`,
    inputFormat: 'First line: n. Next n lines: x y',
    outputFormat: 'Single integer: minimum cost',
    testCases: [
      { input: '5\n0 0\n2 2\n3 10\n5 2\n7 0', expectedOutput: '20', isHidden: false },
      { input: '3\n3 12\n-2 5\n-4 1', expectedOutput: '18', isHidden: false },
      { input: '1\n0 0', expectedOutput: '0', isHidden: true },
      { input: '2\n0 0\n1 1', expectedOutput: '2', isHidden: true },
    ],
    starterCode: {
      python: `import heapq
n = int(input())
points = [list(map(int, input().split())) for _ in range(n)]

def minCostConnectPoints(points):
    n = len(points)
    visited = [False]*n; heap = [(0,0)]; total = 0; count = 0
    while count < n:
        cost, u = heapq.heappop(heap)
        if visited[u]: continue
        visited[u] = True; total += cost; count += 1
        for v in range(n):
            if not visited[v]:
                d = abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1])
                heapq.heappush(heap, (d, v))
    return total

print(minCostConnectPoints(points))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n; vector<pair<int,int>> pts(n);
    for(auto&[x,y]:pts) cin>>x>>y;
    vector<bool> vis(n,false); priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq; pq.push({0,0});
    long long total=0; int cnt=0;
    while(cnt<n){
        auto[cost,u]=pq.top();pq.pop();
        if(vis[u]) continue; vis[u]=true; total+=cost; cnt++;
        for(int v=0;v<n;v++) if(!vis[v]){int d=abs(pts[u].first-pts[v].first)+abs(pts[u].second-pts[v].second);pq.push({d,v});}
    }
    cout<<total;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(); int[][]pts=new int[n][2];
        for(int i=0;i<n;i++){pts[i][0]=sc.nextInt();pts[i][1]=sc.nextInt();}
        boolean[]vis=new boolean[n]; PriorityQueue<int[]>pq=new PriorityQueue<>(Comparator.comparingInt(a->a[0])); pq.add(new int[]{0,0});
        long total=0; int cnt=0;
        while(cnt<n){
            int[]p=pq.poll(); if(vis[p[1]])continue; vis[p[1]]=true; total+=p[0]; cnt++;
            for(int v=0;v<n;v++) if(!vis[v]){int d=Math.abs(pts[p[1]][0]-pts[v][0])+Math.abs(pts[p[1]][1]-pts[v][1]);pq.add(new int[]{d,v});}
        }
        System.out.println(total);
    }
}`
    }
  },

  {
    title: 'Network Delay Time',
    slug: 'network-delay-time',
    difficulty: 'hard',
    topic: 'graphs',
    description: `You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

**Example 1:**
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2

**Example 2:**
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1`,
    inputFormat: 'First line: M (edges). Next M lines: u v w. Last line: n k',
    outputFormat: 'Single integer',
    testCases: [
      { input: '3\n2 1 1\n2 3 1\n3 4 1\n4 2', expectedOutput: '2', isHidden: false },
      { input: '1\n1 2 1\n2 1', expectedOutput: '1', isHidden: false },
      { input: '1\n1 2 1\n2 2', expectedOutput: '-1', isHidden: true },
      { input: '4\n1 2 1\n2 3 2\n1 3 4\n3 4 1\n4 1', expectedOutput: '4', isHidden: true },
    ],
    starterCode: {
      python: `import heapq
from collections import defaultdict
m = int(input())
adj = defaultdict(list)
for _ in range(m):
    u, v, w = map(int, input().split())
    adj[u].append((v, w))
n, k = map(int, input().split())

def networkDelayTime(adj, n, k):
    dist = {i: float('inf') for i in range(1, n+1)}
    dist[k] = 0; heap = [(0, k)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u]+w < dist[v]:
                dist[v] = dist[u]+w; heapq.heappush(heap, (dist[v], v))
    ans = max(dist.values())
    return ans if ans < float('inf') else -1

print(networkDelayTime(adj, n, k))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int m; cin>>m;
    vector<tuple<int,int,int>> edges(m);
    for(auto&[u,v,w]:edges) cin>>u>>v>>w;
    int n,k; cin>>n>>k;
    vector<vector<pair<int,int>>> adj(n+1);
    for(auto[u,v,w]:edges) adj[u].push_back({v,w});
    vector<int> dist(n+1,INT_MAX); dist[k]=0;
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq; pq.push({0,k});
    while(!pq.empty()){
        auto[d,u]=pq.top();pq.pop();
        if(d>dist[u]) continue;
        for(auto[v,w]:adj[u]) if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;pq.push({dist[v],v});}
    }
    int ans=*max_element(dist.begin()+1,dist.end());
    cout<<(ans==INT_MAX?-1:ans);
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int m=sc.nextInt(); int[][]edges=new int[m][3];
        for(int i=0;i<m;i++){edges[i][0]=sc.nextInt();edges[i][1]=sc.nextInt();edges[i][2]=sc.nextInt();}
        int n=sc.nextInt(),k=sc.nextInt();
        List<List<int[]>> adj=new ArrayList<>(); for(int i=0;i<=n;i++) adj.add(new ArrayList<>());
        for(int[]e:edges) adj.get(e[0]).add(new int[]{e[1],e[2]});
        int[]dist=new int[n+1]; Arrays.fill(dist,Integer.MAX_VALUE); dist[k]=0;
        PriorityQueue<int[]> pq=new PriorityQueue<>(Comparator.comparingInt(a->a[0])); pq.add(new int[]{0,k});
        while(!pq.isEmpty()){int[]p=pq.poll();if(p[0]>dist[p[1]])continue;for(int[]e:adj.get(p[1]))if(dist[p[1]]+e[1]<dist[e[0]]){dist[e[0]]=dist[p[1]]+e[1];pq.add(new int[]{dist[e[0]],e[0]});}}
        int ans=0; for(int i=1;i<=n;i++) ans=Math.max(ans,dist[i]);
        System.out.println(ans==Integer.MAX_VALUE?-1:ans);
    }
}`
    }
  },

  {
    title: 'Cheapest Flights Within K Stops',
    slug: 'cheapest-flights-within-k-stops',
    difficulty: 'hard',
    topic: 'graphs',
    description: `There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

Given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

**Example 1:**
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700

**Example 2:**
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200`,
    inputFormat: 'First line: n. Second line: M. Next M lines: from to price. Last line: src dst k',
    outputFormat: 'Single integer',
    testCases: [
      { input: '4\n5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0 3 1', expectedOutput: '700', isHidden: false },
      { input: '3\n3\n0 1 100\n1 2 100\n0 2 500\n0 2 1', expectedOutput: '200', isHidden: false },
      { input: '3\n3\n0 1 100\n1 2 100\n0 2 500\n0 2 0', expectedOutput: '500', isHidden: true },
      { input: '2\n1\n0 1 100\n0 1 0', expectedOutput: '100', isHidden: true },
    ],
    starterCode: {
      python: `import heapq
from collections import defaultdict

n = int(input())
m = int(input())
adj = defaultdict(list)
for _ in range(m):
    f, t, p = map(int, input().split())
    adj[f].append((t, p))
src, dst, k = map(int, input().split())

def findCheapestPrice(n, adj, src, dst, k):
    dist = [[float('inf')]*(k+2) for _ in range(n)]
    dist[src][0] = 0
    heap = [(0, src, 0)]  # (cost, node, stops)
    while heap:
        cost, u, stops = heapq.heappop(heap)
        if u == dst: return cost
        if stops > k: continue
        for v, price in adj[u]:
            nc = cost + price
            if nc < dist[v][stops+1]:
                dist[v][stops+1] = nc
                heapq.heappush(heap, (nc, v, stops+1))
    return -1

print(findCheapestPrice(n, adj, src, dst, k))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n,m; cin>>n>>m;
    vector<vector<pair<int,int>>> adj(n);
    for(int i=0;i<m;i++){int f,t,p;cin>>f>>t>>p;adj[f].push_back({t,p});}
    int src,dst,k; cin>>src>>dst>>k;
    vector<vector<int>> dist(n,vector<int>(k+2,INT_MAX)); dist[src][0]=0;
    priority_queue<tuple<int,int,int>,vector<tuple<int,int,int>>,greater<>> pq; pq.push({0,src,0});
    while(!pq.empty()){
        auto[cost,u,stops]=pq.top();pq.pop();
        if(u==dst){cout<<cost;return 0;}
        if(stops>k) continue;
        for(auto[v,p]:adj[u]){int nc=cost+p;if(nc<dist[v][stops+1]){dist[v][stops+1]=nc;pq.push({nc,v,stops+1});}}
    }
    cout<<-1;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(),m=sc.nextInt();
        List<List<int[]>> adj=new ArrayList<>(); for(int i=0;i<n;i++) adj.add(new ArrayList<>());
        for(int i=0;i<m;i++){int f=sc.nextInt(),t=sc.nextInt(),p=sc.nextInt();adj.get(f).add(new int[]{t,p});}
        int src=sc.nextInt(),dst=sc.nextInt(),k=sc.nextInt();
        int[][]dist=new int[n][k+2]; for(int[]r:dist)Arrays.fill(r,Integer.MAX_VALUE); dist[src][0]=0;
        PriorityQueue<int[]> pq=new PriorityQueue<>(Comparator.comparingInt(a->a[0])); pq.add(new int[]{0,src,0});
        while(!pq.isEmpty()){
            int[]p=pq.poll();
            if(p[1]==dst){System.out.println(p[0]);return;}
            if(p[2]>k)continue;
            for(int[]e:adj.get(p[1])){int nc=p[0]+e[1];if(nc<dist[e[0]][p[2]+1]){dist[e[0]][p[2]+1]=nc;pq.add(new int[]{nc,e[0],p[2]+1});}}
        }
        System.out.println(-1);
    }
}`
    }
  },

  {
    title: 'Reconstruct Itinerary',
    slug: 'reconstruct-itinerary',
    difficulty: 'hard',
    topic: 'graphs',
    description: `You are given a list of airline tickets represented by pairs of departure and arrival airports [from, to]. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, return the itinerary that has the smallest lexical order when read as a single string.

You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

**Example 1:**
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]

**Example 2:**
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]`,
    inputFormat: 'First line: N. Next N lines: from to',
    outputFormat: 'Space-separated airport codes',
    testCases: [
      { input: '4\nMUC LHR\nJFK MUC\nSFO SJC\nLHR SFO', expectedOutput: 'JFK MUC LHR SFO SJC', isHidden: false },
      { input: '5\nJFK SFO\nJFK ATL\nSFO ATL\nATL JFK\nATL SFO', expectedOutput: 'JFK ATL JFK SFO ATL SFO', isHidden: false },
      { input: '2\nJFK KUL\nJFK NRT\nNRT JFK', expectedOutput: 'JFK NRT JFK KUL', isHidden: true },
      { input: '1\nJFK A', expectedOutput: 'JFK A', isHidden: true },
    ],
    starterCode: {
      python: `from collections import defaultdict
import heapq

n = int(input())
adj = defaultdict(list)
for _ in range(n):
    f, t = input().split()
    heapq.heappush(adj[f], t)

result = []
def dfs(airport):
    while adj[airport]:
        dfs(heapq.heappop(adj[airport]))
    result.append(airport)

dfs('JFK')
print(' '.join(reversed(result)))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
map<string,priority_queue<string,vector<string>,greater<string>>> adj;
vector<string> result;
void dfs(string airport){
    while(!adj[airport].empty()){string next=adj[airport].top();adj[airport].pop();dfs(next);}
    result.push_back(airport);
}
int main(){
    int n; cin>>n;
    for(int i=0;i<n;i++){string f,t;cin>>f>>t;adj[f].push(t);}
    dfs("JFK");
    reverse(result.begin(),result.end());
    for(int i=0;i<(int)result.size();i++) cout<<result[i]<<(i+1<(int)result.size()?" ":"\n");
}`,
      java: `import java.util.*;
public class Main {
    static Map<String,PriorityQueue<String>> adj=new HashMap<>();
    static List<String> result=new ArrayList<>();
    static void dfs(String airport){
        PriorityQueue<String> pq=adj.getOrDefault(airport,new PriorityQueue<>());
        while(!pq.isEmpty()) dfs(pq.poll());
        result.add(airport);
    }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt(); sc.nextLine();
        for(int i=0;i<n;i++){String[]p=sc.nextLine().trim().split(" ");adj.computeIfAbsent(p[0],x->new PriorityQueue<>()).add(p[1]);}
        dfs("JFK"); Collections.reverse(result);
        System.out.println(String.join(" ",result));
    }
}`
    }
  },

  {
    title: 'Strongly Connected Components',
    slug: 'strongly-connected-components',
    difficulty: 'hard',
    topic: 'graphs',
    description: `Given a directed graph with n nodes and m edges, find the number of strongly connected components (SCCs) using Kosaraju's or Tarjan's algorithm.

A strongly connected component is a maximal set of vertices such that there is a path from each vertex in the set to every other vertex.

**Example 1:**
Input: n = 5, edges = [[0,2],[2,1],[1,0],[0,3],[3,4]]
Output: 3 (SCCs: {0,1,2}, {3}, {4})

**Example 2:**
Input: n = 4, edges = [[0,1],[1,2],[2,3],[3,0]]
Output: 1`,
    inputFormat: 'First line: n. Second line: M. Next M lines: u v',
    outputFormat: 'Single integer: number of SCCs',
    testCases: [
      { input: '5\n5\n0 2\n2 1\n1 0\n0 3\n3 4', expectedOutput: '3', isHidden: false },
      { input: '4\n4\n0 1\n1 2\n2 3\n3 0', expectedOutput: '1', isHidden: false },
      { input: '4\n3\n0 1\n1 2\n2 3', expectedOutput: '4', isHidden: true },
      { input: '6\n6\n0 1\n1 2\n2 0\n3 4\n4 5\n5 3', expectedOutput: '2', isHidden: true },
    ],
    starterCode: {
      python: `import sys
sys.setrecursionlimit(100000)
n = int(input())
m = int(input())
adj = [[] for _ in range(n)]
radj = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v); radj[v].append(u)

visited = [False]*n; order = []
def dfs1(u):
    visited[u]=True
    for v in adj[u]:
        if not visited[v]: dfs1(v)
    order.append(u)

comp = [-1]*n; num_scc = 0
def dfs2(u, c):
    comp[u]=c
    for v in radj[u]:
        if comp[v]==-1: dfs2(v,c)

for i in range(n):
    if not visited[i]: dfs1(i)
for u in reversed(order):
    if comp[u]==-1: dfs2(u, num_scc); num_scc+=1
print(num_scc)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int n; vector<vector<int>> adj,radj; vector<bool> vis; vector<int> order,comp;
void dfs1(int u){vis[u]=true;for(int v:adj[u])if(!vis[v])dfs1(v);order.push_back(u);}
void dfs2(int u,int c){comp[u]=c;for(int v:radj[u])if(comp[v]==-1)dfs2(v,c);}
int main(){
    int m; cin>>n>>m; adj.resize(n);radj.resize(n);vis.assign(n,false);comp.assign(n,-1);
    for(int i=0;i<m;i++){int u,v;cin>>u>>v;adj[u].push_back(v);radj[v].push_back(u);}
    for(int i=0;i<n;i++) if(!vis[i]) dfs1(i);
    int scc=0; for(int i=n-1;i>=0;i--) if(comp[order[i]]==-1){dfs2(order[i],scc);scc++;}
    cout<<scc;
}`,
      java: `import java.util.*;
public class Main {
    static int n; static List<List<Integer>> adj,radj; static boolean[]vis; static int[]comp; static List<Integer> order=new ArrayList<>();
    static void dfs1(int u){vis[u]=true;for(int v:adj.get(u))if(!vis[v])dfs1(v);order.add(u);}
    static void dfs2(int u,int c){comp[u]=c;for(int v:radj.get(u))if(comp[v]==-1)dfs2(v,c);}
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        n=sc.nextInt();int m=sc.nextInt(); adj=new ArrayList<>();radj=new ArrayList<>();
        for(int i=0;i<n;i++){adj.add(new ArrayList<>());radj.add(new ArrayList<>());}
        vis=new boolean[n];comp=new int[n];Arrays.fill(comp,-1);
        for(int i=0;i<m;i++){int u=sc.nextInt(),v=sc.nextInt();adj.get(u).add(v);radj.get(v).add(u);}
        for(int i=0;i<n;i++) if(!vis[i]) dfs1(i);
        int scc=0; for(int i=order.size()-1;i>=0;i--){int u=order.get(i);if(comp[u]==-1){dfs2(u,scc);scc++;}}
        System.out.println(scc);
    }
}`
    }
  },
];

async function seedGraphs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Problem.deleteMany({ topic: 'graphs' });
    console.log('🗑️  Cleared existing graph problems');

    let count = 0;
    for (const problem of graphProblems) {
      await Problem.create(problem);
      console.log(`✅ Seeded [${problem.difficulty.toUpperCase()}]: ${problem.title}`);
      count++;
    }

    const easy = graphProblems.filter(p => p.difficulty === 'easy').length;
    const medium = graphProblems.filter(p => p.difficulty === 'medium').length;
    const hard = graphProblems.filter(p => p.difficulty === 'hard').length;
    console.log(`\n🎉 Done! Seeded ${count} graph problems (${easy} easy, ${medium} medium, ${hard} hard)`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedGraphs();