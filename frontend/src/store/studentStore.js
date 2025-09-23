import { create } from 'zustand'
import { StudentService } from '../services/studentService'
import { ClassService } from '../services/classService'

// Student Store using Zustand
export const useStudentStore = create((set, get) => ({
  // State
  students: [],
  currentStudent: null,
  classes: [],
  stats: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    classId: null,
    sortBy: 'created_at',
    sortOrder: 'desc'
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10
  },

  // Actions
  // Fetch students with filters and pagination
  fetchStudents: async (options = {}) => {
    set({ loading: true, error: null })
    
    try {
      const currentFilters = get().filters
      const currentPagination = get().pagination
      
      // Normalize pagination options for service (page, limit)
      const page = options.page || options.currentPage || currentPagination.currentPage || 1
      const limit = options.limit || currentPagination.limit || 10

      const params = {
        ...currentFilters,
        page,
        limit,
        ...(options.search ? { search: options.search } : {}),
        ...(options.sortBy ? { sortBy: options.sortBy } : {}),
        ...(options.sortOrder ? { sortOrder: options.sortOrder } : {}),
      }

      const result = await StudentService.getStudents(params)
      
      set({
        students: result.students,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          limit
        },
        loading: false,
        error: null
      })
      
      return result
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch students'
      })
      throw error
    }
  },

  // Fetch single student
  fetchStudent: async (id) => {
    set({ loading: true, error: null })
    
    try {
      const student = await StudentService.getStudent(id)
      
      set({
        currentStudent: student,
        loading: false,
        error: null
      })
      
      return student
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Failed to fetch student'
      })
      throw error
    }
  },

  // Create new student
  createStudent: async (studentData) => {
    set({ loading: true, error: null })
    
    try {
      const newStudent = await StudentService.createStudent(studentData)
      
      // Add to current students list
      set(state => ({
        students: [newStudent, ...state.students],
        loading: false,
        error: null
      }))
      
      return newStudent
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Failed to create student'
      })
      throw error
    }
  },

  // Update student
  updateStudent: async (id, studentData) => {
    set({ loading: true, error: null })
    
    try {
      const updatedStudent = await StudentService.updateStudent(id, studentData)
      
      // Update in current students list
      set(state => ({
        students: state.students.map(student => 
          student.id === id ? updatedStudent : student
        ),
        currentStudent: state.currentStudent?.id === id ? updatedStudent : state.currentStudent,
        loading: false,
        error: null
      }))
      
      return updatedStudent
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Failed to update student'
      })
      throw error
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    set({ loading: true, error: null })
    
    try {
      await StudentService.deleteStudent(id)
      
      // Remove from current students list
      set(state => ({
        students: state.students.filter(student => student.id !== id),
        currentStudent: state.currentStudent?.id === id ? null : state.currentStudent,
        loading: false,
        error: null
      }))
      
      return { success: true }
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Failed to delete student'
      })
      throw error
    }
  },

  // Search students
  searchStudents: async (query, options = {}) => {
    set({ loading: true, error: null })
    
    try {
      const results = await StudentService.searchStudents(query, options)
      
      set({
        loading: false,
        error: null
      })
      
      return results
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Failed to search students'
      })
      throw error
    }
  },

  // Fetch classes
  fetchClasses: async () => {
    try {
      const classes = await ClassService.getAllClasses()
      
      set({ classes })
      return classes
    } catch (error) {
      console.error('Failed to fetch classes:', error)
      throw error
    }
  },

  // Fetch student stats
  fetchStats: async () => {
    try {
      const stats = await StudentService.getStudentStats()
      
      set({ stats })
      return stats
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      throw error
    }
  },

  // Update filters
  updateFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, currentPage: 1 } // Reset to first page
    }))
  },

  // Update pagination
  updatePagination: (newPagination) => {
    set(state => ({
      pagination: {
        ...state.pagination,
        ...(newPagination.page ? { currentPage: newPagination.page } : {}),
        ...(newPagination.currentPage ? { currentPage: newPagination.currentPage } : {}),
        ...(newPagination.limit ? { limit: newPagination.limit } : {}),
        ...(newPagination.totalPages ? { totalPages: newPagination.totalPages } : {}),
        ...(newPagination.totalCount ? { totalCount: newPagination.totalCount } : {}),
      }
    }))
  },

  // Clear error
  clearError: () => {
    set({ error: null })
  },

  // Reset store
  reset: () => {
    set({
      students: [],
      currentStudent: null,
      classes: [],
      stats: null,
      loading: false,
      error: null,
      filters: {
        search: '',
        classId: null,
        sortBy: 'created_at',
        sortOrder: 'desc'
      },
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10
      }
    })
  },

  // Utility functions
  getStudentById: (id) => {
    const state = get()
    return state.students.find(student => student.id === id) || state.currentStudent
  },

  getStudentsByClass: (classId) => {
    const state = get()
    return state.students.filter(student => student.class_id === classId)
  },

  getActiveStudents: () => {
    const state = get()
    return state.students.filter(student => student.is_active)
  },

  getInactiveStudents: () => {
    const state = get()
    return state.students.filter(student => !student.is_active)
  }
}))
