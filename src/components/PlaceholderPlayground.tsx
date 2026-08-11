import { ChartBar, FlowArrow, SquaresFour } from '@phosphor-icons/react'
import type { AlgorithmMeta } from '../lib/types'

interface PlaceholderPlaygroundProps {
  title: string
  subtitle: string
  items: readonly AlgorithmMeta[]
}

const categoryIcon = {
  sorting: ChartBar,
  pathfinding: FlowArrow,
  datastructures: SquaresFour,
} as const

export function PlaceholderPlayground({ title, subtitle, items }: PlaceholderPlaygroundProps) {
  const Icon = categoryIcon[items[0]?.category ?? 'sorting']

  return (
    <div className="playground">
      <header className="algo-header">
        <div className="algo-title">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </header>

      <section className="panel placeholder-panel">
        <div className="placeholder-mark">
          <Icon size={34} />
        </div>
        <h2>Coming soon</h2>
        <p>
          This module is scaffolded and wired into the app. The visual engine is ready; the
          algorithms below land in the next iteration.
        </p>
        <ul className="placeholder-list">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.tagline}</span>
              </div>
              <span className="status-badge">planned</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
