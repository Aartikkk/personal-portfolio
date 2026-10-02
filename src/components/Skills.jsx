import { portfolioData } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'

const COLUMNS = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Libraries' },
  { key: 'tools', label: 'Tools' },
]

export default function Skills() {
  const { skills } = portfolioData
  return (
    <Section id="skills" num="04" label="Skills" title={<>What's <em>on the bench.</em></>}>
      <div className="skills-cols">
        {COLUMNS.map(({ key, label }) => (
          <Reveal className="skills-col" key={key}>
            <h3 className="mono">{label}</h3>
            <ul>
              {skills[key].map((s) => <li key={s.name}>{s.name}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="domains">
        <h3 className="mono">Domains</h3>
        <p>{skills.domains.join(' · ')}</p>
      </Reveal>
    </Section>
  )
}
