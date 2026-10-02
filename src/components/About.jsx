import { portfolioData } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'

export default function About() {
  const { about, profile } = portfolioData
  const facts = [
    ['GPA', profile.gpa],
    ['Based in', profile.location],
    ['Now', profile.currentRole],
    ['Graduating', profile.expectedGraduation],
  ]

  return (
    <Section id="about" num="01" label="About" title={<>Where software meets <em>the experiment.</em></>}>
      <div className="about-grid">
        <div className="prose">
          {about.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.06}>{p}</Reveal>
          ))}
        </div>
        <Reveal as="dl" className="facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
