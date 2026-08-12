import { useCallback, useEffect, useRef, useState } from 'react'
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
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const messengerHref = useMessengerLink(MESSENGER.handle)

  // Derived rather than stored, so resizing up to `lg` closes the menu
  // (and releases the scroll lock) without an extra state sync.
  const isMenuOpen = isMenuRequested && !isDesktop

  const closeMenu = useCallback(() => setIsMenuRequested(false), [])

  // Drive the native dialog from React state. `showModal` puts it in the top
  // layer, which brings focus trapping, Escape-to-close, and an inert
  // background along with it.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isMenuOpen && !dialog.open) dialog.showModal()
    else if (!isMenuOpen && dialog.open) dialog.close()
  }, [isMenuOpen])

  // Stop the page behind the dialog from scrolling.
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="border-line/80 bg-parchment/90 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="max-w-page mx-auto flex h-18 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-ink hover:bg-ink/5 -ml-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-lg transition-colors lg:hidden"
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
              aria-label="Open menu"
              onClick={() => setIsMenuRequested(true)}
            >
              <MenuIcon className="size-7" strokeWidth={2} />
            </button>

            <Logo />
          </div>

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

          {/* Icon-only Messenger shortcut, mirroring the desktop CTA. */}
          <a
            href={messengerHref}
            aria-label={MESSENGER.ctaLabel}
            className="bg-messenger hover:bg-messenger-dark -mr-1 inline-flex size-11 items-center justify-center rounded-full text-white transition-colors lg:hidden"
            {...CTA_LINK_PROPS}
          >
            <MessengerIcon className="size-5.5" />
          </a>
        </div>
      </header>

      {/*
        Rendered outside <header> on purpose: the header's `backdrop-blur`
        would otherwise become the containing block for this dialog.
        `onClose` syncs state back when the browser closes it (Escape).
      */}
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="nav-dialog lg:hidden"
        onClose={closeMenu}
      >
        <div className="bg-parchment flex h-full flex-col">
          {/* Mirrors the header bar, so the close button sits exactly where
              the menu button was tapped. */}
          <div className="max-w-page mx-auto flex h-18 w-full shrink-0 items-center gap-2 px-4 sm:px-6">
            <button
              type="button"
              className="text-ink hover:bg-ink/5 -ml-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-lg transition-colors"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <CloseIcon className="size-7" strokeWidth={2} />
            </button>

            <Logo />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-20">
            <HeaderNav orientation="vertical" label="Site" onNavigate={closeMenu} />

            <div
              className="nav-item-in w-full max-w-xs"
              style={{ animationDelay: '240ms' }}
            >
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
        </div>
      </dialog>
    </>
  )
}
