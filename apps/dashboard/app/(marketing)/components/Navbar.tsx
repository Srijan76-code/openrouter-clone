'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

          <Link href="/login" className={styles.cta}>
            Get API Key
          </Link>

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
        <Link href="/login" className={styles.drawerLink} onClick={closeMenu}>Get API Key</Link>
      </div>
    </>
  )
}
