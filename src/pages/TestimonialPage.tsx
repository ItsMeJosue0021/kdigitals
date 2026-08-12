import { Link } from 'react-router'
import { MessengerCallout } from '@/components/common/MessengerCallout'
import { PageHeader } from '@/components/layout/PageHeader'
import { TestimonialCard } from '@/components/testimonial/TestimonialCard'
import { TESTIMONIALS } from '@/data/testimonials'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/routes/paths'

export function TestimonialPage() {
  useDocumentTitle('Testimonial')

  return (
    <>
      <PageHeader
        eyebrow="From our buyers"
        title="What teachers say"
        description="Feedback from teachers who use these resources in their own classrooms — on lesson planning, checking, and setting up their rooms."
      />

      <div className="max-w-page mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.id} className="flex">
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>

        <MessengerCallout
          className="mt-14"
          title="Have you used one of our resources?"
          description="We would love to hear how it went. Send us a message and tell us what worked, or what we should make next."
        />

        <p className="text-ink-soft mt-6 text-center text-sm">
          Want to see what they bought?{' '}
          <Link
            to={ROUTES.home}
            className="text-brand-ink font-medium hover:underline"
          >
            Browse all products
          </Link>
        </p>
      </div>
    </>
  )
}
