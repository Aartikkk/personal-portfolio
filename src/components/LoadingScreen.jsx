import { useState, useEffect } from 'react'

const MESSAGES = [
  'Warming up the beans',
  'Pouring some inspiration',
  'Arranging the desk',
  'Summoning the floating island',
  'Almost ready',
]

export default function LoadingScreen({ loaded }) {
  const [progress, setProgress] = useState(0)
  const [messageIdx, setMessageIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        const increment = loaded ? 15 : 3 + Math.random() * 5
        return Math.min(prev + increment, loaded ? 100 : 85)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [loaded])

  // Cycle through fun messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % MESSAGES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`loading-screen ${loaded && progress >= 100 ? 'hidden' : ''}`}>
      <div className="loading-coffee" />
      <div className="loading-text">Brewing your experience</div>
      <div className="loading-subtitle">{MESSAGES[messageIdx]}</div>
      <div className="loading-bar">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
