import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'users',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute roles={['admin']}>
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '*', element: <Navigate to="/" /> },
])
