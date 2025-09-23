import { motion } from 'framer-motion'
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
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const DashboardLayout = () => {
  const { profile, signOut } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const isTeacher = profile?.role === 'teacher'

  const teacherMenuItems = [
    { name: 'Tổng quan', href: '/dashboard', icon: Home },
    { name: 'Sinh viên', href: '/students', icon: Users },
    { name: 'Lớp học', href: '/classes', icon: BookOpen },
    { name: 'Điểm danh', href: '/attendance', icon: Calendar },
    { name: 'Báo cáo', href: '/reports', icon: BarChart3 },
    { name: 'Cài đặt', href: '/settings', icon: Settings }
  ]

  const studentMenuItems = [
    { name: 'Tổng quan', href: '/dashboard', icon: Home },
    { name: 'Lịch học', href: '/schedule', icon: Calendar },
    { name: 'Điểm danh', href: '/attendance', icon: Calendar },
    { name: 'Thông tin', href: '/profile', icon: User }
  ]

  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems

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
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isTeacher 
                  ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                <span className="text-white font-bold text-sm">SMS</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {isTeacher ? 'Teacher' : 'Student'}
                </h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{profile?.fullName || 'User'}</p>
                <p className="text-sm text-gray-500">
                  {profile?.studentId || profile?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.href
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              )
            })}
          </nav>

          {/* Sign Out */}
          <div className="px-4 py-6 border-t border-gray-200">
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Đăng xuất</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
