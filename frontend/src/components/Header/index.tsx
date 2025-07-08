import { useIsDesktopStore } from '@/store/useIsDesktopStore'
import MenuMobile from '../Menu/MenuMobile'
import { ModeToggle } from '../Theme/mode-toggle'
import { UserDropdown } from '../UserDropdown'

export function Header() {
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)
  return (
    <header>
      {isDesktop ? (
        <UserDropdown />
      ) : (
        <div className="flex gap-5 items-center">
          <ModeToggle />
          <MenuMobile />
        </div>
      )}
    </header>
  )
}
