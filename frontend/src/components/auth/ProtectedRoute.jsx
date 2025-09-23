import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

// Protected Route Component
export const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermission = null,
  fallback = null 
}) => {
  const { isAuthenticated, profile, isLoading } = useAuthStore()
  const location = useLocation()

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role requirement
  if (requiredRole && profile?.role !== requiredRole) {
    return fallback || <AccessDenied />
  }

  // Check permission requirement
  if (requiredPermission && !useAuthStore.getState().hasPermission(requiredPermission)) {
    return fallback || <AccessDenied />
  }

  return children
}

// Teacher Only Route
export const TeacherRoute = ({ children, fallback = null }) => {
  return (
    <ProtectedRoute requiredRole="teacher" fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
}

// Student Only Route
export const StudentRoute = ({ children, fallback = null }) => {
  return (
    <ProtectedRoute requiredRole="student" fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
}

// Permission-based Route
export const PermissionRoute = ({ permission, children, fallback = null }) => {
  return (
    <ProtectedRoute requiredPermission={permission} fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
}

// Access Denied Component
const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Truy cập bị từ chối
        </h1>
        
        <p className="text-gray-600 mb-6">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Quay lại
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}

// Auth Guard Hook
export const useAuthGuard = () => {
  const { isAuthenticated, profile, isLoading, hasPermission } = useAuthStore()

  const checkAuth = () => {
    if (isLoading) return { loading: true }
    if (!isAuthenticated) return { authenticated: false }
    return { authenticated: true, user: profile }
  }

  const checkRole = (requiredRole) => {
    const auth = checkAuth()
    if (!auth.authenticated) return false
    return profile?.role === requiredRole
  }

  const checkPermission = (permission) => {
    const auth = checkAuth()
    if (!auth.authenticated) return false
    return hasPermission(permission)
  }

  return {
    checkAuth,
    checkRole,
    checkPermission,
    isAuthenticated,
    profile,
    isLoading
  }
}

// Conditional Render Component
export const ConditionalRender = ({ 
  condition, 
  children, 
  fallback = null,
  role = null,
  permission = null 
}) => {
  const { profile, hasPermission } = useAuthStore()

  // Check role condition
  if (role && profile?.role !== role) {
    return fallback
  }

  // Check permission condition
  if (permission && !hasPermission(permission)) {
    return fallback
  }

  // Check custom condition
  if (condition !== undefined && !condition) {
    return fallback
  }

  return children
}

// Role-based Component Renderer
export const RoleRenderer = ({ 
  teacher: TeacherComponent, 
  student: StudentComponent,
  fallback = null 
}) => {
  const { profile } = useAuthStore()

  if (profile?.role === 'teacher' && TeacherComponent) {
    return <TeacherComponent />
  }

  if (profile?.role === 'student' && StudentComponent) {
    return <StudentComponent />
  }

  return fallback
}

// Permission-based Component Renderer
export const PermissionRenderer = ({ 
  permission, 
  children, 
  fallback = null 
}) => {
  const { hasPermission } = useAuthStore()

  if (hasPermission(permission)) {
    return children
  }

  return fallback
}

export default ProtectedRoute
