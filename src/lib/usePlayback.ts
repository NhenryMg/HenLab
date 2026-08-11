import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SortStep } from './types'
import { cumulativeStats } from './stats'

export function usePlayback(steps: readonly SortStep[], timeMs: number) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(120)

  const stepsRef = useRef(steps)
  const speedRef = useRef(speed)
  const playingRef = useRef(false)
  const indexRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const accRef = useRef(0)
  const lastRef = useRef(0)

  useEffect(() => {
    stepsRef.current = steps
  }, [steps])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  const total = steps.length

  useEffect(() => {
    indexRef.current = 0
    accRef.current = 0
    lastRef.current = 0
    playingRef.current = false
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setIndex(0)
    setPlaying(false)
  }, [steps, timeMs])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const stop = useCallback(() => {
    playingRef.current = false
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setPlaying(false)
  }, [])

  const loop = useCallback(
    (t: number) => {
      if (!playingRef.current) return
      const dt = lastRef.current ? Math.min(t - lastRef.current, 100) : 0
      lastRef.current = t
      accRef.current += dt * speedRef.current
      let advance = Math.floor(accRef.current / 1000)
      accRef.current %= 1000
      if (advance < 1) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }
      const last = stepsRef.current.length - 1
      const next = Math.min(indexRef.current + advance, last)
      indexRef.current = next
      setIndex(next)
      if (next >= last) {
        stop()
      } else if (playingRef.current) {
        rafRef.current = requestAnimationFrame(loop)
      }
    },
    [stop],
  )

  const play = useCallback(() => {
    if (stepsRef.current.length === 0) return
    if (indexRef.current >= stepsRef.current.length - 1) {
      indexRef.current = 0
      setIndex(0)
    }
    playingRef.current = true
    accRef.current = 0
    lastRef.current = 0
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(loop)
    setPlaying(true)
  }, [loop])

  const toggle = useCallback(() => {
    if (playingRef.current) {
      stop()
    } else {
      play()
    }
  }, [play, stop])

  const stepForward = useCallback(() => {
    if (playingRef.current) return
    setIndex((prev) => {
      const next = Math.min(prev + 1, stepsRef.current.length - 1)
      indexRef.current = next
      return next
    })
  }, [])

  const stepBack = useCallback(() => {
    setIndex((prev) => {
      const next = Math.max(prev - 1, 0)
      indexRef.current = next
      return next
    })
  }, [])

  const seekTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(i, stepsRef.current.length - 1))
    indexRef.current = clamped
    setIndex(clamped)
  }, [])

  const reset = useCallback(() => seekTo(0), [seekTo])

  const safeIndex = Math.min(index, Math.max(0, total - 1))
  const step = steps[safeIndex]
  const cumulative = useMemo(() => cumulativeStats(steps), [steps])
  const current = cumulative[safeIndex]
  const isDone = total > 0 && safeIndex >= total - 1

  return {
    index: safeIndex,
    total,
    playing,
    speed,
    step,
    isDone,
    timeMs,
    comparisons: current?.comparisons ?? 0,
    writes: current?.writes ?? 0,
    play,
    toggle,
    stepForward,
    stepBack,
    seekTo,
    reset,
    setSpeed,
  }
}
