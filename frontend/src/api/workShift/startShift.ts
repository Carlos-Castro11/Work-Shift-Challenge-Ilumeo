import { api } from '@/lib/axios'
import type { IWorkShift } from '@/types/WorkShift'

export async function startShift(): Promise<IWorkShift> {
  const res = await api.post('/shifts/start')
  return res.data
}
