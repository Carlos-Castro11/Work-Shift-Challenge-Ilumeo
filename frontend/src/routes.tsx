import type { RouteObject } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import DefaultLayout from './pages/layouts/Default'
import { ProtectedRoutes } from './utils/ProtectedRoutes'

export function getRoutes(): RouteObject[] {
  return [
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/',
          element: <DefaultLayout />,
          children: [
            { index: true, element: <Home /> },
            { path: '/profile', element: <Profile /> },
            { path: '*', element: <NotFound /> },
          ],
        },
      ],
    },
  ]
}
