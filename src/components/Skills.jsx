import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'
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

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { skills } = portfolioData

  return (
    <section className="section" id="skills" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Skills & Tools</p>
        <h2 className="section-title">Technical toolkit</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="skills-category">
          <div className="skills-category-title">Languages</div>
          <div className="skills-grid" style={{ marginTop: '0.8rem' }}>
            {skills.languages.map((skill) => (
              <div key={skill.name} className="skill-card">
                <span className="skill-icon"><SkillIcon iconName={skill.icon} /></span>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <div className="skills-category-title">Libraries & Frameworks</div>
          <div className="skills-grid" style={{ marginTop: '0.8rem' }}>
            {skills.frameworks.map((skill) => (
              <div key={skill.name} className="skill-card">
                <span className="skill-icon"><SkillIcon iconName={skill.icon} /></span>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <div className="skills-category-title">Tools & Platforms</div>
          <div className="skills-grid" style={{ marginTop: '0.8rem' }}>
            {skills.tools.map((skill) => (
              <div key={skill.name} className="skill-card">
                <span className="skill-icon"><SkillIcon iconName={skill.icon} /></span>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <div className="skills-category-title">Domains</div>
          <div className="domain-chips">
            {skills.domains.map((domain) => (
              <span key={domain} className="domain-chip">{domain}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
