import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { portfolioData } from '../data/portfolio'
import SectionHeading from './SectionHeading'

function ProjectCard({ project, delay, featured, inView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -6, y: x * 6 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      className={`project-card ${featured ? 'bento-featured' : ''}`}
      style={{
        '--card-accent': project.color,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-tag">{project.tag}</div>
      <h3 className={`project-title ${featured ? 'bento-featured-title' : ''}`}>{project.title}</h3>
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
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [featured, ...rest] = portfolioData.projects

  return (
    <section className="section" id="projects" ref={ref}>
      <SectionHeading
        label="Projects"
        title="Things I've built"
        subtitle="From ML classification pipelines to computer vision systems — each project reflects real research impact."
      />

      <div className="bento-grid">
        <ProjectCard project={featured} delay={0.2} featured inView={inView} />
        {rest.map((project, i) => (
          <ProjectCard key={i} project={project} delay={0.3 + 0.1 * i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
