import { StarIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import type { Testimonial } from '@/types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
}

const MAX_RATING = 5

/** "Maricel Santos" -> "MS" */
function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="border-line/70 bg-surface flex h-full flex-col rounded-2xl border p-6">
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`${testimonial.rating} out of ${MAX_RATING} stars`}
      >
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <StarIcon
            key={index}
            className={cn(
              'size-4',
              index < testimonial.rating ? 'text-accent' : 'text-line',
            )}
          />
        ))}
      </div>

      <blockquote className="text-ink mt-4 flex-1 leading-relaxed">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <p className="text-ink-soft mt-5 text-xs">
        Purchased{' '}
        <span className="text-brand-ink font-medium">{testimonial.product}</span>
      </p>

      <footer className="border-line/70 mt-5 flex items-center gap-3 border-t pt-5">
        <span
          aria-hidden="true"
          className="bg-brand-soft/30 text-brand-ink dark:bg-brand-soft/15 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
        >
          {initials(testimonial.name)}
        </span>

        <div className="min-w-0">
          <p className="text-ink truncate text-sm font-semibold">
            {testimonial.name}
          </p>
          <p className="text-ink-soft truncate text-sm">
            {testimonial.role} &middot; {testimonial.location}
          </p>
        </div>
      </footer>
    </article>
  )
}
