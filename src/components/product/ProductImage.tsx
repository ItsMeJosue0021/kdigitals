import { cn } from '@/lib/cn'
import { placeholderCover } from '@/lib/placeholderCover'

interface ProductImageProps {
  /** Real image URL. Falls back to a generated cover when omitted. */
  src?: string
  /** Empty string when a nearby heading already names the product. */
  alt: string
  /** Keeps the generated cover stable for a given product. */
  seed: string
  className?: string
  /** Skip lazy loading for above-the-fold images. */
  eager?: boolean
}

export function ProductImage({
  src,
  alt,
  seed,
  className,
  eager = false,
}: ProductImageProps) {
  return (
    <img
      src={src ?? placeholderCover(seed)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
