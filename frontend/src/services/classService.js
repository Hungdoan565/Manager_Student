import api from './apiClient'

export class ClassService {
  static async getAllClasses(options = {}) {
    const { page = 1, limit = 100 } = options
    const { data } = await api.get('/classes/', { params: { page, page_size: limit, ordering: 'name' } })
    const isPaginated = data && typeof data === 'object' && 'results' in data
    const items = Array.isArray(data) ? data : (data.results ?? [])
    const totalCount = isPaginated ? data.count : items.length
    const totalPages = Math.max(1, Math.ceil(totalCount / limit))
    return { items, totalCount, totalPages, currentPage: page, hasNextPage: page < totalPages, hasPrevPage: page > 1 }
  }

  static async getClassById(id) {
    const { data } = await api.get(`/classes/${id}/`)
    return data
  }

  static async createClass(classData) {
    const { data } = await api.post('/classes/', classData)
    return data
  }

  static async updateClass(id, classData) {
    const { data } = await api.put(`/classes/${id}/`, classData)
    return data
  }

  static async deleteClass(id) {
    await api.delete(`/classes/${id}/`)
    return { success: true }
  }
}
