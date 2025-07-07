import type { WorkShift } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ListShiftsDTO } from '@/types/dtos/listShift.dto'
import {
  applyDurationFilter,
  applyPeriodFilters,
  buildDateFilters,
  buildMonthFilter,
  buildStatusFilter,
} from './filters/buildFilters'

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
  getWorkShiftsByUserWithFilters: async (userId, filters) => {
    const {
      page = 1,
      limit = 10,
      filterDateRange,
      month,
      status,
      duration,
      startPeriod,
      endPeriod,
    } = filters

    const skip = (page - 1) * limit

    const where = {
      userId,
      AND: [
        ...buildDateFilters(filterDateRange),
        ...buildMonthFilter(month),
        ...buildStatusFilter(status),
      ],
    }

    let all = await prisma.workShift.findMany({
      where,
      orderBy: { start: 'desc' },
    })

    all = applyPeriodFilters(all, startPeriod, endPeriod)
    all = applyDurationFilter(all, duration)

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
