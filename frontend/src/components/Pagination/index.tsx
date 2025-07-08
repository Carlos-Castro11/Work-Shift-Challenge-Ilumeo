import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '../ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs md:text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-xs md:text-sm font-medium text-muted-foreground">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            variant="outline"
            className="h-7 w-7 md:h-8 md:w-8 p-0 text-foreground"
            disabled={pageIndex === 0}>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            variant="outline"
            className="h-7 w-7 md:h-8 md:w-8 p-0 text-foreground"
            disabled={pageIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            variant="outline"
            className="h-7 w-7 md:h-8 md:w-8 p-0 text-foreground"
            disabled={pages <= pageIndex + 1}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            onClick={() => onPageChange(pages - 1)}
            variant="outline"
            className="h-7 w-7 md:h-8 md:w-8 p-0 text-foreground"
            disabled={pages <= pageIndex + 1}>
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
