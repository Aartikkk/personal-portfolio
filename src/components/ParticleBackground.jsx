export default function ParticleBackground({ theme }) {
  return (
    <>
      {/* SVG filter definition for grain texture — hidden, referenced by CSS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Grain overlay — covers entire page */}
      <div className="bg-grain" />

      {/* Hero radial glow — warm accent light behind hero area */}
      <div className="bg-hero-glow" />

      {/* Subtle secondary glow — offset to break symmetry */}
      <div className="bg-secondary-glow" />
    </>
  )
}
