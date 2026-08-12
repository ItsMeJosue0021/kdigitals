import { NavLink } from 'react-router'
import { PRIMARY_NAV } from '@/config/site'
import { cn } from '@/lib/cn'

interface HeaderNavProps {
  orientation?: 'horizontal' | 'vertical'
  /** Accessible name, required because the header renders two nav landmarks. */
  label: string
  onNavigate?: () => void
  className?: string
}

const LINK_CLASSES =
  'relative inline-block text-[0.9375rem] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-[width] after:duration-200'

export function HeaderNav({
  orientation = 'horizontal',
  label,
  onNavigate,
  className,
}: HeaderNavProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul
        role="list"
        className={cn(
          'flex',
          orientation === 'horizontal'
            ? 'items-center gap-8 xl:gap-10'
            : 'flex-col gap-1',
        )}
      >
        {PRIMARY_NAV.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.href}
              end={item.href === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  LINK_CLASSES,
                  isActive
                    ? 'text-ink font-medium after:w-full'
                    : 'text-ink-soft hover:text-ink after:w-0 hover:after:w-full',
                  orientation === 'vertical' && 'w-full py-2 text-base',
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
