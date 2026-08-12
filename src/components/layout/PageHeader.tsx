interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
}

/** Shared banner for interior pages, matching the home hero's type scale. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-line/60 relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="bg-brand-soft/25 pointer-events-none absolute -top-40 left-1/2 size-104 -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="max-w-page relative mx-auto px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="text-accent-ink animate-rise text-sm font-medium tracking-wide uppercase">
          {eyebrow}
        </p>

        <h1
          className="text-ink animate-rise mt-3 text-4xl leading-[1.15] font-bold text-balance sm:text-5xl"
          style={{ animationDelay: '90ms' }}
        >
          {title}
        </h1>

        <p
          className="text-ink-soft animate-rise mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty"
          style={{ animationDelay: '180ms' }}
        >
          {description}
        </p>
      </div>
    </section>
  )
}
