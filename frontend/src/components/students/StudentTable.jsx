import { motion } from 'framer-motion'
import {
    Edit,
    Eye,
    Filter,
    Plus,
    Search,
    Trash2,
    User,
    Users
} from 'lucide-react'
import React, { useState } from 'react'
import { useStudentStore } from '../../store/studentStore'

const StudentTable = ({ 
  students = [], 
  loading = false, 
  onView, 
  onEdit, 
  onDelete,
  onAdd,
  showActions = true 
}) => {
  const [selectedStudents, setSelectedStudents] = useState([])
  const { filters, updateFilters } = useStudentStore()

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students.map(s => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId])
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId))
    }
  }

  const handleSearch = (e) => {
    updateFilters({ search: e.target.value })
  }

  const getStatusBadge = (isActive) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {isActive ? 'Hoạt động' : 'Không hoạt động'}
      </span>
    )
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Danh sách sinh viên</h2>
              <p className="text-sm text-gray-500">{students.length} sinh viên</p>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onAdd}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm sinh viên</span>
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sinh viên..."
              value={filters.search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-6">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === students.length && students.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Sinh viên</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Mã SV</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Lớp</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Liên hệ</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600">Trạng thái</th>
              {showActions && (
                <th className="text-left py-3 px-6 font-medium text-gray-600">Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium text-sm">
                        {getInitials(student.full_name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.full_name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <span className="font-medium text-gray-900">{student.student_code}</span>
                </td>
                
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{student.classes?.name || 'Chưa phân lớp'}</p>
                    <p className="text-sm text-gray-500">{student.classes?.grade || ''}</p>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm text-gray-900">{student.phone || 'Chưa có'}</p>
                    <p className="text-sm text-gray-500">{student.emergency_phone || 'Chưa có'}</p>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  {getStatusBadge(student.is_active)}
                </td>
                
                {showActions && (
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(student.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(student.id)}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(student.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có sinh viên nào</h3>
          <p className="text-gray-500 mb-4">Bắt đầu bằng cách thêm sinh viên đầu tiên</p>
          {showActions && (
            <button
              onClick={onAdd}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm sinh viên</span>
            </button>
          )}
        </div>
      )}

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Đã chọn {selectedStudents.length} sinh viên
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Xuất Excel
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Xóa đã chọn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentTable
