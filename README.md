# HenLab

A visual platform to experiment with algorithms and watch how they work.

![stack](https://img.shields.io/badge/React-19-0a0e0d?style=flat&logo=react&logoColor=%23ffb224&labelColor=%23141a17) ![stack](https://img.shields.io/badge/TypeScript-6-0a0e0d?style=flat&logo=typescript&logoColor=%23ffb224&labelColor=%23141a17) ![stack](https://img.shields.io/badge/Vite-8-0a0e0d?style=flat&logo=vite&logoColor=%23ffb224&labelColor=%23141a17)

## What's inside

Every algorithm is written as a pure ES generator that yields an immutable snapshot
of the state at each step. A shared playback engine (play / pause / step / speed /
rewind) drives every visualizer, so the algorithm logic stays completely decoupled
from the rendering.

### Sorting (functional)

- **Bubble Sort** — adjacent swaps, sorted tail grows
- **Selection Sort** — scans for the minimum, one swap per pass
- **Insertion Sort** — grows a sorted prefix, shifting as it goes
- **Merge Sort** — divide, then merge with a temp buffer
- **Quick Sort** — Lomuto partition around a highlighted pivot

Each one reports live **Comparisons**, **Swaps/Writes**, real execution **Time** and a
step counter, with annotations explaining what the algorithm is doing at every step,
plus a syntax-highlighted **implementation panel** (Python / TypeScript) with a
copy button for every algorithm.

### Pathfinding (scaffolded)

BFS · DFS · Dijkstra · A* — the grid engine is ready, algorithms land next.

### Data structures (scaffolded)

Linked List · Stack · Queue · Binary Tree · Graph — same treatment, next iteration.

## Controls

| Action | Key |
| --- | --- |
| Play / Pause | `Space` |
| Step backward / forward | `←` / `→` |

## Run it

```bash
npm install
npm run dev      # development server
npm test         # vitest: sort correctness suites
npm run build    # production build
```

## Architecture

```
src/
  algorithms/       pure generator implementations + metadata registry
    sorting/        bubble, selection, insertion, merge, quick
  lib/              types, stats, usePlayback engine
  components/       visualizers, control deck, stat panel, sidebar
  theme.ts          canvas color tokens (single source of truth)
```

## Roadmap

- [x] App shell + algorithm registry + navigation
- [x] 5 sorting visualizers with full playback + stats + tests
- [ ] Pathfinding: BFS, DFS, Dijkstra, A* on an interactive grid
- [ ] Data structures: Linked List, Stack, Queue, Binary Tree, Graph
