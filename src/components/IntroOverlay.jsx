export default function IntroOverlay({ visible, onEnter }) {
  if (!visible) return null

  return (
    <div className={`intro-overlay ${!visible ? 'hidden' : ''}`}>
      <div className="intro-name">Aarti Krishan Khatri</div>
      <div className="intro-tagline">ML Researcher · Software Builder · Data Engineer</div>

      <div className="intro-stats">
        <div className="intro-stat">
          <div className="intro-stat-value">3.8</div>
          <div className="intro-stat-label">GPA</div>
        </div>
        <div className="intro-stat">
          <div className="intro-stat-value">4+</div>
          <div className="intro-stat-label">Research Roles</div>
        </div>
        <div className="intro-stat">
          <div className="intro-stat-value">BMES</div>
          <div className="intro-stat-label">Conference</div>
        </div>
      </div>

      <button className="intro-enter-btn" onClick={onEnter}>
        Explore My World
      </button>

      <div className="intro-subtitle">
        Interactive 3D Experience — Click objects to discover
      </div>
    </div>
  )
}
