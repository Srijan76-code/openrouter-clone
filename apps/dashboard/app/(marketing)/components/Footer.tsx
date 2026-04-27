import Link from 'next/link'
import styles from './Footer.module.css'
import { MARKETING_LINKS } from '../lib/links'

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Models', href: '#models' },
      { label: 'Pipeline', href: '#how-it-works' },
      { label: 'Tracing', href: '#tracing' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Quickstart', href: MARKETING_LINKS.docs, external: true },
      { label: 'API Reference', href: MARKETING_LINKS.docs, external: true },
      { label: 'Self-hosting', href: MARKETING_LINKS.docs, external: true },
      { label: 'GitHub', href: MARKETING_LINKS.github, external: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: MARKETING_LINKS.docs, external: true },
      { label: 'DevTools', href: 'http://localhost:4983', external: true },
      { label: 'Changelog', href: MARKETING_LINKS.docs, external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandMark}>O</span>
              Orbyt
            </Link>
            <p className={styles.tagline}>
              A self-hosted LLM gateway. One endpoint between your application
              and every major AI provider.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title} className={styles.col}>
              <span className={styles.colTitle}>{c.title}</span>
              {c.links.map((l) =>
                'external' in l && l.external ? (
                  <a key={l.label} className={styles.link} href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ) : (
                  <a key={l.label} className={styles.link} href={l.href}>
                    {l.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© {new Date().getFullYear()} Orbyt. MIT licensed.</span>
          <div className={styles.bottomLinks}>
            <a className={styles.bottomLink} href="#">Privacy</a>
            <a className={styles.bottomLink} href="#">Terms</a>
            <a className={styles.bottomLink} href={MARKETING_LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
