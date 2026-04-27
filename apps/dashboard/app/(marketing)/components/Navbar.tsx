'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'
import styles from './Navbar.module.css'
import { MARKETING_LINKS } from '../lib/links'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Models', href: '#models' },
  { label: 'Pipeline', href: '#how-it-works' },
  { label: 'Tracing', href: '#tracing' },
]

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label="Orbyt">
            <span className={styles.brandMark}>O</span>
            Orbyt
          </Link>
          <nav className={styles.links} aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.label} className={styles.link} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.right}>
          <a
            className={styles.docsBtn}
            href={MARKETING_LINKS.docs}
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
          <a
            className={styles.ghostBtn}
            href={MARKETING_LINKS.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className={styles.primaryBtn} type="button">
                Sign in
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            {/* <Link className={styles.primaryBtn} href="/workspace">
              Dashboard
            </Link> */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 28, height: 28 },
                },
              }}
            />
          </Show>

          <button className={styles.mobileToggle} aria-label="Open menu" type="button">
            <Menu size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
