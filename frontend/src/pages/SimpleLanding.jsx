import React from 'react'
import { Link } from 'react-router-dom'

const SimpleLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Student Management System
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Hệ thống quản lý sinh viên
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Quản lý lớp học, điểm danh và báo cáo thống kê một cách hiệu quả
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login"
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Đăng nhập
            </Link>
            <Link 
              to="/register"
              className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg hover:bg-green-500 hover:text-white transition-colors font-semibold"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Test Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Test Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/login"
              className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors text-center"
            >
              Login Page
            </Link>
            <Link 
              to="/register"
              className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors text-center"
            >
              Register Page
            </Link>
            <Link 
              to="/simple-test"
              className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors text-center"
            >
              Simple Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleLanding
