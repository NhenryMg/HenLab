import { useEffect, useMemo, useState } from 'react'
import type { SortingEntry } from '../lib/types'
import { randomArray, shuffle } from '../utils/array'
import { usePlayback } from '../lib/usePlayback'
import { BarChart } from './BarChart'
import { ControlDeck } from './ControlDeck'
import { StatPanel } from './StatPanel'

interface SortingPlaygroundProps {
  entry: SortingEntry
}

function generateSteps(run: SortingEntry['run'], array: readonly number[]) {
  const t0 = performance.now()
  const steps = [...run(array)]
  const timeMs = performance.now() - t0
  return { steps, timeMs }
}

export function SortingPlayground({ entry }: SortingPlaygroundProps) {
  const [size, setSize] = useState(60)
  const [showLabels, setShowLabels] = useState(false)
  const [array, setArray] = useState<number[]>(() => randomArray(60))

  const { steps, timeMs } = useMemo(() => generateSteps(entry.run, array), [entry, array])
  const pb = usePlayback(steps, timeMs)

  const { meta } = entry

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.code === 'Space') {
        e.preventDefault()
        pb.toggle()
      } else if (e.code === 'ArrowLeft') {
        pb.stepBack()
      } else if (e.code === 'ArrowRight') {
        pb.stepForward()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pb])

  const handleShuffle = () => {
    setArray((prev) => shuffle(prev))
  }

  const handleSizeChange = (n: number) => {
    setSize(n)
    setArray(randomArray(n))
  }

  const complexity = meta.complexity
  const chips = [
    { label: 'Best', value: complexity.best },
    { label: 'Average', value: complexity.average },
    { label: 'Worst', value: complexity.worst },
    { label: 'Space', value: complexity.space },
  ]

  const legend = [
    { color: 'var(--bar-default)', label: 'Unsorted' },
    { color: 'var(--bar-compare)', label: 'Comparing' },
    { color: 'var(--bar-write)', label: 'Swap / Write' },
    { color: 'var(--bar-pivot)', label: 'Pivot / Key' },
    { color: 'var(--bar-sorted)', label: 'Sorted' },
  ]

  return (
    <div className="playground">
      <header className="algo-header">
        <div className="algo-title">
          <h1>{meta.name}</h1>
          <p>{meta.tagline}</p>
        </div>
        <div className="complexity-chips">
          {chips.map((c) => (
            <div key={c.label} className="complexity-chip" title={`${c.label} case`}>
              <span>{c.label}</span>
              <code>{c.value}</code>
            </div>
          ))}
        </div>
      </header>

      <section className="panel chart-panel">
        <BarChart steps={steps} index={pb.index} showLabels={showLabels} />
        <div className="chart-footer">
          <div className="legend">
            {legend.map((l) => (
              <span key={l.label} className="legend-item">
                <i style={{ backgroundColor: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
          <span className="step-readout">
            step {pb.index} / {pb.total - 1}
          </span>
        </div>
      </section>

      <ControlDeck
        playing={pb.playing}
        isDone={pb.isDone}
        atStart={pb.index === 0}
        speed={pb.speed}
        size={size}
        showLabels={showLabels}
        onToggle={pb.toggle}
        onStepBack={pb.stepBack}
        onStepForward={pb.stepForward}
        onSkipEnd={() => pb.seekTo(pb.total - 1)}
        onReset={pb.reset}
        onShuffle={handleShuffle}
        onSpeedChange={pb.setSpeed}
        onSizeChange={handleSizeChange}
        onLabelsChange={setShowLabels}
      />

      <div className="message-line">
        <span className="prompt">&#187;</span>
        <span className={pb.isDone ? 'message message-done' : 'message'}>
          {pb.step?.message ?? 'Press play to see the algorithm run.'}
        </span>
      </div>

      <StatPanel
        comparisons={pb.comparisons}
        writes={pb.writes}
        timeMs={pb.timeMs}
        steps={pb.total}
        currentStep={pb.index}
      />

      <section className="panel desc-panel">
        <h2>How it works</h2>
        <p>{meta.description}</p>
      </section>
    </div>
  )
}
