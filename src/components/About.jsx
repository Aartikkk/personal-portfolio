import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { about, profile } = portfolioData

  return (
    <section className="section" id="about" ref={ref}>
      <SectionHeading
        label="About Me"
        title="Building at the intersection of ML and software"
      />

      <div className="about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="stat-card">
            <div className="stat-card-label">GPA</div>
            <div className="stat-card-value">{profile.gpa}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Location</div>
            <div className="stat-card-value">{profile.location}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Current Role</div>
            <div className="stat-card-value">{profile.currentRole}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Graduating</div>
            <div className="stat-card-value">{profile.expectedGraduation}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
