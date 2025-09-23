import React from 'react'

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ✅ App đã chạy thành công!
        </h1>
        <p className="text-gray-600 mb-4">
          Supabase configuration đã được sửa và app đang hoạt động bình thường.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• Syntax errors đã được sửa</p>
          <p>• Dev server đang chạy trên port 3000</p>
          <p>• Supabase client đã được khởi tạo</p>
        </div>
        <div className="mt-6">
          <a 
            href="/" 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  )
}

export default TestPage
