import { motion } from 'framer-motion'
import {
    BarChart3,
    Bell,
    BookOpen,
    Calendar,
    Edit,
    Eye,
    Filter,
    Plus,
    Search,
    Settings,
    Trash2,
    Users
} from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../../store/authStore'

const TeacherDashboard = () => {
  const { profile } = useAuthStore()

  // Mock data - sẽ thay thế bằng real data từ Supabase
  const stats = [
    { title: 'Tổng sinh viên', value: '1,234', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Lớp học', value: '45', icon: BookOpen, color: 'bg-green-500', change: '+3' },
    { title: 'Điểm danh hôm nay', value: '89%', icon: Calendar, color: 'bg-purple-500', change: '+5%' },
    { title: 'Báo cáo', value: '23', icon: BarChart3, color: 'bg-orange-500', change: '+2' }
  ]

  const recentActivities = [
    { id: 1, action: 'Tạo lớp mới', target: 'Lập trình Web', time: '2 phút trước', type: 'class' },
    { id: 2, action: 'Điểm danh', target: 'Cơ sở dữ liệu', time: '15 phút trước', type: 'attendance' },
    { id: 3, action: 'Thêm sinh viên', target: 'Nguyễn Văn A', time: '1 giờ trước', type: 'student' },
    { id: 4, action: 'Cập nhật lịch', target: 'Thứ 2 - Tiết 1', time: '2 giờ trước', type: 'schedule' }
  ]

  const quickActions = [
    { title: 'Tạo lớp mới', icon: Plus, color: 'bg-emerald-500', href: '/classes/create' },
    { title: 'Điểm danh', icon: Calendar, color: 'bg-blue-500', href: '/attendance/take' },
    { title: 'Thêm sinh viên', icon: Users, color: 'bg-purple-500', href: '/students/create' },
    { title: 'Xem báo cáo', icon: BarChart3, color: 'bg-orange-500', href: '/reports' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SMS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-500">Xin chào, {profile?.fullName || 'Giáo viên'}</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-emerald-600 font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={action.title}
                    href={action.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{action.title}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'class' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'attendance' ? 'bg-green-100 text-green-600' :
                      activity.type === 'student' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.type === 'class' ? <BookOpen className="w-5 h-5" /> :
                       activity.type === 'attendance' ? <Calendar className="w-5 h-5" /> :
                       activity.type === 'student' ? <Users className="w-5 h-5" /> :
                       <BarChart3 className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.target}</p>
                    </div>
                    
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Sinh viên gần đây</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Lọc</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Thêm sinh viên</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tên sinh viên</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Mã SV</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Lớp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Nguyễn Văn A', id: 'SV001', class: 'CNTT01', status: 'active' },
                    { name: 'Trần Thị B', id: 'SV002', class: 'CNTT01', status: 'active' },
                    { name: 'Lê Văn C', id: 'SV003', class: 'CNTT02', status: 'inactive' },
                    { name: 'Phạm Thị D', id: 'SV004', class: 'CNTT02', status: 'active' }
                  ].map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-medium text-sm">
                              {student.name.split(' ').pop().charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{student.id}</td>
                      <td className="py-4 px-4 text-gray-600">{student.class}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {student.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-emerald-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default TeacherDashboard
