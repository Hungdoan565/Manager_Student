import { Building2, GraduationCap } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import SmoothDropdown from '../components/ui/SmoothDropdown'

const FormTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Test Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Form Components Test
          </h1>
          <p className="text-gray-600 text-lg">
            Kiểm tra các cải tiến: Rounded inputs và Smooth dropdown animations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Form Test */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Login Form Test
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="test@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-full font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>Test Login Form</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Register Form Test */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Register Form Test
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò (SmoothDropdown)
                </label>
                <SmoothDropdown
                  options={[
                    { value: 'student', label: 'Sinh viên' },
                    { value: 'teacher', label: 'Giáo viên' }
                  ]}
                  placeholder="Chọn vai trò"
                  icon={GraduationCap}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoa (SmoothDropdown)
                </label>
                <SmoothDropdown
                  options={[
                    { value: '', label: 'Chọn khoa' },
                    { value: 'cntt', label: 'Công nghệ thông tin' },
                    { value: 'kt', label: 'Kinh tế' },
                    { value: 'nn', label: 'Ngoại ngữ' }
                  ]}
                  placeholder="Chọn khoa"
                  icon={Building2}
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-full font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>Test Register Form</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Cải tiến đã thực hiện
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-emerald-600">🎨 Visual Improvements</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Input fields với rounded-full</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Custom SmoothDropdown component</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Smooth dropdown animations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Rounded dropdown options</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-emerald-600">⚡ Animation Improvements</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Framer Motion animations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Staggered option animations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Rotating chevron icon</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>Scale effects on hover</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="bg-gray-500 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-600 transition-colors inline-flex items-center space-x-2"
            >
              <span>Về trang chủ</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormTest
