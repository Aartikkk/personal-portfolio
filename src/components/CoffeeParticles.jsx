import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CoffeeParticles() {
  return (
    <>
      {/* Warm peach particles */}
      <ParticleLayer count={350} color="#f0b0a0" size={0.1} opacity={0.5} spread={14} yRange={10} speed={0.005} />
      {/* Lavender particles */}
      <ParticleLayer count={200} color="#c4b0f0" size={0.08} opacity={0.35} spread={18} yRange={12} speed={0.004} />
      {/* Mint sparkles */}
      <ParticleLayer count={100} color="#80e8c0" size={0.06} opacity={0.3} spread={20} yRange={14} speed={0.003} />
    </>
  )
}

function ParticleLayer({ count, color, size, opacity, spread, yRange, speed }) {
  const pointsRef = useRef()

  const [posArray, velArray] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.7
      const r = 4 + Math.random() * spread
      pos[i3] = Math.sin(phi) * Math.cos(theta) * r
      pos[i3 + 1] = (Math.random() - 0.3) * yRange
      pos[i3 + 2] = Math.sin(phi) * Math.sin(theta) * r
      vel[i3] = (Math.random() - 0.5) * speed
      vel[i3 + 1] = Math.random() * speed + speed * 0.3
      vel[i3 + 2] = (Math.random() - 0.5) * speed
    }
    return [pos, vel]
  }, [count, spread, yRange, speed])

  useFrame((state) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posAttr.array[i3] += velArray[i3] + Math.sin(t * 0.3 + i * 0.1) * 0.002
      posAttr.array[i3 + 1] += velArray[i3 + 1]
      posAttr.array[i3 + 2] += velArray[i3 + 2] + Math.cos(t * 0.25 + i * 0.1) * 0.002
      if (posAttr.array[i3 + 1] > 12) {
        posAttr.array[i3 + 1] = -4
        posAttr.array[i3] = (Math.random() - 0.5) * spread * 1.4
        posAttr.array[i3 + 2] = (Math.random() - 0.5) * spread * 1.4
      }
    }
    posAttr.needsUpdate = true
  })

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, `rgba(${r},${g},${b},1)`)
    gradient.addColorStop(0.4, `rgba(${r},${g},${b},0.5)`)
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    return new THREE.CanvasTexture(canvas)
  }, [color])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={posArray} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={texture} size={size} transparent opacity={opacity}
        sizeAttenuation depthWrite={false}
        blending={THREE.AdditiveBlending} color={color}
      />
    </points>
  )
}
