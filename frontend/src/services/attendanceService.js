import api from './apiClient'

export class AttendanceService {
  static async getAttendanceRecords(filters = {}) {
    const { page = 1, limit = 20 } = filters
    const params = { page, page_size: limit, expand: 'student,class' }
    if (filters.studentId) params.student_id = filters.studentId
    if (filters.classId) params.class_id = filters.classId
    if (filters.date) params.date = filters.date
    if (filters.status) params.status = filters.status

    const { data } = await api.get('/attendance/', { params })
    const isPaginated = data && typeof data === 'object' && 'results' in data
    const items = Array.isArray(data) ? data : (data.results ?? [])
    const totalCount = isPaginated ? data.count : items.length
    const totalPages = Math.max(1, Math.ceil(totalCount / limit))
    return { items, totalCount, totalPages, currentPage: page, hasNextPage: page < totalPages, hasPrevPage: page > 1 }
  }

  static async markAttendance(attendanceData) {
    const { data } = await api.post('/attendance/', attendanceData)
    return data
  }

  static async updateAttendance(attendanceId, attendanceData) {
    const { data } = await api.put(`/attendance/${attendanceId}/`, attendanceData)
    return data
  }

  static async getAttendanceStats(classId, dateRange) {
    const params = {}
    if (classId) params.class_id = classId
    if (dateRange?.start && dateRange?.end) {
      // For now server doesn't filter by range, fetch and compute client-side
    }
    const result = await AttendanceService.getAttendanceRecords(params)
    const items = Array.isArray(result) ? result : result.items

    const stats = {
      total: items.length,
      present: items.filter(r => r.status === 'present').length,
      absent: items.filter(r => r.status === 'absent').length,
      late: items.filter(r => r.status === 'late').length,
      excused: items.filter(r => r.status === 'excused').length,
    }
    return stats
  }

  static async getReports({ classId, startDate, endDate, status }) {
    const params = {}
    if (classId) params.class_id = classId
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    if (status) params.status = status
    const { data } = await api.get('/attendance/reports', { params })
    return data
  }

  static async getTimeSeries({ classId, startDate, endDate, status }) {
    const params = {}
    if (classId) params.class_id = classId
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    if (status) params.status = status
    const { data } = await api.get('/attendance/reports/timeseries', { params })
    return data
  }

  static async exportCsv({ classId, startDate, endDate, status }) {
    const params = {}
    if (classId) params.class_id = classId
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    if (status) params.status = status
    const res = await api.get('/attendance/reports/export', { params, responseType: 'blob' })
    return res.data
  }
}
