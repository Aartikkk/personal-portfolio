import { portfolioData } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'

export default function Contact() {
  const { contact, links } = portfolioData
  return (
    <Section id="contact" num="07" label="Contact" title={<>Say <em>hello.</em></>}>
      <Reveal as="p" className="contact-text">{contact.text}</Reveal>
      <Reveal as="a" className="contact-email" href={`mailto:${contact.email}`}>
        {contact.email}
      </Reveal>
      <Reveal as="ul" className="contact-list">
        {links.map((l) => (
          <li key={l.label}>
            <span className="mono">{l.label}</span>
            <a href={l.url} target="_blank" rel="noreferrer">{l.value} ↗</a>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
