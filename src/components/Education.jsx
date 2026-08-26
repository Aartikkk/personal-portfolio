import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import { useSpotlight } from '../hooks/useSpotlight'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { education, awards, coursework } = portfolioData
  const spotlight = useSpotlight()

  return (
    <section className="section section-patterned" id="education" ref={ref}>
      <div className="section-pattern education-pattern" aria-hidden="true" />

      <SectionHeading label="Education" title="Academic background" />

      <motion.div
        className="education-card"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        {...spotlight}
      >
        {education.map((edu, i) => (
          <motion.div key={i} variants={fadeUp}>
            <div className="education-school">{edu.school}</div>
            <div className="education-degree">{edu.title}</div>
            <div className="education-detail">{edu.detail}</div>
          </motion.div>
        ))}

        <motion.div variants={fadeUp}>
          <div className="skills-column-label" style={{ marginTop: '1.5rem' }}>Awards & Honors</div>
          <div className="awards-grid">
            {awards.map((award, i) => (
              <span key={i} className="award-badge">{award}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="skills-column-label" style={{ marginTop: '1.5rem' }}>Relevant Coursework</div>
          <div className="coursework-grid">
            {coursework.map((course, i) => (
              <span key={i} className="coursework-chip">{course}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
