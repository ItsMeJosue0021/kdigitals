import { NavLink } from 'react-router'
import { PRIMARY_NAV } from '@/config/site'
import { cn } from '@/lib/cn'

interface HeaderNavProps {
  /** `vertical` is the full-screen mobile menu: centred and larger. */
  orientation?: 'horizontal' | 'vertical'
  /** Accessible name, required because the header renders two nav landmarks. */
  label: string
  onNavigate?: () => void
  className?: string
}

/** Underline grows from the middle when centred, from the left otherwise. */
const UNDERLINE =
  'after:absolute after:-bottom-1 after:h-0.5 after:rounded-full after:bg-accent after:transition-[width] after:duration-200'

export function HeaderNav({
  orientation = 'horizontal',
  label,
  onNavigate,
  className,
}: HeaderNavProps) {
  const isVertical = orientation === 'vertical'

  return (
    <nav aria-label={label} className={className}>
      <ul
        role="list"
        className={cn(
          'flex',
          isVertical
            ? 'flex-col items-center gap-6'
            : 'items-center gap-8 xl:gap-10',
        )}
      >
        {PRIMARY_NAV.map((item, index) => (
          <li
            key={item.id}
            className={isVertical ? 'nav-item-in' : undefined}
            style={isVertical ? { animationDelay: `${index * 60}ms` } : undefined}
          >
            <NavLink
              to={item.href}
              end={item.href === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'relative inline-block transition-colors',
                  UNDERLINE,
                  isVertical
                    ? 'text-2xl after:left-1/2 after:-translate-x-1/2'
                    : 'text-[0.9375rem] after:left-0',
                  isActive
                    ? 'text-ink font-semibold after:w-full'
                    : 'text-ink-soft after:w-0 hover:after:w-full',
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
