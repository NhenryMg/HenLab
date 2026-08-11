import type { SortGenerator } from '../../lib/types'

function prefixRanges(n: number): readonly (readonly [number, number])[] {
  return n > 0 ? [[0, n - 1]] : []
}

export const selectionSort: SortGenerator = function* (input) {
  const a = [...input]
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...a],
        compares: [j, min],
        sortedRanges: prefixRanges(i),
        message: `Compare ${a[j]} with current min ${a[min]}`,
      }
      if (a[j] < a[min]) min = j
    }
    if (min !== i) {
      ;[a[i], a[min]] = [a[min], a[i]]
      yield {
        array: [...a],
        writes: [i, min],
        sortedRanges: prefixRanges(i + 1),
        message: `Swap ${a[i]} into position ${i}`,
      }
    } else {
      yield {
        array: [...a],
        sortedRanges: prefixRanges(i + 1),
        message: `${a[i]} is already in place at ${i}`,
      }
    }
  }

  yield { array: [...a], sortedRanges: [[0, n - 1]], message: 'Array is sorted' }
}
