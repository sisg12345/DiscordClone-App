import styles from './Login.module.scss'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase/firebase'
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useRedux'
import { login } from '@/stores/slices/userSlice'
import { useNavigate } from 'react-router'
import Button from '@/components/atoms/buttons/Button'

/**
 * ログインページ
 */
export default function Login() {
  // navigateフック
  const navigate = useNavigate()
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()

  /**
   * Google認証でログイン
   */
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, provider)
  }

  useEffect(() => {
    // 認証状態を監視
    auth.onAuthStateChanged((user) => {
      // 認証されている場合はログイン状態を更新
      if (user) {
        dispatch(
          login({
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        )
        navigate('/')
      }
    })
  }, [dispatch, navigate])

  return (
    <div className={styles.login}>
      <div className={styles.loginLogo}>
        <img src="/discord-image.png" alt="Discord Logo" />
      </div>
      <Button sx={{ textTransform: 'none' }} onClick={handleGoogleSingIn}>
        <img className={styles.googleLogo} src="/google-logo.png" alt="Google Logo" />
        Googleでログイン
      </Button>
    </div>
  )
}
