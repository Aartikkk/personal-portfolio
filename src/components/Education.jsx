import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { education, awards, coursework } = portfolioData

  return (
    <section className="section" id="education" ref={ref}>
      <SectionHeading label="Education" title="Academic background" />

      <motion.div
        className="education-card"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {education.map((edu, i) => (
          <div key={i}>
            <div className="education-school">{edu.school}</div>
            <div className="education-degree">{edu.title}</div>
            <div className="education-detail">{edu.detail}</div>
          </div>
        ))}

        <div className="skills-column-label" style={{ marginTop: '1.5rem' }}>Awards & Honors</div>
        <div className="awards-grid">
          {awards.map((award, i) => (
            <span key={i} className="award-badge">{award}</span>
          ))}
        </div>

        <div className="skills-column-label" style={{ marginTop: '1.5rem' }}>Relevant Coursework</div>
        <div className="coursework-grid">
          {coursework.map((course, i) => (
            <span key={i} className="coursework-chip">{course}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
