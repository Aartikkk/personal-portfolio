import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section" id="experience" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Experience</p>
        <h2 className="section-title">Research & industry experience</h2>
        <p className="section-subtitle">
          Four research and internship roles focused on ML, data science, scientific computing, and lab automation.
        </p>
      </motion.div>

      <div className="timeline">
        {portfolioData.experience.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * i }}
          >
            <div className="timeline-dot" />
            <div className="timeline-period">{exp.period}</div>
            <div className="timeline-role">{exp.role}</div>
            <div className="timeline-org">{exp.organization}</div>
            <div className="timeline-detail">{exp.detail}</div>
            {exp.impact && (
              <div className="timeline-impact">⚡ {exp.impact}</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
