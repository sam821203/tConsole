export interface User {
  name: string
  roles: string[]
}

export interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  setUser: (user: User | null) => void
}

export interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: string[]
}

export interface AuthProviderProps {
  children: React.ReactNode
}

export type MockUserType = 'guest' | 'user' | 'admin'
