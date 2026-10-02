import { portfolioData } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'

export default function Education() {
  const { education, awards, coursework } = portfolioData
  return (
    <Section id="education" num="06" label="Education" title={<>Academic <em>record.</em></>}>
      {education.map((edu, i) => (
        <Reveal className="edu" key={i}>
          <p className="mono edu-period">{edu.period}</p>
          <h3>{edu.school}</h3>
          <p className="edu-degree">{edu.title}</p>
          <p className="edu-detail">{edu.detail.split(' | ').join(' · ')}</p>
        </Reveal>
      ))}

      <div className="edu-cols">
        <Reveal>
          <h3 className="mono">Awards &amp; honors</h3>
          <ul className="plain-list">
            {awards.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="mono">Coursework</h3>
          <p className="coursework">{coursework.join(' · ')}</p>
        </Reveal>
      </div>
    </Section>
  )
}
