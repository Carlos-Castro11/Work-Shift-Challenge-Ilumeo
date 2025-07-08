import useMedia from '@/hooks/useMedia'
import { useIsDesktopStore } from '@/store/useIsDesktopStore'
import { useEffect } from 'react'
import DesktopLayout from './Desktop'
import MobileLayout from './Mobile'

export default function DefaultLayout() {
  const isDesktop = useMedia('(min-width: 1024px)')
  const isDesktopSore = useIsDesktopStore((state) => state)

  useEffect(() => {
    if (isDesktop !== undefined) isDesktopSore.setIsDesktop(isDesktop)
  }, [isDesktop])

  return isDesktop ? <DesktopLayout /> : <MobileLayout />
}
