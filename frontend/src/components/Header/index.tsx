import useMedia from '@/hooks/useMedia'
import MenuMobile from '../Menu/MenuMobile'
import { UserDropdown } from '../UserDropdown'

export function Header() {
  const isDesktop = useMedia('(min-width: 1024px)')
  return <header>{isDesktop ? <UserDropdown /> : <MenuMobile />}</header>
}
