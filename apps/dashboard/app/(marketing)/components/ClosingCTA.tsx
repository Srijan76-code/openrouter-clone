'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './ClosingCTA.module.css'
import { MARKETING_LINKS } from '../lib/links'

export default function ClosingCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Ship LLM features<br />
          <span className={styles.titleAccent}>without shipping the chaos.</span>
        </h2>
        <p className={styles.sub}>
          Self-host Orbyt in minutes. Point your existing OpenAI client at it.
          Sleep through the next provider outage.
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
      </div>
    </section>
  )
}
