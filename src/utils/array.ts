export function randomArray(size: number, min = 5, max = 100): number[] {
  return Array.from({ length: size }, () => min + Math.floor(Math.random() * (max - min + 1)))
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function isSorted(arr: readonly number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false
  }
  return true
}

export function isPermutationOf(a: readonly number[], b: readonly number[]): boolean {
  if (a.length !== b.length) return false
  const ca = [...a].sort((x, y) => x - y)
  const cb = [...b].sort((x, y) => x - y)
  return ca.every((v, i) => v === cb[i])
}
