import { motion } from 'framer-motion'
import {
    Calendar,
    Edit,
    Mail,
    MapPin,
    Phone,
    Plus,
    Search,
    Trash2,
    Upload,
    Users
} from 'lucide-react'
import { useEffect, useState } from 'react'
import ExcelImport from '../../components/common/ExcelImport'
import { useAuthStore, useClassStore } from '../../store/authStore'
import { useStudentStore } from '../../store/studentStore'

const StudentsManagePage = () => {
const { students, loading, error, fetchStudents, createStudent, updateStudent, deleteStudent } = useStudentStore()
  const { classes, fetchClasses } = useClassStore()
  const { user, profile } = useAuthStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [formData, setFormData] = useState({
    student_code: '',
    full_name: '',
    date_of_birth: '',
    gender: 'male',
    phone: '',
    email: '',
    address: '',
    emergency_contact: '',
    emergency_phone: '',
    class_id: ''
  })

  useEffect(() => {
    fetchStudents()
    fetchClasses()
  }, [fetchStudents, fetchClasses])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData)
        setEditingStudent(null)
      } else {
        await createStudent(formData)
      }
      
      setShowCreateModal(false)
      setFormData({
        student_code: '',
        full_name: '',
        date_of_birth: '',
        gender: 'male',
        phone: '',
        email: '',
        address: '',
        emergency_contact: '',
        emergency_phone: '',
        class_id: ''
      })
    } catch (error) {
      console.error('Error saving student:', error)
    }
  }

  const handleEdit = (studentData) => {
    setEditingStudent(studentData)
    setFormData({
      student_code: studentData.student_code,
      full_name: studentData.full_name,
      date_of_birth: studentData.date_of_birth || '',
      gender: studentData.gender || 'male',
      phone: studentData.phone || '',
      email: studentData.email || '',
      address: studentData.address || '',
      emergency_contact: studentData.emergency_contact || '',
      emergency_phone: studentData.emergency_phone || '',
      class_id: studentData.class_id || ''
    })
    setShowCreateModal(true)
  }

  const handleDelete = async (studentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      try {
        await deleteStudent(studentId)
      } catch (error) {
        console.error('Error deleting student:', error)
      }
    }
  }

  const handleImportData = async (importedData) => {
    try {
      const promises = importedData.map(studentData => {
        // Find class by name
        const classObj = classes.find(cls => cls.name === studentData.class_name)
        const data = {
          ...studentData,
          class_id: classObj?.id || null,
          is_active: true
        }
        delete data.class_name // Remove class_name as it's not a field in the table
        return createStudent(data)
      })
      
      await Promise.all(promises)
      setShowImportModal(false)
    } catch (error) {
      console.error('Error importing students:', error)
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesClass = !selectedClass || student.class_id === selectedClass
    
    return matchesSearch && matchesClass
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý sinh viên</h1>
            <p className="text-gray-600 mt-1">Tạo và quản lý thông tin sinh viên</p>
          </div>
          <div className="flex space-x-3">
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
              <span>Thêm thủ công</span>
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
              placeholder="Tìm kiếm sinh viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Tất cả lớp</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách sinh viên</h2>
          
{loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Lỗi: {error}</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Chưa có sinh viên nào</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{student.full_name}</h3>
                      <p className="text-sm text-gray-600">MSSV: {student.student_code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {student.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{student.email}</span>
                      </div>
                    )}
                    {student.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{student.phone}</span>
                      </div>
                    )}
                    {student.date_of_birth && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(student.date_of_birth).toLocaleDateString('vi-VN')}</span>
                      </div>
                    )}
                    {student.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{student.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Lớp:</span>
                      <span className="font-medium text-gray-900">
                        {classes.find(cls => cls.id === student.class_id)?.name || 'Chưa phân lớp'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingStudent ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã sinh viên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.student_code}
                    onChange={(e) => setFormData({...formData, student_code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="VD: SV001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="VD: 0123456789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="VD: student@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows="2"
                  placeholder="Địa chỉ nơi ở..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Người liên hệ khẩn cấp
                  </label>
                  <input
                    type="text"
                    value={formData.emergency_contact}
                    onChange={(e) => setFormData({...formData, emergency_contact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="VD: Nguyễn Văn B (cha)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SĐT khẩn cấp
                  </label>
                  <input
                    type="tel"
                    value={formData.emergency_phone}
                    onChange={(e) => setFormData({...formData, emergency_phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="VD: 0987654321"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lớp học
                </label>
                <select
                  value={formData.class_id}
                  onChange={(e) => setFormData({...formData, class_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Chọn lớp học</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingStudent(null)
                    setFormData({
                      student_code: '',
                      full_name: '',
                      date_of_birth: '',
                      gender: 'male',
                      phone: '',
                      email: '',
                      address: '',
                      emergency_contact: '',
                      emergency_phone: '',
                      class_id: ''
                    })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  {editingStudent ? 'Cập nhật' : 'Thêm sinh viên'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Excel Import Modal */}
      {showImportModal && (
        <ExcelImport
          title="Import sinh viên từ Excel"
          onDataImport={handleImportData}
          onClose={() => setShowImportModal(false)}
          validationRules={{
            student_code: { required: true, maxLength: 20 },
            full_name: { required: true, maxLength: 100 },
            email: { type: 'email' },
            phone: { maxLength: 15 },
            class_name: { required: true }
          }}
          maxRows={500}
        />
      )}
    </div>
  )
}

export default StudentsManagePage
