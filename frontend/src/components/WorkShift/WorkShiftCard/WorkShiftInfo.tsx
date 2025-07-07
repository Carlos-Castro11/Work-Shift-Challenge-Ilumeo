import { useTodayShiftStore } from '@/store/useTodayWotkShiftStore'
import { getFormattedDate } from '@/utils/getFormattedDate'
import { msToTimeParts, pad } from '@/utils/time'
import { Info } from 'lucide-react'
import CardBase from '../../common/Card'
import FadeIn from '@/components/common/Animations/FadeIn'

export default function WorkShiftInfo() {
  const todayWorkShifts = useTodayShiftStore((state) => state.todayShifts)

  const totalMs = (todayWorkShifts ?? []).reduce((acc, shift) => {
    if (!shift.start || !shift.end) return acc
    const start = new Date(shift.start).getTime()
    const end = new Date(shift.end).getTime()
    return acc + (end - start)
  }, 0)

  const totalWorked = msToTimeParts(totalMs)
  const formattedDate = getFormattedDate()

  return (
    <FadeIn direction='left' className='h-full'>
      <CardBase title="Informações adicionais:" icon={<Info />}>
        <p className="xl:text-sm text-foreground">{formattedDate}</p>
        <p className="xl:text-sm">
          Turnos realizados hoje:{' '}
          <span className="font-bold text-foreground xl:text-sm">
            {todayWorkShifts?.length === 0
              ? 'Nenhum turno registrado'
              : `${todayWorkShifts?.length} ${todayWorkShifts?.length === 1 ? 'turno' : 'turnos'}`}
          </span>
        </p>
        <p className="xl:text-sm">
          Carga horária realizada no dia:{' '}
          <span className="font-bold text-foreground xl:text-sm">
            {pad(totalWorked.hours)}:{pad(totalWorked.minutes)}:
            {pad(totalWorked.seconds)}
          </span>
        </p>
      </CardBase>
    </FadeIn>
  )
}
