import React from 'react'
import { Link } from 'react-router-dom'

const NavTest = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Test Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SMS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Student Management</span>
            </div>

            {/* Auth Buttons - Test */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link 
                to="/login"
                className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register"
                className="text-gray-700 hover:text-green-600 transition-colors duration-300 font-medium px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Test Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Test Navigation Buttons
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Kiểm tra navigation:</h2>
            
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Link 
                  to="/login"
                  className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors font-medium"
                >
                  Bắt đầu ngay
                </Link>
                <Link 
                  to="/register"
                  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors font-medium"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
              
              <div className="text-sm text-gray-600 mt-6">
                <p>✅ Cả hai nút đều có trong navigation bar</p>
                <p>✅ Responsive design cho mobile và desktop</p>
                <p>✅ Hover effects và transitions</p>
                <p>✅ Links hoạt động với React Router</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/"
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavTest
