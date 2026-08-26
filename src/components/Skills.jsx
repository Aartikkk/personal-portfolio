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
  { key: 'languages', label: 'Languages', accent: 'var(--accent-violet)', icon: '</>' },
  { key: 'frameworks', label: 'Libraries', accent: 'var(--accent-purple)', icon: '{...}' },
  { key: 'tools', label: 'Tools', accent: 'var(--accent-green)', icon: '>' },
]

const cardSlideVariant = {
  hidden: { opacity: 0, y: -80, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.2 + i * 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const itemVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const itemsContainerVariant = {
  hidden: {},
  visible: (i) => ({
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.5 + i * 0.3,
    },
  }),
}

const chipVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { skills } = portfolioData

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="tools-pattern-bg" aria-hidden="true" />

      <SectionHeading label="Skills & Tools" title="Technical toolkit" />

      <div className="skills-columns">
        {CATEGORIES.map(({ key, label, accent, icon }, index) => (
          <motion.div
            key={key}
            className="skills-card"
            style={{ '--col-accent': accent }}
            custom={index}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={cardSlideVariant}
          >
            <div className="skills-card-header">
              <span className="skills-card-icon">{icon}</span>
              <span className="skills-card-label">{label}</span>
            </div>
            <motion.div
              className="skills-card-items"
              custom={index}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={itemsContainerVariant}
            >
              {skills[key].map((skill) => (
                <motion.div
                  key={skill.name}
                  className="skills-card-item"
                  variants={itemVariant}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="skill-icon"><SkillIcon iconName={skill.icon} /></span>
                  <span className="skill-name">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="domain-section"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={chipVariant}
      >
        <div className="skills-card-label">Domains</div>
        <div className="domain-chips">
          {skills.domains.map((domain) => (
            <span key={domain} className="domain-chip">{domain}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
