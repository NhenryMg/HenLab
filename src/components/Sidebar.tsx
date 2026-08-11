import { ChartBar, FlowArrow, SquaresFour } from '@phosphor-icons/react'
import { plannedByCategory, readyEntries } from '../algorithms/registry'
import type { AlgorithmMeta } from '../lib/types'

interface SidebarProps {
  activeId: string
  onSelect: (id: string) => void
}

interface Section {
  label: string
  icon: typeof ChartBar
  items: readonly AlgorithmMeta[]
}

const sections: Section[] = [
  {
    label: 'Sorting',
    icon: ChartBar,
    items: readyEntries.map((e) => e.meta),
  },
  {
    label: 'Pathfinding',
    icon: FlowArrow,
    items: plannedByCategory.pathfinding,
  },
  {
    label: 'Data Structures',
    icon: SquaresFour,
    items: plannedByCategory.datastructures,
  },
]

export function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          <span />
        </div>
        <div className="brand-text">
          <strong>HenLab</strong>
          <span>visual algorithms</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Algorithms">
        {sections.map((section) => (
          <div key={section.label} className="sidebar-section">
            <div className="sidebar-section-label">
              <section.icon size={14} />
              <span>{section.label}</span>
            </div>
            <ul className="sidebar-list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sidebar-item${item.id === activeId ? ' is-active' : ''}`}
                    onClick={() => onSelect(item.id)}
                  >
                    <span className="sidebar-item-name">{item.name}</span>
                    {item.status === 'planned' && <span className="sidebar-item-status">soon</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
