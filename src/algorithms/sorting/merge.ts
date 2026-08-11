import type { SortGenerator, SortStep } from '../../lib/types'

export const mergeSort: SortGenerator = function* (input) {
  const a = [...input]
  const n = a.length
  const tmp: number[] = new Array(n)

  yield* sortRange(0, n)

  yield { array: [...a], sortedRanges: [[0, n - 1]], message: 'Array is sorted' }

  function* sortRange(lo: number, hi: number): Generator<SortStep, void, unknown> {
    if (hi - lo < 2) return
    const mid = (lo + hi) >> 1
    yield {
      array: [...a],
      region: [lo, hi - 1],
      message: `Divide range [${lo}..${hi - 1}] into two halves`,
    }
    yield* sortRange(lo, mid)
    yield* sortRange(mid, hi)
    yield* merge(lo, mid, hi)
  }

  function* merge(lo: number, mid: number, hi: number): Generator<SortStep, void, unknown> {
    let i = lo
    let j = mid
    let k = lo
    yield {
      array: [...a],
      region: [lo, hi - 1],
      message: `Merge [${lo}..${mid - 1}] with [${mid}..${hi - 1}]`,
    }
    while (i < mid && j < hi) {
      yield {
        array: [...a],
        compares: [i, j],
        region: [lo, hi - 1],
        message: `Compare ${a[i]} and ${a[j]}`,
      }
      if (a[i] <= a[j]) {
        tmp[k] = a[i]
        yield {
          array: [...a],
          writes: [k],
          region: [lo, hi - 1],
          message: `Take ${a[i]} from the left half`,
        }
        i++
      } else {
        tmp[k] = a[j]
        yield {
          array: [...a],
          writes: [k],
          region: [lo, hi - 1],
          message: `Take ${a[j]} from the right half`,
        }
        j++
      }
      k++
    }
    while (i < mid) {
      tmp[k] = a[i]
      yield {
        array: [...a],
        writes: [k],
        region: [lo, hi - 1],
        message: `Copy remaining ${a[i]}`,
      }
      i++
      k++
    }
    while (j < hi) {
      tmp[k] = a[j]
      yield {
        array: [...a],
        writes: [k],
        region: [lo, hi - 1],
        message: `Copy remaining ${a[j]}`,
      }
      j++
      k++
    }
    for (let m = lo; m < hi; m++) {
      a[m] = tmp[m]
      yield {
        array: [...a],
        writes: [m],
        region: [lo, hi - 1],
        message: `Write ${a[m]} back into the array`,
      }
    }
  }
}
