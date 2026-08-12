import { useCallback, useState, type MouseEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { MessengerIcon } from '@/components/ui/icons'
import { MESSENGER } from '@/config/site'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useMessengerLink } from '@/hooks/useMessengerLink'
import { cn } from '@/lib/cn'
import { MessengerRedirectDialog } from './MessengerRedirectDialog'

interface MessengerCalloutProps {
  title: string
  description: string
  /** `panel` sits inside a page; `card` is the compact product-page version. */
  variant?: 'panel' | 'card'
  /**
   * Copied to the clipboard before opening Messenger, so the buyer can paste
   * it into the chat. Messenger has no supported way to prefill a message.
   * Supplying this also switches the button to the copy flow and its dialog.
   */
  copyText?: string
  /** Product name shown in the confirmation dialog. */
  itemName?: string
  className?: string
}

/**
 * Shared "message us to order" block. Ordering happens on Messenger, so this
 * is the single conversion point repeated across pages.
 */
export function MessengerCallout({
  title,
  description,
  variant = 'panel',
  copyText,
  itemName,
  className,
}: MessengerCalloutProps) {
  const messengerHref = useMessengerLink(MESSENGER.handle)
  const { status, copy } = useCopyToClipboard()
  const [isRedirecting, setIsRedirecting] = useState(false)
  // Bumped per attempt so the dialog remounts with fresh state each time.
  const [attempt, setAttempt] = useState(0)
  const isPanel = variant === 'panel'

  const closeDialog = useCallback(() => setIsRedirecting(false), [])

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!copyText) return

    // Let people open the link their own way (new tab, middle click).
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()
    void copy(copyText)
    setAttempt((value) => value + 1)
    setIsRedirecting(true)
  }

  return (
    <div
      className={cn(
        'border-line/70 bg-surface rounded-2xl border',
        isPanel ? 'p-8 text-center sm:p-10' : 'p-5',
        className,
      )}
    >
      <p
        className={cn(
          'text-ink font-semibold',
          isPanel ? 'text-xl sm:text-2xl' : 'text-sm',
        )}
      >
        {title}
      </p>

      <p
        className={cn(
          'text-ink-soft mt-2 text-sm leading-relaxed',
          isPanel && 'mx-auto max-w-md text-base',
        )}
      >
        {description}
      </p>

      <Button
        href={messengerHref}
        variant="messenger"
        fullWidth={!isPanel}
        className={isPanel ? 'mt-6' : 'mt-4'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <MessengerIcon className="size-5" />
        {copyText ? MESSENGER.copyCtaLabel : MESSENGER.ctaLabel}
      </Button>

      {copyText && (
        <MessengerRedirectDialog
          key={attempt}
          open={isRedirecting}
          href={messengerHref}
          itemName={itemName}
          copyStatus={status}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
