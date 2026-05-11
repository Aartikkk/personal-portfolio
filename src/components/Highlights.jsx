import { useEffect, useRef } from 'react'

const TECH_ITEMS = [
  'Python', 'Java', 'C++', 'JavaScript', 'SQL', 'R',
  'Scikit-learn', 'Pandas', 'NumPy', 'SciPy', 'OpenCV', 'XGBoost',
  'Machine Learning', 'Computer Vision', 'Bioinformatics', 'Data Science',
  'GitHub', 'JupyterLab', 'Linux', 'Power BI',
]

export default function Highlights() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
