'use client'

import { ArrowUpRight, Activity, Zap, RefreshCw, Send, CheckCircle2 } from 'lucide-react'
import styles from './Tracing.module.css'

type Status = 'success' | 'error' | 'pending' | 'streaming'

const RUNS: { id: string; model: string; status: Status; duration: string; ttft: string; ago: string }[] = [
  { id: 'r_x9k', model: 'gpt-5', status: 'streaming', duration: '0.42s', ttft: '120ms', ago: 'now' },
  { id: 'r_x9j', model: 'claude-3.5-sonnet', status: 'success', duration: '1.18s', ttft: '210ms', ago: '2s' },
  { id: 'r_x9i', model: 'gemini-2.0-pro', status: 'success', duration: '0.91s', ttft: '180ms', ago: '14s' },
  { id: 'r_x9h', model: 'llama-3.3-70b', status: 'error', duration: '6.00s', ttft: '—', ago: '38s' },
  { id: 'r_x9g', model: 'mistral-large-2', status: 'success', duration: '1.42s', ttft: '230ms', ago: '1m' },
  { id: 'r_x9f', model: 'deepseek-r1', status: 'success', duration: '2.01s', ttft: '340ms', ago: '2m' },
]

const STEPS = [
  { icon: <Activity size={9} />, label: 'rate-limit',     pctStart: 0,   pctWidth: 4,  duration: '8ms',   variant: 'normal' as const },
  { icon: <Zap size={9} />,      label: 'select provider', pctStart: 4,   pctWidth: 6,  duration: '12ms',  variant: 'normal' as const },
  { icon: <RefreshCw size={9} />, label: 'lease key',      pctStart: 10,  pctWidth: 3,  duration: '6ms',   variant: 'normal' as const },
  { icon: <Send size={9} />,     label: 'provider call',  pctStart: 13,  pctWidth: 38, duration: '480ms', variant: 'wait' as const },
  { icon: <CheckCircle2 size={9} />, label: 'normalize',  pctStart: 51,  pctWidth: 4,  duration: '14ms',  variant: 'normal' as const },
  { icon: <Send size={9} />,     label: 'stream',         pctStart: 55,  pctWidth: 45, duration: '684ms', variant: 'normal' as const },
]

export default function Tracing() {
  return (
    <section id="tracing" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Tracing</p>
          <h2 className={styles.title}>See every request, end to end.</h2>
          <p className={styles.sub}>
            DevTools shows you live status, payloads, latency, and the exact
            routing decision the engine made — for every request.
          </p>
          <a className={styles.cta} href="http://localhost:4983" target="_blank" rel="noreferrer">
            Open DevTools <ArrowUpRight size={14} />
          </a>
        </div>

        <div className={styles.mock} role="img" aria-label="DevTools tracing preview">
          <div className={styles.mockHeader}>
            <span className={styles.mockDot} />
            <span className={styles.mockDot} />
            <span className={styles.mockDot} />
            <span className={styles.mockTitle}>orbyt-devtools · localhost:4983</span>
            <span className={styles.connectionPill}>
              <span className={styles.connectionDot} />
              Connected
            </span>
          </div>

          <div className={styles.layout}>
            <aside className={styles.runList}>
              <div className={styles.runListHead}>
                <span>Runs</span>
                <span>Last 5m</span>
              </div>
              {RUNS.map((r, i) => (
                <div
                  key={r.id}
                  className={`${styles.runItem} ${i === 1 ? styles.runItemActive : ''}`}
                >
                  <div className={styles.runItemTop}>
                    <span
                      className={`${styles.statusDot} ${
                        r.status === 'success' ? styles.statusSuccess :
                        r.status === 'error' ? styles.statusError :
                        r.status === 'streaming' ? `${styles.statusStreaming} pulse-dot` :
                        styles.statusPending
                      }`}
                    />
                    <span className={styles.runItemModel}>{r.model}</span>
                  </div>
                  <div className={styles.runItemBottom}>
                    <span>{r.duration}</span>
                    <span>·</span>
                    <span>TTFT {r.ttft}</span>
                    <span style={{ marginLeft: 'auto' }}>{r.ago}</span>
                  </div>
                </div>
              ))}
            </aside>

            <div className={styles.detail}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryModel}>claude-3.5-sonnet</span>
                <span className={styles.summaryPill}>
                  <span className={`${styles.statusDot} ${styles.statusSuccess}`} />
                  success
                </span>
                <span className={styles.summaryPill}>provider: anthropic</span>
                <span className={styles.summaryPill}>strategy: cheap</span>
              </div>

              <div className={styles.summaryStats}>
                <div className={styles.statBlock}>
                  <span className={styles.statLabel}>Total</span>
                  <span className={styles.statValue}>1.18s</span>
                </div>
                <div className={styles.statBlock}>
                  <span className={styles.statLabel}>TTFT</span>
                  <span className={styles.statValue}>210ms</span>
                </div>
                <div className={styles.statBlock}>
                  <span className={styles.statLabel}>Tokens</span>
                  <span className={styles.statValue}>312 / 184</span>
                </div>
                <div className={styles.statBlock}>
                  <span className={styles.statLabel}>Retries</span>
                  <span className={styles.statValue}>0</span>
                </div>
              </div>

              <div className={styles.steps}>
                <div className={styles.stepsHead}>
                  <span>Steps</span>
                  <span>1.18s total</span>
                </div>
                {STEPS.map((s, i) => (
                  <div key={i} className={styles.step}>
                    <span className={styles.stepIcon}>{s.icon}</span>
                    <span className={styles.stepLabel}>{s.label}</span>
                    <div className={styles.bar}>
                      <div
                        className={`${styles.barFill} ${s.variant === 'wait' ? styles.barFillWait : ''}`}
                        style={{ left: `${s.pctStart}%`, width: `${s.pctWidth}%` }}
                      />
                    </div>
                    <span className={styles.stepDur}>{s.duration}</span>
                  </div>
                ))}
              </div>

              <div className={styles.transcript}>
                <div><span className={styles.transcriptComment}>{'// payload (truncated)'}</span></div>
                <div>
                  <span className={styles.transcriptKey}>{'"model"'}</span>{': '}
                  <span className={styles.transcriptStr}>{'"anthropic/claude-3.5-sonnet"'}</span>,
                </div>
                <div>
                  <span className={styles.transcriptKey}>{'"messages"'}</span>{': ['}
                  <span className={styles.transcriptStr}>{'{ role: "user", content: "Summarize..." }'}</span>{'],'}
                </div>
                <div>
                  <span className={styles.transcriptKey}>{'"extra"'}</span>{': { '}
                  <span className={styles.transcriptKey}>{'"provider"'}</span>{': '}
                  <span className={styles.transcriptStr}>{'"cheap"'}</span>{', '}
                  <span className={styles.transcriptKey}>{'"retry"'}</span>{': 3 }'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
