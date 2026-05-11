import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import { IconGitHub, IconLinkedIn, IconEmail } from './Icons'

const iconMap = {
  GitHub: IconGitHub,
  LinkedIn: IconLinkedIn,
  'TTU Email': IconEmail,
  'Personal Email': IconEmail,
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Contact</p>
        <h2 className="section-title">Let's connect</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          {portfolioData.contact.text}
        </p>
      </motion.div>

      <motion.div
        className="contact-links"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {portfolioData.links.map((link) => {
          const Icon = iconMap[link.label] || IconEmail
          return (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="contact-link">
              <span className="contact-link-icon"><Icon /></span>
              {link.label}
            </a>
          )
        })}
      </motion.div>
    </section>
  )
}
