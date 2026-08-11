import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { SortingPlayground } from './components/SortingPlayground'
import { PlaceholderPlayground } from './components/PlaceholderPlayground'
import { Footer } from './components/Footer'
import { plannedByCategory, readyEntries } from './algorithms/registry'

function App() {
  const [activeId, setActiveId] = useState(readyEntries[0].meta.id)

  const ready = readyEntries.find((e) => e.meta.id === activeId)
  const plannedPath = plannedByCategory.pathfinding.some((m) => m.id === activeId)
  const plannedDs = plannedByCategory.datastructures.some((m) => m.id === activeId)

  let content: React.ReactNode
  if (ready) {
    content = <SortingPlayground entry={ready} />
  } else if (plannedPath) {
    content = (
      <PlaceholderPlayground
        title="Pathfinding"
        subtitle="Explore grids and find the shortest path through walls."
        items={plannedByCategory.pathfinding}
      />
    )
  } else if (plannedDs) {
    content = (
      <PlaceholderPlayground
        title="Data Structures"
        subtitle="Build, inspect and traverse the foundations of computing."
        items={plannedByCategory.datastructures}
      />
    )
  } else {
    content = null
  }

  return (
    <div className="app">
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      <main className="main">
        {content}
        <Footer />
      </main>
    </div>
  )
}

export default App
