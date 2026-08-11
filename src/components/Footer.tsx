import { EnvelopeSimple, GithubLogo } from '@phosphor-icons/react'

const AUTHOR = {
  name: 'NhenryMg',
  alias: '_h3mg_',
  github: 'https://github.com/NhenryMg',
  email: 'mongegonzalezhenry@gmail.com',
}

const STACK = ['React', 'TypeScript', 'Vite', 'Canvas']

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <span className="footer-built">
          Built by <strong>{AUTHOR.name}</strong>
          <span className="footer-alias">{AUTHOR.alias}</span>
        </span>
        <span className="footer-links">
          <a href={AUTHOR.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <GithubLogo size={16} weight="fill" />
            <span>GitHub</span>
          </a>
          <a href={`mailto:${AUTHOR.email}`} aria-label="Email">
            <EnvelopeSimple size={16} weight="fill" />
            <span>Email</span>
          </a>
        </span>
      </div>
      <div className="footer-row footer-sub">
        <span className="footer-stack">{STACK.join(' · ')}</span>
        <span>© {new Date().getFullYear()} {AUTHOR.name}</span>
      </div>
    </footer>
  )
}
