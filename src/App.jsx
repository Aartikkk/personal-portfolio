import { useState, useCallback, Suspense, useEffect, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import HUD from './components/HUD'
import InfoPanel from './components/InfoPanel'
import LoadingScreen from './components/LoadingScreen'
import IntroOverlay from './components/IntroOverlay'

// Error boundary so 3D errors don't blank the whole page
class ErrorBoundary extends Component {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#0c0a18', color: '#f0a8a0', fontFamily: 'monospace',
          flexDirection: 'column', gap: '1rem', padding: '2rem',
        }}>
          <p>3D scene encountered an error:</p>
          <code style={{ color: '#c4b0f0', maxWidth: '80vw', wordBreak: 'break-all' }}>
            {this.state.error?.message}
          </code>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.5rem', border: '1px solid #f0a8a0',
              background: 'transparent', color: '#f0a8a0', borderRadius: '8px',
              cursor: 'pointer', marginTop: '1rem',
            }}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [hoveredObject, setHoveredObject] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [entered, setEntered] = useState(false)

  const handleObjectClick = useCallback((section) => {
    setActiveSection(section)
  }, [])

  const handleObjectHover = useCallback((name) => {
    setHoveredObject(name)
  }, [])

  const handleClosePanel = useCallback(() => {
    setActiveSection(null)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen loaded={loaded} />

      <IntroOverlay
        visible={loaded && !entered}
        onEnter={() => setEntered(true)}
      />

      <div className="canvas-container">
        <ErrorBoundary>
          <Canvas
            shadows
            camera={{ position: [8, 6, 10], fov: 42, near: 0.1, far: 200 }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
              stencil: false,
            }}
            dpr={[1, 1.5]}
            onCreated={({ gl }) => {
              gl.setClearColor('#0c0a18')
            }}
          >
            <Suspense fallback={<FallbackScene />}>
              <Scene
                onObjectClick={handleObjectClick}
                onObjectHover={handleObjectHover}
                entered={entered}
              />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {entered && (
        <HUD
          activeSection={activeSection}
          onNavClick={handleObjectClick}
          hoveredObject={hoveredObject}
        />
      )}

      <InfoPanel
        section={activeSection}
        onClose={handleClosePanel}
      />
    </>
  )
}

// Minimal fallback while the main scene loads
function FallbackScene() {
  return (
    <>
      <color attach="background" args={['#0c0a18']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 2, 0]} intensity={1} color="#f0a8a0" />
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f0a8a0" emissive="#c4b0f0" emissiveIntensity={0.5} />
      </mesh>
    </>
  )
}
