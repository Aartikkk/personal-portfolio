import { portfolioData } from '../data/portfolio'
import Section from './Section'
import Reveal from './Reveal'

export default function Conference() {
  const { bmes } = portfolioData
  return (
    <Section id="research" num="05" label="Research" title={<>Presented at <em>BMES</em> 2025.</>}>
      <div className="research-grid">
        <Reveal as="figure" className="plate plate-poster">
          <a href={bmes.posterUrl} target="_blank" rel="noreferrer" aria-label="Open the poster PDF">
            <img src={bmes.posterPreview} alt="Research poster: ML classification of SERS spectra" loading="lazy" />
          </a>
          <figcaption className="mono">Fig. 1 — Poster, {bmes.event}.</figcaption>
        </Reveal>

        <div className="research-text">
          <Reveal as="p" className="research-summary">{bmes.summary}</Reveal>
          <Reveal as="p" className="prose-sm">{bmes.abstract}</Reveal>
          <Reveal as="ol" className="results">
            {bmes.highlights.map((h, i) => (
              <li key={i}>
                <span className="mono">R{i + 1}</span>
                <span>{h}</span>
              </li>
            ))}
          </Reveal>
          <p className="mono research-links">
            <a href={bmes.posterUrl} target="_blank" rel="noreferrer">Poster PDF ↗</a>
          </p>
        </div>
      </div>
    </Section>
  )
}
