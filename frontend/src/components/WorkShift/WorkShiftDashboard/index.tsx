import WorkShiftInfo from '@/components/WorkShift/WorkShiftCard/WorkShiftInfo'
import { useIsDesktopStore } from '@/store/useIsDesktopStore.tsx'
import WorkShiftWarning from '../WorkShiftCard/WorkShiftWarning'
import WorkShiftClockAndControls from '../WorkShiftClockAndControls.tsx'

export default function ShiftDashboard() {
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-foreground">
      <WorkShiftInfo />
      <WorkShiftClockAndControls />
      {isDesktop && <WorkShiftWarning />}
    </div>
  )
}
