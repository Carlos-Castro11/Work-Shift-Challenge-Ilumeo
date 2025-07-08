import useMedia from '@/hooks/useMedia'
import DesktopLayout from './Desktop'
import MobileLayout from './Mobile'

export default function DefaultLayout() {
  const isDesktop = useMedia('(min-width: 1024px)')
  return isDesktop ? <DesktopLayout /> : <MobileLayout />
}
