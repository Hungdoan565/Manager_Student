import { motion } from 'framer-motion'
import { Calendar, Plus, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useAttendanceStore, useClassStore } from '../../store/authStore'
import { ClassService } from '../../services/classService'
import { AttendanceService } from '../../services/attendanceService'
import toast from 'react-hot-toast'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const AttendancePage = () => {
  const { attendanceRecords, isLoading, error, fetchAttendanceRecords, markAttendance } = useAttendanceStore()
  const { classes, fetchClasses } = useClassStore()

  const [searchDate, setSearchDate] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [reportStartDate, setReportStartDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().slice(0,10)
  })
  const [reportEndDate, setReportEndDate] = useState(() => new Date().toISOString().slice(0,10))
  const [report, setReport] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [series, setSeries] = useState([])
  const [seriesLoading, setSeriesLoading] = useState(false)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [form, setForm] = useState({
    class_id: '',
    student_id: '',
    date: new Date().toISOString().slice(0,10),
    status: 'present',
    notes: ''
  })
  const [classStudents, setClassStudents] = useState([])
  const isFormValid = useMemo(() => form.class_id && form.student_id && form.date && form.status, [form])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { fetchClasses() }, [fetchClasses])

  useEffect(() => {
    fetchAttendanceRecords({ page, limit, classId: selectedClass || undefined, date: searchDate || undefined, status: selectedStatus || undefined })
  }, [page, limit, selectedClass, searchDate, selectedStatus, fetchAttendanceRecords])


  const openCreate = () => {
    setShowCreateModal(true)
  }

  const loadStudentsForClass = async (classId) => {
    if (!classId) { setClassStudents([]); return }
    try {
      const data = await ClassService.getStudentsOfClass(classId)
      setClassStudents(data || [])
    } catch (_) {
      setClassStudents([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid || submitting) return
    setSubmitting(true)
    try {
      await markAttendance({
        class_id: form.class_id,
        student_id: form.student_id,
        date: form.date,
        status: form.status,
        notes: form.notes || null,
      })
      toast.success('Điểm danh thành công')
      setShowCreateModal(false)
      setForm({ class_id: '', student_id: '', date: new Date().toISOString().slice(0,10), status: 'present', notes: '' })
      // refresh first page
      setPage(1)
      fetchAttendanceRecords({ page: 1, limit, classId: selectedClass || undefined, date: searchDate || undefined, status: selectedStatus || undefined })
    } catch (err) {
      const status = err?.response?.status
      if (status === 409) {
        toast.error('Đã điểm danh sinh viên này trong ngày')
      } else {
        toast.error('Lỗi khi lưu điểm danh')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const fetchReports = async () => {
    setReportLoading(true)
    try {
      const data = await AttendanceService.getReports({ classId: selectedClass || undefined, startDate: reportStartDate, endDate: reportEndDate, status: selectedStatus || undefined })
      setReport(data)
    } catch (e) {
      toast.error('Lỗi tải thống kê')
    } finally {
      setReportLoading(false)
    }
  }

  const fetchSeries = async () => {
    setSeriesLoading(true)
    try {
      const data = await AttendanceService.getTimeSeries({ classId: selectedClass || undefined, startDate: reportStartDate, endDate: reportEndDate, status: selectedStatus || undefined })
      setSeries(data || [])
    } catch (e) {
      toast.error('Lỗi tải biểu đồ theo ngày')
    } finally {
      setSeriesLoading(false)
    }
  }

  const exportCsv = async () => {
    try {
      const blob = await AttendanceService.exportCsv({ classId: selectedClass || undefined, startDate: reportStartDate, endDate: reportEndDate, status: selectedStatus || undefined })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'attendance_export.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Đã xuất CSV')
    } catch (e) {
      toast.error('Lỗi xuất CSV')
    }
  }

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
            <button onClick={openCreate} className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
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
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="present">Có mặt</option>
            <option value="absent">Vắng</option>
            <option value="late">Trễ</option>
            <option value="excused">Có phép</option>
          </select>
        </div>
      </div>

      {/* Thống kê */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Thống kê điểm danh</h2>
          <div className="flex items-center space-x-2">
            <input type="date" value={reportStartDate} onChange={(e) => setReportStartDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
            <span className="text-gray-500">→</span>
            <input type="date" value={reportEndDate} onChange={(e) => setReportEndDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
            <button onClick={fetchReports} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">Xem thống kê</button>
            <button onClick={fetchSeries} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Xem biểu đồ ngày</button>
            <button onClick={exportCsv} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">Xuất CSV</button>
          </div>
        </div>
        {reportLoading ? (
          <div className="text-center py-8 text-gray-600">Đang tải thống kê...</div>
        ) : report ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Tổng bản ghi</p>
                <p className="text-2xl font-bold">{report.total}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Có mặt</p>
                <p className="text-2xl font-bold text-emerald-600">{report.present}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Vắng</p>
                <p className="text-2xl font-bold text-red-600">{report.absent}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Trễ</p>
                <p className="text-2xl font-bold text-amber-600">{report.late}</p>
              </div>
              <div className="p-4 border rounded-lg col-span-2">
                <p className="text-sm text-gray-500">Tỉ lệ chuyên cần</p>
                <p className="text-2xl font-bold">{report.attendance_rate}%</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={[
                      { name: 'Có mặt', value: report.present, color: '#10b981' },
                      { name: 'Vắng', value: report.absent, color: '#ef4444' },
                      { name: 'Trễ', value: report.late, color: '#f59e0b' },
                      { name: 'Có phép', value: report.excused, color: '#06b6d4' },
                    ]}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {[ '#10b981', '#ef4444', '#f59e0b', '#06b6d4' ].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Chọn khoảng ngày và bấm “Xem thống kê”.</div>
        )}
        <div className="mt-6">
          {seriesLoading ? (
            <div className="text-center py-8 text-gray-600">Đang tải biểu đồ...</div>
          ) : series && series.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" name="Có mặt" stroke="#10b981" />
                  <Line type="monotone" dataKey="absent" name="Vắng" stroke="#ef4444" />
                  <Line type="monotone" dataKey="late" name="Trễ" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="excused" name="Có phép" stroke="#06b6d4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : null}
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
                      <td className="py-3 px-6">{rec.class?.name || classes.find(c => c.id === rec.class_id)?.name || rec.class_id}</td>
                      <td className="py-3 px-6">{rec.student?.full_name || rec.student_id}</td>
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

      {/* Create Attendance Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl p-6 w-full max-w-xl mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Điểm danh mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                <select
                  value={form.class_id}
                  onChange={async (e) => {
                    const classId = e.target.value
                    setForm(prev => ({ ...prev, class_id: classId, student_id: '' }))
                    await loadStudentsForClass(classId)
                  }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Chọn lớp</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sinh viên</label>
                <select
                  value={form.student_id}
                  onChange={(e) => setForm(prev => ({ ...prev, student_id: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Chọn sinh viên</option>
                  {classStudents.map(st => (
                    <option key={st.id} value={st.id}>{st.full_name} ({st.student_code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                  <input type="date" value={form.date} onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select value={form.status} onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="present">Có mặt</option>
                    <option value="absent">Vắng</option>
                    <option value="late">Trễ</option>
                    <option value="excused">Có phép</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                <textarea value={form.notes} onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>

              <div className="flex space-x-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Hủy
                </button>
                <button type="submit" disabled={!isFormValid || submitting} className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50">
                  {submitting ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AttendancePage
