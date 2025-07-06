import { describe, expect, it, vi } from 'vitest'
import type { IWorkShiftRepository } from '../repository/workShift.repository'
import { listToday } from '../service/listToday'

describe('listToday work shifts service', () => {
  const mockRepo = {
    findAllTodayWorkShift: vi.fn(),
  } as unknown as IWorkShiftRepository

  const userId = 'user-123'

  it('deve retornar os turnos de hoje do usuário', async () => {
    const mockShifts = [
      { id: 'shift-1', start: new Date(), end: null },
      { id: 'shift-2', start: new Date(), end: new Date() },
    ]

    mockRepo.findAllTodayWorkShift = vi.fn().mockResolvedValue(mockShifts)

    const result = await listToday(userId, mockRepo)

    expect(mockRepo.findAllTodayWorkShift).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockShifts)
  })

  it('deve retornar array vazio se não houver turnos de hoje', async () => {
    mockRepo.findAllTodayWorkShift = vi.fn().mockResolvedValue([])

    const result = await listToday(userId, mockRepo)

    expect(result).toEqual([])
    expect(mockRepo.findAllTodayWorkShift).toHaveBeenCalledWith(userId)
  })
})
