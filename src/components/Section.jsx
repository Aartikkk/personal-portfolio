import Reveal from './Reveal'

export default function Section({ id, num, label, title, children }) {
  return (
    <section className="section wrap" id={id}>
      <div className="section-head">
        <span className="mono section-num">§ {num}</span>
        <span className="mono section-label">{label}</span>
      </div>
      <div className="section-body">
        <Reveal as="h2" className="section-title">{title}</Reveal>
        {children}
      </div>
    </section>
  )
}
