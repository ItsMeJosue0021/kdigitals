import { createContext } from 'react'
import type { Theme, ThemeSetting } from '@/lib/theme'

export interface ThemeContextValue {
  /** The theme in effect right now, with `system` already resolved. */
  theme: Theme
  /** The visitor's choice; `system` until they use the toggle. */
  setting: ThemeSetting
  setSetting: (setting: ThemeSetting) => void
  /** Switches to the opposite of the theme currently showing. */
  toggleTheme: () => void
}

/**
 * `null` default so `useTheme` can tell "no provider" apart from a real
 * value, instead of silently handing back a light-mode stub.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null)
