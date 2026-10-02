import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain {...rest}>{children}</Plain>
  }
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
