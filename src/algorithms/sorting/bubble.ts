import type { SortGenerator } from '../../lib/types'

export const bubbleSort: SortGenerator = function* (input) {
  const a = [...input]
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    const tail = n - 1 - i
    for (let j = 0; j < tail; j++) {
      yield {
        array: [...a],
        compares: [j, j + 1],
        sortedRanges: [[tail, n - 1]],
        message: `Compare ${a[j]} and ${a[j + 1]}`,
      }
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true
        yield {
          array: [...a],
          writes: [j, j + 1],
          sortedRanges: [[tail, n - 1]],
          message: `Swap ${a[j + 1]} and ${a[j]}`,
        }
      }
    }
    if (!swapped) break
  }

  yield { array: [...a], sortedRanges: [[0, n - 1]], message: 'Array is sorted' }
}
