import React from 'react'
import { Link } from 'react-router-dom'

const SimpleTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Test Navigation
        </h1>
        
        <div className="space-y-4">
          <div>
            <Link 
              to="/login"
              className="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Đăng nhập (Simple Link)
            </Link>
          </div>
          
          <div>
            <Link 
              to="/register"
              className="block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Đăng ký (Simple Link)
            </Link>
          </div>
          
          <div>
            <Link 
              to="/"
              className="block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <p>Nếu các links trên hoạt động thì vấn đề là với AnimatedButton component.</p>
        </div>
      </div>
    </div>
  )
}

export default SimpleTest
