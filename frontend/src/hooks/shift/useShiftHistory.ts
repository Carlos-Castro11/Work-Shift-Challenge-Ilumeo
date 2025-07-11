import { getWorkShiftHistory } from '@/api/workShift/getWorkShiftHistory'
import type {
  GetWorkShiftHistoryParams,
  GetWorkShiftHistoryResponse,
} from '@/api/workShift/getWorkShiftHistory'
import { useQuery } from '@tanstack/react-query'

export function useWorkShiftHistory(params: GetWorkShiftHistoryParams) {
  const token = localStorage.getItem('token')

  return useQuery<GetWorkShiftHistoryResponse, Error>({
    queryKey: ['work-shifts-history', params],
    queryFn: () => getWorkShiftHistory(params),
    enabled: !!token,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  })
}
