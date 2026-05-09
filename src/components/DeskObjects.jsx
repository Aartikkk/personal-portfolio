import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function DeskObjects({ onObjectClick, onObjectHover }) {
  return (
    <group scale={1.35}>
      <Desk />

      <InteractiveObject
        id="about" label="About Me"
        position={[-0.8, 1.38, 0.6]}
        onClick={onObjectClick} onHover={onObjectHover}
      >
        <CoffeeCup />
      </InteractiveObject>

      <InteractiveObject
        id="projects" label="Projects"
        position={[0.3, 1.32, -0.1]}
        onClick={onObjectClick} onHover={onObjectHover}
      >
        <Laptop />
      </InteractiveObject>

      <InteractiveObject
        id="experience" label="Experience"
        position={[1.2, 1.32, 0.6]}
        onClick={onObjectClick} onHover={onObjectHover}
      >
        <Monitor />
      </InteractiveObject>

      <InteractiveObject
        id="education" label="Education"
        position={[-0.3, 1.32, -0.8]}
        onClick={onObjectClick} onHover={onObjectHover}
      >
        <BookStack />
      </InteractiveObject>

      <InteractiveObject
        id="skills" label="Skills"
        position={[-1.3, 1.32, -0.3]}
        onClick={onObjectClick} onHover={onObjectHover}
      >
        <Trophy />
      </InteractiveObject>

      <InteractiveObject
        id="contact" label="Contact"
        position={[0, 2.6, 0.5]}
        onClick={onObjectClick} onHover={onObjectHover}
        floating
      >
        <PaperAirplane />
      </InteractiveObject>

      <DeskLamp position={[1.4, 1.32, -0.5]} />
    </group>
  )
}

function InteractiveObject({ id, label, position, onClick, onHover, children, floating }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (groupRef.current && !floating) {
      const targetScale = hovered ? 1.12 : 1.0
      const current = groupRef.current.scale.x
      const lerped = current + (targetScale - current) * 0.1
      groupRef.current.scale.setScalar(lerped)

      if (hovered) {
        groupRef.current.position.y = position[1] + 0.06
      } else {
        groupRef.current.position.y += (position[1] - groupRef.current.position.y) * 0.1
      }
    }
  })

  const Wrapper = floating ? Float : 'group'
  const wrapperProps = floating ? { speed: 2, rotationIntensity: 0.3, floatIntensity: 0.8 } : {}

  return (
    <Wrapper {...wrapperProps}>
      <group
        ref={groupRef}
        position={position}
        onClick={(e) => { e.stopPropagation(); onClick(id) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(id); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = 'default' }}
      >
        {children}

        {/* Hover glow rings */}
        {hovered && (
          <>
            <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.25, 0.5, 32]} />
              <meshBasicMaterial color="#f0a8a0" transparent opacity={0.18} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.5, 0.65, 32]} />
              <meshBasicMaterial color="#c4b0f0" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
          </>
        )}

        {/* PERSISTENT label — always visible, enhanced on hover */}
        <Html
          position={[0, floating ? 0.35 : 0.55, 0]}
          center
          style={{
            background: hovered
              ? 'rgba(14, 12, 28, 0.92)'
              : 'rgba(14, 12, 28, 0.7)',
            border: hovered
              ? '1px solid rgba(240, 168, 160, 0.4)'
              : '1px solid rgba(180, 160, 240, 0.2)',
            borderRadius: '20px',
            padding: hovered ? '6px 14px' : '4px 10px',
            color: hovered ? '#f0a8a0' : 'rgba(200, 192, 216, 0.85)',
            fontSize: hovered ? '12px' : '10px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            backdropFilter: 'blur(12px)',
            boxShadow: hovered
              ? '0 4px 24px rgba(0,0,0,0.5), 0 0 15px rgba(240,168,160,0.12)'
              : '0 2px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {label}
        </Html>
      </group>
    </Wrapper>
  )
}

function Desk() {
  return (
    <group position={[0.2, 1, 0]}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3.2, 0.08, 2.2]} />
        <meshStandardMaterial color="#c8b8a8" roughness={0.5} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.005, 0]}>
        <boxGeometry args={[3.24, 0.04, 2.24]} />
        <meshStandardMaterial color="#a898b0" roughness={0.6} />
      </mesh>
      {[[-1.4, -0.42, -0.9], [1.4, -0.42, -0.9], [-1.4, -0.42, 0.9], [1.4, -0.42, 0.9]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.035, 0.045, 0.8, 8]} />
          <meshStandardMaterial color="#a898b0" roughness={0.7} metalness={0.08} />
        </mesh>
      ))}
    </group>
  )
}

function CoffeeCup() {
  const steamRef = useRef()

  const cupShape = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.14, 0),
      new THREE.Vector2(0.17, 0.03),
      new THREE.Vector2(0.19, 0.1),
      new THREE.Vector2(0.19, 0.26),
      new THREE.Vector2(0.21, 0.28),
      new THREE.Vector2(0.21, 0.3),
      new THREE.Vector2(0.18, 0.3),
      new THREE.Vector2(0.16, 0.26),
      new THREE.Vector2(0.16, 0.08),
      new THREE.Vector2(0.13, 0.03),
      new THREE.Vector2(0, 0.03),
    ]
    return new THREE.LatheGeometry(pts, 20)
  }, [])

  useFrame((state) => {
    if (steamRef.current) {
      const t = state.clock.elapsedTime
      steamRef.current.children.forEach((c, i) => {
        const cycle = (t * 0.4 + i * 0.2) % 0.7
        c.position.y = 0.32 + cycle * 0.4
        c.position.x = Math.sin(t * 2 + i * 3) * 0.03
        c.position.z = Math.cos(t * 1.5 + i * 2) * 0.02
        c.material.opacity = Math.max(0, 0.35 - cycle * 0.5)
        c.scale.setScalar(0.5 + cycle * 1.5)
      })
    }
  })

  return (
    <group>
      <mesh geometry={cupShape} castShadow>
        <meshStandardMaterial color="#f0e0c8" roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.015, 16]} />
        <meshStandardMaterial color="#2a1208" roughness={0.25} metalness={0.15} />
      </mesh>
      <mesh position={[0.26, 0.17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.016, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#f0e0c8" roughness={0.35} />
      </mesh>
      <group ref={steamRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <meshBasicMaterial color="#f8e8d0" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0, 0.3, 0]} intensity={0.3} color="#f0a8a0" distance={1.5} decay={2} />
    </group>
  )
}

function Laptop() {
  const screenRef = useRef()

  useFrame((state) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.48, 0.025, 0.32]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.014, 0.02]}>
        <boxGeometry args={[0.4, 0.003, 0.2]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.5} metalness={0.4} />
      </mesh>
      <group position={[0, 0.15, -0.145]} rotation={[-0.35, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.3, 0.012]} />
          <meshStandardMaterial color="#1a1a1e" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh ref={screenRef} position={[0, 0, 0.008]}>
          <planeGeometry args={[0.4, 0.24]} />
          <meshStandardMaterial color="#0a1830" emissive="#1a3060" emissiveIntensity={0.4} />
        </mesh>
        {[-0.07, -0.02, 0.03, 0.08].map((y, i) => (
          <mesh key={i} position={[-0.04 + i * 0.015, y, 0.009]}>
            <planeGeometry args={[0.15 + seededRandom(i, 0, 0) * 0.12, 0.012]} />
            <meshBasicMaterial color={['#f0a8a0', '#80e8c0', '#c4b0f0', '#80b0e0'][i]} transparent opacity={0.65} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0, 0.2, 0.1]} intensity={0.4} color="#6080c0" distance={2} decay={2} />
    </group>
  )
}

function Monitor() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.015, 12]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.025, 0.24, 8]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[0.5, 0.32, 0.018]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.32, 0.01]}>
        <planeGeometry args={[0.45, 0.27]} />
        <meshStandardMaterial color="#0a1220" emissive="#102030" emissiveIntensity={0.3} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[-0.12 + i * 0.055, 0.25 + seededRandom(i, 7, 8) * 0.08, 0.012]}>
          <boxGeometry args={[0.035, 0.04 + seededRandom(i, 9, 10) * 0.1, 0.001]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#f0a8a0' : '#c4b0f0'} transparent opacity={0.7} />
        </mesh>
      ))}
      <pointLight position={[0, 0.32, 0.15]} intensity={0.25} color="#4060a0" distance={1.5} decay={2} />
    </group>
  )
}

function BookStack() {
  const books = [
    { color: '#a06868', w: 0.32, h: 0.04, d: 0.22, y: 0.02, r: 0.02 },
    { color: '#6080a8', w: 0.3, h: 0.05, d: 0.2, y: 0.065, r: -0.03 },
    { color: '#70a880', w: 0.31, h: 0.035, d: 0.21, y: 0.1075, r: 0.04 },
    { color: '#a090c0', w: 0.28, h: 0.045, d: 0.19, y: 0.15, r: -0.01 },
  ]

  return (
    <group>
      {books.map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]} rotation={[0, b.r, 0]} castShadow>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={b.color} roughness={0.8} metalness={0.03} />
        </mesh>
      ))}
      <mesh position={[0, 0.175, -0.08]}>
        <boxGeometry args={[0.18, 0.003, 0.003]} />
        <meshStandardMaterial color="#f0d090" emissive="#f0d090" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Trophy() {
  return (
    <group>
      <mesh position={[0, 0.015, 0]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.12]} />
        <meshStandardMaterial color="#f0d090" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.025, 0.1, 8]} />
        <meshStandardMaterial color="#f0d8a0" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.035, 0.12, 10, 1, true]} />
        <meshStandardMaterial color="#f8e0b0" roughness={0.2} metalness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <octahedronGeometry args={[0.025, 0]} />
        <meshStandardMaterial color="#fff8e0" emissive="#f0d090" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[0, 0.2, 0]} intensity={0.5} color="#f0d090" distance={1.5} decay={2} />
    </group>
  )
}

function PaperAirplane() {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.rotation.y = t * 0.5
      ref.current.rotation.z = Math.sin(t * 1.2) * 0.15
    }
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = new Float32Array([
      0, 0, -0.2,  -0.15, 0, 0.1,  0, 0.04, 0.05,
      0.15, 0, 0.1,  0, -0.01, 0.1,
    ])
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    g.setIndex([0,1,2, 0,2,3, 0,1,4, 0,4,3, 1,2,4, 2,3,4])
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh ref={ref} geometry={geo} castShadow>
      <meshStandardMaterial
        color="#f2e8e0"
        roughness={0.5}
        metalness={0.05}
        side={THREE.DoubleSide}
        emissive="#f0c0b0"
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

function DeskLamp({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.02, 12]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.4, 6]} />
        <meshStandardMaterial color="#3a3a3e" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.38, 0.05]} rotation={[0.3, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.1, 8, 1, true]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0, 0.35, 0.08]} intensity={1.5} color="#f8d890" distance={3} decay={2} castShadow />
    </group>
  )
}

function seededRandom(x, y, z) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453
  return n - Math.floor(n)
}
