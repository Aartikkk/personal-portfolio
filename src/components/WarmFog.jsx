import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PASTEL_COLORS = ['#f0a8a0', '#c4b0f0', '#80e8c0', '#f0d090', '#a090d0']

export default function WarmFog() {
  const COUNT = 24
  const meshRefs = useRef([])

  const clouds = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2
      const radius = 12 + Math.random() * 10
      return {
        x: Math.cos(angle) * radius,
        y: -1 + Math.random() * 6,
        z: Math.sin(angle) * radius,
        scale: 1.0 + Math.random() * 2,
        speed: 0.05 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.012 + Math.random() * 0.02,
        color: PASTEL_COLORS[i % PASTEL_COLORS.length],
      }
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const cloud = clouds[i]
      mesh.position.y = cloud.y + Math.sin(t * cloud.speed + cloud.phase) * 0.5
      mesh.rotation.y = t * 0.02 + cloud.phase
    })
  })

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={cloud.scale}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
