import { Link } from 'react-router'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/routes/paths'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div className="max-w-page mx-auto px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-brand text-sm font-medium tracking-wide uppercase">
        404
      </p>

      <h1 className="text-ink mt-3 text-2xl font-bold sm:text-3xl">
        We could not find that page
      </h1>

      <p className="text-ink-soft mx-auto mt-3 max-w-md">
        The link may be outdated, or the product may no longer be available.
      </p>

      <Link
        to={ROUTES.home}
        className="border-line hover:border-brand hover:text-brand mt-8 inline-flex rounded-lg border bg-white px-5 py-3 text-[0.9375rem] font-medium transition-colors"
      >
        Browse all products
      </Link>
    </div>
  )
}
