import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section" id="experience" ref={ref}>
      <SectionHeading
        label="Experience"
        title="Research & industry experience"
        subtitle="Four research and internship roles focused on ML, data science, scientific computing, and lab automation."
      />

      <div className="exp-scroll-wrapper">
        <div className="exp-scroll-track">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-card"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * i, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {exp.impact && (
                <div className="exp-card-stat">{exp.impact}</div>
              )}
              <div className="exp-card-period">{exp.period}</div>
              <div className="exp-card-role">{exp.role}</div>
              <div className="exp-card-org">{exp.organization}</div>
              <div className="exp-card-detail">{exp.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
