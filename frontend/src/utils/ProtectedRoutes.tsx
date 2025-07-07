import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoutes() {
  const token = localStorage.getItem('token')

  const isValidToken = token && token !== 'undefined' && token.trim().length > 0

  if (!isValidToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
