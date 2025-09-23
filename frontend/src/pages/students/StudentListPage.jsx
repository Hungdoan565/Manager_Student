import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import StudentTable from '../../components/students/StudentTable'
import { useStudentStore } from '../../store/studentStore'

const StudentListPage = () => {
  const navigate = useNavigate()
  const { 
    students, 
    loading, 
    error, 
    pagination, 
    filters,
    fetchStudents, 
    deleteStudent, 
    updateFilters,
    updatePagination,
    clearError 
  } = useStudentStore()

  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  const handleView = (studentId) => {
    navigate(`/students/${studentId}`)
  }

  const handleEdit = (studentId) => {
    navigate(`/students/${studentId}/edit`)
  }

  const handleDelete = (studentId) => {
    setDeleteConfirm(studentId)
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return

    try {
      await deleteStudent(deleteConfirm)
      toast.success('Xóa sinh viên thành công')
      setDeleteConfirm(null)
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sinh viên')
    }
  }

  const handleAdd = () => {
    navigate('/students/create')
  }

  const handlePageChange = (page) => {
    updatePagination({ page })
    fetchStudents({ ...filters, page })
  }

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters)
    fetchStudents({ ...newFilters, page: 1 })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý sinh viên</h1>
            <p className="text-gray-600 mt-1">Danh sách và quản lý thông tin sinh viên</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Page size selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Hiển thị</span>
              <select
                value={pagination.limit}
                onChange={(e) => {
                  const limit = Number(e.target.value) || 10
                  updatePagination({ limit, page: 1 })
                  fetchStudents({ ...filters, page: 1, limit })
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {[10, 20, 50, 100].map(n => (
                  <option value={n} key={n}>{n}/trang</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <span>Thêm sinh viên</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tổng sinh viên</p>
              <p className="text-2xl font-bold text-gray-900">{pagination.totalCount}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">👥</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Sinh viên mới</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">🆕</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">{students.filter(s => s.is_active).length}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-lg">✅</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Không hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">{students.filter(s => !s.is_active).length}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-lg">❌</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Student Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <StudentTable
          students={students}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          pagination={pagination}
        />
      </motion.div>

      {/* Pagination Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Trang {pagination.currentPage} / {Math.max(1, pagination.totalPages)} — Tổng {pagination.totalCount}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => pagination.currentPage > 1 && handlePageChange(pagination.currentPage - 1)}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled={pagination.currentPage <= 1}
          >
            Trước
          </button>
          <button
            onClick={() => pagination.currentPage < pagination.totalPages && handlePageChange(pagination.currentPage + 1)}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled={pagination.currentPage >= pagination.totalPages}
          >
            Sau
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa sinh viên này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentListPage