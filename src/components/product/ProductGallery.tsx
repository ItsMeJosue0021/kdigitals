import { SwipeableCardStack } from '@/components/common/SwipeableCardStack'
import { useImageCarousel } from '@/hooks/useImageCarousel'
import { cn } from '@/lib/cn'
import type { Product } from '@/types/product'
import { ProductImage } from './ProductImage'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { images } = product
  const { index, next } = useImageCarousel(images.length)

  // The frame follows the shape of the photos, so nothing is cropped.
  const isPortrait = product.imageOrientation === 'portrait'
  // A product with no photos still gets a card: the empty string stands in for
  // a URL, and `ProductImage` draws its generated cover in place of it.
  const cards = images.length > 0 ? images : ['']

  return (
    <div
      className={cn(
        // A portrait frame at full column width would tower over the rest of
        // the page, so it is capped and centred instead.
        isPortrait && 'mx-auto w-full max-w-md',
      )}
    >
      <SwipeableCardStack
        items={cards}
        index={index}
        onNext={next}
        keyOf={(image) => image}
        label={`${product.title} photos`}
        frame={isPortrait ? 'aspect-3/4' : 'aspect-4/3'}
        cardClassName="bg-parchment border-line/70 shadow-card rounded-2xl border"
        renderCard={(image, isTop) => (
          <ProductImage
            src={image || undefined}
            alt={
              isTop
                ? `${product.title} — image ${index + 1} of ${images.length}`
                : ''
            }
            seed={product.id}
            eager={isTop}
            // Keeps the browser's native image drag from hijacking a swipe.
            className="pointer-events-none"
          />
        )}
      />
    </div>
  )
}
