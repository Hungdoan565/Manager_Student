import { useEffect, useState } from 'react'

export function useTheme() {
  const getInitial = () => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
    return 'light'
  }

  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, setTheme, toggle }
}
