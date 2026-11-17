import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import PhoneShowcase from './components/PhoneShowcase.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Brand from './components/Brand.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'

// Défilement doux et fluide (désactivé si l’utilisateur préfère réduire les animations)
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085, // plus petit = plus doux
      wheelMultiplier: 0.9,
      smoothWheel: true,
      anchors: { offset: -72, duration: 1.4 },
    })
    window.__lenis = lenis
    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

export default function App() {
  useSmoothScroll()
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <PhoneShowcase />
        <Experience />
        <Skills />
        <Brand />
        <Education />
        <Contact />
      </main>
    </MotionConfig>
  )
}
