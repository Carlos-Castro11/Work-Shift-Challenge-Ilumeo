import { api } from '@/lib/axios'
import type { IWorkShift } from '@/types/WorkShift'

export async function endShift(): Promise<IWorkShift> {
  const res = await api.patch('/shifts/end')
  return res.data
}
