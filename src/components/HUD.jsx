import { portfolioData } from '../data/portfolio'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function HUD({ activeSection, onNavClick, hoveredObject }) {
  return (
    <div className="hud">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="brand-name">Aarti</div>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom HUD */}
      <div className="bottom-hud">
        <div className="hint-text">
          {hoveredObject ? (
            <>Click to explore <span>{NAV_ITEMS.find(n => n.id === hoveredObject)?.label || hoveredObject}</span></>
          ) : (
            <>Drag to orbit · Click objects to explore</>
          )}
        </div>
        <div className="social-links">
          <a
            className="social-btn"
            href={portfolioData.hero.githubUrl}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            GH
          </a>
          <a
            className="social-btn"
            href={portfolioData.links[1].url}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            LI
          </a>
          <a
            className="social-btn"
            href={portfolioData.hero.resumeUrl}
            download
            title="Resume"
          >
            CV
          </a>
        </div>
      </div>
    </div>
  )
}
