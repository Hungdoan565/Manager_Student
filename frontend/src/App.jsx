import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import LandingPage from './pages/LandingPage'

// Dashboard Components
import HorizontalDashboardLayout from './components/layout/HorizontalDashboardLayout'
import StudentDashboard from './pages/dashboard/StudentDashboard'
import TeacherDashboard from './pages/dashboard/TeacherDashboard'

// Student Management Pages
import StudentListPage from './pages/students/StudentListPage'

// Other Pages
import AttendancePage from './pages/attendance/AttendancePage'
import ClassesPage from './pages/classes/ClassesPage'
import ReportsPage from './pages/reports/ReportsPage'
import SettingsPage from './pages/settings/SettingsPage'

// Protected Routes
import { ProtectedRoute, StudentRoute, TeacherRoute } from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Dashboard Routes - Using Horizontal Layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        {/* Teacher Dashboard */}
        <Route index element={
          <TeacherRoute>
            <TeacherDashboard />
          </TeacherRoute>
        } />
        
        {/* Student Dashboard */}
        <Route path="student" element={
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        } />
      </Route>

      {/* Student Management Routes */}
      <Route path="/students" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <TeacherRoute>
            <StudentListPage />
          </TeacherRoute>
        } />
      </Route>

      {/* Classes Management Routes */}
      <Route path="/classes" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <TeacherRoute>
            <ClassesPage />
          </TeacherRoute>
        } />
      </Route>

      {/* Attendance Routes */}
      <Route path="/attendance" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <TeacherRoute>
            <AttendancePage />
          </TeacherRoute>
        } />
      </Route>

      {/* Reports Routes */}
      <Route path="/reports" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <TeacherRoute>
            <ReportsPage />
          </TeacherRoute>
        } />
      </Route>

      {/* Settings Routes */}
      <Route path="/settings" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <TeacherRoute>
            <SettingsPage />
          </TeacherRoute>
        } />
      </Route>

      {/* Direct Dashboard Routes */}
      <Route path="/teacher-dashboard" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <TeacherRoute>
            <TeacherDashboard />
          </TeacherRoute>
        } />
      </Route>
      
      <Route path="/student-dashboard" element={
        <ProtectedRoute>
          <HorizontalDashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App