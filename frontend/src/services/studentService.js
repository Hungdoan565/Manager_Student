import api from './apiClient'

// Student Service - call Django API (DRF). Supabase is only for auth token.
export class StudentService {
  // Lấy danh sách sinh viên với pagination và filters (client-side fallback)
  static async getStudents(options = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = options

    const params = {
      page,
      page_size: limit,
      ordering: `${sortOrder === 'asc' ? '' : '-'}${sortBy}`,
      expand: 'class',
    }
    if (search) params.search = search

    const { data } = await api.get('/students/', { params })

    // DRF pagination shape: { count, next, previous, results }
    const isPaginated = data && typeof data === 'object' && 'results' in data
    const items = isPaginated ? data.results : Array.isArray(data) ? data : []
    const totalCount = isPaginated ? data.count : items.length
    const totalPages = Math.max(1, Math.ceil(totalCount / limit))

    return {
      students: items,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  }

  // Lấy chi tiết sinh viên
  static async getStudent(id) {
    const { data } = await api.get(`/students/${id}/`)
    return data
  }

  // Tạo sinh viên mới
  static async createStudent(studentData) {
    const { data } = await api.post('/students/', studentData)
    return data
  }

  // Cập nhật sinh viên
  static async updateStudent(id, studentData) {
    const { data } = await api.put(`/students/${id}/`, studentData)
    return data
  }

  // Xóa sinh viên
  static async deleteStudent(id) {
    await api.delete(`/students/${id}/`)
return { success: true }
  }

  // Tìm kiếm sinh viên
  static async searchStudents(query, options = {}) {
    const { data } = await api.get('/students/', { params: { search: query } })
    return Array.isArray(data) ? data : (data.results ?? [])
  }

  // Các hàm dưới đây sẽ được chuyển sang gọi API khi endpoints sẵn sàng
  static async getClasses() {
    // Placeholder: gọi API /classes khi có
    return []
  }

  static async getStudentStats() {
    // Placeholder: tổng hợp dựa trên danh sách hiện tại
    const { data } = await api.get('/students/')
    const items = Array.isArray(data) ? data : (data.results ?? [])
    return {
      total: items.length,
      active: items.filter(s => s.is_active).length,
      inactive: items.filter(s => !s.is_active).length,
      byClass: items.reduce((acc, s) => {
        if (s.class_id) acc[s.class_id] = (acc[s.class_id] || 0) + 1
        return acc
      }, {}),
    }
  }

  static async importStudents(studentsData) {
    const { data } = await api.post('/students/', studentsData)
    return data
  }

  static async importCsv(file) {
    const form = new FormData()
    form.append('file', file)
    const { data } = await api.post('/students/import', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  static async exportStudents(filters = {}) {
    const params = {}
    if (filters.classId) params.class_id = filters.classId
    const res = await api.get('/students/export', { params, responseType: 'blob' })
    return res.data
  }
}
