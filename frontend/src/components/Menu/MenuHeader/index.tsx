import { useIsMenuExpanded } from '@/store/useMenuExpanded'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import MenuButton from '../MenuButton'

export default function MenuHeader() {
  const { isMenuExpanded } = useIsMenuExpanded()
  return (
    <div className="flex gap-4 items-center justify-center">
      {isMenuExpanded && (
        <Link to="/">
          <div
            className={`
              flex gap-3 items-center transition-all duration-300
              opacity-100 translate-x-0
            `}>
            <i>
              <Sparkles size={20} />
            </i>
            <span className="uppercase text-foreground text-lg font-display text-nowrap">
              FX WORK SHIFT
            </span>
          </div>
        </Link>
      )}
      <MenuButton />
    </div>
  )
}
