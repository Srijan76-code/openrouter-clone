import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import ModelGrid from './components/ModelGrid'
import CodeBlock from './components/CodeBlock'
import HowItWorks from './components/HowItWorks'
import Tracing from './components/Tracing'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <ModelGrid />
        <CodeBlock />
        <HowItWorks />
        <Tracing />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
