export type Category = 'sorting' | 'pathfinding' | 'datastructures'

export interface Complexity {
  best: string
  average: string
  worst: string
  space: string
}

export interface SortStep {
  array: readonly number[]
  compares?: readonly number[]
  writes?: readonly number[]
  pivot?: number
  key?: number
  region?: readonly [number, number]
  sortedRanges?: readonly (readonly [number, number])[]
  message?: string
}

export type SortGenerator = (array: readonly number[]) => Generator<SortStep, void, unknown>

export interface SortStats {
  comparisons: number
  writes: number
  timeMs: number
}

export interface AlgorithmMeta {
  id: string
  name: string
  category: Category
  tagline: string
  description: string
  complexity: Complexity
  status: 'ready' | 'planned'
}

export interface SortingEntry {
  meta: AlgorithmMeta
  run: SortGenerator
}

export interface PlannedEntry {
  meta: AlgorithmMeta
}
