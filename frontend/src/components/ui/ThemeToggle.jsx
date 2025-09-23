import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors ${className}`}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}

export default ThemeToggle
