import { getMe } from '@/api/auth/getMe'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useUserQuery() {
  const token = localStorage.getItem('token')
  const shouldFetch = !!token && token !== 'undefined' && token.trim() !== ''
  const navigate = useNavigate()

  const query = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: shouldFetch,
  })

  useEffect(() => {
    if (
      query.isError &&
      axios.isAxiosError(query.error) &&
      query.error.response?.status === 401
    ) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }, [query.isError, query.error, navigate])

  return query
}
