import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface ComingSoonPageProps {
  title: string
}

/** Placeholder for nav destinations that have not been built yet. */
export function ComingSoonPage({ title }: ComingSoonPageProps) {
  useDocumentTitle(title)

  return (
    <div className="max-w-page mx-auto px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-ink text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="text-ink-soft mx-auto mt-3 max-w-md">
        This page is coming soon.
      </p>
    </div>
  )
}
