import { motion } from 'framer-motion'
import {
    BarChart3,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Plus,
    TrendingUp,
    Users
} from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useStudentStore } from '../../store/studentStore'

const TeacherDashboard = () => {
  const { profile } = useAuthStore()
  const { students, fetchStudents, loading: studentsLoading } = useStudentStore()

  useEffect(() => {
    fetchStudents({ limit: 10 })
  }, [fetchStudents])

  // Real data from Supabase
  const stats = [
    { 
      title: 'Tổng sinh viên', 
      value: students.length.toString(), 
      icon: Users, 
      color: 'bg-blue-500', 
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Lớp học', 
      value: '8', 
      icon: BookOpen, 
      color: 'bg-green-500', 
      change: '+2',
      trend: 'up'
    },
    { 
      title: 'Điểm danh hôm nay', 
      value: '92%', 
      icon: CheckCircle, 
      color: 'bg-purple-500', 
      change: '+5%',
      trend: 'up'
    },
    { 
      title: 'Báo cáo', 
      value: '15', 
      icon: BarChart3, 
      color: 'bg-orange-500', 
      change: '+3',
      trend: 'up'
    }
  ]

  const recentActivities = [
    { 
      id: 1, 
      action: 'Tạo lớp mới', 
      target: 'Lập trình Web', 
      time: '2 phút trước', 
      type: 'class',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      id: 2, 
      action: 'Điểm danh', 
      target: 'Cơ sở dữ liệu', 
      time: '15 phút trước', 
      type: 'attendance',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    { 
      id: 3, 
      action: 'Thêm sinh viên', 
      target: 'Nguyễn Văn A', 
      time: '1 giờ trước', 
      type: 'student',
      icon: Users,
      color: 'text-purple-600 bg-purple-100'
    },
    { 
      id: 4, 
      action: 'Cập nhật lịch', 
      target: 'Thứ 2 - Tiết 1', 
      time: '2 giờ trước', 
      type: 'schedule',
      icon: Calendar,
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  const quickActions = [
    { 
      title: 'Tạo lớp mới', 
      icon: Plus, 
      color: 'bg-emerald-500', 
      href: '/classes/create',
      description: 'Tạo lớp học mới'
    },
    { 
      title: 'Điểm danh', 
      icon: Calendar, 
      color: 'bg-blue-500', 
      href: '/attendance/take',
      description: 'Thực hiện điểm danh'
    },
    { 
      title: 'Thêm sinh viên', 
      icon: Users, 
      color: 'bg-purple-500', 
      href: '/students/create',
      description: 'Thêm sinh viên mới'
    },
    { 
      title: 'Xem báo cáo', 
      icon: BarChart3, 
      color: 'bg-orange-500', 
      href: '/reports',
      description: 'Xem thống kê'
    }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'inactive': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Xin chào, {profile?.fullName || 'Giáo viên'}! 👋
            </h1>
            <p className="text-emerald-100">
              Chào mừng bạn quay trở lại với hệ thống quản lý sinh viên
            </p>
            <p className="text-emerald-200 text-sm mt-1">
              Hôm nay là {new Date().toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={action.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </Link>
                </motion.div>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
              <Link to="/students" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                Xem tất cả
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.target}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{activity.time}</span>
                  </div>
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
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sinh viên gần đây</h2>
          <div className="flex items-center space-x-3">
            <Link to="/students/create" className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Thêm sinh viên</span>
            </Link>
          </div>
        </div>

        {studentsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Đang tải sinh viên...</p>
          </div>
        ) : students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sinh viên</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Mã SV</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Lớp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((student, index) => (
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
                          <span className="text-emerald-600 font-medium text-xs">
                            {student.full_name?.split(' ').map(w => w.charAt(0)).join('').slice(0, 2).toUpperCase() || 'N/A'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.full_name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{student.student_code}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{student.classes?.name || 'Chưa phân lớp'}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(student.is_active ? 'active' : 'inactive')}`}>
                        {student.is_active ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        to={`/students/${student.id}`}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có sinh viên nào</h3>
            <p className="text-gray-500 mb-4">Bắt đầu bằng cách thêm sinh viên đầu tiên</p>
            <Link
              to="/students/create"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm sinh viên</span>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default TeacherDashboard