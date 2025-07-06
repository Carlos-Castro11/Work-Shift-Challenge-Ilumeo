'use client'
import { useIsMenuExpanded } from '@/store/useMenuExpanded'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuIcon, X } from 'lucide-react'

const iconVariants = {
  hiddenLeft: { x: -20, opacity: 0 },
  hiddenRight: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

export default function MenuHamburguer() {
  const { isMenuExpanded, setIsMenuExpanded } = useIsMenuExpanded()
  return (
    <button
      type="button"
      onClick={() => setIsMenuExpanded(!isMenuExpanded)}
      className="relative w-6 h-6 cursor-pointer">
      <AnimatePresence mode="wait" initial={false}>
        {isMenuExpanded ? (
          <motion.div
            key="x-icon"
            initial="hiddenRight"
            animate="visible"
            exit="hiddenLeft"
            variants={iconVariants}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center">
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="menu-icon"
            initial="hiddenLeft"
            animate="visible"
            exit="hiddenRight"
            variants={iconVariants}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center">
            <MenuIcon size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
