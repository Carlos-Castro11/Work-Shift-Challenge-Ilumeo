import WorkShiftInfo from '@/components/WorkShift/WorkShiftCard/WorkShiftInfo'
import useMedia from '@/hooks/useMedia'
import WorkShiftWarning from '../WorkShiftCard/WorkShiftWarning'
import WorkShiftClockAndControls from '../WorkShiftClockAndControls.tsx'

export default function ShiftDashboard() {
  const isDesktop = useMedia('(min-width: 1024px)')

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-foreground">
      {isDesktop && <WorkShiftInfo />}
      <WorkShiftClockAndControls />
      {isDesktop && <WorkShiftWarning />}
    </div>
  )
}
