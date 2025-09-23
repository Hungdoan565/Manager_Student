import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function AppInitializer({ children }) {
  const checkAuth = useAuthStore(s => s.checkAuth)
  const isLoading = useAuthStore(s => s.isLoading)

  useEffect(() => {
    // Initialize authentication state once on app boot
    checkAuth()
  }, [checkAuth])

  // Optional initial splash while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    )
  }

  return children
}
