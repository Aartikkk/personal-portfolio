import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Highlights from './components/Highlights'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Conference from './components/Conference'
import Education from './components/Education'
import Contact from './components/Contact'
import ParticleBackground from './components/ParticleBackground'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Check if user had a preference saved
    const saved = typeof window !== 'undefined' && window.localStorage?.getItem('theme')
    return saved || 'dark'
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { window.localStorage?.setItem('theme', theme) } catch {}
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <>
      <ParticleBackground theme={theme} />
      <Navbar scrolled={scrolled} theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-content">
        <Hero />
        <About />
        <Highlights />
        <Experience />
        <Projects />
        <Skills />
        <Conference />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        Built by Aarti Krishan Khatri · 2025
      </footer>
    </>
  )
}
