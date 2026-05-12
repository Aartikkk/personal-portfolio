import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const wipeIn = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 },
  },
}

export default function SectionHeading({ label, title, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref}>
      <motion.p
        className="section-label"
        variants={wipeIn}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {label}
      </motion.p>
      <motion.h2
        className="section-title"
        variants={wipeIn}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={fadeIn}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
