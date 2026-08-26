import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import MagneticLink from './MagneticLink'

// Orchestrated stagger — each element enters in sequence
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const wordReveal = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 0.6,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
  },
}

export default function Hero() {
  const { hero, photo } = portfolioData
  const nameWords = hero.name.split(' ')

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <motion.div
          className="hero-text"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Status badge */}
          <motion.span className="hero-status" variants={fadeUp}>
            {hero.status}
          </motion.span>

          {/* Name — word by word stagger */}
          <h1 className="hero-name">
            <motion.span
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
              variants={container}
              initial="hidden"
              animate="show"
            >
              {nameWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordReveal}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>

            {/* Hand-drawn underline — draws in after name */}
            <svg className="hero-underline" viewBox="0 0 320 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <motion.path
                d="M2 8.5C30 3.5 75 2 110 4.5C145 7 190 9 220 6C250 3 285 2.5 318 7"
                stroke="var(--accent-violet)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={drawLine}
                initial="hidden"
                animate="show"
              />
            </svg>
          </h1>

          {/* Tagline, description, actions — staggered fade-up */}
          <motion.p className="hero-tagline" variants={fadeUp}>
            {hero.tagline}
          </motion.p>

          <motion.p className="hero-description" variants={fadeUp}>
            {hero.description}
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <MagneticLink href={hero.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              View Resume ↗
            </MagneticLink>
            <MagneticLink href={hero.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              GitHub →
            </MagneticLink>
            <MagneticLink href={hero.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              LinkedIn →
            </MagneticLink>
          </motion.div>
        </motion.div>

        {/* Photo — gentle scale-in, slightly delayed */}
        <motion.div
          className="hero-photo-wrapper"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img src={photo.src} alt={photo.alt} className="hero-photo" />
        </motion.div>
      </div>
    </section>
  )
}
