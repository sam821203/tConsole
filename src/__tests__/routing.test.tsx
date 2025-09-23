import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Admin from '../pages/Admin'
import Login from '../pages/Login'
import ProtectedRoute from '../routes/ProtectedRoute'
import { AuthProvider } from '../context/AuthContext'
import { User } from '../types'

function renderWithRouter(initialEntries: string[] = ['/'], user: User | null = null) {
  const routes = [
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
  ]

  const router = createMemoryRouter(routes, { initialEntries })

  return render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

describe('Protected routes', () => {
  it('redirects unauthenticated to login', async () => {
    renderWithRouter(['/admin'])
    expect(await screen.findByRole('heading', { name: /Login/i })).toBeInTheDocument()
  })

  it('shows dashboard after logging in from Login page', async () => {
    renderWithRouter(['/login'])
    const loginUserBtn = await screen.findByRole('button', { name: /Login as User/i })
    loginUserBtn.click()
    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument()
  })
})
