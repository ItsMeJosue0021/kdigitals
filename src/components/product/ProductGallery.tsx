import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { Product } from '@/types/product'
import { ProductImage } from './ProductImage'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { images } = product

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-parchment border-line/70 aspect-4/3 overflow-hidden rounded-2xl border">
        <ProductImage
          src={images[activeIndex]}
          alt={product.title}
          seed={product.id}
          eager
        />
      </div>

      {images.length > 1 && (
        <ul role="list" className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === activeIndex}
                className={cn(
                  'bg-parchment aspect-4/3 w-full overflow-hidden rounded-xl border transition-colors',
                  index === activeIndex
                    ? 'border-brand'
                    : 'border-line/70 hover:border-brand/50',
                )}
              >
                <ProductImage src={image} alt="" seed={`${product.id}-${index}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
