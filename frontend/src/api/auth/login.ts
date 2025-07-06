import { api } from '@/lib/axios'
import type { LoginSchema } from '@/schemas/login.schema'

export async function loginRequest(data: LoginSchema) {
  const response = await api.post('/users/login', data)
  return response.data
}
