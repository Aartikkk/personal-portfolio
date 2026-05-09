import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export default function InfoPanel({ section, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (section) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [section, handleKeyDown])

  return (
    <AnimatePresence>
      {section && (
        <div className="info-panel-overlay open">
          <div className="info-panel-backdrop" onClick={onClose} />
          <motion.div
            className="info-panel"
            initial={{ opacity: 0, x: 60, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: 40, rotateY: -6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
          >
            <div className="info-panel-inner">
              <div className="info-panel-header">
                <span className="info-panel-kicker">
                  {getSectionKicker(section)}
                </span>
                <button className="info-panel-close" onClick={onClose}>
                  ✕
                </button>
              </div>
              <div className="info-panel-body">
                {renderSection(section)}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function getSectionKicker(section) {
  const map = {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills & Coursework',
    contact: 'Get In Touch',
  }
  return map[section] || section
}

function renderSection(section) {
  switch (section) {
    case 'about': return <AboutSection />
    case 'projects': return <ProjectsSection />
    case 'experience': return <ExperienceSection />
    case 'education': return <EducationSection />
    case 'skills': return <SkillsSection />
    case 'contact': return <ContactSection />
    default: return null
  }
}

function AboutSection() {
  const d = portfolioData
  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <motion.h2 className="info-panel-title" {...fadeUp}>
        A driven student with research, rigor, and range.
      </motion.h2>
      {d.about.map((text, i) => (
        <motion.p key={i} className="info-panel-text" {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 + i * 0.08 }}
        >{text}</motion.p>
      ))}

      <motion.div className="section-label peach" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.35 }}
      >
        <span className="dot" />Quick Stats
      </motion.div>
      <motion.div className="stat-grid" variants={stagger} initial="initial" animate="animate">
        {[
          { label: 'GPA', value: d.profile.gpa },
          { label: 'Location', value: d.profile.location },
          { label: 'Current Role', value: d.profile.currentRole },
          { label: 'Graduation', value: d.profile.expectedGraduation },
        ].map((stat, i) => (
          <motion.div key={i} className="stat-card-mini" {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 + i * 0.06 }}
          >
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="section-label gold" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.65 }}
      >
        <span className="dot" />Awards & Recognition
      </motion.div>
      {d.awards.map((award, i) => (
        <motion.div key={i} className="award-item" {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.7 + i * 0.06 }}
        >
          <span className="award-star">✦</span>
          {award}
        </motion.div>
      ))}
    </motion.div>
  )
}

function ProjectsSection() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <motion.h2 className="info-panel-title" {...fadeUp}>
        Research, course work, and things I've built.
      </motion.h2>

      <motion.div className="section-label lavender" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
      >
        <span className="dot" />Featured Work
      </motion.div>

      {portfolioData.projects.map((project, i) => (
        <motion.div key={i} className="project-card-panel" {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.1 }}
        >
          <div className="tag">{project.tag}</div>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <div className="project-stack">
            {project.stack.map((tech, j) => (
              <span key={j}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            {project.githubUrl && (
              <a className="project-link-btn primary"
                href={project.githubUrl} target="_blank" rel="noreferrer"
              >GitHub →</a>
            )}
            {project.reportUrl && (
              <a className="project-link-btn"
                href={project.reportUrl} target="_blank" rel="noreferrer"
              >Read Report</a>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div className="section-label gold" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.7 }}
      >
        <span className="dot" />Conference Presentation
      </motion.div>
      <motion.div className="bmes-card" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.75 }}
      >
        <div className="panel-card-period">{portfolioData.bmes.event}</div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.3rem' }}>
          {portfolioData.bmes.title}
        </h4>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
          {portfolioData.bmes.summary}
        </p>

        {portfolioData.bmes.abstract && (
          <div className="bmes-abstract">
            <div style={{ fontSize: '0.68rem', color: 'var(--lavender)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>
              Abstract
            </div>
            <p>{portfolioData.bmes.abstract}</p>
          </div>
        )}

        <div className="bmes-highlights">
          {portfolioData.bmes.highlights.map((h, i) => (
            <div key={i} className="bmes-highlight">{h}</div>
          ))}
        </div>

        <div className="project-links" style={{ marginTop: '1rem' }}>
          {(portfolioData.bmes.posterPreview || portfolioData.bmes.posterUrl) && (
            <a className="project-link-btn primary"
              href={portfolioData.bmes.posterPreview || portfolioData.bmes.posterUrl}
              target="_blank" rel="noreferrer"
            >View Poster →</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ExperienceSection() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <motion.h2 className="info-panel-title" {...fadeUp}>
        Work, research, and the story still unfolding.
      </motion.h2>

      <motion.div className="section-label peach" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
      >
        <span className="dot" />Timeline
      </motion.div>

      {portfolioData.experience.map((exp, i) => (
        <motion.div key={i} className="panel-card" {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.1 }}
        >
          <div className="panel-card-period">{exp.period}</div>
          <h4>{exp.role}</h4>
          <h5>{exp.organization}</h5>
          <p>{exp.detail}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function EducationSection() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <motion.h2 className="info-panel-title" {...fadeUp}>
        The academic foundation behind the work.
      </motion.h2>

      <motion.div className="section-label lavender" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
      >
        <span className="dot" />Degree
      </motion.div>

      {portfolioData.education.map((edu, i) => (
        <motion.div key={i} className="panel-card" {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.1 }}
        >
          <div className="panel-card-period">{edu.period}</div>
          <h4>{edu.school}</h4>
          <h5>{edu.title}</h5>
          <p>{edu.detail}</p>
        </motion.div>
      ))}

      <motion.div className="section-label mint" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.3 }}
      >
        <span className="dot" />Relevant Coursework
      </motion.div>
      <motion.div className="skill-chips" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.35 }}
      >
        {portfolioData.coursework.map((course, i) => (
          <span key={i} className="skill-chip">{course}</span>
        ))}
      </motion.div>
    </motion.div>
  )
}

function SkillsSection() {
  const langSkills = new Set(["Python", "Java", "C", "C++", "SQL", "R", "C#", "JavaScript"])
  const toolSkills = new Set(["GitHub", "Power BI", "JupyterLab"])
  const domainSkills = new Set(["Machine Learning", "Artificial Intelligence", "Automation", "Bioinformatics", "Geospatial Analysis", "Scientific Computing"])

  const languages = portfolioData.skills.filter(s => langSkills.has(s))
  const tools = portfolioData.skills.filter(s => toolSkills.has(s))
  const domains = portfolioData.skills.filter(s => domainSkills.has(s))
  const libraries = portfolioData.skills.filter(s => !langSkills.has(s) && !toolSkills.has(s) && !domainSkills.has(s))

  const categories = [
    { label: 'Languages', color: 'peach', items: languages, delay: 0.1 },
    { label: 'Libraries & Frameworks', color: 'mint', items: libraries, delay: 0.3 },
    { label: 'Tools & Platforms', color: 'gold', items: tools, delay: 0.5 },
    { label: 'Domains', color: 'lavender', items: domains, delay: 0.65 },
  ]

  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <motion.h2 className="info-panel-title" {...fadeUp}>
        A growing toolkit across code, math, and research.
      </motion.h2>

      {categories.map((cat, ci) => (
        <div key={ci}>
          <motion.div className={`section-label ${cat.color}`} {...fadeUp}
            transition={{ ...fadeUp.transition, delay: cat.delay }}
          >
            <span className="dot" />{cat.label}
          </motion.div>
          <motion.div className="skill-chips" {...fadeUp}
            transition={{ ...fadeUp.transition, delay: cat.delay + 0.05 }}
          >
            {cat.items.map((s, i) => <span key={i} className="skill-chip">{s}</span>)}
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}

function ContactSection() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      <motion.h2 className="info-panel-title" {...fadeUp}>
        Open to opportunities and conversations.
      </motion.h2>
      <motion.p className="info-panel-text" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
      >
        {portfolioData.contact.text}
      </motion.p>

      <motion.div className="section-label peach" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.2 }}
      >
        <span className="dot" />Reach Me
      </motion.div>

      <motion.div className="contact-links" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.25 }}
      >
        {portfolioData.links.map((link, i) => (
          <a key={i} className="contact-link"
            href={link.url} target="_blank" rel="noreferrer"
          >
            <div className="label">{link.label}</div>
            <div className="value">{link.value}</div>
          </a>
        ))}
      </motion.div>

      <motion.a className="resume-btn" {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.4 }}
        href={portfolioData.hero.resumeUrl}
        download
      >
        ↓ Download Resume
      </motion.a>
    </motion.div>
  )
}
