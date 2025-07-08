import { Pagination } from '@/components/Pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableHeader } from '@/components/ui/table'
import { useWorkShiftHistory } from '@/hooks/shift/useShiftHistory'
import { getValidParam } from '@/utils/getValidParams'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import FadeIn from '@/components/common/Animations/FadeIn'
import {
  dateOptions,
  durationOptions,
  periodOptions,
  statusOptions,
} from '@/constants/workShiftFilters'
import { useIsDesktopStore } from '@/store/useIsDesktopStore'
import { WorkShiftTableFilter } from './Filters'
import { FiltersMobile } from './FiltersMobile'
import { WorkShiftTableBody } from './TableBody'
import { WorkShiftTableHeader } from './TableHeader'

export function WorkShiftTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isDesktop = useIsDesktopStore((state) => state.isDesktop)

  const rawPage = searchParams.get('page')
  const parsedPage = Number(rawPage)
  const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage

  const filterDateRange = getValidParam(
    searchParams.get('filterDateRange'),
    dateOptions,
    'all',
  )
  const status = getValidParam(searchParams.get('status'), statusOptions, 'all')
  const duration = getValidParam(
    searchParams.get('duration'),
    durationOptions,
    'all',
  )
  const startPeriod = getValidParam(
    searchParams.get('startPeriod'),
    periodOptions,
    'all',
  )
  const endPeriod = getValidParam(
    searchParams.get('endPeriod'),
    periodOptions,
    'all',
  )
  const month = searchParams.get('month') ?? undefined

  const { data, isLoading } = useWorkShiftHistory({
    page,
    filterDateRange,
    status,
    duration,
    startPeriod,
    endPeriod,
    month,
  })

  const shifts = data?.data ?? []
  const pagination = data?.pagination
  useEffect(() => {
    if (!pagination) return

    const totalPages = Math.ceil(pagination.total / pagination.limit)
    if (page > totalPages && totalPages > 0) {
      setSearchParams((params) => {
        params.set('page', String(totalPages))
        return params
      })
    }
  }, [pagination, page, setSearchParams])

  const shouldShowEmpty = !isLoading && shifts.length === 0

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    )
  }

  if (shouldShowEmpty) {
    return (
      <p className="text-muted-foreground font-secondary text-xs md:text-sm">
        Nenhum turno registrado no período solicitado.
      </p>
    )
  }

  return (
    <FadeIn direction="bottom" className="space-y-5">
      {isDesktop ? <WorkShiftTableFilter /> : <FiltersMobile />}
      <div className="text-foreground rounded-md border border-border-foreground">
        <Table>
          <TableHeader>
            <WorkShiftTableHeader />
          </TableHeader>
          <WorkShiftTableBody shifts={shifts} />
        </Table>
      </div>

      {pagination && (
        <Pagination
          pageIndex={page - 1}
          totalCount={pagination.total}
          perPage={pagination.limit}
          onPageChange={(newIndex) => {
            setSearchParams((params) => {
              params.set('page', String(newIndex + 1))
              return params
            })
          }}
        />
      )}
    </FadeIn>
  )
}
