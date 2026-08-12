import { Link } from 'react-router'
import { Button } from '@/components/ui/Button'
import { FacebookIcon, MessengerIcon } from '@/components/ui/icons'
import {
  BRAND,
  BRAND_TAGLINE,
  FACEBOOK_PROFILE_URL,
  MESSENGER,
  PRIMARY_NAV,
} from '@/config/site'
import { Logo } from '@/components/ui/Logo'
import { useMessengerLink } from '@/hooks/useMessengerLink'
import { ROUTES } from '@/routes/paths'
import { PRODUCT_CATEGORIES } from '@/types/product'

const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

const LINK_CLASSES = 'text-ink-soft hover:text-brand text-sm transition-colors'
const HEADING_CLASSES =
  'text-ink text-sm font-semibold tracking-wide uppercase'

export function Footer() {
  const messengerHref = useMessengerLink(MESSENGER.handle)
  const year = new Date().getFullYear()

  return (
    <footer className="border-line/70 mt-auto border-t bg-white">
      {/* Centred while the columns are stacked; left-aligned once they sit
          side by side at `sm`. Inline-level children (logo, buttons, links)
          follow the `text-center` on this container. */}
      <div className="max-w-page mx-auto grid gap-10 px-4 py-14 text-center sm:grid-cols-2 sm:px-6 sm:text-left lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex justify-center sm:justify-start">
            <Logo label="Go to homepage" />
          </div>

          <p className="text-ink-soft mx-auto mt-4 max-w-sm text-sm leading-relaxed sm:mx-0">
            {BRAND_TAGLINE}
          </p>

          <Button
            href={messengerHref}
            variant="messenger"
            size="sm"
            className="mt-6"
            {...EXTERNAL_LINK_PROPS}
          >
            <MessengerIcon className="size-4" />
            {MESSENGER.ctaLabel}
          </Button>
        </div>

        <nav aria-labelledby="footer-browse">
          <h2 id="footer-browse" className={HEADING_CLASSES}>
            Browse
          </h2>

          <ul role="list" className="mt-4 flex flex-col gap-3">
            {PRIMARY_NAV.map((item) => (
              <li key={item.id}>
                <Link to={item.href} className={LINK_CLASSES}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-categories">
          <h2 id="footer-categories" className={HEADING_CLASSES}>
            Categories
          </h2>

          <ul role="list" className="mt-4 flex flex-col gap-3">
            {PRODUCT_CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  to={`${ROUTES.home}?category=${encodeURIComponent(category)}`}
                  className={LINK_CLASSES}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-connect">
          <h2 id="footer-connect" className={HEADING_CLASSES}>
            Connect
          </h2>

          <ul role="list" className="mt-4 flex flex-col gap-3">
            <li>
              <a
                href={messengerHref}
                className={`${LINK_CLASSES} inline-flex items-center gap-2`}
                {...EXTERNAL_LINK_PROPS}
              >
                <MessengerIcon className="size-4" />
                Messenger
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_PROFILE_URL}
                className={`${LINK_CLASSES} inline-flex items-center gap-2`}
                {...EXTERNAL_LINK_PROPS}
              >
                <FacebookIcon className="size-4" />
                Facebook
              </a>
            </li>
          </ul>

          <p className="text-ink-soft mx-auto mt-6 max-w-sm text-sm leading-relaxed sm:mx-0">
            Questions before you buy? Message us — we usually reply within the
            day.
          </p>
        </nav>
      </div>

      <div className="border-line/70 border-t">
        <div className="max-w-page text-ink-soft mx-auto flex flex-col gap-2 px-4 py-6 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>
            &copy; {year} {BRAND.namePrefix}
            {BRAND.nameSuffix}. All rights reserved.
          </p>
          <p>Made for Filipino teachers.</p>
        </div>
      </div>
    </footer>
  )
}
