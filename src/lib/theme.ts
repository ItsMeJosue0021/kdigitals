/**
 * Theme plumbing shared by the React provider and the pre-paint script in
 * index.html. That script duplicates the storage key, the class name, and
 * the fallback rule below — change them here and there together.
 */

/** The theme actually in effect. Drives the `.dark` class on <html>. */
export type Theme = 'light' | 'dark'

/** What the visitor chose. `system` follows the OS until they pick a side. */
export type ThemeSetting = Theme | 'system'

export const THEME_STORAGE_KEY = 'kstore-theme'

/** Class on <html> that every dark token and `dark:` utility hangs off. */
export const DARK_CLASS = 'dark'

export const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

/**
 * Reads the saved choice. Anything unrecognised — including a value written
 * by an older build — falls back to following the system.
 */
export function readThemeSetting(): ThemeSetting {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    // Storage throws when cookies are blocked, and in some in-app browsers.
    return 'system'
  }
}

export function writeThemeSetting(setting: ThemeSetting): void {
  try {
    if (setting === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, setting)
  } catch {
    // Not being able to remember the choice is not worth breaking the toggle.
  }
}

/** Applies the resolved theme to <html>. The class swaps every token. */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark')
}
