import { useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import { codeTheme } from '../theme'
import type { CodeExample } from '../lib/types'

interface CodeBlockProps {
  sources: CodeExample
}

const TABS: { id: keyof CodeExample; label: string }[] = [
  { id: 'python', label: 'Python' },
  { id: 'typescript', label: 'TypeScript' },
]

export function CodeBlock({ sources }: CodeBlockProps) {
  const [active, setActive] = useState<keyof CodeExample>('python')
  const [copied, setCopied] = useState(false)

  const code = sources[active]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <div className="code-tabs" role="tablist" aria-label="Code language">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              className={`code-tab${active === t.id ? ' is-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={copy} aria-label="Copy code">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-scroll">
        <Highlight theme={codeTheme} code={code.trimEnd()} language={active}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="code-line-number">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
