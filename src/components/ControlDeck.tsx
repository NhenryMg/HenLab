import {
  ArrowClockwise,
  FastForward,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
} from '@phosphor-icons/react'

interface ControlDeckProps {
  playing: boolean
  isDone: boolean
  atStart: boolean
  speed: number
  size: number
  showLabels: boolean
  onToggle: () => void
  onStepBack: () => void
  onStepForward: () => void
  onSkipEnd: () => void
  onReset: () => void
  onShuffle: () => void
  onSpeedChange: (n: number) => void
  onSizeChange: (n: number) => void
  onLabelsChange: (b: boolean) => void
}

export function ControlDeck(props: ControlDeckProps) {
  return (
    <div className="control-deck">
      <div className="control-group">
        <button
          type="button"
          className="btn btn-primary btn-icon"
          onClick={props.onToggle}
          title={props.playing ? 'Pause (Space)' : 'Play (Space)'}
          aria-label={props.playing ? 'Pause' : 'Play'}
        >
          {props.playing ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          onClick={props.onStepBack}
          disabled={props.atStart || props.playing}
          title="Step back (←)"
          aria-label="Step back"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          onClick={props.onStepForward}
          disabled={props.isDone || props.playing}
          title="Step forward (→)"
          aria-label="Step forward"
        >
          <SkipForward size={18} />
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          onClick={props.onSkipEnd}
          disabled={props.isDone}
          title="Run to completion"
          aria-label="Run to completion"
        >
          <FastForward size={18} />
        </button>
      </div>

      <div className="control-group">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={props.onShuffle}
          disabled={props.playing}
          title="Shuffle the array"
        >
          <Shuffle size={16} />
          <span>Shuffle</span>
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={props.onReset}
          disabled={props.atStart}
          title="Back to the first step"
        >
          <ArrowClockwise size={16} />
          <span>Reset</span>
        </button>
      </div>

      <label className="control-slider">
        <span className="control-label">Speed</span>
        <input
          type="range"
          min={5}
          max={300}
          step={5}
          value={props.speed}
          onChange={(e) => props.onSpeedChange(Number(e.target.value))}
        />
        <span className="control-value">{props.speed}</span>
      </label>

      <label className="control-slider">
        <span className="control-label">n</span>
        <input
          type="range"
          min={10}
          max={150}
          step={1}
          value={props.size}
          onChange={(e) => props.onSizeChange(Number(e.target.value))}
        />
        <span className="control-value">{props.size}</span>
      </label>

      <label className="control-toggle">
        <input
          type="checkbox"
          checked={props.showLabels}
          onChange={(e) => props.onLabelsChange(e.target.checked)}
        />
        <span className="toggle-track" aria-hidden="true">
          <span className="toggle-thumb" />
        </span>
        <span className="control-label">Values</span>
      </label>
    </div>
  )
}
