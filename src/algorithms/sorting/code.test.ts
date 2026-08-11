import { describe, expect, it } from 'vitest'
import { sortingEntries } from './index'

describe('code examples', () => {
  it('every sorting algorithm ships python and typescript snippets', () => {
    for (const entry of sortingEntries) {
      expect(entry.code, entry.meta.name).toBeDefined()
      expect(entry.code.python.length, entry.meta.name).toBeGreaterThan(10)
      expect(entry.code.typescript.length, entry.meta.name).toBeGreaterThan(10)
    }
  })

  it('snippets reference the algorithm they belong to', () => {
    for (const entry of sortingEntries) {
      const key = entry.meta.name.split(' ')[0].toLowerCase()
      expect(entry.code.python, entry.meta.name).toContain(key)
      expect(entry.code.typescript, entry.meta.name).toContain(key)
    }
  })
})
