import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

interface CarouselArrowsProps {
  onPrevious: () => void
  onNext: () => void
  /** `sm` fits inside a product card, `md` suits the full-screen lightbox. */
  size?: 'sm' | 'md'
}

/** Sits on top of the image, so both themes get the same dark chip. */
const BASE =
  'absolute top-1/2 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition duration-200 ease-out hover:bg-black/75 hover:scale-110 active:scale-95'

export function CarouselArrows({
  onPrevious,
  onNext,
  size = 'sm',
}: CarouselArrowsProps) {
  const isSmall = size === 'sm'
  const box = cn(BASE, isSmall ? 'size-9' : 'size-11 sm:size-12')
  const icon = isSmall ? 'size-4.5' : 'size-6'

  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous image"
        className={cn(box, isSmall ? 'left-2' : 'left-2 sm:left-4')}
      >
        <ChevronLeftIcon className={icon} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next image"
        className={cn(box, isSmall ? 'right-2' : 'right-2 sm:right-4')}
      >
        <ChevronRightIcon className={icon} />
      </button>
    </>
  )
}
