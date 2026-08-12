import { Link, useParams } from 'react-router'
import { MessengerCallout } from '@/components/common/MessengerCallout'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ArrowLeftIcon, CheckIcon } from '@/components/ui/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatPrice } from '@/lib/format'
import { getProductBySlug } from '@/lib/products'
import { ROUTES } from '@/routes/paths'
import { NotFoundPage } from './NotFoundPage'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined

  useDocumentTitle(product?.title)

  if (!product) {
    return <NotFoundPage />
  }

  return (
    <div className="max-w-page mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        to={ROUTES.home}
        className="text-ink-soft hover:text-brand inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to products
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery product={product} />

        <div className="flex flex-col">
          <p className="text-brand text-xs font-medium tracking-wide uppercase">
            {product.category}
          </p>

          <h1 className="text-ink mt-3 text-2xl leading-tight font-bold text-balance sm:text-3xl">
            {product.title}
          </h1>

          <p className="text-ink mt-4 text-3xl font-bold">
            {formatPrice(product.price)}
          </p>

          <p className="text-ink-soft mt-6 leading-relaxed">
            {product.description}
          </p>

          <h2 className="text-ink mt-8 text-lg font-semibold">
            What&rsquo;s included
          </h2>

          <ul role="list" className="mt-4 flex flex-col gap-3">
            {product.inclusions.map((inclusion) => (
              <li key={inclusion} className="flex items-start gap-3">
                <span className="bg-brand/10 text-brand mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-ink-soft text-[0.9375rem]">
                  {inclusion}
                </span>
              </li>
            ))}
          </ul>

          <MessengerCallout
            variant="card"
            className="mt-10"
            title="Interested in this resource?"
            description="Message us on Messenger and we will send the payment details and download link."
          />

          <p className="text-ink-soft mt-4 text-center text-sm">
            <Link
              to={ROUTES.paymentOptions}
              className="text-brand font-medium hover:underline"
            >
              See accepted payment methods
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
