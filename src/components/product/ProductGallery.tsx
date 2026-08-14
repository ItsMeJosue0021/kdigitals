import { useState } from 'react'
import { useImageCarousel } from '@/hooks/useImageCarousel'
import { cn } from '@/lib/cn'
import type { Product } from '@/types/product'
import { ExpandButton } from './ExpandButton'
import { ImageLightbox } from './ImageLightbox'
import { ProductImage } from './ProductImage'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { images } = product
  // One index for both views, so closing the lightbox leaves the gallery on
  // whichever photo was last looked at.
  const { index, select, next, previous } = useImageCarousel(images.length)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Frames follow the shape of the photos, so nothing is cropped and the
  // thumbnails read as miniatures of the large image.
  const isPortrait = product.imageOrientation === 'portrait'
  const frame = isPortrait ? 'aspect-3/4' : 'aspect-4/3'
  const activeImage = images[index]

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        // A portrait frame at full column width would tower over the rest of
        // the page, so it is capped and centred instead.
        isPortrait && 'mx-auto w-full max-w-md',
      )}
    >
      <div
        className={cn(
          'group bg-parchment border-line/70 relative overflow-hidden rounded-2xl border',
          frame,
        )}
      >
        {/*
          Keyed on the image so the entrance animation replays on every
          thumbnail click. The wrapper handles the cross-fade and the <img>
          handles the hover zoom, so the two never fight over `scale`.
        */}
        <div
          key={activeImage ?? 'placeholder'}
          className="fade-scale-in h-full w-full"
        >
          <ProductImage
            src={activeImage}
            alt={product.title}
            seed={product.id}
            eager
            className="cursor-zoom-in transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {images.length > 0 && (
          <ExpandButton
            label={`View ${product.title} photos full screen`}
            onClick={() => setIsLightboxOpen(true)}
          />
        )}

        {images.length > 1 && (
          <p className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            {index + 1} / {images.length}
          </p>
        )}
      </div>

      {images.length > 1 && (
        <ul role="list" className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {images.map((image, thumbIndex) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => select(thumbIndex)}
                aria-label={`Show image ${thumbIndex + 1} of ${images.length}`}
                aria-current={thumbIndex === index}
                className={cn(
                  'group/thumb bg-parchment hover:shadow-card w-full overflow-hidden rounded-xl border transition duration-200 ease-out hover:-translate-y-0.5',
                  frame,
                  thumbIndex === index
                    ? 'border-brand ring-brand/30 ring-2'
                    : 'border-line/70 hover:border-brand/50 opacity-70 hover:opacity-100',
                )}
              >
                <ProductImage
                  src={image}
                  alt=""
                  seed={`${product.id}-${thumbIndex}`}
                  className="transition-transform duration-300 ease-out group-hover/thumb:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <ImageLightbox
          open={isLightboxOpen}
          images={images}
          index={index}
          title={product.title}
          onNext={next}
          onPrevious={previous}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  )
}
