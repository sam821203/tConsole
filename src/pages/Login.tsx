import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth, mockUsers } from '../context/AuthContext'
import { MockUserType } from '../types'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { login } = useAuth()

  const handleLogin = (kind: MockUserType) => {
    const userToLogin = kind === 'admin' ? mockUsers.admin : mockUsers.user
    if (userToLogin) {
      login(userToLogin)
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <Button 
            onClick={() => handleLogin('user')} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Login as User
          </Button>
          <Button 
            type="primary" 
            onClick={() => handleLogin('admin')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Login as Admin
          </Button>
        </div>
      </div>
    </div>
  )
}
