import { TableHead, TableRow } from '@/components/ui/table'
import useMedia from '@/hooks/useMedia'

export function WorkShiftTableHeader() {
  const isDesktop = useMedia('(min-width: 768px)')
  return (
    <TableRow className="uppercase text-xs lg:text-sm">
      <TableHead className="text-center">Data</TableHead>
      <TableHead className="text-center">Entrada</TableHead>
      <TableHead className="text-center">Saída</TableHead>
      {isDesktop && <TableHead className="text-center">Status</TableHead>}
      <TableHead className="text-center">Duração</TableHead>
    </TableRow>
  )
}
