import { useEffect, useState } from 'react'
import { CloseIcon } from '@/components/ui/icons'
import { useImageCarousel } from '@/hooks/useImageCarousel'
import type { Product } from '@/types/product'
import { CarouselArrows } from './CarouselArrows'
import { ExpandButton } from './ExpandButton'
import { ProductImage } from './ProductImage'

interface CardImageViewerProps {
  product: Product
  /** First row of cards is above the fold, so its cover loads eagerly. */
  eager?: boolean
}

/**
 * The cover image of a product card, plus the expanded view it opens into.
 *
 * Two siblings rather than one wrapper: the cover is laid in behind the whole
 * card for the details to sit over, while the expanded view is absolutely
 * positioned against the card as well, so it covers those details too. Both
 * need the card's `group` and `relative` context, so this renders as a fragment
 * inside the card.
 */
export function CardImageViewer({ product, eager = false }: CardImageViewerProps) {
  const { images } = product
  const [isExpanded, setIsExpanded] = useState(false)
  const { index, next, previous } = useImageCarousel(images.length)

  // Bound to the window rather than the overlay: this is an inline panel, not
  // a modal, so nothing here holds focus on its own.
  useEffect(() => {
    if (!isExpanded) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsExpanded(false)
      else if (event.key === 'ArrowRight') next()
      else if (event.key === 'ArrowLeft') previous()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isExpanded, next, previous])

  return (
    <>
      <div className="bg-parchment absolute inset-0 overflow-hidden">
        <ProductImage
          src={images[0]}
          alt=""
          seed={product.id}
          eager={eager}
          className="transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />

        {images.length > 0 && !isExpanded && (
          <ExpandButton
            label={`View photos of ${product.title}`}
            onClick={() => setIsExpanded(true)}
          />
        )}
      </div>

      {isExpanded && (
        <div
          // Closes on a click that lands on the backdrop itself, never on one
          // that bubbled up from the image or a control.
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsExpanded(false)
          }}
          role="group"
          aria-label={`${product.title} photos`}
          className="fade-scale-in absolute inset-0 z-20 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm"
        >
          <img
            key={images[index]}
            src={images[index]}
            alt={`${product.title} — image ${index + 1} of ${images.length}`}
            className="fade-scale-in max-h-full max-w-full rounded-lg object-contain shadow-lift"
          />

          {images.length > 1 && (
            <CarouselArrows onPrevious={previous} onNext={next} />
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label="Close expanded image"
            className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition duration-200 ease-out hover:scale-110 hover:bg-black/75 active:scale-95"
          >
            <CloseIcon className="size-4.5" />
          </button>

          {images.length > 1 && (
            <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
              {index + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  )
}
