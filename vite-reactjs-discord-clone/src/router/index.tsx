import App from '@/App'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/Channels')),
      },
      {
        path: '/login',
        Component: lazy(() => import('@/pages/Login')),
      },
      {
        path: '*',
        Component: lazy(() => import('@/pages/NotFound')),
      },
    ],
  },
])
