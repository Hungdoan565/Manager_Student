import { supabase } from '../lib/supabase'

// Student Service - API integration với Supabase
export class StudentService {
  // Lấy danh sách sinh viên với pagination và filters
  static async getStudents(options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        classId = null,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = options

      let query = supabase
        .from('students')
        .select(`
          *,
          classes (
            id,
            name,
            grade
          )
        `)

      // Apply search filter
      if (search) {
        query = query.or(`full_name.ilike.%${search}%,student_code.ilike.%${search}%,email.ilike.%${search}%`)
      }

      // Apply class filter
      if (classId) {
        query = query.eq('class_id', classId)
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })

      // Apply pagination
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      return {
        students: data || [],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
        hasNextPage: page < Math.ceil((count || 0) / limit),
        hasPrevPage: page > 1
      }
    } catch (error) {
      console.error('Error fetching students:', error)
      throw error
    }
  }

  // Lấy chi tiết sinh viên
  static async getStudent(id) {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          classes (
            id,
            name,
            grade,
            teacher_id,
            profiles!classes_teacher_id_fkey (
              id,
              full_name,
              email
            )
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching student:', error)
      throw error
    }
  }

  // Tạo sinh viên mới
  static async createStudent(studentData) {
    try {
      // Validate required fields
      const requiredFields = ['student_code', 'full_name', 'class_id']
      for (const field of requiredFields) {
        if (!studentData[field]) {
          throw new Error(`${field} is required`)
        }
      }

      // Check if student code already exists
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .eq('student_code', studentData.student_code)
        .single()

      if (existingStudent) {
        throw new Error('Student code already exists')
      }

      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating student:', error)
      throw error
    }
  }

  // Cập nhật sinh viên
  static async updateStudent(id, studentData) {
    try {
      // Check if student exists
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id, student_code')
        .eq('id', id)
        .single()

      if (!existingStudent) {
        throw new Error('Student not found')
      }

      // If student_code is being updated, check for duplicates
      if (studentData.student_code && studentData.student_code !== existingStudent.student_code) {
        const { data: duplicateStudent } = await supabase
          .from('students')
          .select('id')
          .eq('student_code', studentData.student_code)
          .neq('id', id)
          .single()

        if (duplicateStudent) {
          throw new Error('Student code already exists')
        }
      }

      const { data, error } = await supabase
        .from('students')
        .update(studentData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating student:', error)
      throw error
    }
  }

  // Xóa sinh viên
  static async deleteStudent(id) {
    try {
      // Check if student exists
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .eq('id', id)
        .single()

      if (!existingStudent) {
        throw new Error('Student not found')
      }

      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error deleting student:', error)
      throw error
    }
  }

  // Tìm kiếm sinh viên
  static async searchStudents(query, options = {}) {
    try {
      const { limit = 20 } = options

      const { data, error } = await supabase
        .from('students')
        .select(`
          id,
          student_code,
          full_name,
          email,
          phone,
          classes (
            id,
            name,
            grade
          )
        `)
        .or(`full_name.ilike.%${query}%,student_code.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching students:', error)
      throw error
    }
  }

  // Lấy danh sách lớp học (để assign student)
  static async getClasses() {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          id,
          name,
          grade,
          max_students,
          profiles!classes_teacher_id_fkey (
            id,
            full_name
          )
        `)
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching classes:', error)
      throw error
    }
  }

  // Lấy thống kê sinh viên
  static async getStudentStats() {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('id, is_active, class_id')

      if (error) throw error

      const stats = {
        total: data.length,
        active: data.filter(s => s.is_active).length,
        inactive: data.filter(s => !s.is_active).length,
        byClass: {}
      }

      // Group by class
      data.forEach(student => {
        if (student.class_id) {
          stats.byClass[student.class_id] = (stats.byClass[student.class_id] || 0) + 1
        }
      })

      return stats
    } catch (error) {
      console.error('Error fetching student stats:', error)
      throw error
    }
  }

  // Import sinh viên từ CSV/Excel (future feature)
  static async importStudents(studentsData) {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert(studentsData)
        .select()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error importing students:', error)
      throw error
    }
  }

  // Export sinh viên (future feature)
  static async exportStudents(options = {}) {
    try {
      const { classId = null, format = 'csv' } = options

      let query = supabase
        .from('students')
        .select(`
          student_code,
          full_name,
          email,
          phone,
          date_of_birth,
          gender,
          address,
          emergency_contact,
          emergency_phone,
          is_active,
          created_at,
          classes (
            name,
            grade
          )
        `)

      if (classId) {
        query = query.eq('class_id', classId)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error exporting students:', error)
      throw error
    }
  }
}
