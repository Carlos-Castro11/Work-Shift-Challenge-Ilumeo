import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(timeout)
  }, [delay])

  const getTranslateClass = () => {
    switch (direction) {
      case 'top':
        return 'translate-y-[-20px]'
      case 'bottom':
        return 'translate-y-[20px]'
      case 'left':
        return 'translate-x-[-20px]'
      case 'right':
        return 'translate-x-[20px]'
      default:
        return ''
    }
  }

  return (
    <div
      onClick={onClick}
      style={{
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
      }}
      className={clsx(
        className,
        !visible && 'opacity-0',
        visible && 'opacity-100 translate-x-0 translate-y-0',
        !visible && getTranslateClass()
      )}>
      {children}
    </div>
  )
}
