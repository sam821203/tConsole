import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = ({ name, roles = [] }) => {
    setUser({ name, roles })
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout, setUser }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Helpers to simulate users with permissions
export const mockUsers = {
  guest: null,
  user: { name: 'Alice', roles: ['user'] },
  admin: { name: 'Bob', roles: ['admin'] },
}


