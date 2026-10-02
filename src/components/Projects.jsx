import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Section from './Section'

function Row({ project, index, open, onToggle }) {
  const id = `project-${index}`
  return (
    <li className={`index-row ${open ? 'open' : ''}`}>
      <button
        className="index-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="mono index-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="index-title">{project.title}</span>
        <span className="mono index-tag">{project.tag}</span>
        <span className="mono index-plus" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="index-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="index-panel-inner">
              <p>{project.description}</p>
              <p className="mono index-stack">{project.stack.join(' / ')}</p>
              <p className="mono index-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">Source ↗</a>
                )}
                {project.reportUrl && (
                  <a href={project.reportUrl} target="_blank" rel="noreferrer">Report ↗</a>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <Section id="projects" num="03" label="Projects" title={<>Selected <em>work,</em> indexed.</>}>
      <ol className="index">
        {portfolioData.projects.map((p, i) => (
          <Row
            key={p.title}
            project={p}
            index={i}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </ol>
    </Section>
  )
}
