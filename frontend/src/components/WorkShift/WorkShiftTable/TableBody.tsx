import { TableBody } from '@/components/ui/table'
import { WorkShiftRow } from './TableRow'

type Shift = {
  id: string
  start: string
  end: string | null
}

type Props = {
  shifts: Shift[]
}

export function WorkShiftTableBody({ shifts }: Props) {
  return (
    <TableBody className="border border-transparent border-t-muted-foreground">
      {shifts.map((shift) => (
        <WorkShiftRow key={shift.id} {...shift} />
      ))}
    </TableBody>
  )
}
