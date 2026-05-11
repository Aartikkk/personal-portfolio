import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

export default function Hero() {
  const { hero, photo } = portfolioData

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="hero-status">{hero.status}</span>
          <h1 className="hero-name">{hero.name}</h1>
          <p className="hero-tagline">{hero.tagline}</p>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-actions">
            <a href={hero.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              View Resume ↗
            </a>
            <a href={hero.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              GitHub →
            </a>
            <a href={hero.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              LinkedIn →
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-photo-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <img src={photo.src} alt={photo.alt} className="hero-photo" />
        </motion.div>
      </div>
    </section>
  )
}
