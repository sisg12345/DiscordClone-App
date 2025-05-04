import { createContext, PropsWithChildren, useState } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

/**
 * 認証コンテキスト
 */
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

/**
 * 認証コンテキストプロバイダー
 */
export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
