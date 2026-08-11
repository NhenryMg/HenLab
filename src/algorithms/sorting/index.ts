import type { SortingEntry } from '../../lib/types'
import { bubbleSort } from './bubble'
import { selectionSort } from './selection'
import { insertionSort } from './insertion'
import { mergeSort } from './merge'
import { quickSort } from './quick'
import { codeExamples } from './code'

export const sortingEntries: SortingEntry[] = [
  {
    meta: {
      id: 'bubble',
      name: 'Bubble Sort',
      category: 'sorting',
      status: 'ready',
      tagline: 'Bubbles the largest values to the end, one pass at a time.',
      description:
        'Repeatedly steps through the list, compares adjacent elements, and swaps them when they are out of order. Each pass guarantees that the largest remaining element reaches its final position.',
      complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    },
    run: bubbleSort,
    code: codeExamples.bubble,
  },
  {
    meta: {
      id: 'selection',
      name: 'Selection Sort',
      category: 'sorting',
      status: 'ready',
      tagline: 'Repeatedly selects the smallest remaining element.',
      description:
        'Scans the unsorted portion to find the minimum and swaps it into the front of the array. Makes at most n swaps in total, which is optimal among in-place sorting algorithms.',
      complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    },
    run: selectionSort,
    code: codeExamples.selection,
  },
  {
    meta: {
      id: 'insertion',
      name: 'Insertion Sort',
      category: 'sorting',
      status: 'ready',
      tagline: 'Grows a sorted region by inserting one element at a time.',
      description:
        'Takes each element and inserts it into its correct place within the already-sorted prefix, shifting larger elements to the right. Excellent for small or nearly-sorted arrays.',
      complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    },
    run: insertionSort,
    code: codeExamples.insertion,
  },
  {
    meta: {
      id: 'merge',
      name: 'Merge Sort',
      category: 'sorting',
      status: 'ready',
      tagline: 'Divide, sort each half, then merge them back together.',
      description:
        'Splits the array in half recursively until single elements remain, then merges pairs of sorted runs into larger ones. Guarantees O(n log n) comparisons in every case.',
      complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    },
    run: mergeSort,
    code: codeExamples.merge,
  },
  {
    meta: {
      id: 'quick',
      name: 'Quick Sort',
      category: 'sorting',
      status: 'ready',
      tagline: 'Partitions around a pivot, then recurses on both sides.',
      description:
        'Chooses a pivot, reorders the range so smaller elements are on the left and larger on the right, then recurses on each partition. Usually the fastest comparison sort in practice.',
      complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    },
    run: quickSort,
    code: codeExamples.quick,
  },
]
