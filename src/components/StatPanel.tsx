import { Gauge, GitMerge, ListNumbers, Timer } from '@phosphor-icons/react'

interface StatPanelProps {
  comparisons: number
  writes: number
  timeMs: number
  steps: number
  currentStep: number
}

function formatTime(ms: number): string {
  if (ms < 1) return `${ms.toFixed(3)} ms`
  return `${ms.toFixed(2)} ms`
}

export function StatPanel({ comparisons, writes, timeMs, steps, currentStep }: StatPanelProps) {
  const items = [
    { icon: Gauge, label: 'Comparisons', value: comparisons.toLocaleString('en-US') },
    { icon: GitMerge, label: 'Swaps / Writes', value: writes.toLocaleString('en-US') },
    { icon: Timer, label: 'Time', value: formatTime(timeMs) },
    { icon: ListNumbers, label: 'Steps', value: `${currentStep.toLocaleString('en-US')} / ${steps.toLocaleString('en-US')}` },
  ]

  return (
    <div className="stat-panel">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="stat-readout">
          <div className="stat-label">
            <Icon size={14} />
            <span>{label}</span>
          </div>
          <div className="stat-value">{value}</div>
        </div>
      ))}
    </div>
  )
}
