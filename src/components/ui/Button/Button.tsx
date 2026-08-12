import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'messenger'
export type ButtonSize = 'sm' | 'md'

const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border font-medium leading-none whitespace-nowrap transition-colors active:translate-y-px disabled:pointer-events-none disabled:opacity-55'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark',
  outline: 'border-ink/60 bg-white text-ink hover:border-brand hover:text-brand',
  ghost: 'border-transparent bg-transparent text-ink hover:bg-ink/5',
  messenger:
    'border-messenger bg-messenger text-white hover:border-messenger-dark hover:bg-messenger-dark',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[0.9375rem]',
}

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Stretches the button to the full width of its container. */
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type ButtonElementProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type AnchorElementProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    /** When provided, the button renders as an anchor. */
    href: string
  }

export type ButtonProps = ButtonElementProps | AnchorElementProps

/**
 * Renders a `<button>` by default and an `<a>` when `href` is given, so
 * navigational actions keep correct semantics without losing the styling.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    children,
    ...rest
  } = props

  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && 'w-full',
    className,
  )

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorElementProps
    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = rest as ButtonElementProps

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  )
}
