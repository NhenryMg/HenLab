import { describe, expect, it } from 'vitest'
import { bubbleSort } from './bubble'
import { selectionSort } from './selection'
import { insertionSort } from './insertion'
import { mergeSort } from './merge'
import { quickSort } from './quick'
import type { SortGenerator } from '../../lib/types'
import { isPermutationOf, isSorted, randomArray } from '../../utils/array'

const sorts: [string, SortGenerator][] = [
  ['bubble sort', bubbleSort],
  ['selection sort', selectionSort],
  ['insertion sort', insertionSort],
  ['merge sort', mergeSort],
  ['quick sort', quickSort],
]

function collect(run: SortGenerator, input: readonly number[]) {
  const steps = [...run(input)]
  return { last: steps[steps.length - 1]?.array, count: steps.length }
}

describe.each(sorts)('%s', (_name, run) => {
  it('sorts a random array', () => {
    const input = randomArray(80)
    const { last, count } = collect(run, input)
    expect(count).toBeGreaterThan(0)
    expect(isSorted(last ?? [])).toBe(true)
    expect(isPermutationOf(last ?? [], input)).toBe(true)
  })

  it('sorts an already sorted array', () => {
    const input = Array.from({ length: 50 }, (_, i) => i)
    const { last } = collect(run, input)
    expect(isSorted(last ?? [])).toBe(true)
  })

  it('sorts a reverse-sorted array', () => {
    const input = Array.from({ length: 50 }, (_, i) => 49 - i)
    const { last } = collect(run, input)
    expect(isSorted(last ?? [])).toBe(true)
  })

  it('handles empty, single, duplicates and tiny inputs', () => {
    for (const input of [[], [7], [3, 3, 3], [2, 1], [1, 2]]) {
      const { last } = collect(run, input)
      expect(isSorted(last ?? [])).toBe(true)
      expect(isPermutationOf(last ?? [], input)).toBe(true)
    }
  })
})
