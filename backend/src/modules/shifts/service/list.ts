import type { ListShiftsDTO } from '@/types/dtos/listShift.dto'
import type { IWorkShiftRepository } from '../repository/workShift.repository'

export const list = async (
  userId: string,
  filters: ListShiftsDTO,
  workShiftRepository: IWorkShiftRepository,
) => {
  const { page = 1, limit = 10 } = filters

  const { workShifts, total, hasMore } =
    await workShiftRepository.getWorkShiftsByUserWithFilters(userId, filters)

  const totalPages = Math.ceil(total / limit)

  return {
    data: workShifts,
    pagination: {
      currentPage: page,
      limit,
      total,
      totalPages,
      hasMore,
    },
  }
}
