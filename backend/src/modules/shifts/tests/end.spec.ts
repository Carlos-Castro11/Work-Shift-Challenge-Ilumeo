import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IWorkShiftRepository } from '../repository/workShift.repository'
import { end } from '../service/end'

describe('end work shift service', () => {
  let mockRepo: IWorkShiftRepository
  const userId = 'user-123'

  beforeEach(() => {
    mockRepo = {
      findLastOpenWorkShiftByUser: vi.fn(),
      endWorkShift: vi.fn(),
      getWorkShiftsByUserWithFilters: vi.fn(),
      createWorkShift: vi.fn(),
      findAllTodayWorkShift: vi.fn(),
    }
  })

  it('deve finalizar um turno em aberto com sucesso', async () => {
    const mockShift = { id: 'shift-1', userId, start: new Date(), end: null }

    mockRepo.findLastOpenWorkShiftByUser = vi.fn().mockResolvedValue(mockShift)

    const endedShift = { ...mockShift, end: new Date() }
    mockRepo.endWorkShift = vi.fn().mockResolvedValue(endedShift)

    const result = await end(userId, mockRepo)

    expect(mockRepo.findLastOpenWorkShiftByUser).toHaveBeenCalledWith(userId)
    expect(mockRepo.endWorkShift).toHaveBeenCalledWith(mockShift.id)
    expect(result).toEqual(endedShift)
  })

  it('deve lançar erro se não houver turno em aberto', async () => {
    mockRepo.findLastOpenWorkShiftByUser = vi.fn().mockResolvedValue(null)

    const exec = () => end(userId, mockRepo)

    await expect(exec).rejects.toThrow(
      'Não existe nenhum turno em aberto para o seu usuário.',
    )

    expect(mockRepo.endWorkShift).not.toHaveBeenCalled()
  })
})
