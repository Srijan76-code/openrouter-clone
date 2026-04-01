import Link from 'next/link'
import styles from './Footer.module.css'

const productLinks = ['Models', 'Docs', 'Pricing', 'Changelog']
const companyLinks = ['About', 'Blog', 'Careers', 'Status']
const legalLinks   = ['Privacy', 'Terms', 'Security']

const hrefs: Record<string, string> = {
  Models: '/models', Docs: '/docs', Pricing: '#pricing', Changelog: '/changelog',
  About: '/about', Blog: '/blog', Careers: '/careers', Status: '/status',
  Privacy: '/privacy', Terms: '/terms', Security: '/security',
}

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer} aria-label="Site footer">
      <div className={styles.container}>

        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <div className={styles.logo}>AetherRoute</div>
            <div className={styles.tagline}>One API. Every Model.</div>
            <a
              href="mailto:hello@aetherroute.ai"
              className={styles.email}
            >
              hello@aetherroute.ai
            </a>
          </div>

          {/* Product */}
          <div>
            <div className={styles.colTitle}>Product</div>
            <ul className={styles.links}>
              {productLinks.map((name) => (
                <li key={name}>
                  <Link href={hrefs[name]}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className={styles.colTitle}>Company</div>
            <ul className={styles.links}>
              {companyLinks.map((name) => (
                <li key={name}>
                  <Link href={hrefs[name]}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className={styles.colTitle}>Legal</div>
            <ul className={styles.links}>
              {legalLinks.map((name) => (
                <li key={name}>
                  <Link href={hrefs[name]}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            &copy; 2025 AetherRoute. All rights reserved.
          </span>
          <div className={styles.socials}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter / X
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
