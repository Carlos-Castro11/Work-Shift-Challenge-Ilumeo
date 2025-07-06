import type { Prisma, WorkShift } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ListShiftsDTO } from '@/types/dtos/listShift.dto'

export interface IWorkShiftRepository {
  getWorkShiftsByUserWithFilters(
    userId: string,
    filters: ListShiftsDTO,
  ): Promise<{
    workShifts: WorkShift[]
    total: number
    hasMore: boolean
  }>
  findLastOpenWorkShiftByUser(userId: string): Promise<WorkShift | null>
  createWorkShift(userId: string): Promise<WorkShift>
  endWorkShift(id: string): Promise<WorkShift>
  findAllTodayWorkShift(userId: string): Promise<WorkShift[]>
}

export const workShiftRepository: IWorkShiftRepository = {
  getWorkShiftsByUserWithFilters: async (
    userId,
    {
      page = 1,
      limit = 10,
      filterDateRange,
      month,
      status,
      duration,
      startPeriod,
      endPeriod,
    },
  ) => {
    const skip = (page - 1) * limit
    const now = new Date()

    const where: Prisma.WorkShiftWhereInput = { userId }
    const andFilters: Prisma.WorkShiftWhereInput[] = []

    if (filterDateRange === 'today') {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      const end = new Date()
      end.setHours(23, 59, 59, 999)
      andFilters.push({ start: { gte: start, lte: end } })
    }

    if (filterDateRange === 'last10days') {
      const from = new Date()
      from.setDate(now.getDate() - 10)
      andFilters.push({ start: { gte: from, lte: now } })
    }

    if (filterDateRange === 'last30days') {
      const from = new Date()
      from.setDate(now.getDate() - 30)
      andFilters.push({ start: { gte: from, lte: now } })
    }

    if (month) {
      const [year, monthStr] = month.split('-')
      const startDate = new Date(Number(year), Number(monthStr) - 1, 1)
      const endDate = new Date(Number(year), Number(monthStr), 0, 23, 59, 59)
      andFilters.push({ start: { gte: startDate, lte: endDate } })
    }

    if (status === 'open') {
      andFilters.push({ end: null })
    } else if (status === 'closed') {
      andFilters.push({ end: { not: null } })
    }

    if (andFilters.length > 0) {
      where.AND = andFilters
    }

    let all = await prisma.workShift.findMany({
      where,
      orderBy: { start: 'desc' },
    })

    if (startPeriod && startPeriod !== 'all') {
      all = all.filter((shift) => {
        const hour = new Date(shift.start).getHours()
        return startPeriod === 'morning' ? hour < 12 : hour >= 12
      })
    }

    if (endPeriod && endPeriod !== 'all') {
      all = all.filter((shift) => {
        if (!shift.end) return false
        const hour = new Date(shift.end).getHours()
        return endPeriod === 'morning' ? hour < 12 : hour >= 12
      })
    }

    if (duration && duration !== 'all') {
      const thresholds: Record<string, number> = {
        '>1h': 1 * 60 * 60 * 1000,
        '<1h': 1 * 60 * 60 * 1000,
        '>5h': 5 * 60 * 60 * 1000,
        '<5h': 5 * 60 * 60 * 1000,
      }

      all = all.filter((shift) => {
        if (!shift.end) return false
        const diff =
          new Date(shift.end).getTime() - new Date(shift.start).getTime()
        const threshold = thresholds[duration]
        return duration.startsWith('>') ? diff > threshold : diff < threshold
      })
    }

    const paginated = all.slice(skip, skip + limit)

    return {
      workShifts: paginated,
      total: all.length,
      hasMore: all.length > page * limit,
    }
  },

  findLastOpenWorkShiftByUser: async (userId) => {
    return prisma.workShift.findFirst({
      where: { userId, end: null },
      orderBy: { start: 'desc' },
    })
  },

  createWorkShift: async (userId) => {
    return prisma.workShift.create({
      data: {
        userId,
        start: new Date(),
      },
    })
  },

  endWorkShift: async (id) => {
    return prisma.workShift.update({
      where: { id },
      data: { end: new Date() },
    })
  },

  findAllTodayWorkShift: async (userId) => {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    return prisma.workShift.findMany({
      where: {
        userId,
        start: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        start: 'asc',
      },
    })
  },
}
