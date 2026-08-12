import { Link } from 'react-router'
import { BRAND } from '@/config/site'
import { cn } from '@/lib/cn'

interface LogoProps {
  /** Announced destination label for assistive technology. */
  label?: string
  className?: string
}

/**
 * Brand lockup: placeholder mark + two-tone wordmark.
 * Swap the inline SVG for the final artwork when it is available.
 *
 * The same mark is duplicated in `public/favicon.svg` — a favicon is loaded
 * as its own document, so it cannot share this component. Update both.
 */
export function Logo({ label = 'Go to homepage', className }: LogoProps) {
  return (
    <Link
      className={cn('inline-flex shrink-0 items-center gap-2', className)}
      to={BRAND.href}
      aria-label={label}
    >
      <svg
        className="size-7"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Teal arc uses `brand-ink` so it lightens on the dark header
            instead of sinking into it. The gold arc reads on both. */}
        <path
          d="M5 24C5 13.5 12 6 22 5"
          stroke="var(--color-brand-ink)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M10 27C20 26 27 18.5 27 8"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-[1.375rem] leading-none font-bold tracking-tight">
        <span className="text-accent">{BRAND.namePrefix}</span>
        <span className="text-ink">{BRAND.nameSuffix}</span>
      </span>
    </Link>
  )
}
