'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            AetherRoute
          </Link>

          <ul className={styles.links}>
            <li><a href="#models">Models</a></li>
            <li><Link href="/docs">Docs</Link></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>

          <div className="flex items-center gap-4 hidden md:flex">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className={styles.cta}>Sign In</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link href="/workspace/api-keys" className={styles.cta}>
                Dashboard
              </Link>
              <UserButton />
            </Show>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button className={styles.drawerClose} onClick={closeMenu} aria-label="Close menu">
          &times;
        </button>
        <a href="#models" className={styles.drawerLink} onClick={closeMenu}>Models</a>
        <Link href="/docs" className={styles.drawerLink} onClick={closeMenu}>Docs</Link>
        <a href="#pricing" className={styles.drawerLink} onClick={closeMenu}>Pricing</a>
        <Link href="/workspace/api-keys" className={styles.drawerLink} onClick={closeMenu}>Get API Key</Link>
      </div>
    </>
  )
}
