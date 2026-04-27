'use client'

import { ArrowUpRight } from 'lucide-react'
import styles from './ModelGrid.module.css'
import { MARKETING_LINKS } from '../lib/links'

type Model = {
  provider: string
  name: string
  contextK: number
  outputCost: string
  fallbacks: string[]
  status?: 'live' | 'preview'
  mark: React.ReactNode
}

const Mark = ({ d }: { d: string }) => (
  <span className={styles.providerMark} aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d={d} /></svg>
  </span>
)

const MODELS: Model[] = [
  {
    provider: 'OpenAI',
    name: 'gpt-5',
    contextK: 256,
    outputCost: '$15/M',
    fallbacks: ['gpt-4o', 'claude-3.5'],
    status: 'live',
    mark: (
      <Mark d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" />
    ),
  },
  {
    provider: 'Anthropic',
    name: 'claude-3.5-sonnet',
    contextK: 200,
    outputCost: '$15/M',
    fallbacks: ['gpt-4o', 'haiku'],
    status: 'live',
    mark: <Mark d="M13.827 3.52h3.633L24 20.48h-3.633zM6.54 3.52h3.836l6.54 16.96h-3.706l-1.337-3.45H4.95L3.614 20.48H0z" />,
  },
  {
    provider: 'Google',
    name: 'gemini-2.0-pro',
    contextK: 1000,
    outputCost: '$10/M',
    fallbacks: ['gemini-flash'],
    status: 'live',
    mark: <Mark d="M12 11v2.4h6.84a5.86 5.86 0 0 1-1.49 3.93A7.0 7.0 0 0 1 12 19.5a7.5 7.5 0 1 1 0-15 7.2 7.2 0 0 1 5.1 2L18.8 4.8A9.6 9.6 0 0 0 12 2a10 10 0 1 0 0 20c2.88 0 5.28-.95 7.04-2.7C20.85 17.49 22 14.78 22 11.7a9.6 9.6 0 0 0-.16-1.7H12z" />,
  },
  {
    provider: 'Meta',
    name: 'llama-3.3-70b',
    contextK: 128,
    outputCost: '$0.9/M',
    fallbacks: ['llama-70b', 'mistral-l'],
    status: 'live',
    mark: <Mark d="M12 4.8C8.8 4.8 6.8 7.5 5 10.4c-2.4-3-4-4.4-6.6-1.8L0 9.4c1.6-1.5 3.5-1.6 5.4.8 1.6 2 2.6 4.4 4.5 4.4 1.6 0 2.4-1 3.6-2.7l1.6 2c-1.6 2.6-3.6 4.5-6 4.5-3.2 0-5-2.7-6.4-5.6L0 14c1.4 3 3.6 7 7.6 7 3.7 0 5.7-2.4 7.5-5.4z" />,
  },
  {
    provider: 'Mistral',
    name: 'mistral-large-2',
    contextK: 128,
    outputCost: '$6/M',
    fallbacks: ['mixtral', 'llama-70b'],
    status: 'live',
    mark: <Mark d="M3 3h3v3H3zM3 9h3v3H3zM3 15h3v3H3zM3 21V18h3v3zm6-18h3v3H9zm0 6h3v3H9zm0 6h3v3H9zm0 6v-3h3v3zm6-18h3v3h-3zm0 6h3v3h-3zm0 6h3v3h-3zm0 6v-3h3v3z" />,
  },
  {
    provider: 'DeepSeek',
    name: 'deepseek-r1',
    contextK: 128,
    outputCost: '$2/M',
    fallbacks: ['gpt-4o-mini'],
    status: 'live',
    mark: <Mark d="M12 2 4 6v6c0 5 3.5 9.4 8 10 4.5-.6 8-5 8-10V6zm0 2.2 6 3v4.8c0 4-2.7 7.6-6 8.2-3.3-.6-6-4.2-6-8.2V7.2z" />,
  },
  {
    provider: 'xAI',
    name: 'grok-3',
    contextK: 128,
    outputCost: '$5/M',
    fallbacks: ['gpt-4o'],
    status: 'preview',
    mark: <Mark d="M3 3h4l5 7 5-7h4l-7 9.5L21 21h-4l-5-7-5 7H3l7.5-8.5z" />,
  },
  {
    provider: 'Cohere',
    name: 'command-r-plus',
    contextK: 128,
    outputCost: '$2.5/M',
    fallbacks: ['gpt-4o-mini'],
    status: 'live',
    mark: <Mark d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />,
  },
  {
    provider: 'Groq',
    name: 'llama-3.3-70b',
    contextK: 128,
    outputCost: '$0.6/M',
    fallbacks: ['together'],
    status: 'live',
    mark: <Mark d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zm5 4-4 6h3v4l4-6h-3z" />,
  },
]

export default function ModelGrid() {
  return (
    <section id="models" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Models</p>
          <h2 className={styles.title}>Route to every major model.</h2>
          <p className={styles.sub}>
            Define your primary, configure fallbacks, and let the engine
            handle the rest. New providers ship behind the same endpoint.
          </p>
        </div>

        <div className={styles.grid}>
          {MODELS.map((m) => (
            <article key={`${m.provider}-${m.name}`} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.provider}>
                  {m.mark}
                  {m.provider}
                </span>
                <span className={styles.statusPill}>
                  <span
                    className={`${styles.statusDot} ${m.status === 'preview' ? styles.statusDotPending : ''}`}
                  />
                  {m.status === 'preview' ? 'Preview' : 'Live'}
                </span>
              </div>
              <div>
                <div className={styles.modelName}>{m.name}</div>
                <div className={styles.modelMeta}>
                  <span>{m.contextK}K ctx</span>
                  <span className={styles.metaSep} />
                  <span>{m.outputCost}</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span>Fallbacks:</span>
                {m.fallbacks.map((f) => (
                  <span key={f} className={styles.fallbackChip}>{f}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <a className={styles.ctaLink} href={MARKETING_LINKS.docs} target="_blank" rel="noreferrer">
            Browse the full model catalog <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
