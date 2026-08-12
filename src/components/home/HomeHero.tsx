import { ProductImage } from '@/components/product/ProductImage'
import { Button } from '@/components/ui/Button'
import { DownloadIcon, PencilIcon, PrinterIcon } from '@/components/ui/icons'
import { PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/format'
import type { ReactNode } from 'react'

interface HomeHeroProps {
  /** Anchor the "Browse products" button scrolls to. */
  catalogueId: string
}

const HIGHLIGHTS: readonly { icon: ReactNode; label: string }[] = [
  { icon: <DownloadIcon className="size-4" />, label: 'Instant download' },
  { icon: <PencilIcon className="size-4" />, label: 'Fully editable' },
  { icon: <PrinterIcon className="size-4" />, label: 'Print-ready files' },
]

/** Three covers shown as a preview stack beside the headline. */
const SHOWCASE = PRODUCTS.slice(0, 3)

export function HomeHero({ catalogueId }: HomeHeroProps) {
  const [feature, ...supporting] = SHOWCASE

  return (
    <section className="border-line/60 relative overflow-hidden border-b">
      {/* Soft brand wash behind the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-brand-soft/30 absolute -top-40 -right-32 size-[34rem] rounded-full blur-3xl" />
        <div className="bg-accent/15 absolute -bottom-48 left-1/4 size-[26rem] rounded-full blur-3xl" />
      </div>

      <div className="max-w-page relative mx-auto grid items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="text-brand mb-3 text-sm font-medium tracking-wide uppercase">
            Digital resources for Filipino teachers
          </p>

          <h1 className="text-ink text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
            Classroom-ready materials, without the late nights
          </h1>

          <p className="text-ink-soft mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            Editable lesson logs, worksheets, forms, and classroom decor made
            for the way Philippine classrooms actually run. Download once, use
            them for the whole school year.
          </p>

          <ul
            role="list"
            className="text-ink-soft mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm"
          >
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight.label} className="flex items-center gap-2">
                <span className="text-brand">{highlight.icon}</span>
                {highlight.label}
              </li>
            ))}
          </ul>

          <Button href={`#${catalogueId}`} className="mt-8">
            Browse products
          </Button>
        </div>

        {/* Decorative: the same products appear as real cards below. */}
        <div aria-hidden="true" className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="grid grid-cols-2 gap-4">
            <figure className="border-line/60 col-span-2 -rotate-2 overflow-hidden rounded-2xl border bg-white shadow-[0_18px_50px_rgb(20_32_29/0.12)]">
              <div className="bg-parchment aspect-16/9 overflow-hidden">
                <ProductImage src={feature.images[0]} alt="" seed={feature.id} eager />
              </div>
              <figcaption className="flex items-center justify-between gap-3 p-4">
                <span className="text-ink line-clamp-1 text-sm font-semibold">
                  {feature.title}
                </span>
                <span className="text-ink shrink-0 text-sm font-bold">
                  {formatPrice(feature.price)}
                </span>
              </figcaption>
            </figure>

            {supporting.map((product, index) => (
              <figure
                key={product.id}
                className={`border-line/60 bg-parchment relative aspect-4/3 overflow-hidden rounded-2xl border shadow-[0_12px_32px_rgb(20_32_29/0.10)] ${
                  index === 0 ? 'rotate-3' : '-rotate-1'
                }`}
              >
                <ProductImage src={product.images[0]} alt="" seed={product.id} eager />
                <figcaption className="text-ink absolute right-2 bottom-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold">
                  {formatPrice(product.price)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
