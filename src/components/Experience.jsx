import { portfolioData } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <Section id="experience" num="02" label="Experience" title={<>Five roles, <em>one habit:</em> measure it.</>}>
      <ol className="ledger">
        {portfolioData.experience.map((exp, i) => (
          <Reveal as="li" className="ledger-row" key={i}>
            <div className="ledger-when mono">{exp.period}</div>
            <div className="ledger-what">
              <h3>{exp.role}</h3>
              <p className="ledger-org">{exp.organization}</p>
              <p className="ledger-detail">{exp.detail}</p>
            </div>
            <div className="ledger-metric">
              <span className="metric">{exp.metric}</span>
              <span className="mono metric-label">{exp.metricLabel}</span>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
