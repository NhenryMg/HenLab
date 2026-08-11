import type { SortGenerator, SortStep } from '../../lib/types'

export const quickSort: SortGenerator = function* (input) {
  const a = [...input]
  const n = a.length

  yield* qs(0, n - 1)

  yield { array: [...a], sortedRanges: [[0, n - 1]], message: 'Array is sorted' }

  function* qs(lo: number, hi: number): Generator<SortStep, void, unknown> {
    if (lo >= hi) return
    const p = yield* partition(lo, hi)
    yield* qs(lo, p - 1)
    yield* qs(p + 1, hi)
  }

  function* partition(lo: number, hi: number): Generator<SortStep, number, unknown> {
    const pivot = a[hi]
    yield {
      array: [...a],
      pivot: hi,
      region: [lo, hi],
      message: `Pick ${pivot} as pivot`,
    }
    let i = lo
    for (let j = lo; j < hi; j++) {
      yield {
        array: [...a],
        compares: [j, hi],
        pivot: hi,
        region: [lo, hi],
        message: `Compare ${a[j]} with pivot ${pivot}`,
      }
      if (a[j] <= pivot) {
        if (i !== j) {
          ;[a[i], a[j]] = [a[j], a[i]]
          yield {
            array: [...a],
            writes: [i, j],
            pivot: hi,
            region: [lo, hi],
            message: `Move ${a[j]} to the left partition`,
          }
        }
        i++
      }
    }
    if (i !== hi) {
      ;[a[i], a[hi]] = [a[hi], a[i]]
      yield {
        array: [...a],
        writes: [i, hi],
        pivot: i,
        region: [lo, hi],
        message: `Place pivot ${pivot} at its sorted position ${i}`,
      }
    }
    return i
  }
}
