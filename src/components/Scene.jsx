import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import FloatingIsland from './FloatingIsland'
import DeskObjects from './DeskObjects'
import CoffeeParticles from './CoffeeParticles'
import WarmFog from './WarmFog'

export default function Scene({ onObjectClick, onObjectHover, entered }) {
  const controlsRef = useRef()
  const { camera, gl } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.2
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [gl])

  useEffect(() => {
    if (entered && camera) {
      gsap.to(camera.position, {
        x: 6, y: 4.5, z: 8,
        duration: 2.5,
        ease: 'power3.inOut',
      })
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0, y: 1.2, z: 0,
          duration: 2.5,
          ease: 'power3.inOut',
        })
      }
    }
  }, [entered, camera])

  return (
    <>
      {/* === LIGHTING — Dreamy pastel palette === */}
      {/* Key: soft warm light */}
      <directionalLight
        position={[10, 15, 8]}
        intensity={2.0}
        color="#f8e0c0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0005}
      />
      {/* Fill: soft peach */}
      <directionalLight position={[-6, 8, -4]} intensity={0.5} color="#f0b0a0" />
      {/* Rim: lavender backlight */}
      <directionalLight position={[-4, 3, -8]} intensity={0.6} color="#c4b0f0" />
      {/* Secondary lavender */}
      <directionalLight position={[5, 2, -6]} intensity={0.3} color="#a090d0" />
      {/* Ambient: soft cool tint */}
      <ambientLight intensity={0.25} color="#c0b8e0" />
      {/* Hemisphere: indigo sky / warm ground */}
      <hemisphereLight args={['#8878b8', '#1a1020', 0.4]} />
      {/* Underglow — peach */}
      <pointLight position={[0, -2, 0]} intensity={2} color="#f0a8a0" distance={10} decay={2} />
      {/* Desk warm spot */}
      <pointLight position={[0, 4, 0]} intensity={1.0} color="#f8d8b0" distance={8} decay={2} />
      {/* Lavender glow from behind */}
      <pointLight position={[-3, -1, -5]} intensity={1.2} color="#a090d0" distance={15} decay={2} />

      {/* === BACKGROUND — Deep indigo === */}
      <color attach="background" args={['#0c0a18']} />
      <fog attach="fog" args={['#0e0c1e', 18, 55]} />

      {/* Stars */}
      <Stars
        radius={100}
        depth={80}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.3}
      />

      {/* === THE ISLAND === */}
      <group position={[0, 0, 0]}>
        <FloatingIsland />
        <DeskObjects
          onObjectClick={onObjectClick}
          onObjectHover={onObjectHover}
        />
      </group>

      {/* === ATMOSPHERIC === */}
      <CoffeeParticles />
      <WarmFog />

      {/* === Floating rings — pastel colors === */}
      <FloatingRing position={[-8, 3, -6]} rotation={[0.5, 0.3, 0]} scale={2} color="#f0a8a0" />
      <FloatingRing position={[10, 5, -8]} rotation={[0.8, -0.2, 0.3]} scale={1.5} color="#c4b0f0" />
      <FloatingRing position={[-6, 6, 8]} rotation={[-0.3, 0.8, 0]} scale={1.8} color="#80e8c0" />
      <FloatingRing position={[7, 2, 10]} rotation={[0.4, 0.6, 0.1]} scale={1.2} color="#a090d0" />
      <FloatingRing position={[-10, 7, -3]} rotation={[-0.6, 0.2, 0.5]} scale={2.2} color="#f0d090" />

      {/* === CAMERA CONTROLS === */}
      <OrbitControls
        ref={controlsRef}
        target={[0, 1.2, 0]}
        enableDamping
        dampingFactor={0.04}
        minDistance={4}
        maxDistance={16}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={0.15}
        enablePan={false}
        autoRotate
        autoRotateSpeed={entered ? 0.15 : 0.5}
        rotateSpeed={0.5}
      />
    </>
  )
}

function FloatingRing({ position, rotation, scale, color = '#f0a8a0' }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.rotation.x = rotation[0] + t * 0.08
      ref.current.rotation.y = rotation[1] + t * 0.05
      ref.current.position.y = position[1] + Math.sin(t * 0.3 + position[0]) * 0.5
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}
