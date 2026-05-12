import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
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
      <SectionHeading
        label="Contact"
        title="Let's connect"
        subtitle={portfolioData.contact.text}
      />

      <motion.div
        className="contact-links"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
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
