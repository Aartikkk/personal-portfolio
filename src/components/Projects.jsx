import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '../data/portfolio'

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section" id="projects" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've built</h2>
        <p className="section-subtitle">
          From ML classification pipelines to computer vision systems — each project reflects real research impact.
        </p>
      </motion.div>

      <div className="projects-grid">
        {portfolioData.projects.map((project, i) => (
          <motion.div
            key={i}
            className="project-card"
            style={{ '--card-accent': project.color }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <div className="project-tag">{project.tag}</div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="project-stack-chip">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                  GitHub ↗
                </a>
              )}
              {project.reportUrl && (
                <a href={project.reportUrl} target="_blank" rel="noreferrer" className="project-link">
                  Report ↗
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
