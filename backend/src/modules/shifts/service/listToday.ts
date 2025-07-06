import type { IWorkShiftRepository } from '../repository/workShift.repository'

export const listToday = async (
  userId: string,
  workShiftRepository: IWorkShiftRepository,
) => {
  const response = await workShiftRepository.findAllTodayWorkShift(userId)

  return response
}
