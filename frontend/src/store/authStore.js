import { create } from 'zustand'
import { AuthService } from '../services/supabaseService'

// Authentication store using Zustand
export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  profile: null,
  session: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Actions
  signIn: async (email, password) => {
    set({ isLoading: true, error: null })
    
    try {
      const result = await AuthService.signIn(email, password)
      
      set({
        user: result.user,
        profile: result.profile,
        session: result.session,
        isAuthenticated: true,
        isLoading: false,
        error: null
      })
      
      return result
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
        isAuthenticated: false
      })
      throw error
    }
  },

  signUp: async (email, password, userData) => {
    set({ isLoading: true, error: null })
    
    try {
      const result = await AuthService.signUp(email, password, userData)
      
      set({
        user: result.user,
        session: result.session,
        isAuthenticated: !!result.user,
        isLoading: false,
        error: null
      })
      
      return result
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
        isAuthenticated: false
      })
      throw error
    }
  },

  signOut: async () => {
    set({ isLoading: true })
    
    try {
      await AuthService.signOut()
      
      set({
        user: null,
        profile: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  checkAuth: async () => {
    set({ isLoading: true })
    
    try {
      const result = await AuthService.getCurrentUser()
      
      if (result) {
        set({
          user: result.user,
          profile: result.profile,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        set({
          user: null,
          profile: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      set({
        user: null,
        profile: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message
      })
    }
  },

  updateProfile: async (profileData) => {
    const { user } = get()
    if (!user) throw new Error('No user logged in')
    
    set({ isLoading: true, error: null })
    
    try {
      const updatedProfile = await AuthService.updateProfile(user.id, profileData)
      
      set({
        profile: updatedProfile,
        isLoading: false,
        error: null
      })
      
      return updatedProfile
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  resetPassword: async (email) => {
    set({ isLoading: true, error: null })
    
    try {
      await AuthService.resetPassword(email)
      set({ isLoading: false, error: null })
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  updatePassword: async (newPassword) => {
    set({ isLoading: true, error: null })
    
    try {
      await AuthService.updatePassword(newPassword)
      set({ isLoading: false, error: null })
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  clearError: () => {
    set({ error: null })
  },

  // Getters
  isTeacher: () => {
    const { profile } = get()
    return profile?.role === 'teacher'
  },

  isStudent: () => {
    const { profile } = get()
    return profile?.role === 'student'
  },

  hasPermission: (permission) => {
    const { profile } = get()
    if (!profile) return false
    
    const permissions = {
      teacher: [
        'student_management',
        'class_management',
        'attendance_management',
        'schedule_management',
        'reports_analytics',
        'system_settings',
        'user_management'
      ],
      student: [
        'view_personal_data',
        'mark_attendance',
        'view_schedule',
        'view_personal_reports'
      ]
    }
    
    return permissions[profile.role]?.includes(permission) || false
  }
}))

// Student management store
export const useStudentStore = create((set, get) => ({
  // State
  students: [],
  currentStudent: null,
  isLoading: false,
  error: null,

  // Actions
  fetchStudents: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const { StudentService } = await import('../services/supabaseService')
      const students = await StudentService.getAllStudents()
      
      set({
        students,
        isLoading: false,
        error: null
      })
      
      return students
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  fetchStudent: async (studentId) => {
    set({ isLoading: true, error: null })
    
    try {
      const { StudentService } = await import('../services/supabaseService')
      const student = await StudentService.getStudentById(studentId)
      
      set({
        currentStudent: student,
        isLoading: false,
        error: null
      })
      
      return student
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  createStudent: async (studentData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { StudentService } = await import('../services/supabaseService')
      const newStudent = await StudentService.createStudent(studentData)
      
      set(state => ({
        students: [newStudent, ...state.students],
        isLoading: false,
        error: null
      }))
      
      return newStudent
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  updateStudent: async (studentId, studentData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { StudentService } = await import('../services/supabaseService')
      const updatedStudent = await StudentService.updateStudent(studentId, studentData)
      
      set(state => ({
        students: state.students.map(student => 
          student.id === studentId ? updatedStudent : student
        ),
        currentStudent: state.currentStudent?.id === studentId ? updatedStudent : state.currentStudent,
        isLoading: false,
        error: null
      }))
      
      return updatedStudent
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  deleteStudent: async (studentId) => {
    set({ isLoading: true, error: null })
    
    try {
      const { StudentService } = await import('../services/supabaseService')
      await StudentService.deleteStudent(studentId)
      
      set(state => ({
        students: state.students.filter(student => student.id !== studentId),
        currentStudent: state.currentStudent?.id === studentId ? null : state.currentStudent,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))

// Class management store
export const useClassStore = create((set, get) => ({
  // State
  classes: [],
  currentClass: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 20,
  },

  // Actions
  fetchClasses: async (options = {}) => {
    set({ isLoading: true, error: null })
    
    try {
      const { ClassService } = await import('../services/classService')
      const page = options.page || get().pagination.currentPage || 1
      const limit = options.limit || get().pagination.limit || 20
      const result = await ClassService.getAllClasses({ page, limit })
      
      set({
        classes: result.items,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          limit,
        },
        isLoading: false,
        error: null
      })
      
      return result
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  fetchClass: async (classId) => {
    set({ isLoading: true, error: null })
    
    try {
      const { ClassService } = await import('../services/classService')
      const classData = await ClassService.getClassById(classId)
      
      set({
        currentClass: classData,
        isLoading: false,
        error: null
      })
      
      return classData
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  createClass: async (classData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { ClassService } = await import('../services/classService')
      const newClass = await ClassService.createClass(classData)
      
      set(state => ({
        classes: [newClass, ...state.classes],
        isLoading: false,
        error: null
      }))
      
      return newClass
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  updateClass: async (classId, classData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { ClassService } = await import('../services/classService')
      const updatedClass = await ClassService.updateClass(classId, classData)
      
      set(state => ({
        classes: state.classes.map(cls => 
          cls.id === classId ? updatedClass : cls
        ),
        currentClass: state.currentClass?.id === classId ? updatedClass : state.currentClass,
        isLoading: false,
        error: null
      }))
      
      return updatedClass
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  deleteClass: async (classId) => {
    set({ isLoading: true, error: null })
    
    try {
      const { ClassService } = await import('../services/classService')
      await ClassService.deleteClass(classId)
      
      set(state => ({
        classes: state.classes.filter(cls => cls.id !== classId),
        currentClass: state.currentClass?.id === classId ? null : state.currentClass,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  clearError: () => {
    set({ error: null })
  },

  updatePagination: (newPagination) => {
    set(state => ({
      pagination: {
        ...state.pagination,
        ...(newPagination.page ? { currentPage: newPagination.page } : {}),
        ...(newPagination.limit ? { limit: newPagination.limit } : {}),
      }
    }))
  }
}))

// Attendance store
export const useAttendanceStore = create((set, get) => ({
  // State
  attendanceRecords: [],
  currentRecord: null,
  isLoading: false,
  error: null,
  stats: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 20,
  },

  // Actions
  fetchAttendanceRecords: async (filters = {}) => {
    set({ isLoading: true, error: null })
    
    try {
      const { AttendanceService } = await import('../services/attendanceService')
      const page = filters.page || get().pagination.currentPage || 1
      const limit = filters.limit || get().pagination.limit || 20
      const result = await AttendanceService.getAttendanceRecords({ ...filters, page, limit })
      
      set({
        attendanceRecords: result.items,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          limit,
        },
        isLoading: false,
        error: null
      })
      
      return result
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  markAttendance: async (attendanceData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { AttendanceService } = await import('../services/attendanceService')
      const newRecord = await AttendanceService.markAttendance(attendanceData)
      
      set(state => ({
        attendanceRecords: [newRecord, ...state.attendanceRecords],
        isLoading: false,
        error: null
      }))
      
      return newRecord
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  updateAttendance: async (attendanceId, attendanceData) => {
    set({ isLoading: true, error: null })
    
    try {
      const { AttendanceService } = await import('../services/attendanceService')
      const updatedRecord = await AttendanceService.updateAttendance(attendanceId, attendanceData)
      
      set(state => ({
        attendanceRecords: state.attendanceRecords.map(record => 
          record.id === attendanceId ? updatedRecord : record
        ),
        currentRecord: state.currentRecord?.id === attendanceId ? updatedRecord : state.currentRecord,
        isLoading: false,
        error: null
      }))
      
      return updatedRecord
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  fetchAttendanceStats: async (classId, dateRange) => {
    set({ isLoading: true, error: null })
    
    try {
      const { AttendanceService } = await import('../services/attendanceService')
      const stats = await AttendanceService.getAttendanceStats(classId, dateRange)
      
      set({
        stats,
        isLoading: false,
        error: null
      })
      
      return stats
    } catch (error) {
      set({
        isLoading: false,
        error: error.message
      })
      throw error
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))
