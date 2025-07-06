import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function useLogout() {
  const navigate = useNavigate()

  return () => {
    localStorage.removeItem('token')
    toast.success('Logout efetuado com sucesso!')
    navigate('/login')
  }
}
