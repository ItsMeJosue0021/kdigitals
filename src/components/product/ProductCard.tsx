import { Link } from 'react-router'
import { formatPrice } from '@/lib/format'
import { productPath } from '@/routes/paths'
import type { Product } from '@/types/product'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  /** First row of cards is above the fold, so its images load eagerly. */
  eager?: boolean
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    <article className="group border-line/70 hover:border-brand/40 bg-surface hover:shadow-card relative flex w-full flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-1 focus-within:-translate-y-1">
      <div className="bg-parchment aspect-4/3 overflow-hidden">
        <ProductImage
          src={product.images[0]}
          alt=""
          seed={product.id}
          eager={eager}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-brand-ink text-xs font-medium tracking-wide uppercase">
          {product.category}
        </p>

        <h3 className="text-ink text-base leading-snug font-semibold">
          {/* Stretched link: the whole card is clickable, but only the
              title text is announced as the link. */}
          <Link
            to={productPath(product.slug)}
            className="before:absolute before:inset-0 before:content-['']"
          >
            {product.title}
          </Link>
        </h3>

        <p className="text-ink-soft line-clamp-2 text-sm">
          {product.description}
        </p>

        <p className="text-ink mt-auto pt-3 text-lg font-bold">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  )
}
