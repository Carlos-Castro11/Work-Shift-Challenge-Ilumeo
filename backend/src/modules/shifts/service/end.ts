import type { IWorkShiftRepository } from '../repository/workShift.repository'

export const end = async (
  userId: string,
  workShiftRepository: IWorkShiftRepository,
) => {
  const openShift =
    await workShiftRepository.findLastOpenWorkShiftByUser(userId)

  if (!openShift) {
    throw new Error('Não existe nenhum turno em aberto para o seu usuário.')
  }

  const updatedShift = await workShiftRepository.endWorkShift(openShift.id)
  return updatedShift
}
