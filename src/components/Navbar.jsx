import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.querySelector(i.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-inner wrap">
        <a href="#top" className="mono topbar-brand">A.K. Khatri</a>
        <nav className="topbar-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`mono ${active === item.href ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="mono theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? 'Paper' : 'Ink'}
        </button>
      </div>
    </header>
  )
}
