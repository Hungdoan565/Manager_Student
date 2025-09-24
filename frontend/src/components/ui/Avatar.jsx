import { AnimatePresence, motion } from 'framer-motion'
import { Camera, LogOut, Settings, User, UserCheck } from 'lucide-react'
import { useState } from 'react'

const Avatar = ({ user, onSignOut, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (role) => {
    switch (role) {
      case 'teacher': return 'bg-emerald-500'
      case 'student': return 'bg-blue-500'
      case 'admin': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (role) => {
    switch (role) {
      case 'teacher': return 'Giáo viên'
      case 'student': return 'Sinh viên'
      case 'admin': return 'Quản trị viên'
      default: return 'Người dùng'
    }
  }

  return (
    <div className="relative">
      {/* Avatar Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-all duration-200 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar Circle */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
            {getInitials(user?.fullName || user?.email)}
          </div>
          
          {/* Status Indicator */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user?.role)} rounded-full border-2 border-white flex items-center justify-center`}>
            <UserCheck className="w-2 h-2 text-white" />
          </div>
          
          {/* Hover Effect */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <Camera className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>

        {/* User Info */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
            {user?.fullName || 'Người dùng'}
          </p>
          <p className="text-xs text-gray-500">
            {getStatusText(user?.role)}
          </p>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 mt-2 w-80 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(user?.fullName || user?.email)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {user?.fullName || 'Người dùng'}
                    </h3>
                    <p className="text-emerald-100 text-sm">
                      {user?.email || 'user@example.com'}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className={`w-2 h-2 ${getStatusColor(user?.role)} rounded-full`}></div>
                      <span className="text-emerald-100 text-xs">
                        {getStatusText(user?.role)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    onSettings?.()
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-foreground hover:bg-muted transition-colors group"
                >
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Settings className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Cài đặt tài khoản</p>
                    <p className="text-xs text-muted-foreground">Quản lý thông tin cá nhân</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSettings?.()
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-foreground hover:bg-muted transition-colors group"
                >
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <User className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Hồ sơ cá nhân</p>
                    <p className="text-xs text-muted-foreground">Xem và chỉnh sửa hồ sơ</p>
                  </div>
                </button>

                <div className="border-t border-border my-2"></div>

                <button
                  onClick={() => {
                    onSignOut?.()
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Đăng xuất</p>
                    <p className="text-xs text-red-500">Thoát khỏi tài khoản</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Avatar
