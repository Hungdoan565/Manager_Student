import { motion } from 'framer-motion'
import {
    Bell,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    User,
    XCircle
} from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../../store/authStore'

const StudentDashboard = () => {
  const { profile } = useAuthStore()

  // Mock data - sẽ thay thế bằng real data từ Supabase
  const todaySchedule = [
    { time: '07:30', subject: 'Lập trình Web', room: 'A101', status: 'completed', attendance: 'present' },
    { time: '09:30', subject: 'Cơ sở dữ liệu', room: 'A102', status: 'current', attendance: 'present' },
    { time: '13:30', subject: 'Mạng máy tính', room: 'B201', status: 'upcoming', attendance: null },
    { time: '15:30', subject: 'Phát triển ứng dụng', room: 'B202', status: 'upcoming', attendance: null }
  ]

  const attendanceStats = {
    total: 45,
    present: 42,
    absent: 3,
    percentage: 93.3
  }

  const recentAttendance = [
    { date: '2024-01-15', subject: 'Lập trình Web', status: 'present', time: '07:30' },
    { date: '2024-01-14', subject: 'Cơ sở dữ liệu', status: 'present', time: '09:30' },
    { date: '2024-01-13', subject: 'Mạng máy tính', status: 'absent', time: '13:30' },
    { date: '2024-01-12', subject: 'Phát triển ứng dụng', status: 'present', time: '15:30' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-gray-500'
      case 'current': return 'text-emerald-600'
      case 'upcoming': return 'text-blue-600'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />
      case 'current': return <Clock className="w-5 h-5" />
      case 'upcoming': return <Calendar className="w-5 h-5" />
      default: return <Calendar className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SMS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-500">Xin chào, {profile?.fullName || 'Sinh viên'}</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{profile?.studentId || 'SV001'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tỷ lệ điểm danh</p>
                <p className="text-2xl font-bold text-emerald-600">{attendanceStats.percentage}%</p>
                <p className="text-sm text-gray-500">{attendanceStats.present}/{attendanceStats.total} buổi</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Buổi học hôm nay</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
                <p className="text-sm text-gray-500">2 đã hoàn thành</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Số ngày nghỉ</p>
                <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
                <p className="text-sm text-gray-500">Trong tháng này</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch học hôm nay</h2>
              
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-colors ${
                      item.status === 'current' 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : item.status === 'completed'
                        ? 'border-gray-200 bg-gray-50'
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.status === 'current' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : item.status === 'completed'
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {getStatusIcon(item.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{item.subject}</h3>
                        <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status === 'completed' ? 'Đã hoàn thành' :
                           item.status === 'current' ? 'Đang học' : 'Sắp tới'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{item.time}</span>
                        <span className="text-sm text-gray-600">{item.room}</span>
                        {item.attendance && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.attendance === 'present' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {item.attendance === 'present' ? 'Có mặt' : 'Vắng mặt'}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Attendance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Điểm danh gần đây</h2>
              
              <div className="space-y-4">
                {recentAttendance.map((attendance, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      attendance.status === 'present' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {attendance.status === 'present' ? 
                        <CheckCircle className="w-5 h-5" /> : 
                        <XCircle className="w-5 h-5" />
                      }
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{attendance.subject}</p>
                      <p className="text-sm text-gray-600">{attendance.date} - {attendance.time}</p>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      attendance.status === 'present' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {attendance.status === 'present' ? 'Có mặt' : 'Vắng mặt'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <Calendar className="w-6 h-6 text-emerald-600" />
                <span className="font-medium text-emerald-700">Xem lịch học</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-blue-700">Điểm danh</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                <User className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-purple-700">Thông tin cá nhân</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default StudentDashboard
