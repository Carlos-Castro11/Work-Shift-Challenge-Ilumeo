import { Header } from '@/components/Header'
import Menu from '@/components/Menu'
import FadeIn from '@/components/common/Animations/FadeIn'
import PageTitle from '@/components/common/PageTitle'
import { useTodayShifts } from '@/hooks/shift/useTodayShift'
import { useUserQuery } from '@/hooks/user/useUser'
import { useAuthStore } from '@/store/useAuthStore'
import { useTodayShiftStore } from '@/store/useTodayWotkShiftStore'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export default function MobileLayout() {
  const { data } = useUserQuery()
  const { data: shifts } = useTodayShifts()
  const { pathname } = useLocation()
  const setUser = useAuthStore((state) => state.setUser)
  const setTodayShifts = useTodayShiftStore((state) => state.setTodayShifts)

  useEffect(() => {
    if (data) {
      setUser(data)
    }
    if (shifts) {
      setTodayShifts(shifts)
    }
  }, [data, setUser, shifts, setTodayShifts])

  return (
    <div className="min-h-screen bg-background p-3 space-y-5">
      <div className="flex justify-between items-center">
        <FadeIn direction="left">
          <PageTitle title={pathname === '/' ? 'Turnos' : 'Perfil'} />
        </FadeIn>
        <Header />
      </div>

      <Outlet />
    </div>
  )
}
