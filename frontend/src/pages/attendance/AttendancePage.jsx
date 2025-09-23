import { motion } from 'framer-motion'
import {
    Calendar,
    Plus
} from 'lucide-react'

const AttendancePage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Điểm danh</h1>
            <p className="text-gray-600 mt-1">Quản lý điểm danh và theo dõi sự có mặt của sinh viên</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Điểm danh mới</span>
          </button>
        </div>
      </div>

      {/* Coming Soon Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hệ thống điểm danh</h2>
        <p className="text-gray-600 mb-6">Tính năng đang được phát triển</p>
        <div className="bg-green-50 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-green-800 text-sm">
            Sẽ có các tính năng: Điểm danh QR code, Theo dõi lịch sử, Báo cáo thống kê
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AttendancePage