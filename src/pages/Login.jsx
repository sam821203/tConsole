import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth, mockUsers } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { login } = useAuth()

  const handleLogin = (kind) => {
    login(kind === 'admin' ? mockUsers.admin : mockUsers.user)
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h2>Login</h2>
      <Button onClick={() => handleLogin('user')} style={{ marginRight: 8 }}>Login as User</Button>
      <Button type="primary" onClick={() => handleLogin('admin')}>Login as Admin</Button>
    </div>
  )
}


