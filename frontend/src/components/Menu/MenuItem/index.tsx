import { useIsMenuExpandedStore } from '@/store/useMenuExpandedStore'
import { type ReactNode, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MenuItemProps {
  text: string
  icon: ReactNode
  link: string
  onClick?: () => void
}

export default function MenuItem({ text, icon, link, onClick }: MenuItemProps) {
  const { isMenuExpanded } = useIsMenuExpandedStore()
  const { pathname } = useLocation()
  const [isLinkActive, setIsLinkActive] = useState(false)

  useEffect(() => {
    setIsLinkActive(pathname === link)
  }, [pathname, link])

  return (
    <Link
      to={link}
      onClick={onClick}
      className="relative block focus:outline-none focus-visible:ring-0">
      <div
        className={`absolute -left-[6px] top-[5px] h-[70%] w-[2px] bg-primary shadow-lg dark:shadow-medium 
          transition-transform duration-300 ease-in-out
          ${isLinkActive ? 'scale-y-100' : 'scale-y-0'}`}
        style={{ transformOrigin: 'top' }}
      />

      <li
        className={`
          flex items-center p-2 rounded-md cursor-pointer
          transition-colors duration-300
          ${isLinkActive ? 'bg-background text-primary' : 'text-popover-foreground hover:bg-background'}
        `}>
        <div
          className={`
            flex items-center justify-center
            transition-colors duration-300 
            ${isLinkActive ? 'text-primary' : 'text-popover-foreground'}
          `}>
          {icon}
        </div>

        {isMenuExpanded && (
          <span
            className={`
              font-secondary text-sm text-nowrap ml-3
              transition-all duration-300 ease-in-out opacity-100 translate-y-0
            `}>
            {text}
          </span>
        )}
      </li>
    </Link>
  )
}
