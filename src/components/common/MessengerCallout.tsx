import { Button } from '@/components/ui/Button'
import { MessengerIcon } from '@/components/ui/icons'
import { MESSENGER } from '@/config/site'
import { useMessengerLink } from '@/hooks/useMessengerLink'
import { cn } from '@/lib/cn'

interface MessengerCalloutProps {
  title: string
  description: string
  /** `panel` sits inside a page; `card` is the compact product-page version. */
  variant?: 'panel' | 'card'
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
  className,
}: MessengerCalloutProps) {
  const messengerHref = useMessengerLink(MESSENGER.handle)
  const isPanel = variant === 'panel'

  return (
    <div
      className={cn(
        'border-line/70 rounded-2xl border bg-white',
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
      >
        <MessengerIcon className="size-5" />
        {MESSENGER.ctaLabel}
      </Button>
    </div>
  )
}
