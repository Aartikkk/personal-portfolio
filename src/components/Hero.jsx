import { motion, useReducedMotion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

const LINES = ['Aarti Krishan', 'Khatri']

export default function Hero() {
  const { hero, photo, profile } = portfolioData
  const reduce = useReducedMotion()

  return (
    <section className="hero wrap" id="top">
      <p className="mono hero-status">{hero.status}</p>

      <h1 className="hero-name" aria-label={hero.name}>
        {LINES.map((line, i) => (
          <span className="hero-line" key={line} aria-hidden="true">
            <motion.span
              initial={reduce ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {i === 1 ? <em>{line}</em> : line}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="hero-grid">
        <div className="hero-intro">
          <p className="hero-tagline">{hero.tagline}</p>
          <p className="hero-description">{hero.description}</p>
          <p className="hero-links mono">
            <a href={hero.resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a>
            <a href={hero.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={hero.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${portfolioData.contact.email}`}>Email ↗</a>
          </p>

          <ul className="hero-metrics">
            {portfolioData.experience.slice(0, 3).map((e) => (
              <li key={e.metric}>
                <span className="metric">{e.metric}</span>
                <span className="mono metric-label">{e.metricLabel}</span>
                <span className="hero-metric-org">{e.organization.split(',')[0]}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="plate">
          <img src={photo.src} alt={photo.alt} />
          <figcaption className="mono">
            Fig. 0 — The author. {profile.location}.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
