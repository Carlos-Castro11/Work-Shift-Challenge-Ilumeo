import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'top' | 'bottom' | 'left' | 'right'

interface FadeInProps {
  children: ReactNode
  direction?: Direction
  duration?: number
  delay?: number
  className?: string
  onClick?: () => void
}

export default function FadeIn({
  children,
  direction = 'bottom',
  duration = 0.5,
  delay = 0,
  className,
  onClick,
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'top':
        return { opacity: 0, y: -20 }
      case 'bottom':
        return { opacity: 0, y: 20 }
      case 'left':
        return { opacity: 0, x: -20 }
      case 'right':
        return { opacity: 0, x: 20 }
      default:
        return { opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      onClick={onClick}>
      {children}
    </motion.div>
  )
}
