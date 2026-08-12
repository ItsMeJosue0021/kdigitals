import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CheckIcon, MessengerIcon } from '@/components/ui/icons'
import type { CopyStatus } from '@/hooks/useCopyToClipboard'

interface MessengerRedirectDialogProps {
  open: boolean
  /** Messenger URL to send the buyer to. */
  href: string
  /** Product name, shown so the buyer knows what was copied. */
  itemName?: string
  copyStatus: CopyStatus
  /** Reading time before the new tab opens. */
  delayMs?: number
  onClose: () => void
}

const DEFAULT_DELAY_MS = 2800

/**
 * Opens Messenger in a new tab. This page is never navigated away from.
 *
 * `noopener` is deliberately NOT passed in the features string: doing so
 * makes `window.open` return null even when it succeeded, which makes a
 * blocked popup impossible to detect. The opener link is severed manually
 * instead, which gives the same protection.
 *
 * Returns false when the browser blocked the popup.
 */
function openMessengerTab(href: string): boolean {
  const opened = window.open(href, '_blank')
  if (!opened) return false

  opened.opener = null
  return true
}

export function MessengerRedirectDialog({
  open,
  href,
  itemName,
  copyStatus,
  delayMs = DEFAULT_DELAY_MS,
  onClose,
}: MessengerRedirectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const didCopy = copyStatus !== 'failed'

  // Drive the native dialog: top layer, focus trap, and Escape for free.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  // Hold briefly so the buyer can read what happens next, then hand off.
  useEffect(() => {
    if (!open) return

    const timer = setTimeout(() => {
      if (openMessengerTab(href)) onClose()
      else setIsBlocked(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [open, href, delayMs, onClose])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="messenger-redirect-title"
      className="modal-dialog"
      onClose={onClose}
    >
      <div className="border-line/70 bg-surface shadow-modal w-[min(26rem,calc(100vw-2rem))] rounded-2xl border p-6 text-center sm:p-8">
        <span
          className={`inline-flex size-14 items-center justify-center rounded-full ${
            didCopy ? 'bg-success/12 text-success' : 'bg-accent/15 text-accent-ink'
          }`}
        >
          <CheckIcon className="size-7" strokeWidth={2.5} />
        </span>

        <h2
          id="messenger-redirect-title"
          className="text-ink mt-5 text-xl font-bold"
        >
          {didCopy ? 'Details copied' : 'Almost there'}
        </h2>

        {didCopy ? (
          <p className="text-ink-soft mt-2 text-sm leading-relaxed">
            {itemName ? (
              <>
                <span className="text-ink font-medium">{itemName}</span> is on
                your clipboard.{' '}
              </>
            ) : (
              'The product details are on your clipboard. '
            )}
            Paste it in the chat so we know exactly what you need.
          </p>
        ) : (
          <p className="text-ink-soft mt-2 text-sm leading-relaxed">
            We could not copy the details automatically. Just tell us the
            product name in your message and we will take it from there.
          </p>
        )}

        {isBlocked ? (
          <p className="text-accent-ink bg-accent/10 mt-6 rounded-xl px-4 py-3 text-sm leading-relaxed">
            Your browser blocked the new tab. Use the button below to open
            Messenger.
          </p>
        ) : (
          <>
            <div className="text-ink-soft mt-6 flex items-center justify-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="border-messenger/25 border-t-messenger size-4 animate-spin rounded-full border-2"
              />
              Opening Messenger in a new tab…
            </div>

            <div
              className="bg-line/60 mt-3 h-1.5 overflow-hidden rounded-full"
              role="progressbar"
              aria-label="Opening Messenger"
            >
              <div
                className="progress-fill bg-messenger h-full rounded-full"
                style={{ animationDuration: `${delayMs}ms` }}
              />
            </div>
          </>
        )}

        <div className="mt-6 flex flex-col gap-2">
          {/* A real anchor: target="_blank" is never popup-blocked, and it
              can never navigate this page. */}
          <Button
            href={href}
            variant="messenger"
            fullWidth
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <MessengerIcon className="size-5" />
            Open Messenger now
          </Button>

          <Button variant="ghost" size="sm" fullWidth onClick={onClose}>
            {isBlocked ? 'Close' : 'Cancel'}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
