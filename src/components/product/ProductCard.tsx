import { Link } from 'react-router'
import { formatPrice } from '@/lib/format'
import { productPath } from '@/routes/paths'
import type { Product } from '@/types/product'
import { CardImageViewer } from './CardImageViewer'

interface ProductCardProps {
  product: Product
  /** First row of cards is above the fold, so its images load eagerly. */
  eager?: boolean
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    /*
      The cover is the card: it fills the whole frame and dissolves into the
      background where the details begin. A fixed ratio rather than
      content-driven height, because with the photo behind everything there is
      no longer a block of text setting the card's size — and it keeps a row of
      cards aligned.

      Nothing between here and the title's stretched link may be positioned, or
      its `inset-0` would cover only that ancestor instead of the whole card.
      Hence the fade and the details lift themselves with `z-10` alone: a flex
      item takes a z-index while staying `static`.
    */
    <article className="group border-line/70 hover:border-brand/40 bg-surface hover:shadow-card relative flex aspect-4/5 w-full flex-col justify-end overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-1 focus-within:-translate-y-1">
      <CardImageViewer product={product} eager={eager} />

      {/* A short first half, so the photo stays clear most of the way down and
          only starts giving way just above the details, at 85% surface. */}
      <div
        aria-hidden="true"
        className="from-surface/85 z-10 h-16 shrink-0 bg-linear-to-t to-transparent"
      />

      {/*
        …and a long second half underneath the text, picking up at the same 85%
        and closing to solid 70% of the way down — past the description, near
        the price. Most of the ramp lives here rather than above the copy, which
        is what keeps the photo present behind the text instead of stopping
        short of it.

        Measuring that stretch in percent of the panel, not pixels, keeps the
        fade finishing at the same place in the text whether the title runs to
        one line or three.
      */}
      <div className="from-surface/85 to-surface z-10 flex flex-col gap-2 bg-linear-to-b to-70% px-5 pt-1 pb-5">
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

        <p className="text-ink pt-2 text-lg font-bold">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  )
}
