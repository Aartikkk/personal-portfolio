import { useState, useEffect } from 'react'
import { portfolioData } from '../data/portfolio'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#conference' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ scrolled, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(NAV_ITEMS[0].href)

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="navbar-brand">{portfolioData.brandName}</a>
      <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={activeHref === item.href ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="navbar-right">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}
