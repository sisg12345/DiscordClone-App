import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { auth } from '@/lib/firebase/firebase'
import { logout } from '@/stores/slices/userSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

/**
 * 認証ガード
 *
 * @param directTo 遷移先URL
 */
export default function useAuthGuard(redirectTo: string = '/login') {
  // navigateフック
  const navigate = useNavigate()
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()
  // Reduxからユーザー情報を取得
  const userState = useAppSelector((state) => state.user)

  useEffect(() => {
    // ユーザー情報が存在しない場合はログアウトしてログイン画面に遷移
    if (userState.id == null) {
      dispatch(logout())
      navigate(redirectTo)
    }

    // 認証状態を監視
    auth.onAuthStateChanged((user) => {
      // 認証されていない場合はログアウトしてログイン画面に遷移
      if (user == null) {
        dispatch(logout())
        navigate(redirectTo)
      }
    })
  }, [dispatch, navigate, redirectTo, userState])
}
