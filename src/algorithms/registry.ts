import type { AlgorithmMeta } from '../lib/types'
import { sortingEntries } from './sorting'

const emptyComplexity = { best: '—', average: '—', worst: '—', space: '—' }

const pathfindingMeta: AlgorithmMeta[] = [
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'pathfinding',
    status: 'planned',
    tagline: 'Explores level by level. Guarantees the shortest path in unweighted grids.',
    description: 'Coming soon. Explores all neighbors before moving one level deeper.',
    complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'pathfinding',
    status: 'planned',
    tagline: 'Follows one branch as deep as possible before backtracking.',
    description: 'Coming soon. Recursive exploration that prioritizes depth over breadth.',
    complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'pathfinding',
    status: 'planned',
    tagline: 'Finds the shortest path from a single source with weighted edges.',
    description: 'Coming soon. Expands the node with the lowest known distance using a priority queue.',
    complexity: { best: 'O((V+E) log V)', average: 'O((V+E) log V)', worst: 'O((V+E) log V)', space: 'O(V)' },
  },
  {
    id: 'astar',
    name: 'A* Search',
    category: 'pathfinding',
    status: 'planned',
    tagline: 'Best-first search guided by a heuristic towards the goal.',
    description: 'Coming soon. Combines the known distance with an admissible heuristic to reach the goal faster.',
    complexity: { best: 'O(E)', average: 'O(E)', worst: 'O(V+E)', space: 'O(V)' },
  },
]

const dataStructureMeta: AlgorithmMeta[] = [
  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'datastructures',
    status: 'planned',
    tagline: 'Nodes chained by pointers. O(1) insertion at the ends.',
    description: 'Coming soon. Interact with a doubly linked list: insert, delete and traverse nodes.',
    complexity: emptyComplexity,
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'datastructures',
    status: 'planned',
    tagline: 'Last in, first out.',
    description: 'Coming soon. Push and pop values, and watch the top of the stack move.',
    complexity: emptyComplexity,
  },
  {
    id: 'queue',
    name: 'Queue',
    category: 'datastructures',
    status: 'planned',
    tagline: 'First in, first out.',
    description: 'Coming soon. Enqueue at the back, dequeue from the front.',
    complexity: emptyComplexity,
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    category: 'datastructures',
    status: 'planned',
    tagline: 'Hierarchical nodes with up to two children.',
    description: 'Coming soon. Insert, search and traverse a binary search tree.',
    complexity: emptyComplexity,
  },
  {
    id: 'graph',
    name: 'Graph',
    category: 'datastructures',
    status: 'planned',
    tagline: 'Nodes and edges. The foundation of every network.',
    description: 'Coming soon. Build graphs interactively and run traversals on them.',
    complexity: emptyComplexity,
  },
]

export const readyEntries = sortingEntries

export const plannedByCategory = {
  pathfinding: pathfindingMeta,
  datastructures: dataStructureMeta,
} as const

export function findMeta(id: string): AlgorithmMeta | undefined {
  for (const e of sortingEntries) {
    if (e.meta.id === id) return e.meta
  }
  for (const list of [pathfindingMeta, dataStructureMeta]) {
    const m = list.find((x) => x.id === id)
    if (m) return m
  }
  return undefined
}
