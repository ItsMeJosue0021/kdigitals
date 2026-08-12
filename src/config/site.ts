import type { NavItem } from '@/types/navigation'

/**
 * Site-wide content configuration.
 * Keeping copy and links here keeps layout components presentational.
 */

export const BRAND = {
  /** Wordmark is split so the first fragment can carry the accent colour. */
  namePrefix: "K",
  nameSuffix: 'Digitals',
  href: '/',
} as const

export const PRIMARY_NAV: readonly NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'payment-options', label: 'Payment Options', href: '/payment-options' },
  { id: 'testimonial', label: 'Testimonial', href: '/testimonial' },
]

export const MESSENGER = {
  /**
   * Numeric ID of the account that receives enquiries:
   * facebook.com/profile.php?id=61593157712865
   *
   * The account has no username, so the ID is the only usable identifier —
   * which is also the more stable choice, since it never changes.
   */
  handle: '61593157712865',
  ctaLabel: 'Send us a Message',
} as const
