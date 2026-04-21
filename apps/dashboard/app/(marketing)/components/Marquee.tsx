'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import styles from './Marquee.module.css'

const providers = [
  { name: 'OpenAI',     color: '#10a37f', icon: '◆' },
  { name: 'Anthropic',  color: '#d4a574', icon: '◈' },
  { name: 'Google',     color: '#4285f4', icon: '◉' },
  { name: 'Meta',       color: '#0081fb', icon: '◊' },
  { name: 'Mistral',    color: '#ff7000', icon: '▲' },
  { name: 'Cohere',     color: '#39594d', icon: '◆' },
  { name: 'Qwen',       color: '#6c5ce7', icon: '◇' },
  { name: 'Gemini',     color: '#8e44ef', icon: '✦' },
  { name: 'Llama',      color: '#0467df', icon: '◈' },
  { name: 'Grok',       color: '#f5f5f5', icon: '✧' },
  { name: 'DeepSeek',   color: '#4facfe', icon: '◉' },
  { name: 'Perplexity', color: '#20b2aa', icon: '◊' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Marquee() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="marquee" ref={ref} className={styles.marquee} aria-label="Trusted by">
      <div className={styles.wrapper}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.header}
        >
          <div className={styles.headerLine} />
          <p className={styles.label}>Trusted by teams building with</p>
          <div className={styles.headerLine} />
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {providers.map((provider, i) => (
            <motion.div
              key={provider.name}
              variants={cardVariants}
              className={styles.card}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                '--provider-color': provider.color,
                '--glow-opacity': hoveredIndex === i ? '1' : '0',
              } as React.CSSProperties}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardBorder} />
              <div className={styles.cardContent}>
                <span className={styles.cardIcon} style={{ color: provider.color }}>
                  {provider.icon}
                </span>
                <span className={styles.cardName}>{provider.name}</span>
              </div>
              <div
                className={styles.cardShine}
                style={{
                  opacity: hoveredIndex === i ? 1 : 0,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className={styles.subtext}
        >
          300+ models accessible through a single, unified endpoint
        </motion.p>
      </div>
    </section>
  )
}
