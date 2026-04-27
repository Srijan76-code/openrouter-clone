'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './Hero.module.css'
import { MARKETING_LINKS } from '../lib/links'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Now self-hostable · v0.1
        </span>

        <h1 className={styles.headline}>
          One endpoint.{' '}
          <span className={styles.headlineAccent}>Every model. Zero downtime.</span>
        </h1>

        <p className={styles.sub}>
          Orbyt is a self-hosted LLM gateway. Route, retry, and observe every
          request to every major AI provider through a single
          OpenAI-compatible endpoint.
        </p>

        <div className={styles.btns}>
          <Link href={MARKETING_LINKS.startBuilding} className={styles.primary}>
            Start building <ArrowRight size={14} />
          </Link>
          <a
            href={MARKETING_LINKS.docs}
            target="_blank"
            rel="noreferrer"
            className={styles.ghost}
          >
            Read the docs
          </a>
        </div>

        <div className={styles.metaRow}>
          <span>OpenAI-compatible</span>
          <span className={styles.metaSep} />
          <span>Self-hosted</span>
          <span className={styles.metaSep} />
          <span>MIT licensed</span>
        </div>

        <div className={styles.imageSlot}>
          <img
            src="/Dashboard.png"
            alt="Orbyt dashboard — API keys management"
            className={styles.dashboardImg}
          />
          <div className={styles.imageShine} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
