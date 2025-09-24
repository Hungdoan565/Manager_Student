import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleToggle = () => {
    const next = isDark ? 'light' : 'dark'
    // Update DOM immediately to avoid delays
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try { localStorage.setItem('theme', next) } catch (_) {}
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`group inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/60 bg-card hover:bg-muted text-foreground shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 ${className}`}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-200 ease-out group-hover:rotate-12" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-200 ease-out group-hover:-rotate-12" />
      )}
    </button>
  )
}

export default ThemeToggle
