import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import LandingPage from './pages/LandingPage'
import NavTest from './pages/NavTest'
import SimpleLanding from './pages/SimpleLanding'
import SimpleTest from './pages/SimpleTest'
import TestPage from './pages/TestPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/simple" element={<SimpleLanding />} />
      <Route path="/nav-test" element={<NavTest />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/simple-test" element={<SimpleTest />} />
    </Routes>
  )
}

export default App