import type { Prisma, WorkShift } from '@prisma/client'

export function buildDateFilters(
  filterDateRange?: string,
): Prisma.WorkShiftWhereInput[] {
  const now = new Date()
  const filters: Prisma.WorkShiftWhereInput[] = []

  if (filterDateRange === 'today') {
    const start = new Date(now)
    start.setHours(0, 0, 0, 0)
    const end = new Date(now)
    end.setHours(23, 59, 59, 999)
    filters.push({ start: { gte: start, lte: end } })
  }

  if (filterDateRange === 'last10days') {
    const from = new Date(now)
    from.setDate(now.getDate() - 10)
    filters.push({ start: { gte: from, lte: now } })
  }

  if (filterDateRange === 'last30days') {
    const from = new Date(now)
    from.setDate(now.getDate() - 30)
    filters.push({ start: { gte: from, lte: now } })
  }

  return filters
}

export function buildMonthFilter(month?: string): Prisma.WorkShiftWhereInput[] {
  if (!month) return []

  const [year, monthStr] = month.split('-')
  const start = new Date(Number(year), Number(monthStr) - 1, 1)
  const end = new Date(Number(year), Number(monthStr), 0, 23, 59, 59)

  return [{ start: { gte: start, lte: end } }]
}

export function buildStatusFilter(
  status?: string,
): Prisma.WorkShiftWhereInput[] {
  if (status === 'open') return [{ end: null }]
  if (status === 'closed') return [{ end: { not: null } }]
  return []
}

export function applyPeriodFilters(
  shifts: WorkShift[],
  startPeriod?: string,
  endPeriod?: string,
): WorkShift[] {
  return shifts.filter((shift) => {
    const startHour = new Date(shift.start).getHours()
    const endHour = shift.end ? new Date(shift.end).getHours() : null

    const startOk =
      startPeriod === 'all' || !startPeriod
        ? true
        : startPeriod === 'morning'
          ? startHour < 12
          : startHour >= 12

    const endOk =
      endPeriod === 'all' || !endPeriod
        ? true
        : !endHour
          ? false
          : endPeriod === 'morning'
            ? endHour < 12
            : endHour >= 12

    return startOk && endOk
  })
}

export function applyDurationFilter(
  shifts: WorkShift[],
  duration?: string,
): WorkShift[] {
  if (!duration || duration === 'all') return shifts

  const thresholds: Record<string, number> = {
    '>1h': 1 * 60 * 60 * 1000,
    '<1h': 1 * 60 * 60 * 1000,
    '>5h': 5 * 60 * 60 * 1000,
    '<5h': 5 * 60 * 60 * 1000,
  }

  return shifts.filter((shift) => {
    if (!shift.end) return false
    const diff = new Date(shift.end).getTime() - new Date(shift.start).getTime()
    const threshold = thresholds[duration]
    return duration.startsWith('>') ? diff > threshold : diff < threshold
  })
}
