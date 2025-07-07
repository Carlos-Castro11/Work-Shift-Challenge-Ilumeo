import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IWorkShiftRepository } from '../repository/workShift.repository'
import { start } from '../service/start'

describe('start work shift service', () => {
  let mockRepo: IWorkShiftRepository
  const userId = 'user-123'

  beforeEach(() => {
    mockRepo = {
      findLastOpenWorkShiftByUser: vi.fn(),
      createWorkShift: vi.fn(),
      endWorkShift: vi.fn(),
      getWorkShiftsByUserWithFilters: vi.fn(),
      findAllTodayWorkShift: vi.fn(),
    }
  })

  it('deve iniciar um novo turno se não houver turno em aberto', async () => {
    mockRepo.findLastOpenWorkShiftByUser = vi.fn().mockResolvedValue(null)

    const mockCreatedShift = {
      id: 'shift-1',
      userId,
      start: new Date(),
      end: null,
    }

    mockRepo.createWorkShift = vi.fn().mockResolvedValue(mockCreatedShift)

    const result = await start(userId, mockRepo)

    expect(mockRepo.findLastOpenWorkShiftByUser).toHaveBeenCalledWith(userId)
    expect(mockRepo.createWorkShift).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockCreatedShift)
  })

  it('deve lançar erro se já existir um turno em aberto', async () => {
    const openShift = {
      id: 'turno-aberto',
      userId,
      start: new Date(),
      end: null,
    }

    mockRepo.findLastOpenWorkShiftByUser = vi.fn().mockResolvedValue(openShift)
    mockRepo.createWorkShift = vi.fn()

    const exec = () => start(userId, mockRepo)

    await expect(exec).rejects.toThrow(
      'Você já possui um turno em aberto. Finalize-o antes de iniciar outro.',
    )

    expect(mockRepo.createWorkShift).not.toHaveBeenCalled()
  })
})
