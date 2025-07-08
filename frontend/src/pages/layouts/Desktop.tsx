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

export default function DesktopLayout() {
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
    <div className="bg-background-secondary flex min-h-screen pt-3">
      <div className="flex">
        <Menu />
      </div>

      <div
        className={`w-full p-5 overflow-x-hidden bg-background rounded-tl-lg dark:shadow-medium`}>
        <div className="flex items-center justify-between">
          <div className="w-full flex justify-between">
            <FadeIn direction="left">
              <PageTitle title={pathname === '/' ? 'Turnos' : 'Perfil'} />
            </FadeIn>
            <Header />
          </div>
        </div>
        <div className=" flex-1 mt-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
