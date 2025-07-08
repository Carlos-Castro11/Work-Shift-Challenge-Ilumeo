import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/user/useLogout'
import { useIsMenuExpanded } from '@/store/useMenuExpanded'
import { menuList } from '..'
import MenuHamburguer from '../MenuButton'
import MenuItem from '../MenuItem'

export default function MenuMobile() {
  const isOpen = useIsMenuExpanded((state) => state.isMenuExpanded)
  const logout = useLogout()
  return (
    <>
      <MenuHamburguer />
      {isOpen && (
        <nav
          className={`bg-background-secondary border-t border-b border-primary-foreground 
        absolute w-full left-0 z-50 overflow-hidden gap-3 grid p-5 top-14`}>
          {menuList.map((menu) => (
            <MenuItem
              key={menu.id}
              text={menu.text}
              link={menu.link}
              icon={menu.icon}
            />
          ))}
          <Button onClick={logout} size={'sm'} variant={'destructive'}>
            Logout
          </Button>
        </nav>
      )}
    </>
  )
}
