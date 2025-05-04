import { Outlet } from 'react-router'
import styles from './App.module.scss'
import useAuthGuard from './hooks/useAuthGuard'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/pages/ErrorFallback'

function App() {
  // 認証ガード
  useAuthGuard()

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className={styles.App}>
          <Outlet />
        </div>
      </ErrorBoundary>
    </>
  )
}

export default App
