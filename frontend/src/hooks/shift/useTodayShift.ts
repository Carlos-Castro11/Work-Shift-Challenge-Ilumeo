import { getTodayShift } from '@/api/workShift/getTodayShift'
import type { IWorkShift } from '@/types/WorkShift'
import { useQuery } from '@tanstack/react-query'

export function useTodayShifts() {
  const token = localStorage.getItem('token')
  return useQuery<IWorkShift[]>({
    queryKey: ['today-shifts'],
    queryFn: getTodayShift,
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
