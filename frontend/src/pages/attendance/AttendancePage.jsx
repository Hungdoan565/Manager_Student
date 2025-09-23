import { motion } from 'framer-motion'
import { Calendar, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAttendanceStore, useClassStore } from '../../store/authStore'

const AttendancePage = () => {
  const { attendanceRecords, isLoading, error, fetchAttendanceRecords, markAttendance, updateAttendance, stats } = useAttendanceStore()
  const { classes, fetchClasses } = useClassStore()

  const [searchDate, setSearchDate] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  useEffect(() => {
    fetchAttendanceRecords({ page, limit, classId: selectedClass || undefined, date: searchDate || undefined })
  }, [page, limit, selectedClass, searchDate, fetchAttendanceRecords])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Điểm danh</h1>
            <p className="text-gray-600 mt-1">Quản lý điểm danh và theo dõi sự có mặt của sinh viên</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Hiển thị</span>
              <select
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value) || 20); setPage(1) }}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {[10, 20, 50].map(n => <option key={n} value={n}>{n}/trang</option>)}
              </select>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Điểm danh mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => { setSearchDate(e.target.value); setPage(1) }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => { setSelectedClass(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Tất cả lớp</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto" />
              <p className="text-gray-600 mt-2">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : attendanceRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-600">Không có bản ghi</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-600">
                    <th className="text-left py-3 px-6">Ngày</th>
                    <th className="text-left py-3 px-6">Lớp</th>
                    <th className="text-left py-3 px-6">Sinh viên</th>
                    <th className="text-left py-3 px-6">Trạng thái</th>
                    <th className="text-left py-3 px-6">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((rec, idx) => (
                    <tr key={rec.id || idx} className="border-b border-gray-100">
                      <td className="py-3 px-6">{new Date(rec.date).toLocaleDateString('vi-VN')}</td>
                      <td className="py-3 px-6">{classes.find(c => c.id === rec.class_id)?.name || rec.class_id}</td>
                      <td className="py-3 px-6">{rec.student_id}</td>
                      <td className="py-3 px-6 capitalize">{rec.status}</td>
                      <td className="py-3 px-6">{rec.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Trang {page}</div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Trước</button>
          <button onClick={() => setPage(p => p + 1)} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Sau</button>
        </div>
      </div>
    </div>
  )
}

export default AttendancePage
