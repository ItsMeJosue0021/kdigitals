import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type ThemeContextValue } from '@/context/ThemeContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  applyTheme,
  COLOR_SCHEME_QUERY,
  readThemeSetting,
  writeThemeSetting,
  type Theme,
  type ThemeSetting,
} from '@/lib/theme'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Owns the light/dark choice for the whole site.
 *
 * Until the visitor uses the toggle the setting stays `system`, so the site
 * follows the OS and keeps following it when that changes mid-session. The
 * first explicit choice is remembered and wins from then on.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Lazy initialiser: localStorage is read once, on mount.
  const [setting, setSettingState] = useState<ThemeSetting>(readThemeSetting)
  const prefersDark = useMediaQuery(COLOR_SCHEME_QUERY)

  const theme: Theme =
    setting === 'system' ? (prefersDark ? 'dark' : 'light') : setting

  // The pre-paint script in index.html has already put the right class on
  // <html> for the first render; this keeps it in step with every change
  // after that, including the OS flipping while `setting` is `system`.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setSetting = useCallback((next: ThemeSetting) => {
    writeThemeSetting(next)
    setSettingState(next)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setting,
      setSetting,
      toggleTheme: () => setSetting(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, setting, setSetting],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
