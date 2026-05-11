import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'

export default function Conference() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { bmes } = portfolioData

  return (
    <section className="section" id="conference" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Research & Publications</p>
        <h2 className="section-title">Conference presentation</h2>
      </motion.div>

      <motion.div
        className="conference-card"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="conference-event">{bmes.event}</div>
        <h3 className="conference-title">{bmes.title}</h3>
        <p className="conference-summary">{bmes.summary}</p>

        <ul className="conference-highlights">
          {bmes.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <div className="conference-actions">
          {bmes.posterPreview && (
            <a href={bmes.posterPreview} target="_blank" rel="noreferrer" className="btn btn-primary">
              View Poster Preview →
            </a>
          )}
        </div>
      </motion.div>
    </section>
  )
}
