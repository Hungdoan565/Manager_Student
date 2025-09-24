import { useEffect, useState } from 'react'

export function useTheme() {
  const getInitial = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('theme')
        if (stored === 'dark' || stored === 'light') return stored
        const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        return sysDark ? 'dark' : 'light'
      } catch (_) {
        // fallback to document class
        if (typeof document !== 'undefined') return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      }
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

  // Sync with system changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const stored = localStorage.getItem('theme')
      if (!stored) setTheme(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, setTheme, toggle }
}
