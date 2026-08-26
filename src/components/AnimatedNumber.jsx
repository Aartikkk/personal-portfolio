import { useState, useEffect } from 'react'
import { useMotionValue, useTransform, animate } from 'framer-motion'

const LEADING_PERCENT = /^(\d+)(%\+?)(.*)$/

export default function AnimatedNumber({ value, active }) {
  const match = value.match(LEADING_PERCENT)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!match || !active) return
    const target = parseInt(match[1], 10)
    const controls = animate(count, target, {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
    })
    const unsubscribe = rounded.on('change', setDisplay)
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [active])

  if (!match) return value

  return `${display}${match[2]}${match[3]}`
}
