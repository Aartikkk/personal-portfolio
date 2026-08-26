import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import MagneticLink from './MagneticLink'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Conference() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { bmes } = portfolioData

  return (
    <section className="section section-patterned" id="conference" ref={ref}>
      <div className="section-pattern conference-pattern" aria-hidden="true" />

      <SectionHeading label="Research & Publications" title="Conference presentation" />

      <motion.div
        className="conference-card"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.div className="conference-event" variants={fadeUp}>{bmes.event}</motion.div>
        <motion.h3 className="conference-title" variants={fadeUp}>{bmes.title}</motion.h3>
        <motion.p className="conference-summary" variants={fadeUp}>{bmes.summary}</motion.p>

        <motion.ul className="conference-highlights" variants={fadeUp}>
          {bmes.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </motion.ul>

        <motion.div className="conference-actions" variants={fadeUp}>
          {bmes.posterPreview && (
            <MagneticLink href={bmes.posterPreview} target="_blank" rel="noreferrer" className="btn btn-primary">
              View Poster Preview →
            </MagneticLink>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
