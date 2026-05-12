import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import {
  IconPython, IconJava, IconC, IconCpp, IconJS, IconSQL, IconR, IconCSharp,
  IconNumpy, IconPandas, IconScikit, IconOpenCV,
  IconGitHub, IconJupyter, IconVSCode, IconLinux, IconGraph,
} from './Icons'

const iconMap = {
  SiPython: IconPython,
  SiOpenjdk: IconJava,
  SiC: IconC,
  SiCplusplus: IconCpp,
  SiJavascript: IconJS,
  SiPostgresql: IconSQL,
  SiR: IconR,
  SiCsharp: IconCSharp,
  SiNumpy: IconNumpy,
  SiPandas: IconPandas,
  SiScikitlearn: IconScikit,
  SiScipy: IconGraph,
  SiPlotly: IconGraph,
  SiOpencv: IconOpenCV,
  SiGithub: IconGitHub,
  SiPowerbi: IconGraph,
  SiJupyter: IconJupyter,
  SiVisualstudiocode: IconVSCode,
  SiLinux: IconLinux,
}

function SkillIcon({ iconName }) {
  const Icon = iconMap[iconName]
  if (!Icon) return null
  return <Icon />
}

const CATEGORIES = [
  { key: 'languages', label: 'Languages', accent: 'var(--accent-violet)' },
  { key: 'frameworks', label: 'Libraries', accent: 'var(--accent-purple)' },
  { key: 'tools', label: 'Tools', accent: 'var(--accent-green)' },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { skills } = portfolioData

  return (
    <section className="section" id="skills" ref={ref}>
      <SectionHeading label="Skills & Tools" title="Technical toolkit" />

      <motion.div
        className="skills-columns"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {CATEGORIES.map(({ key, label, accent }) => (
          <div key={key} className="skills-column" style={{ '--col-accent': accent }}>
            <div className="skills-column-label">{label}</div>
            <div className="skills-column-items">
              {skills[key].map((skill) => (
                <div key={skill.name} className="skills-column-item">
                  <span className="skill-icon"><SkillIcon iconName={skill.icon} /></span>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="domain-section"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="skills-column-label">Domains</div>
        <div className="domain-chips">
          {skills.domains.map((domain) => (
            <span key={domain} className="domain-chip">{domain}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
