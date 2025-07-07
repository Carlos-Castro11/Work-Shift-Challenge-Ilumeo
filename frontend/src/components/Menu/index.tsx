import useMedia from '@/hooks/useMedia'
import { useIsMenuExpanded } from '@/store/useMenuExpanded'
import { Clock, User } from 'lucide-react'
import type { ReactNode } from 'react'
import Divider from '../common/Divider/Divider'
import MenuFooter from './MenuFooter'
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem'

export type TypeMenuItem = {
  id: number
  text: string
  icon: ReactNode
  link: string
}

const menuList = [
  {
    id: 10,
    text: 'Relação de turnos',
    icon: <Clock size={20} />,
    link: '/',
  },
  {
    id: 11,
    text: 'Editar perfil',
    icon: <User size={20} />,
    link: '/profile',
  },
]

export default function Menu() {
  const { isMenuExpanded } = useIsMenuExpanded()
  const isDesktop = useMedia('(min-width: 1024px)')

  const menuWidth = isMenuExpanded ? 250 : 60

  return (
    <nav
      className={`
        text-primary min-h-screen p-3 flex flex-col
        transition-all duration-300 ease-in-out
        ${!isDesktop && isMenuExpanded ? 'fixed top-0 left-0 z-50 bg-background shadow-xl' : null}
      `}
      style={{
        width: menuWidth,
      }}>
      <div className="flex flex-col justify-between items-center h-full">
        <div>
          <MenuHeader />
          <Divider styles="my-5" />
          <ul className="flex flex-col gap-1 justify-center transition-opacity duration-300 ease-in-out">
            {menuList.map((menu) => (
              <MenuItem
                key={menu.id}
                text={menu.text}
                link={menu.link}
                icon={menu.icon}
              />
            ))}
          </ul>
        </div>
        <MenuFooter />
      </div>
    </nav>
  )
}
