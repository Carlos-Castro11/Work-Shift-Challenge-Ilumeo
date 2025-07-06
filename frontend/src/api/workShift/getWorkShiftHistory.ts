import { api } from '@/lib/axios'
import type { IWorkShift } from '@/types/WorkShift'

export interface GetWorkShiftHistoryParams {
  page?: number
  limit?: number
  filterDateRange?: 'today' | 'last10days' | 'last30days' | 'all'
  month?: string
  status?: 'open' | 'closed' | 'all'
  duration?: '>1h' | '<1h' | '>5h' | '<5h' | 'all'
  startPeriod?: 'morning' | 'afternoon' | 'all'
  endPeriod?: 'morning' | 'afternoon' | 'all'
}

export interface GetWorkShiftHistoryResponse {
  data: IWorkShift[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export async function getWorkShiftHistory(
  params: GetWorkShiftHistoryParams,
): Promise<GetWorkShiftHistoryResponse> {
  const { data } = await api.get<GetWorkShiftHistoryResponse>('/shifts', {
    params,
  })

  return data
}
