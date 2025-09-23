import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { User, AuthContextType, AuthProviderProps } from '../types'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout, setUser }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Helpers to simulate users with permissions
export const mockUsers = {
  guest: null,
  user: { name: 'Alice', roles: ['user'] } as User,
  admin: { name: 'Bob', roles: ['admin'] } as User,
} as const
