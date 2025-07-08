import { TableCell, TableRow } from '@/components/ui/table'
import { useIsDesktopStore } from '@/store/useIsDesktopStore'
import { msToTimeParts, pad } from '@/utils/time'

type Props = {
  id: string
  start: string
  end: string | null
}

export function WorkShiftRow({ id, start, end }: Props) {
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)
  const startDate = new Date(start)
  const endDate = end ? new Date(end) : null
  const durationMs = endDate ? endDate.getTime() - startDate.getTime() : 0
  const { hours, minutes } = msToTimeParts(durationMs)

  return (
    <TableRow key={id} className="text-xs md:text-sm border-muted-foreground">
      <TableCell className="max-w-4 text-center font-secondary">
        {startDate.toLocaleDateString()}
      </TableCell>
      <TableCell className="text-center max-w-4 font-secondary">
        {startDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </TableCell>
      <TableCell className="text-center max-w-4 font-secondary">
        {endDate ? (
          endDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        ) : (
          <span>—</span>
        )}
      </TableCell>
      {isDesktop && (
        <TableCell className="max-w-4 text-center font-secondary">
          <span
            className={`relative after:content-[''] after:absolute after:h-[6px] after:w-[6px] 
          after:-left-4 after:bottom-[3px] after:rounded-full
          ${endDate ? 'after:bg-emerald-500' : 'after:bg-amber-500'}`}>
            {endDate ? 'Finalizado' : 'Em andamento'}
          </span>
        </TableCell>
      )}
      <TableCell className="text-center max-w-4 font-secondary">
        {endDate ? `${pad(hours)}h ${pad(minutes)}min` : '—'}
      </TableCell>
    </TableRow>
  )
}
