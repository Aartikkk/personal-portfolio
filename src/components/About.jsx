import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import { useSpotlight } from '../hooks/useSpotlight'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { about, profile } = portfolioData
  const spotlight = useSpotlight()

  return (
    <section className="section section-patterned" id="about" ref={ref}>
      <div className="section-pattern about-pattern" aria-hidden="true" />

      <SectionHeading
        label="About Me"
        title="Building at the intersection of ML and software"
      />

      <div className="about-grid">
        <motion.div
          className="about-text"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {about.map((para, i) => (
            <motion.p key={i} variants={fadeUp}>{para}</motion.p>
          ))}
        </motion.div>

        <motion.div
          className="about-stats"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {[
            { label: 'GPA', value: profile.gpa },
            { label: 'Location', value: profile.location },
            { label: 'Current Role', value: profile.currentRole },
            { label: 'Graduating', value: profile.expectedGraduation },
          ].map((stat) => (
            <motion.div key={stat.label} className="stat-card" variants={fadeUp} {...spotlight}>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-value">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
