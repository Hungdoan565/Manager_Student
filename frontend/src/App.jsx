import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import LandingPage from './pages/LandingPage'

// Dashboard Components
import DashboardLayout from './components/layout/DashboardLayout'
import StudentDashboard from './pages/dashboard/StudentDashboard'
import TeacherDashboard from './pages/dashboard/TeacherDashboard'

// Protected Routes
import { ProtectedRoute, StudentRoute, TeacherRoute } from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
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

      {/* Direct Dashboard Routes */}
      <Route path="/teacher-dashboard" element={
        <TeacherRoute>
          <DashboardLayout>
            <TeacherDashboard />
          </DashboardLayout>
        </TeacherRoute>
      } />
      
      <Route path="/student-dashboard" element={
        <StudentRoute>
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        </StudentRoute>
      } />
    </Routes>
  )
}

export default App