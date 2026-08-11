import type { SortStep } from './types'

export interface Cumulative {
  comparisons: number
  writes: number
}

export function cumulativeStats(steps: readonly SortStep[]): Cumulative[] {
  let comparisons = 0
  let writes = 0
  return steps.map((s) => {
    comparisons += s.compares?.length ?? 0
    writes += s.writes?.length ?? 0
    return { comparisons, writes }
  })
}
