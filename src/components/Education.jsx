import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { education, awards, coursework } = portfolioData

  return (
    <section className="section" id="education" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Education</p>
        <h2 className="section-title">Academic background</h2>
      </motion.div>

      <motion.div
        className="education-card"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {education.map((edu, i) => (
          <div key={i}>
            <div className="education-school">{edu.school}</div>
            <div className="education-degree">{edu.title}</div>
            <div className="education-detail">{edu.detail}</div>
          </div>
        ))}

        <div className="skills-category-title" style={{ marginTop: '1.5rem' }}>Awards & Honors</div>
        <div className="awards-grid">
          {awards.map((award, i) => (
            <span key={i} className="award-badge">{award}</span>
          ))}
        </div>

        <div className="skills-category-title" style={{ marginTop: '1.5rem' }}>Relevant Coursework</div>
        <div className="coursework-grid">
          {coursework.map((course, i) => (
            <span key={i} className="coursework-chip">{course}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
