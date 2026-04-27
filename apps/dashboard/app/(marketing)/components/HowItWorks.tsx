'use client'

import { ArrowRight } from 'lucide-react'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    title: 'Rate limit',
    body: 'A global limiter enforces traffic bounds before a request enters the routing pipeline.',
    footer: '429 if exceeded',
  },
  {
    title: 'Select provider',
    body: 'The provider selector evaluates strategy (cheap, fast, reliable) and your fallback chain.',
    footer: 'extra.provider',
  },
  {
    title: 'Lease + execute',
    body: 'A health-ranked API key is leased from the Redis pool and the request hits the provider.',
    footer: 'redis key pool',
  },
  {
    title: 'Normalize & stream',
    body: 'Provider chunks are normalized to a single SSE format. Telemetry persists asynchronously.',
    footer: 'sse · postgres',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Pipeline</p>
          <h2 className={styles.title}>The lifecycle of every request.</h2>
          <p className={styles.sub}>
            Deterministic flow. Every layer isolates faults at its origin so
            transient errors never propagate to the client.
          </p>
        </div>

        <div className={styles.pipeline}>
          {STEPS.map((s, i) => (
            <div key={s.title} className={styles.step}>
              <span className={styles.stepIndex}>0{i + 1}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
              <div className={styles.stepFooter}>{s.footer}</div>
              {i < STEPS.length - 1 && (
                <ArrowRight size={14} className={styles.connectorArrow} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className={styles.flow}>
          <span className={styles.flowDot} />
          <span>Hard error?</span>
          <span className={styles.flowChip}>decision engine</span>
          <ArrowRight size={12} className={styles.flowArrow} />
          <span className={styles.flowChip}>retry</span>
          <ArrowRight size={12} className={styles.flowArrow} />
          <span className={styles.flowChip}>fallback model</span>
          <ArrowRight size={12} className={styles.flowArrow} />
          <span className={styles.flowChip}>next provider</span>
        </div>
      </div>
    </section>
  )
}
