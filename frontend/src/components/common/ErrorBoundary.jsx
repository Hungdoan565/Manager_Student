import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught an error', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p className="font-semibold">Đã xảy ra lỗi khi tải nội dung.</p>
          <p className="text-sm text-red-600">Vui lòng tải lại trang hoặc thử lại sau.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
