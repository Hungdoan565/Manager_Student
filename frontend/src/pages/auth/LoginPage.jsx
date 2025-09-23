import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Đăng nhập vào hệ thống
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quản lý sinh viên và điểm danh
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link 
              to="/register" 
              className="font-medium text-primary hover:text-primary/80"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
