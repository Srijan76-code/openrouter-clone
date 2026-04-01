'use client'

import { useEffect, useRef } from 'react'
import styles from './Features.module.css'

const topCards = [
  {
    icon: '🔁',
    title: 'Automatic Failover',
    body: 'If a provider goes down, we instantly re-route your request to another. Your users never notice. 99.9% uptime guaranteed.',
    large: true,
  },
  {
    icon: '⚡',
    title: 'Edge-Optimized',
    body: 'Globally distributed infrastructure. Minimal latency between your app and inference.',
    large: false,
  },
]

const bottomCards = [
  {
    icon: '🛡️',
    title: 'Privacy First',
    body: 'Prompt logging OFF by default. Zero Data Retention routing available on request.',
  },
  {
    icon: '💰',
    title: 'Unified Billing',
    body: 'One balance. All providers. No juggling 10 API keys and invoices.',
  },
  {
    icon: '📊',
    title: 'Usage Analytics',
    body: 'Track token spend, latency, and model performance — all in one dashboard.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.featCard')
    if (!cards) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="features" className={styles.section} ref={sectionRef} aria-label="Features">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Why AetherRoute</p>
          <h2 className={styles.title}>Built for Builders Who Ship</h2>
        </div>

        <div className={styles.bento}>
          {/* Top row */}
          <div
            className={`${styles.card} ${styles.cardLarge} featCard`}
            style={{ transitionDelay: '0s' }}
          >
            <div className={styles.icon}>{topCards[0].icon}</div>
            <h3 className={styles.cardTitle}>{topCards[0].title}</h3>
            <p className={styles.cardBody}>{topCards[0].body}</p>
          </div>

          <div
            className={`${styles.card} ${styles.cardTopRight} featCard`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className={styles.icon}>{topCards[1].icon}</div>
            <h3 className={styles.cardTitle}>{topCards[1].title}</h3>
            <p className={styles.cardBody}>{topCards[1].body}</p>
          </div>

          {/* Bottom row */}
          <div className={styles.bottomRow}>
            {bottomCards.map((card, i) => (
              <div
                key={card.title}
                className={`${styles.card} featCard`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={styles.icon}>{card.icon}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
