import { ExpandIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

interface ExpandButtonProps {
  onClick: () => void
  /** Announced to screen readers, e.g. "View photos of <product>". */
  label: string
  className?: string
}

/**
 * "See this image larger" affordance. Fades in with the hover of the nearest
 * `group` ancestor, and stays visible on small screens, where there is no
 * hover to reveal it with.
 */
export function ExpandButton({ onClick, label, className }: ExpandButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title="Expand image"
      className={cn(
        'absolute top-3 right-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100 hover:scale-110 hover:bg-black/75 focus-visible:opacity-100 active:scale-95 max-md:opacity-100',
        className,
      )}
    >
      <ExpandIcon className="size-4.5" />
    </button>
  )
}
