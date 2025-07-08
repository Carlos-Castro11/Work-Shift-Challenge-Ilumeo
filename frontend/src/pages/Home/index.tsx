import ShiftDashboard from '@/components/WorkShift/WorkShiftDashboard'
import { WorkShiftTable } from '@/components/WorkShift/WorkShiftTable'
import { WorkShiftTableFilter } from '@/components/WorkShift/WorkShiftTable/Filters'
import { FiltersMobile } from '@/components/WorkShift/WorkShiftTable/FiltersMobile'
import HeadPageTitle from '@/components/common/HeadPageTitle'
import useMedia from '@/hooks/useMedia'

export default function Home() {
  const isDesktop = useMedia('(min-width: 768px)')
  return (
    <>
      <HeadPageTitle title="Turnos" />
      <ShiftDashboard />
      <div className="space-y-5 mt-7 lg:mt-11 overflow-hidden">
        {isDesktop ? <WorkShiftTableFilter /> : <FiltersMobile />}
        <WorkShiftTable />
      </div>
    </>
  )
}
