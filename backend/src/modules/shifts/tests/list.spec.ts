import { describe, expect, it, vi } from 'vitest'
import type { ListShiftsDTO } from '@/types/dtos/listShift.dto'
import type { IWorkShiftRepository } from '../repository/workShift.repository'
import { list } from '../service/list'

describe('list work shifts service', () => {
  const mockRepo = {
    getWorkShiftsByUserWithFilters: vi.fn(),
  } as unknown as IWorkShiftRepository

  const userId = 'user-123'

  it('deve retornar os turnos com paginação', async () => {
    const filters: ListShiftsDTO = {
      page: 2,
      limit: 5,
      filter: 'month',
      month: '2025-07',
    }

    const mockData = {
      workShifts: [{ id: 'shift-1' }, { id: 'shift-2' }],
      total: 20,
    }

    mockRepo.getWorkShiftsByUserWithFilters = vi
      .fn()
      .mockResolvedValue(mockData)

    const result = await list(userId, filters, mockRepo)

    expect(mockRepo.getWorkShiftsByUserWithFilters).toHaveBeenCalledWith(
      userId,
      filters,
    )
    expect(result).toEqual({
      data: mockData.workShifts,
      pagination: {
        currentPage: 2,
        limit: 5,
        total: 20,
        totalPages: 4,
      },
    })
  })

  it('deve usar valores padrão se filtros não tiverem page e limit', async () => {
    const filters: ListShiftsDTO = {
      page: 1,
      limit: 10,
    }

    const mockData = {
      workShifts: [],
      total: 0,
    }

    mockRepo.getWorkShiftsByUserWithFilters = vi
      .fn()
      .mockResolvedValue(mockData)

    const result = await list(userId, filters, mockRepo)

    expect(result.pagination.currentPage).toBe(1)
    expect(result.pagination.limit).toBe(10)
    expect(result.pagination.totalPages).toBe(0)
  })
})
