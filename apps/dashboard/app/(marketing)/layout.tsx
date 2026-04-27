import { Inter, JetBrains_Mono } from 'next/font/google'
import './landing.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-marketing-sans',
  display: 'swap',
  axes: ['opsz'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-marketing-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Orbyt — One endpoint. Every model. Zero downtime.',
  description:
    'Orbyt is a self-hosted LLM gateway. Route, retry, and observe every request to every major AI provider through a single OpenAI-compatible endpoint.',
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`marketing-root ${inter.variable} ${jetbrains.variable}`}>
      {children}
    </div>
  )
}
