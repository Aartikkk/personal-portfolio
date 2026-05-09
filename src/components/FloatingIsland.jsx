import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function seededRandom(x, y, z) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453
  return n - Math.floor(n)
}

export default function FloatingIsland() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.12
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      {/* === ISLAND TOP — Soft minty grass === */}
      <IslandTop />

      {/* === CLIFF SIDES — Sandy clay === */}
      <IslandCliffs />

      {/* === Bottom stalactites — slate/indigo tones === */}
      <mesh position={[0, -3.2, 0]} castShadow>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#2a2438" roughness={0.9} />
      </mesh>
      <mesh position={[0.6, -2.8, 0.4]} castShadow>
        <coneGeometry args={[0.4, 1.2, 6]} />
        <meshStandardMaterial color="#352840" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, -2.6, -0.3]} castShadow>
        <coneGeometry args={[0.3, 0.9, 6]} />
        <meshStandardMaterial color="#2e2235" roughness={0.9} />
      </mesh>

      {/* === Rocks — warm lavender-gray === */}
      <Rock position={[3.0, 0.95, 1.0]} scale={0.3} />
      <Rock position={[-2.8, 0.88, -1.2]} scale={0.22} />
      <Rock position={[1.8, 0.9, -2.5]} scale={0.28} />
      <Rock position={[-3.0, 0.82, 1.5]} scale={0.18} />
      <Rock position={[0.5, 0.85, 3.2]} scale={0.2} />

      {/* === Grass tufts === */}
      <GrassCluster position={[2.5, 0.9, 2.0]} />
      <GrassCluster position={[-2.0, 0.88, 1.8]} />
      <GrassCluster position={[1.0, 0.9, -2.8]} />
      <GrassCluster position={[-1.5, 0.88, -2.2]} />
      <GrassCluster position={[3.2, 0.85, -0.5]} />
      <GrassCluster position={[-3.0, 0.82, -0.3]} />

      {/* === Small trees === */}
      <SmallTree position={[-2.8, 0.9, 2.5]} />
      <SmallTree position={[3.2, 0.85, -1.8]} scale={0.7} />

      {/* === Pastel underglow === */}
      <pointLight position={[0, -1.5, 0]} intensity={2.5} color="#f0a8a0" distance={8} decay={2} />
      <pointLight position={[2, -2, 3]} intensity={1.5} color="#c4b0f0" distance={6} decay={2} />
      <pointLight position={[-3, -1, -2]} intensity={1} color="#80e8c0" distance={5} decay={2} />

      {/* === Waterfalls === */}
      <Waterfall position={[3.5, -0.5, 0]} color="#a0d0f0" />
      <Waterfall position={[-2.5, -0.8, 2.5]} color="#c4b0f0" />
    </group>
  )
}

function IslandTop() {
  const geo = useMemo(() => {
    const radius = 4.2
    const segments = 52
    const g = new THREE.BufferGeometry()

    const verts = [0, 0.9, 0]
    const normals = [0, 1, 0]
    const uvs = [0.5, 0.5]
    const indices = []

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const noiseR = (seededRandom(Math.cos(angle) * 3, Math.sin(angle) * 3, 0) - 0.5) * 0.9
      const r = radius + noiseR
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r
      const yNoise = (seededRandom(x * 0.4, 0, z * 0.4) - 0.5) * 0.25
      verts.push(x, 0.9 + yNoise, z)
      normals.push(0, 1, 0)
      uvs.push((x / radius + 1) * 0.5, (z / radius + 1) * 0.5)
      if (i > 0) indices.push(0, i, i + 1)
    }

    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    g.setIndex(indices)
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial color="#68b878" roughness={0.75} metalness={0.05} />
    </mesh>
  )
}

function IslandCliffs() {
  const geo = useMemo(() => {
    const radius = 4.2
    const segments = 48
    const rings = 14
    const g = new THREE.BufferGeometry()

    const verts = []
    const normals = []
    const indices = []

    for (let ring = 0; ring <= rings; ring++) {
      const t = ring / rings
      const y = 0.9 - t * 4
      const taperScale = t < 0.15 ? 1.0 : 1.0 - (t - 0.15) * 0.75
      for (let s = 0; s <= segments; s++) {
        const angle = (s / segments) * Math.PI * 2
        const baseR = radius * Math.max(0.15, taperScale)
        const wobble = (seededRandom(Math.cos(angle) * 2 + ring, Math.sin(angle) * 2, ring * 0.3) - 0.5) * 0.7
        const r = baseR + wobble
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        verts.push(x, y, z)
        normals.push(Math.cos(angle), 0.15, Math.sin(angle))
      }
    }

    for (let ring = 0; ring < rings; ring++) {
      for (let s = 0; s < segments; s++) {
        const a = ring * (segments + 1) + s
        const b = a + segments + 1
        indices.push(a, b, a + 1, a + 1, b, b + 1)
      }
    }

    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    g.setIndex(indices)
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial
        color="#a08878"
        roughness={0.85}
        metalness={0.03}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function GrassCluster({ position }) {
  const blades = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      x: (Math.random() - 0.5) * 0.5,
      z: (Math.random() - 0.5) * 0.5,
      height: 0.12 + Math.random() * 0.22,
      tilt: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  return (
    <group position={position}>
      {blades.map((b, i) => (
        <GrassBlade key={i} {...b} />
      ))}
    </group>
  )
}

function GrassBlade({ x, z, height, tilt, phase }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.rotation.x = Math.sin(t * 1.8 + phase) * 0.12 + tilt
      ref.current.rotation.z = Math.cos(t * 1.4 + phase) * 0.08
    }
  })
  return (
    <mesh ref={ref} position={[x, height / 2, z]}>
      <coneGeometry args={[0.015, height, 4]} />
      <meshStandardMaterial color="#70c888" roughness={0.7} />
    </mesh>
  )
}

function SmallTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.6, 6]} />
        <meshStandardMaterial color="#8a7060" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.35, 0.5, 8]} />
        <meshStandardMaterial color="#50a868" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <coneGeometry args={[0.25, 0.4, 8]} />
        <meshStandardMaterial color="#60c080" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#78d898" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Rock({ position, scale }) {
  const geo = useMemo(() => {
    const g = new THREE.DodecahedronGeometry(1, 0)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) + (seededRandom(i, 1, 2) - 0.5) * 0.35,
        pos.getY(i) * 0.7 + (seededRandom(i, 3, 4) - 0.5) * 0.2,
        pos.getZ(i) + (seededRandom(i, 5, 6) - 0.5) * 0.35,
      )
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo} position={position} scale={scale} castShadow receiveShadow>
      <meshStandardMaterial color="#8878a0" roughness={0.85} metalness={0.03} />
    </mesh>
  )
}

function Waterfall({ position, color = '#a0d0f0' }) {
  const ref = useRef()
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      offset: i * 0.1,
      x: (Math.random() - 0.5) * 0.3,
      speed: 0.5 + Math.random() * 0.5,
    }))
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.children.forEach((child, i) => {
      const p = particles[i]
      const y = ((t * p.speed + p.offset) % 3) * -1
      child.position.y = y
      child.material.opacity = Math.max(0, 0.5 - Math.abs(y) * 0.15)
    })
  })

  return (
    <group ref={ref} position={position}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, 0, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}
