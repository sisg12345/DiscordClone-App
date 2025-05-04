import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'sanitize.css'
import './index.css'
import { persistor, store } from '@/stores'
import { Provider } from 'react-redux'
import { router } from '@/router'
import { RouterProvider } from 'react-router'
import AuthProvider from '@/contexts/AuthContext.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { PersistGate } from 'redux-persist/es/integration/react'
import ErrorFallback from './pages/ErrorFallback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
