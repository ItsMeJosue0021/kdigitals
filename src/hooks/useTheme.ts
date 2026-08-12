import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '@/context/ThemeContext'

/** Reads the current theme and the controls to change it. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>')
  }

  return context
}
