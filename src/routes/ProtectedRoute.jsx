import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && roles.length > 0) {
    const hasRole = user.roles?.some((r) => roles.includes(r))
    if (!hasRole) {
      return <Navigate to="/" replace />
    }
  }

  return children
}


