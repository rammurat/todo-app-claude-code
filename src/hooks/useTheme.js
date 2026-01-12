// React hooks for state management and side effects
import { useState, useEffect } from 'react'

// Constant for localStorage key to persist theme preference
const THEME_KEY = 'todo-app-theme'

/**
 * Custom hook for managing application theme (light/dark mode)
 * 
 * Features:
 * - Persists theme preference in localStorage
 * - Applies theme to document root element
 * - Provides toggle functionality
 * - Defaults to light theme if no preference is stored
 * 
 * @returns {Object} Object containing current theme and toggle function
 * @returns {string} theme - Current theme ('light' or 'dark')
 * @returns {Function} toggleTheme - Function to switch between themes
 */
export function useTheme() {
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    return stored || 'light'
  })

  // Effect to persist theme changes and apply to document
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem(THEME_KEY, theme)
    
    // Apply theme to document root for CSS custom properties
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
