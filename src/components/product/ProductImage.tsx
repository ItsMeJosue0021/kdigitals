import { cn } from '@/lib/cn'
import { placeholderCover, type CoverPalette } from '@/lib/placeholderCover'

interface ProductImageProps {
  /** Real image URL. Falls back to a generated cover when omitted. */
  src?: string
  /** Empty string when a nearby heading already names the product. */
  alt: string
  /** Keeps the generated cover stable for a given product. */
  seed: string
  /** Pins the generated cover's gradient instead of deriving it from `seed`. */
  palette?: CoverPalette
  className?: string
  /** Skip lazy loading for above-the-fold images. */
  eager?: boolean
}

export function ProductImage({
  src,
  alt,
  seed,
  palette,
  className,
  eager = false,
}: ProductImageProps) {
  return (
    <img
      src={src ?? placeholderCover(seed, palette)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
