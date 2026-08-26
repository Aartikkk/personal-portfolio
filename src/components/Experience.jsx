import { motion, useInView, useScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import AnimatedNumber from './AnimatedNumber'
import { useSpotlight } from '../hooks/useSpotlight'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.15 + 0.12 * i, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const spotlight = useSpotlight()

  const scrollRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: scrollRef })
  const [activeCard, setActiveCard] = useState(0)
  const lastCard = portfolioData.experience.length - 1

  useEffect(() => {
    return scrollXProgress.on('change', (v) => {
      setActiveCard(Math.round(v * lastCard))
    })
  }, [lastCard])

  return (
    <section className="section section-patterned" id="experience" ref={ref}>
      <div className="section-pattern experience-pattern" aria-hidden="true" />

      <SectionHeading
        label="Experience"
        title="Research & industry experience"
        subtitle="Five research and industry roles spanning ML, data science, scientific computing, lab automation, and enterprise AI workflows."
      />

      <div className="exp-scroll-wrapper" ref={scrollRef}>
        <div className="exp-scroll-track">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              {...spotlight}
            >
              {exp.impact && (
                <div className="exp-card-stat">
                  <AnimatedNumber value={exp.impact} active={inView} />
                </div>
              )}
              <div className="exp-card-period">{exp.period}</div>
              <div className="exp-card-role">{exp.role}</div>
              <div className="exp-card-org">{exp.organization}</div>
              <div className="exp-card-detail">{exp.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="exp-scroll-dots" aria-hidden="true">
        {portfolioData.experience.map((_, i) => (
          <span key={i} className={`exp-scroll-dot ${i === activeCard ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  )
}
