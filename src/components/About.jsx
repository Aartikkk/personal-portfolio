import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { about, profile } = portfolioData

  return (
    <section className="section" id="about" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">About Me</p>
        <h2 className="section-title">Building at the intersection of ML and software</h2>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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
