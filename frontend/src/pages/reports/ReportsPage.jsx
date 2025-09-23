import { motion } from 'framer-motion'
import {
    BarChart3,
    Download
} from 'lucide-react'

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
            <p className="text-gray-600 mt-1">Xem và xuất các báo cáo chi tiết về hệ thống</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Coming Soon Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Báo cáo & Analytics</h2>
        <p className="text-gray-600 mb-6">Tính năng đang được phát triển</p>
        <div className="bg-orange-50 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-orange-800 text-sm">
            Sẽ có các tính năng: Biểu đồ thống kê, Báo cáo xuất Excel, Dashboard analytics
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ReportsPage