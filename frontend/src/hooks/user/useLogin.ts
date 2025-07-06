import { loginRequest } from '@/api/auth/login'
import { useMutation } from '@tanstack/react-query'

export function useLogin() {
  return useMutation({
    mutationFn: loginRequest,
  })
}
