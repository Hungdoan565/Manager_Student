import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()
  
  // Define breadcrumb mappings
  const breadcrumbMap = {
    '/dashboard': { label: 'Tổng quan', icon: Home },
    '/students': { label: 'Sinh viên', icon: null },
    '/classes': { label: 'Lớp học', icon: null },
    '/attendance': { label: 'Điểm danh', icon: null },
    '/reports': { label: 'Báo cáo', icon: null },
    '/settings': { label: 'Cài đặt', icon: null },
    '/students/create': { label: 'Thêm sinh viên', icon: null },
    '/classes/create': { label: 'Tạo lớp học', icon: null },
    '/attendance/take': { label: 'Điểm danh', icon: null }
  }

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs = []

    // Always start with home/dashboard
    breadcrumbs.push({
      label: 'Tổng quan',
      path: '/dashboard',
      icon: Home,
      isActive: location.pathname === '/dashboard'
    })

    // Add other segments
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Skip if it's the first segment (dashboard)
      if (index === 0 && segment === 'dashboard') return
      
      const breadcrumb = breadcrumbMap[currentPath]
      if (breadcrumb) {
        breadcrumbs.push({
          label: breadcrumb.label,
          path: currentPath,
          icon: breadcrumb.icon,
          isActive: location.pathname === currentPath
        })
      } else {
        // Handle dynamic routes (e.g., /students/123)
        if (segment.match(/^\d+$/)) {
          // It's an ID, get the parent context
          const parentPath = currentPath.replace(`/${segment}`, '')
          const parentBreadcrumb = breadcrumbMap[parentPath]
          if (parentBreadcrumb) {
            breadcrumbs.push({
              label: `${parentBreadcrumb.label} #${segment}`,
              path: currentPath,
              icon: null,
              isActive: true
            })
          }
        } else {
          // Fallback for unknown segments
          breadcrumbs.push({
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            path: currentPath,
            icon: null,
            isActive: location.pathname === currentPath
          })
        }
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't show breadcrumbs on dashboard home
  if (location.pathname === '/dashboard') {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center space-x-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          
          {breadcrumb.isActive ? (
            <span className="flex items-center space-x-1 text-gray-900 font-medium">
              {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4" />}
              <span>{breadcrumb.label}</span>
            </span>
          ) : (
            <Link
              to={breadcrumb.path}
              className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4" />}
              <span>{breadcrumb.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumbs
