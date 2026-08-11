import type { SortGenerator } from '../../lib/types'

export const insertionSort: SortGenerator = function* (input) {
  const a = [...input]
  const n = a.length

  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1
    while (j >= 0 && a[j] > key) {
      yield {
        array: [...a],
        compares: [j, i],
        key: i,
        message: `Compare ${a[j]} with key ${key}`,
      }
      a[j + 1] = a[j]
      j--
      yield {
        array: [...a],
        writes: [j + 1],
        key: i,
        message: `Shift ${a[j + 1]} to the right`,
      }
    }
    a[j + 1] = key
    yield {
      array: [...a],
      writes: [j + 1],
      key: i,
      message: `Insert ${key} at position ${j + 1}`,
    }
  }

  yield { array: [...a], sortedRanges: [[0, n - 1]], message: 'Array is sorted' }
}
