import type { ReactNode } from 'react'
import { SwipeableCardStack } from '@/components/common/SwipeableCardStack'
import { ProductImage } from '@/components/product/ProductImage'
import { Button } from '@/components/ui/Button'
import { DownloadIcon, PencilIcon, PrinterIcon } from '@/components/ui/icons'
import { PRODUCTS } from '@/data/products'
import { useImageCarousel } from '@/hooks/useImageCarousel'
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

/** The two small covers tucked under the deck. */
const SUPPORTING = PRODUCTS.slice(1, 3)

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
  const { index, next } = useImageCarousel(PRODUCTS.length)

  return (
    <section className="border-line/60 relative overflow-hidden border-b">
      {/* Soft brand wash behind the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Dialled back on dark: the same opacity over a near-black page
            reads as a glowing blob rather than a tint. */}
        <div className="bg-brand-soft/30 dark:bg-brand-soft/12 absolute -top-40 -right-32 size-136 rounded-full blur-3xl" />
        <div className="bg-accent/15 dark:bg-accent/8 absolute -bottom-48 left-1/4 size-104 rounded-full blur-3xl" />
      </div>

      <div className="max-w-page relative mx-auto grid items-center gap-12 px-4 pt-20 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="text-center lg:text-left">
          <p
            className="text-accent-ink animate-rise mb-3 text-sm font-medium tracking-wide uppercase"
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
                className="border-line/70 text-ink-soft hover:border-brand/40 hover:text-ink bg-surface/70 flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm shadow-sm backdrop-blur-sm transition-colors"
              >
                <span className="text-brand-ink">{highlight.icon}</span>
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

        {/*
          Decorative: every one of these products appears as a real, linked card
          further down the page, so the deck stays out of the accessibility tree
          and takes no focus — passing no `label` to the stack is what keeps a
          focus stop from landing inside `aria-hidden` content.
        */}
        <div
          aria-hidden="true"
          // Leads on small screens, where the deck is the first thing worth
          // touching; back to its place beside the headline once the two
          // columns sit side by side. Source order stays text-first, so this
          // never moves ahead of the heading for a screen reader.
          className="animate-rise order-first mx-auto w-full max-w-sm lg:order-0 lg:max-w-md"
          style={{ animationDelay: `${DELAY.showcase}ms` }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <SwipeableCardStack
                items={PRODUCTS}
                index={index}
                onNext={next}
                keyOf={(product) => product.id}
                // Taller than the covers alone: the caption takes what it needs
                // and the image stretches into the rest, so the frame holds its
                // shape at every column width.
                frame="aspect-16/11"
                tilt={-2}
                cardClassName="border-line/60 bg-surface shadow-lift flex flex-col rounded-2xl border"
                renderCard={(product, isTop) => (
                  <>
                    <div className="bg-parchment min-h-0 flex-1 overflow-hidden">
                      {/* Gold cover so the deck is not teal on teal on teal. */}
                      <ProductImage
                        src={product.images[0]}
                        alt=""
                        seed={product.id}
                        palette="gold"
                        eager={isTop}
                        className="pointer-events-none"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <span className="text-ink line-clamp-1 text-sm font-semibold">
                        {product.title}
                      </span>
                      <span className="text-ink shrink-0 text-sm font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </>
                )}
              />
            </div>

            {SUPPORTING.map((product, position) => (
              <figure
                key={product.id}
                className={`border-line/60 bg-parchment animate-float shadow-float relative aspect-4/3 overflow-hidden rounded-2xl border ${
                  position === 0 ? 'rotate-3' : '-rotate-1'
                }`}
                // Negative delays start each card mid-cycle, so they drift
                // out of phase instead of moving as one block.
                style={{ animationDelay: position === 0 ? '-3s' : '-5s' }}
              >
                <ProductImage
                  src={product.images[0]}
                  alt=""
                  seed={product.id}
                  eager
                />
                <figcaption className="text-ink bg-surface/95 absolute right-2 bottom-2 rounded-full px-2.5 py-1 text-xs font-bold">
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
