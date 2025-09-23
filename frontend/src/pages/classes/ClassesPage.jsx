import { motion } from 'framer-motion'
import {
    BookOpen,
    Edit,
    Plus,
    Search,
    Trash2,
    Upload,
    Users
} from 'lucide-react'
import { useEffect, useState } from 'react'
import ExcelImport from '../../components/common/ExcelImport'
import { useAuthStore, useClassStore } from '../../store/authStore'

const ClassesPage = () => {
  const { classes, isLoading, error, fetchClasses, createClass, updateClass, deleteClass, pagination, updatePagination } = useClassStore()
  const { user, profile } = useAuthStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editingClass, setEditingClass] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    description: '',
    max_students: 40
  })

  useEffect(() => {
    fetchClasses({ page: 1, limit: 20 })
  }, [fetchClasses])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const classData = {
        ...formData,
        teacher_id: user.id,
        academic_year_id: '1c1f3b9b-695c-4b20-abde-63918ac60c75', // Default academic year
        is_active: true
      }

      if (editingClass) {
        await updateClass(editingClass.id, classData)
        setEditingClass(null)
      } else {
        await createClass(classData)
      }
      
      setShowCreateModal(false)
      setFormData({ name: '', grade: '', description: '', max_students: 40 })
    } catch (error) {
      console.error('Error saving class:', error)
    }
  }

  const handleEdit = (classData) => {
    setEditingClass(classData)
    setFormData({
      name: classData.name,
      grade: classData.grade,
      description: classData.description || '',
      max_students: classData.max_students
    })
    setShowCreateModal(true)
  }

  const handleDelete = async (classId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lớp học này?')) {
      try {
        await deleteClass(classId)
      } catch (error) {
        console.error('Error deleting class:', error)
      }
    }
  }

  // Handle Excel import
  const handleImportData = async (importedData) => {
    try {
      const promises = importedData.map(classData => {
        const data = {
          ...classData,
          teacher_id: user.id,
          academic_year_id: '1c1f3b9b-695c-4b20-abde-63918ac60c75', // Default academic year
          is_active: true
        }
        return createClass(data)
      })
      
      await Promise.all(promises)
      setShowImportModal(false)
    } catch (error) {
      console.error('Error importing classes:', error)
    }
  }

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý lớp học</h1>
            <p className="text-gray-600 mt-1">Tạo và quản lý các lớp học trong hệ thống</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Page size selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Hiển thị</span>
              <select
                value={pagination?.limit || 20}
                onChange={(e) => {
                  const limit = Number(e.target.value) || 20
                  updatePagination({ limit, page: 1 })
                  fetchClasses({ page: 1, limit })
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {[10, 20, 50, 100].map(n => (
                  <option value={n} key={n}>{n}/trang</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => setShowImportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Import Excel</span>
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo thủ công</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm lớp học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách lớp học</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Lỗi: {error}</p>
            </div>
          ) : filteredClasses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Chưa có lớp học nào</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClasses.map((cls) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                      <p className="text-sm text-gray-600">Lớp {cls.grade}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cls.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {cls.description && (
                    <p className="text-sm text-gray-600 mb-3">{cls.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Tối đa {cls.max_students} học sinh</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      cls.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cls.is_active ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Trang {pagination?.currentPage || 1} / {Math.max(1, pagination?.totalPages || 1)} — Tổng {pagination?.totalCount || filteredClasses.length}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => (pagination?.currentPage || 1) > 1 && fetchClasses({ page: (pagination.currentPage - 1), limit: pagination.limit })}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled={(pagination?.currentPage || 1) <= 1}
          >
            Trước
          </button>
          <button
            onClick={() => (pagination?.currentPage || 1) < (pagination?.totalPages || 1) && fetchClasses({ page: (pagination.currentPage + 1), limit: pagination.limit })}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            disabled={(pagination?.currentPage || 1) >= (pagination?.totalPages || 1)}
          >
            Sau
          </button>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingClass ? 'Chỉnh sửa lớp học' : 'Tạo lớp học mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên lớp học
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="VD: Lớp 10A1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khối lớp
                </label>
                <input
                  type="text"
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="VD: 10A1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows="3"
                  placeholder="Mô tả về lớp học..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số học sinh tối đa
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.max_students}
                  onChange={(e) => setFormData({...formData, max_students: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingClass(null)
                    setFormData({ name: '', grade: '', description: '', max_students: 40 })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  {editingClass ? 'Cập nhật' : 'Tạo lớp học'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Excel Import Modal */}
      {showImportModal && (
        <ExcelImport
          title="Import lớp học từ Excel"
          onDataImport={handleImportData}
          onClose={() => setShowImportModal(false)}
          validationRules={{
            name: { required: true, maxLength: 100 },
            grade: { required: true, maxLength: 20 },
            max_students: { required: true, type: 'number' }
          }}
          maxRows={100}
        />
      )}
    </div>
  )
}

export default ClassesPage