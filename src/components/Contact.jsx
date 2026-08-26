import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import { IconGitHub, IconLinkedIn, IconEmail } from './Icons'
import { useSpotlight } from '../hooks/useSpotlight'

const iconMap = {
  GitHub: IconGitHub,
  LinkedIn: IconLinkedIn,
  'TTU Email': IconEmail,
  'Personal Email': IconEmail,
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 + 0.1 * i, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const spotlight = useSpotlight()

  return (
    <section className="section contact-section section-patterned" id="contact" ref={ref}>
      <div className="section-pattern contact-pattern" aria-hidden="true" />

      <SectionHeading
        label="Contact"
        title="Let's connect"
        subtitle={portfolioData.contact.text}
      />

      <div className="contact-links">
        {portfolioData.links.map((link, i) => {
          const Icon = iconMap[link.label] || IconEmail
          return (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              {...spotlight}
            >
              <span className="contact-link-icon"><Icon /></span>
              {link.label}
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
