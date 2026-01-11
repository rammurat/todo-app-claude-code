import { useState, useEffect } from 'react'

const THEME_KEY = 'todo-app-theme'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    return stored || 'light'
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
