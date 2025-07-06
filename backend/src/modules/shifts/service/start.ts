import type { IWorkShiftRepository } from '../repository/workShift.repository'

export const start = async (
  userId: string,
  workShiftRepository: IWorkShiftRepository,
) => {
  const openShift =
    await workShiftRepository.findLastOpenWorkShiftByUser(userId)

  if (openShift) {
    throw new Error(
      'Você já possui um turno em aberto. Finalize-o antes de iniciar outro.',
    )
  }

  const newShift = await workShiftRepository.createWorkShift(userId)

  return newShift
}
