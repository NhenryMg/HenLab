import { useEffect, useRef } from 'react'
import type { SortStep } from '../lib/types'
import { chartColors } from '../theme'

interface BarChartProps {
  steps: readonly SortStep[]
  index: number
  showLabels: boolean
}

function colorFor(i: number, step: SortStep): string {
  if (step.writes?.includes(i)) return chartColors.write
  if (step.key === i) return chartColors.key
  if (step.pivot === i) return chartColors.pivot
  if (step.compares?.includes(i)) return chartColors.compare
  if (step.sortedRanges?.some(([from, to]) => i >= from && i <= to)) return chartColors.sorted
  if (step.region != null && (i < step.region[0] || i > step.region[1])) return chartColors.dim
  return chartColors.default
}

export function BarChart({ steps, index, showLabels }: BarChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef<() => void>(() => {})
  const propsRef = useRef({ steps, index, showLabels })
  propsRef.current = { steps, index, showLabels }

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const { steps: currentSteps, index: currentIndex, showLabels: withLabels } = propsRef.current
      const dpr = window.devicePixelRatio || 1
      const rect = wrap.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const step = currentSteps[currentIndex]
      if (!step) return

      const n = step.array.length
      const pad = { top: 20, right: 10, bottom: 24, left: 10 }
      const plotW = w - pad.left - pad.right
      const plotH = h - pad.top - pad.bottom
      const max = Math.max(...step.array, 1)
      const baseline = pad.top + plotH
      const slot = plotW / n
      const barW = Math.max(2, Math.min(slot * 0.62, 26))
      const minBarH = 2

      ctx.strokeStyle = chartColors.grid
      ctx.lineWidth = 1
      for (const level of [0.25, 0.5, 0.75]) {
        const y = baseline - plotH * level
        ctx.beginPath()
        ctx.moveTo(pad.left, y)
        ctx.lineTo(w - pad.right, y)
        ctx.stroke()
      }
      ctx.strokeStyle = chartColors.axis
      ctx.beginPath()
      ctx.moveTo(pad.left, baseline + 0.5)
      ctx.lineTo(w - pad.right, baseline + 0.5)
      ctx.stroke()

      ctx.font = '10px "JetBrains Mono Variable", ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      const labels = withLabels && n <= 80

      for (let i = 0; i < n; i++) {
        const v = step.array[i]
        const bh = Math.max(minBarH, (v / max) * plotH)
        const x = pad.left + i * slot + (slot - barW) / 2
        const y = baseline - bh
        ctx.fillStyle = colorFor(i, step)
        ctx.fillRect(x, y, barW, bh)
        if (labels) {
          ctx.fillStyle = chartColors.label
          ctx.fillText(String(v), x + barW / 2, y - 3)
        }
      }
    }

    drawRef.current = draw
    draw()

    const ro = new ResizeObserver(() => draw())
    ro.observe(wrap)
    return () => {
      ro.disconnect()
      drawRef.current = () => {}
    }
  }, [])

  useEffect(() => {
    drawRef.current()
  }, [steps, index, showLabels])

  return (
    <div ref={wrapRef} className="chart-wrap">
      <canvas ref={canvasRef} className="chart-canvas" />
    </div>
  )
}
