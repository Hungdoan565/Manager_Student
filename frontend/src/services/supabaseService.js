import { supabase, supabaseHelpers } from '../lib/supabase'

// Authentication service using Supabase
export class AuthService {
  // Sign in with email and password
  static async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Get user profile with role information
      const profile = await supabaseHelpers.getUserProfile(data.user.id)
      
      return {
        user: data.user,
        profile,
        session: data.session
      }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  // Sign up new user
  static async signUp(email, password, userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            role: userData.role || 'student'
          }
        }
      })

      if (error) throw error

      // Create profile record
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: userData.fullName,
            role: userData.role || 'student'
          })

        if (profileError) throw profileError
      }

      return {
        user: data.user,
        session: data.session
      }
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  // Sign out
  static async signOut() {
    try {
      await supabaseHelpers.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  // Get current session
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Get session error:', error)
      throw error
    }
  }

  // Get current user with profile
  static async getCurrentUser() {
    try {
      const user = await supabaseHelpers.getCurrentUser()
      if (!user) return null

      const profile = await supabaseHelpers.getUserProfile(user.id)
      return {
        user,
        profile
      }
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    try {
      return await supabaseHelpers.isAuthenticated()
    } catch (error) {
      console.error('Check authentication error:', error)
      return false
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Reset password
  static async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }

  // Update password
  static async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
    } catch (error) {
      console.error('Update password error:', error)
      throw error
    }
  }

  // Update user profile
  static async updateProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }
}

// Student Management Service
export class StudentService {
  // Get all students (teacher only)
  static async getAllStudents() {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          classes (
            class_name,
            class_code
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get students error:', error)
      throw error
    }
  }

  // Get student by ID
  static async getStudentById(studentId) {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          classes (
            class_name,
            class_code
          )
        `)
        .eq('id', studentId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get student error:', error)
      throw error
    }
  }

  // Create new student
  static async createStudent(studentData) {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert(studentData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Create student error:', error)
      throw error
    }
  }

  // Update student
  static async updateStudent(studentId, studentData) {
    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          ...studentData,
          updated_at: new Date().toISOString()
        })
        .eq('id', studentId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Update student error:', error)
      throw error
    }
  }

  // Delete student
  static async deleteStudent(studentId) {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId)

      if (error) throw error
    } catch (error) {
      console.error('Delete student error:', error)
      throw error
    }
  }

  // Get students by class
  static async getStudentsByClass(classId) {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('class_id', classId)
        .order('full_name')

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get students by class error:', error)
      throw error
    }
  }
}

// Class Management Service
export class ClassService {
  // Get all classes
  static async getAllClasses() {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          profiles!classes_teacher_id_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get classes error:', error)
      throw error
    }
  }

  // Get class by ID
  static async getClassById(classId) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          profiles!classes_teacher_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', classId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get class error:', error)
      throw error
    }
  }

  // Create new class
  static async createClass(classData) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .insert(classData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Create class error:', error)
      throw error
    }
  }

  // Update class
  static async updateClass(classId, classData) {
    try {
      const { data, error } = await supabase
        .from('classes')
        .update({
          ...classData,
          updated_at: new Date().toISOString()
        })
        .eq('id', classId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Update class error:', error)
      throw error
    }
  }

  // Delete class
  static async deleteClass(classId) {
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId)

      if (error) throw error
    } catch (error) {
      console.error('Delete class error:', error)
      throw error
    }
  }
}

// Attendance Service
export class AttendanceService {
  // Get attendance records
  static async getAttendanceRecords(filters = {}) {
    try {
      let query = supabase
        .from('attendance')
        .select(`
          *,
          students (
            student_id,
            full_name,
            email
          ),
          classes (
            class_name,
            class_code
          )
        `)

      // Apply filters
      if (filters.studentId) {
        query = query.eq('student_id', filters.studentId)
      }
      if (filters.classId) {
        query = query.eq('class_id', filters.classId)
      }
      if (filters.date) {
        query = query.eq('attendance_date', filters.date)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query.order('attendance_date', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get attendance records error:', error)
      throw error
    }
  }

  // Mark attendance
  static async markAttendance(attendanceData) {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .insert(attendanceData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Mark attendance error:', error)
      throw error
    }
  }

  // Update attendance
  static async updateAttendance(attendanceId, attendanceData) {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .update({
          ...attendanceData,
          updated_at: new Date().toISOString()
        })
        .eq('id', attendanceId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Update attendance error:', error)
      throw error
    }
  }

  // Get attendance statistics
  static async getAttendanceStats(classId, dateRange) {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .select('status, attendance_date')
        .eq('class_id', classId)
        .gte('attendance_date', dateRange.start)
        .lte('attendance_date', dateRange.end)

      if (error) throw error

      // Calculate statistics
      const stats = {
        total: data.length,
        present: data.filter(record => record.status === 'present').length,
        absent: data.filter(record => record.status === 'absent').length,
        late: data.filter(record => record.status === 'late').length,
        excused: data.filter(record => record.status === 'excused').length
      }

      return stats
    } catch (error) {
      console.error('Get attendance stats error:', error)
      throw error
    }
  }
}
