// src/api/auth.ts
import { api } from '@/lib/axios'
import type { IUser } from '@/types/User'

export async function getMe(): Promise<IUser> {
  const res = await api.get('/users/me')

  if (!res.data) throw new Error('Não autenticado')

  return res.data
}
