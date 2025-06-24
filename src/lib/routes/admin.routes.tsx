// src/lib/routes/admin.routes.tsx
import { lazy } from 'react'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const AdminPage = lazy(() => import('../../pages/admin'))
const AuthPage = lazy(() => import('../../pages/auth'))

export const adminRoutes = {
  path: '/admin',
  element: (
    <ProtectedRoute requireAdmin={true}>
      <AdminPage />
    </ProtectedRoute>
  ),
}

export const authRoutes = {
  path: '/auth',
  children: [
    {
      path: 'login',
      element: <AuthPage />,
    },
    {
      path: '',
      element: <AuthPage />, // Redirect /auth to /auth/login
    },
  ],
}