import { useCallback, useEffect, useId, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { CloseIcon, MenuIcon, MessengerIcon } from '@/components/ui/icons'
import { MESSENGER } from '@/config/site'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useMessengerLink } from '@/hooks/useMessengerLink'
import { HeaderNav } from './HeaderNav'

/** Matches the `lg:` breakpoint at which the full navigation is shown. */
const DESKTOP_QUERY = '(min-width: 64rem)'

/** Messenger opens in a new tab so the visitor keeps the site open behind it. */
const CTA_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const

export function Header() {
  const [isMenuRequested, setIsMenuRequested] = useState(false)
  const menuId = useId()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const messengerHref = useMessengerLink(MESSENGER.handle)

  // Derived rather than stored, so resizing up to `lg` closes the panel
  // (and releases the scroll lock) without an extra state sync.
  const isMenuOpen = isMenuRequested && !isDesktop

  const closeMenu = useCallback(() => setIsMenuRequested(false), [])

  // Dismiss with Escape and stop the page behind the panel from scrolling.
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen, closeMenu])

  return (
    <header className="border-line/80 bg-parchment/90 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="max-w-page mx-auto flex h-18 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <HeaderNav label="Primary" className="hidden lg:block" />

        <Button
          href={messengerHref}
          variant="messenger"
          className="hidden lg:inline-flex"
          {...CTA_LINK_PROPS}
        >
          <MessengerIcon className="size-5" />
          {MESSENGER.ctaLabel}
        </Button>

        <button
          type="button"
          className="text-ink hover:bg-ink/5 -mr-2 inline-flex size-10 items-center justify-center rounded-lg transition-colors lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuRequested((requested) => !requested)}
        >
          {isMenuOpen ? (
            <CloseIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <>
          {/* Rendered before the panel so the panel stays on top of it. */}
          <div
            className="bg-ink/25 fixed inset-x-0 top-18 bottom-0 lg:hidden"
            onClick={closeMenu}
          />

          <div
            id={menuId}
            className="border-line/80 bg-parchment animate-slide-down relative border-b lg:hidden"
          >
            <div className="max-w-page mx-auto flex flex-col gap-4 px-4 py-5 sm:px-6">
              <HeaderNav
                orientation="vertical"
                label="Mobile"
                onNavigate={closeMenu}
              />
              <Button
                href={messengerHref}
                variant="messenger"
                fullWidth
                onClick={closeMenu}
                {...CTA_LINK_PROPS}
              >
                <MessengerIcon className="size-5" />
                {MESSENGER.ctaLabel}
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
