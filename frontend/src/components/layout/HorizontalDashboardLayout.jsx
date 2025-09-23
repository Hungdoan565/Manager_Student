import { AnimatePresence, motion } from 'framer-motion'
import {
    BarChart3,
    Bell,
    BookOpen,
    Calendar,
    Home,
    LogOut,
    Menu,
    Settings,
    User,
    Users,
    X
} from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Avatar from '../ui/Avatar'
import Breadcrumbs from '../ui/Breadcrumbs'
import ThemeToggle from '../ui/ThemeToggle'

const HorizontalDashboardLayout = () => {
  const { profile, signOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const teacherMenuItems = [
    { name: 'Tổng quan', href: '/dashboard', icon: Home },
    { name: 'Sinh viên', href: '/students', icon: Users },
    { name: 'Lớp học', href: '/classes', icon: BookOpen },
    { name: 'Điểm danh', href: '/attendance', icon: Calendar },
    { name: 'Báo cáo', href: '/reports', icon: BarChart3 },
    { name: 'Cài đặt', href: '/settings', icon: Settings }
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SMS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-500">Xin chào, {profile?.fullName || 'Giáo viên'}</p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center space-x-1">
              {teacherMenuItems.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Thông báo">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Enhanced Avatar */}
              <Avatar
                user={profile}
                onSignOut={handleSignOut}
                onSettings={() => navigate('/settings')}
              />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                aria-label="Mở menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 w-80 h-full bg-white shadow-xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">SMS</span>
                    </div>
                    <span className="font-semibold text-gray-900">Menu</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                  {teacherMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.href
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Mobile User Info & Sign Out */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{profile?.fullName || 'Giáo viên'}</p>
                      <p className="text-sm text-gray-500">{profile?.email || 'teacher@example.com'}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        
        <Outlet />
      </main>
    </div>
  )
}

export default HorizontalDashboardLayout
