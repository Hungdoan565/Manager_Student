import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tạo tài khoản giáo viên hoặc sinh viên
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary hover:text-primary/80"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
