import type { ReactNode } from 'react'
import { ProductImage } from '@/components/product/ProductImage'
import { Button } from '@/components/ui/Button'
import { DownloadIcon, PencilIcon, PrinterIcon } from '@/components/ui/icons'
import { PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/format'

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

/** Entrance order, in milliseconds. */
const DELAY = {
  eyebrow: 0,
  heading: 90,
  body: 180,
  highlights: 270,
  cta: 360,
  showcase: 450,
} as const

export function HomeHero({ catalogueId }: HomeHeroProps) {
  const [feature, ...supporting] = SHOWCASE

  return (
    <section className="border-line/60 relative overflow-hidden border-b">
      {/* Soft brand wash behind the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-brand-soft/30 absolute -top-40 -right-32 size-136 rounded-full blur-3xl" />
        <div className="bg-accent/15 absolute -bottom-48 left-1/4 size-104 rounded-full blur-3xl" />
      </div>

      <div className="max-w-page relative mx-auto grid items-center gap-12 px-4 pt-20 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="text-center lg:text-left">
          <p
            className="text-brand animate-rise mb-3 text-sm font-medium tracking-wide uppercase"
            style={{ animationDelay: `${DELAY.eyebrow}ms` }}
          >
            Digital resources for teachers
          </p>

          <h1
            className="text-ink animate-rise text-4xl leading-[1.15] font-bold text-balance sm:text-5xl"
            style={{ animationDelay: `${DELAY.heading}ms` }}
          >
            Classroom-ready materials, without the late nights
          </h1>

          <p
            className="text-ink-soft animate-rise mx-auto mt-5 max-w-xl text-lg leading-relaxed text-pretty lg:mx-0"
            style={{ animationDelay: `${DELAY.body}ms` }}
          >
            Editable lesson logs, worksheets, forms, and classroom decor made
            for the way Philippine classrooms actually run. Download once, use
            them for the whole school year.
          </p>

          <ul
            role="list"
            className="animate-rise mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start"
            style={{ animationDelay: `${DELAY.highlights}ms` }}
          >
            {HIGHLIGHTS.map((highlight) => (
              <li
                key={highlight.label}
                className="border-line/70 text-ink-soft hover:border-brand/40 hover:text-ink flex items-center gap-2 rounded-full border bg-white/70 px-3.5 py-2 text-sm shadow-sm backdrop-blur-sm transition-colors"
              >
                <span className="text-brand">{highlight.icon}</span>
                {highlight.label}
              </li>
            ))}
          </ul>

          <div
            className="animate-rise mt-9"
            style={{ animationDelay: `${DELAY.cta}ms` }}
          >
            <Button
              href={`#${catalogueId}`}
              className="hover:shadow-brand/25 w-full py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:px-8"
            >
              Browse products
            </Button>
          </div>
        </div>

        {/* Decorative: the same products appear as real cards below. */}
        <div
          aria-hidden="true"
          className="animate-rise mx-auto w-full max-w-sm lg:max-w-md"
          style={{ animationDelay: `${DELAY.showcase}ms` }}
        >
          <div className="grid grid-cols-2 gap-4">
            <figure
              className="border-line/60 animate-float col-span-2 -rotate-2 overflow-hidden rounded-2xl border bg-white shadow-[0_18px_50px_rgb(20_32_29/0.12)]"
              style={{ animationDelay: '-1s' }}
            >
              <div className="bg-parchment aspect-video overflow-hidden">
                <ProductImage
                  src={feature.images[0]}
                  alt=""
                  seed={feature.id}
                  eager
                />
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
                className={`border-line/60 bg-parchment animate-float relative aspect-4/3 overflow-hidden rounded-2xl border shadow-[0_12px_32px_rgb(20_32_29/0.10)] ${
                  index === 0 ? 'rotate-3' : '-rotate-1'
                }`}
                // Negative delays start each card mid-cycle, so they drift
                // out of phase instead of moving as one block.
                style={{ animationDelay: index === 0 ? '-3s' : '-5s' }}
              >
                <ProductImage
                  src={product.images[0]}
                  alt=""
                  seed={product.id}
                  eager
                />
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
