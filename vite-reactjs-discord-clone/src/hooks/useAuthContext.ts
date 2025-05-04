import type { AuthContextType } from '@/contexts/AuthContext'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

/**
 * 認証コンテキストを取得するフック
 */
export const useAuthContext = () => useContext<AuthContextType>(AuthContext)
