import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginForm from '../features/auth/components/LoginForm'
import RegisterForm from '../features/auth/components/RegisterForm'
import { RootState } from './store'
import { useRestoreSession } from '../features/auth/hooks/useAuth'
import ArticleList from '../features/articles/components/ArticleList'
import LoadingScreen from '@/components/LoadingScreen'
import ArticleDetail from '@/features/articles/components/ArticleDetail'
import ArticleByCategoryDetail from '@/features/articles/components/ArticleByCategoryDetail'

// A higher-order component to handle protected routes.
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isSessionChecked = useSelector((state: RootState) => state.auth.isSessionChecked)
  const isLoading = useSelector((state: RootState) => state.ui.isLoading)

  // Show a loading screen if the session status is not checked or app is loading.
  if (isLoading || !isSessionChecked) {
    return <LoadingScreen />
  }

  // Redirect unauthenticated users to the login page.
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

// A higher-order component to handle routes for unauthenticated users.
const AuthRedirectRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isSessionChecked = useSelector((state: RootState) => state.auth.isSessionChecked)

  // Show a loading screen if the session status is not checked.
  if (!isSessionChecked) {
    return <LoadingScreen />
  }

  // Redirect authenticated users to the articles page.
  return isAuthenticated ? <Navigate to="/articles" /> : <>{children}</>
}

// Main application routes.
const AppRoutes: React.FC = () => {
  // Restore the user session when the app is initialized.
  useRestoreSession()

  return (
    <Routes>
      {/* Default route redirects to articles or login based on authentication */}
      <Route
        path="/"
        element={
          <AuthRedirectRoute>
            <Navigate to="/articles" />
          </AuthRedirectRoute>
        }
      />

      {/* Login route accessible only for unauthenticated users */}
      <Route
        path="/login"
        element={
          <AuthRedirectRoute>
            <LoginForm />
          </AuthRedirectRoute>
        }
      />

      {/* Register route accessible only for unauthenticated users */}
      <Route
        path="/register"
        element={
          <AuthRedirectRoute>
            <RegisterForm />
          </AuthRedirectRoute>
        }
      />

      {/* Articles list route accessible only for authenticated users */}
      <Route
        path="/articles"
        element={
          <ProtectedRoute>
            <ArticleList />
          </ProtectedRoute>
        }
      />

      {/* Article detail route accessible only for authenticated users */}
      <Route
        path="/articles/:id"
        element={
          <ProtectedRoute>
            <ArticleDetail />
          </ProtectedRoute>
        }
      />

      {/* Articles by category detail route accessible only for authenticated users */}
      <Route
        path="/articles/categories/:id"
        element={
          <ProtectedRoute>
            <ArticleByCategoryDetail />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route redirects to default route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
