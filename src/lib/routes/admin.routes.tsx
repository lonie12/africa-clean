// src/lib/routes/admin.routes.tsx
// src/lib/routes/admin.routes.tsx
import type { RouteObject } from 'react-router';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import AdminPage from '../../pages/admin';
import AuthPage from '../../pages/auth';

export const adminRoutes: RouteObject = {
  path: '/admin',
  element: (
    <ProtectedRoute requireAdmin={true}>
      <AdminPage />
    </ProtectedRoute>
  ),
};

export const authRoutes: RouteObject = {
  path: '/auth',
  element: <AuthPage />,
};