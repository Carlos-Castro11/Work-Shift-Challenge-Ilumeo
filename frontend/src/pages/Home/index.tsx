import ShiftDashboard from '@/components/WorkShift/WorkShiftDashboard'
import { WorkShiftTable } from '@/components/WorkShift/WorkShiftTable'
import HeadPageTitle from '@/components/common/HeadPageTitle'
import { useIsDesktopStore } from '@/store/useIsDesktopStore'

export default function Home() {
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)
  return (
    <>
      <HeadPageTitle title="Turnos" />
      <ShiftDashboard />
      <div className={`${isDesktop && 'mt-10'} overflow-hidden`}>
        <WorkShiftTable />
      </div>
    </>
  )
}
