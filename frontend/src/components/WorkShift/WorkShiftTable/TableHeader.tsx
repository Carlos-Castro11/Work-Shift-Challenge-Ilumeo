import { TableHead, TableRow } from '@/components/ui/table'
import { useIsDesktopStore } from '@/store/useIsDesktopStore'

export function WorkShiftTableHeader() {
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)
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
