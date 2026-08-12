import { MoonIcon, SunIcon } from '@/components/ui/icons'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

interface ThemeToggleProps {
  className?: string
}

/** Shared by both glyphs so only their transform and opacity differ. */
const ICON_CLASSES =
  'absolute size-5.5 transition-[opacity,rotate,scale] duration-300 ease-out'

/**
 * Switches between light and dark. The icon shows the theme currently in
 * effect — sun while the site is light — and the label says what pressing
 * it will do, so the button is never ambiguous on its own.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const action = `Switch to ${isDark ? 'light' : 'dark'} mode`

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={action}
      title={action}
      className={cn(
        'text-ink hover:bg-ink/5 relative inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors',
        className,
      )}
    >
      {/* Both glyphs stay mounted and cross-fade, so the swap animates
          instead of popping. `aria-label` above carries the meaning. */}
      <SunIcon
        className={cn(
          ICON_CLASSES,
          isDark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
        )}
      />
      <MoonIcon
        className={cn(
          ICON_CLASSES,
          isDark ? 'scale-100 rotate-0 opacity-100' : '-rotate-90 scale-50 opacity-0',
        )}
      />
    </button>
  )
}
