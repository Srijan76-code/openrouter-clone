'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, ArrowDown, Zap, Shield, Server, RefreshCw, AlertTriangle, CheckCircle2, Key, Lock, Eye, Copy, RotateCcw } from 'lucide-react'
import styles from './Features.module.css'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  BLOCK DATA
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type FeatureBlock = {
  tag: string
  title: string
  body: string
  bullets: string[]
  reversed?: boolean
}

const BLOCKS: FeatureBlock[] = [
  {
    tag: 'Routing',
    title: 'When one provider blinks, the next takes over.',
    body: 'Define a primary model and a fallback chain. The decision engine cascades on rate limits, 5xx errors, and timeouts — your client never sees the failure.',
    bullets: [
      'Configurable retry policy with exponential backoff',
      'Per-request fallback_models override',
      'Strategies: cheap, fast, reliable, or provider-locked',
    ],
  },
  {
    tag: 'Resilience',
    title: 'Resilience built into the network layer.',
    body: 'A Redis-leased key pool, a global rate limiter, and a decision engine triage every failure mode before it reaches your application. SSE streaming is normalized across providers.',
    bullets: [
      'Health-ranked API keys leased per request',
      'Unified streaming format across every provider',
      'Hard errors triaged: provider-exhausted vs. model-exhausted',
    ],
    reversed: true,
  },
  {
    tag: 'Self-hosted',
    title: 'Your keys. Your data. Your infra.',
    body: 'Orbyt runs on your infrastructure. Bearer tokens are scoped per project, telemetry persists to your Postgres, and you control rotation, revocation, and audit logs end to end.',
    bullets: [
      'Scoped Bearer tokens with instant revocation',
      'Telemetry persisted to your own Postgres',
      'OpenAI-compatible — switch with two lines of config',
    ],
  },
]

const ROADMAP = [
  { name: 'Presets', tag: 'Q2' },
  { name: 'Budget Limits', tag: 'Q2' },
  { name: 'Tool Calling', tag: 'Q3' },
  { name: 'Multimodality', tag: 'Q3' },
  { name: 'Zero Insurance', tag: 'Q3' },
  { name: 'BYOK', tag: 'Q4' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  VISUAL 1 — Routing Cascade
 *  Shows a live request cascading through providers with retry/fallback
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type CascadeStep = {
  provider: string
  model: string
  status: 'pending' | 'trying' | 'failed' | 'success'
  latency: string
  reason?: string
}

const INITIAL_CASCADE: CascadeStep[] = [
  { provider: 'openai', model: 'gpt-4o', status: 'pending', latency: '—' },
  { provider: 'anthropic', model: 'claude-3.5-sonnet', status: 'pending', latency: '—' },
  { provider: 'google', model: 'gemini-2.0-pro', status: 'pending', latency: '—' },
]

const ANIMATION_SCRIPT: { idx: number; status: CascadeStep['status']; latency: string; reason?: string }[] = [
  { idx: 0, status: 'trying', latency: '...' },
  { idx: 0, status: 'failed', latency: '6.00s', reason: '429 rate-limited' },
  { idx: 1, status: 'trying', latency: '...' },
  { idx: 1, status: 'failed', latency: '5.20s', reason: '503 overloaded' },
  { idx: 2, status: 'trying', latency: '...' },
  { idx: 2, status: 'success', latency: '0.84s' },
]

function RoutingVisual() {
  const [steps, setSteps] = useState<CascadeStep[]>(INITIAL_CASCADE)
  const [tick, setTick] = useState(-1)
  const [strategy, setStrategy] = useState<'cheap' | 'fast' | 'reliable'>('cheap')

  const runAnimation = useCallback(() => {
    setSteps(INITIAL_CASCADE.map(s => ({ ...s })))
    setTick(-1)
    let i = 0
    const iv = setInterval(() => {
      if (i >= ANIMATION_SCRIPT.length) {
        clearInterval(iv)
        return
      }
      const frame = ANIMATION_SCRIPT[i]!
      setTick(i)
      setSteps(prev => prev.map((s, idx) =>
        idx === frame.idx
          ? { ...s, status: frame.status, latency: frame.latency, reason: frame.reason }
          : s
      ))
      i++
    }, 900)
    return iv
  }, [])

  useEffect(() => {
    const iv = runAnimation()
    const loop = setInterval(() => { runAnimation() }, 7000)
    return () => { clearInterval(iv); clearInterval(loop) }
  }, [runAnimation])

  return (
    <div className={styles.mock}>
      <div className={styles.mockHeader}>
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockTitle}>routing-engine</span>
        <span className={styles.strategyPill}>
          <Zap size={9} />
          {strategy}
        </span>
      </div>

      <div className={styles.routingBody}>
        <div className={styles.routingRequest}>
          <span className={styles.routingLabel}>
            <ArrowDown size={10} />
            incoming request
          </span>
          <div className={styles.routingMeta}>
            <span className={styles.routingMetaItem}>model: <strong>auto</strong></span>
            <span className={styles.routingMetaItem}>strategy: <strong>{strategy}</strong></span>
            <span className={styles.routingMetaItem}>retries: <strong>3</strong></span>
          </div>
        </div>

        <div className={styles.cascade}>
          {steps.map((s, i) => (
            <div
              key={s.provider}
              className={`${styles.cascadeStep} ${styles[`cascadeStep_${s.status}`] || ''}`}
            >
              <div className={styles.cascadeStepHeader}>
                <span className={`${styles.cascadeStatusDot} ${styles[`cascadeStatus_${s.status}`] || ''}`} />
                <span className={styles.cascadeProvider}>{s.provider}</span>
                <span className={styles.cascadeModel}>{s.model}</span>
                <span className={styles.cascadeLatency}>{s.latency}</span>
              </div>
              {s.reason && (
                <span className={styles.cascadeReason}>
                  <AlertTriangle size={9} />
                  {s.reason}
                </span>
              )}
              {s.status === 'success' && (
                <span className={styles.cascadeSuccess}>
                  <CheckCircle2 size={9} />
                  200 OK — streaming response
                </span>
              )}
              {i < steps.length - 1 && s.status === 'failed' && (
                <div className={styles.cascadeConnector}>
                  <RefreshCw size={9} className={styles.cascadeConnectorIcon} />
                  <span>fallback</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.strategyRow}>
          {(['cheap', 'fast', 'reliable'] as const).map(s => (
            <button
              key={s}
              className={`${styles.strategyBtn} ${strategy === s ? styles.strategyBtnActive : ''}`}
              onClick={() => setStrategy(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  VISUAL 2 — Resilience / Key Pool
 *  Shows a health-ranked key pool with live lease animation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type PoolKey = {
  id: string
  provider: string
  health: number
  status: 'idle' | 'leased' | 'cooldown' | 'exhausted'
  rpm: string
}

const INITIAL_POOL: PoolKey[] = [
  { id: 'key_01', provider: 'openai',    health: 98, status: 'idle',     rpm: '812/1000' },
  { id: 'key_02', provider: 'openai',    health: 72, status: 'idle',     rpm: '720/1000' },
  { id: 'key_03', provider: 'anthropic', health: 95, status: 'idle',     rpm: '420/500' },
  { id: 'key_04', provider: 'anthropic', health: 45, status: 'cooldown', rpm: '499/500' },
  { id: 'key_05', provider: 'google',    health: 88, status: 'idle',     rpm: '380/600' },
  { id: 'key_06', provider: 'google',    health: 12, status: 'exhausted', rpm: '600/600' },
]

const LEASE_SEQUENCE = [0, 2, 4, 0, 2, 1] // indices that get leased

function ResilienceVisual() {
  const [pool, setPool] = useState<PoolKey[]>(INITIAL_POOL)
  const [leasedIdx, setLeasedIdx] = useState<number | null>(null)
  const [reqCount, setReqCount] = useState(1847)
  const [limiterFlash, setLimiterFlash] = useState(false)

  useEffect(() => {
    let step = 0
    const iv = setInterval(() => {
      const idx = LEASE_SEQUENCE[step % LEASE_SEQUENCE.length]!
      setLeasedIdx(idx)
      setReqCount(c => c + 1)
      setLimiterFlash(true)
      setPool(prev => prev.map((k, i) =>
        i === idx ? { ...k, status: 'leased' as const } : k.status === 'leased' ? { ...k, status: 'idle' as const } : k
      ))
      setTimeout(() => {
        setLimiterFlash(false)
        setPool(prev => prev.map((k, i) =>
          i === idx ? { ...k, status: 'idle' as const } : k
        ))
      }, 600)
      step++
    }, 1400)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className={styles.mock}>
      <div className={styles.mockHeader}>
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockTitle}>key-pool · rate-limiter</span>
        <span className={styles.connectionPill}>
          <span className={styles.connectionDot} />
          Redis
        </span>
      </div>

      <div className={styles.resilienceBody}>
        <div className={styles.resilienceStats}>
          <div className={styles.resilienceStat}>
            <span className={styles.resilienceStatLabel}>Requests</span>
            <span className={`${styles.resilienceStatValue} ${limiterFlash ? styles.statFlash : ''}`}>{reqCount.toLocaleString()}</span>
          </div>
          <div className={styles.resilienceStat}>
            <span className={styles.resilienceStatLabel}>Active Keys</span>
            <span className={styles.resilienceStatValue}>4 / 6</span>
          </div>
          <div className={styles.resilienceStat}>
            <span className={styles.resilienceStatLabel}>Cooldown</span>
            <span className={styles.resilienceStatValue}>1</span>
          </div>
          <div className={styles.resilienceStat}>
            <span className={styles.resilienceStatLabel}>Exhausted</span>
            <span className={`${styles.resilienceStatValue} ${styles.resilienceStatDanger}`}>1</span>
          </div>
        </div>

        <div className={styles.keyPool}>
          <div className={styles.keyPoolHead}>
            <span>Key</span>
            <span>Provider</span>
            <span>Health</span>
            <span>RPM</span>
            <span>Status</span>
          </div>
          {pool.map((k, i) => (
            <div
              key={k.id}
              className={`${styles.keyRow} ${k.status === 'leased' ? styles.keyRowLeased : ''} ${k.status === 'exhausted' ? styles.keyRowExhausted : ''} ${k.status === 'cooldown' ? styles.keyRowCooldown : ''}`}
            >
              <span className={styles.keyId}>
                <Key size={9} />
                {k.id}
              </span>
              <span className={styles.keyProvider}>{k.provider}</span>
              <span className={styles.keyHealth}>
                <span
                  className={styles.healthBar}
                  style={{ '--health': `${k.health}%` } as React.CSSProperties}
                />
                {k.health}%
              </span>
              <span className={styles.keyRpm}>{k.rpm}</span>
              <span className={`${styles.keyStatus} ${styles[`keyStatus_${k.status}`] || ''}`}>
                {k.status === 'leased' && <Zap size={8} />}
                {k.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  VISUAL 3 — Self-Hosted / Key Management
 *  Shows key creation + scoping + revocation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type ManagedKey = {
  name: string
  masked: string
  scope: string
  status: 'active' | 'revoked'
  created: string
}

const KEYS: ManagedKey[] = [
  { name: 'prod-api', masked: 'sk-or-v1-8f3•••9fb', scope: 'all models', status: 'active', created: '2h ago' },
  { name: 'staging', masked: 'sk-or-v1-947•••533', scope: 'gpt-4o only', status: 'active', created: '4d ago' },
  { name: 'deprecated', masked: 'sk-or-v1-2a1•••f40', scope: 'all models', status: 'revoked', created: '14d ago' },
]

function SelfHostedVisual() {
  const [keys, setKeys] = useState<ManagedKey[]>(KEYS)
  const [copied, setCopied] = useState<string | null>(null)
  const [revoking, setRevoking] = useState<string | null>(null)

  const handleCopy = (name: string) => {
    setCopied(name)
    setTimeout(() => setCopied(null), 1200)
  }

  const handleRevoke = (name: string) => {
    setRevoking(name)
    setTimeout(() => {
      setKeys(prev => prev.map(k =>
        k.name === name ? { ...k, status: 'revoked' as const } : k
      ))
      setRevoking(null)
    }, 800)
  }

  const handleRestore = (name: string) => {
    setKeys(prev => prev.map(k =>
      k.name === name ? { ...k, status: 'active' as const } : k
    ))
  }

  return (
    <div className={styles.mock}>
      <div className={styles.mockHeader}>
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockDot} />
        <span className={styles.mockTitle}>key-management</span>
        <span className={styles.connectionPill}>
          <Lock size={9} />
          encrypted
        </span>
      </div>

      <div className={styles.selfHostBody}>
        <div className={styles.selfHostInfo}>
          <div className={styles.selfHostInfoItem}>
            <Server size={11} />
            <span>Postgres: <strong>your-infra.internal:5432</strong></span>
          </div>
          <div className={styles.selfHostInfoItem}>
            <Shield size={11} />
            <span>Encryption: <strong>AES-256-GCM</strong></span>
          </div>
        </div>

        <div className={styles.keyMgmtList}>
          <div className={styles.keyMgmtHead}>
            <span>Name</span>
            <span>Key</span>
            <span>Scope</span>
            <span>Status</span>
            <span></span>
          </div>
          {keys.map(k => (
            <div
              key={k.name}
              className={`${styles.keyMgmtRow} ${k.status === 'revoked' ? styles.keyMgmtRowRevoked : ''} ${revoking === k.name ? styles.keyMgmtRowRevoking : ''}`}
            >
              <span className={styles.keyMgmtName}>{k.name}</span>
              <span className={styles.keyMgmtMasked}>
                <Eye size={9} />
                {k.masked}
              </span>
              <span className={styles.keyMgmtScope}>{k.scope}</span>
              <span className={`${styles.keyMgmtStatus} ${styles[`keyMgmtStatus_${k.status}`] || ''}`}>
                {k.status}
              </span>
              <span className={styles.keyMgmtActions}>
                {k.status === 'active' ? (
                  <>
                    <button
                      className={styles.keyMgmtBtn}
                      onClick={() => handleCopy(k.name)}
                      title="Copy"
                    >
                      {copied === k.name ? <CheckCircle2 size={11} /> : <Copy size={11} />}
                    </button>
                    <button
                      className={`${styles.keyMgmtBtn} ${styles.keyMgmtBtnDanger}`}
                      onClick={() => handleRevoke(k.name)}
                      title="Revoke"
                    >
                      <AlertTriangle size={11} />
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.keyMgmtBtn}
                    onClick={() => handleRestore(k.name)}
                    title="Restore"
                  >
                    <RotateCcw size={11} />
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.auditLog}>
          <span className={styles.auditLabel}>Audit log</span>
          <div className={styles.auditEntry}>
            <span className={styles.auditTime}>14:22:08</span>
            <span className={styles.auditMsg}>key_01 leased → openai/gpt-4o</span>
          </div>
          <div className={styles.auditEntry}>
            <span className={styles.auditTime}>14:22:06</span>
            <span className={styles.auditMsg}>key_03 leased → anthropic/claude-3.5</span>
          </div>
          <div className={styles.auditEntry}>
            <span className={styles.auditTime}>14:21:58</span>
            <span className={styles.auditMsg}>key_06 exhausted — cooldown 120s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  VISUAL ROUTER — maps block index to the right interactive visual
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const VISUALS = [RoutingVisual, ResilienceVisual, SelfHostedVisual]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  MAIN FEATURES COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Built for production</p>
          <h2 className={styles.sectionTitle}>
            Three pillars: interoperability, reliability, transparency.
          </h2>
          <p className={styles.sectionSub}>
            Every part of the gateway exists to remove friction between your
            application and the model. Nothing more.
          </p>
        </div>

        <div className={styles.blocks}>
          {BLOCKS.map((b, i) => {
            const Visual = VISUALS[i]!
            return (
              <div
                key={b.title}
                className={`${styles.block} ${b.reversed ? styles.reversed : ''}`}
              >
                <div className={styles.copy}>
                  <span className={styles.tag}>
                    <span className={styles.tagDot} />
                    {b.tag}
                  </span>
                  <h3 className={styles.title}>{b.title}</h3>
                  <p className={styles.body}>{b.body}</p>
                  <ul className={styles.bullets}>
                    {b.bullets.map((bl) => (
                      <li key={bl} className={styles.bullet}>
                        <span className={styles.bulletIcon}>
                          <Check size={10} strokeWidth={3} />
                        </span>
                        {bl}
                      </li>
                    ))}
                  </ul>
                </div>
                <Visual />
              </div>
            )
          })}
        </div>

        <div className={styles.roadmap} id="roadmap">
          <div className={styles.roadmapHead}>
            <h3 className={styles.roadmapTitle}>On the roadmap</h3>
            <p className={styles.roadmapSub}>
              Shipping next — track progress in the changelog.
            </p>
          </div>
          <div className={styles.roadmapPills}>
            {ROADMAP.map((r) => (
              <span key={r.name} className={styles.pill}>
                <span className={styles.pillBadge}>{r.tag}</span>
                {r.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
