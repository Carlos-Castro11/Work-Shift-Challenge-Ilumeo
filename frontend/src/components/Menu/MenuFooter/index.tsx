import { ModeToggle } from '@/components/Theme/mode-toggle'
import { useIsMenuExpandedStore } from '@/store/useMenuExpandedStore'
import { motion } from 'framer-motion'
import { Headset } from 'lucide-react'

export default function MenuFooter() {
  const { isMenuExpanded } = useIsMenuExpandedStore()
  return (
    <motion.div
      className={`flex fixed bottom-8 flex-col font-secondary text-sm gap-2 ${!isMenuExpanded ? 'items-center justify-center left-2' : 'left-5'}`}>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        {isMenuExpanded && <span className="text-text-color">Modo</span>}
      </div>
      <div className="flex gap-2 cursor-pointer hover:bg-background p-2">
        <Headset />
        {isMenuExpanded && (
          <span className="text-text-color">Ajuda e suporte</span>
        )}
      </div>
    </motion.div>
  )
}
