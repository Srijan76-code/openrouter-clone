'use client'

import styles from './Marquee.module.css'

type Provider = { name: string; mark: React.ReactNode }

const Mark = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.itemIcon} aria-hidden="true">{children}</span>
)

const PROVIDERS: Provider[] = [
  {
    name: 'OpenAI',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.774-2.758a.795.795 0 0 0 .392-.681v-6.737l2.018 1.168a.071.071 0 0 1 .039.057v5.583a4.504 4.504 0 0 1-4.489 4.488zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.778 2.758a.793.793 0 0 0 .787 0l5.831-3.367v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.018 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.83-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'Anthropic',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M13.827 3.52h3.633L24 20.48h-3.633zM6.54 3.52h3.836l6.54 16.96h-3.706l-1.337-3.45H4.95L3.614 20.48H0zm.18 5.12L4.49 14.34h4.41z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'Google',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M12 11v2.4h6.84a5.86 5.86 0 0 1-1.49 3.93A7.0 7.0 0 0 1 12 19.5a7.5 7.5 0 1 1 0-15 7.2 7.2 0 0 1 5.1 2L18.8 4.8A9.6 9.6 0 0 0 12 2a10 10 0 1 0 0 20c2.88 0 5.28-.95 7.04-2.7C20.85 17.49 22 14.78 22 11.7a9.6 9.6 0 0 0-.16-1.7H12z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'Meta',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M12 4.8C8.8 4.8 6.8 7.5 5 10.4c-2.4-3-4-4.4-6.6-1.8L0 9.4c1.6-1.5 3.5-1.6 5.4.8 1.6 2 2.6 4.4 4.5 4.4 1.6 0 2.4-1 3.6-2.7l1.6 2c-1.6 2.6-3.6 4.5-6 4.5-3.2 0-5-2.7-6.4-5.6L0 14c1.4 3 3.6 7 7.6 7 3.7 0 5.7-2.4 7.5-5.4 2.4 3 4 4.4 6.6 1.8l-1.6-1.6c-1.6 1.5-3.5 1.6-5.4-.8-1.6-2-2.6-4.4-4.5-4.4-1.6 0-2.4 1-3.6 2.7l-1.6-2c1.6-2.6 3.6-4.5 6-4.5 3.2 0 5 2.7 6.4 5.6l2.7-1.4C22.4 8 20.2 4 16.2 4c-1.5 0-2.8.4-4 1.2A6.2 6.2 0 0 0 12 4.8z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'Mistral',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M3 3h3v3H3zM3 9h3v3H3zM3 15h3v3H3zM3 21V18h3v3zm6-18h3v3H9zm0 6h3v3H9zm0 6h3v3H9zm0 6v-3h3v3zm6-18h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3zm0 6v-3h3v3zm6-18h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3zm0 6v-3h3v3z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'DeepSeek',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M12 2 4 6v6c0 5 3.5 9.4 8 10 4.5-.6 8-5 8-10V6zm0 2.2 6 3v4.8c0 4-2.7 7.6-6 8.2-3.3-.6-6-4.2-6-8.2V7.2zM10 9v6l5-3z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'xAI',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M3 3h4l5 7 5-7h4l-7 9.5L21 21h-4l-5-7-5 7H3l7.5-8.5z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'Cohere',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" fill="#08090a" /></svg>
      </Mark>
    ),
  },
  {
    name: 'Groq',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zm5 4-4 6h3v4l4-6h-3z"/></svg>
      </Mark>
    ),
  },
  {
    name: 'Perplexity',
    mark: (
      <Mark>
        <svg viewBox="0 0 24 24"><path d="M3 4h18v3h-7v13h-4V7H3z"/></svg>
      </Mark>
    ),
  },
]

export default function Marquee() {
  const items = [...PROVIDERS, ...PROVIDERS]
  return (
    <section id="marquee" className={styles.section} aria-labelledby="marquee-label">
      <p id="marquee-label" className={styles.label}>
        Routes to every major model
      </p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {items.map((p, i) => (
            <span key={`${p.name}-${i}`} className={styles.item}>
              {p.mark}
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
