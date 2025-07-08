import { useIsDesktopStore } from '@/store/useIsDesktopStore'
import MenuMobile from '../Menu/MenuMobile'
import { UserDropdown } from '../UserDropdown'

export function Header() {
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)
  return <header>{isDesktop ? <UserDropdown /> : <MenuMobile />}</header>
}
