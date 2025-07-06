import { api } from '@/lib/axios'
import type { IWorkShift } from '@/types/WorkShift'

export async function getTodayShift(): Promise<IWorkShift[]> {
  const res = await api.get('/shifts/today')
  return res.data
}
