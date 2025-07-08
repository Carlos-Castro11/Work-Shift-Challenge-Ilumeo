import { useLogout } from '@/hooks/user/useLogout'
import { useIsMenuExpandedStore } from '@/store/useMenuExpandedStore'
import { LogOut } from 'lucide-react'
import { menuList } from '..'
import MenuHamburguer from '../MenuButton'
import MenuItem from '../MenuItem'

export default function MenuMobile() {
  const menuState = useIsMenuExpandedStore((state) => state)
  const logout = useLogout()
  return (
    <>
      <MenuHamburguer />
      {menuState.isMenuExpanded && (
        <nav
          className={`bg-background-secondary border-t border-b border-primary-foreground 
        absolute w-full left-0 z-50 gap-3 grid p-5 top-14`}>
          {menuList.map((menu) => (
            <MenuItem
              key={menu.id}
              text={menu.text}
              link={menu.link}
              icon={menu.icon}
              onClick={() => menuState.setIsMenuExpanded(false)}
            />
          ))}
          <div
            onClick={logout}
            className="flex gap-3 font-primary items-center text-sm p-2 cursor-pointer bg-background rounded-md text-foreground transition-colors duration-300 hover:bg-accent">
            <i className="text-destructive">
              <LogOut />
            </i>
            <span>Logout</span>
          </div>
        </nav>
      )}
    </>
  )
}
