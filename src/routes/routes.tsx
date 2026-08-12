import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PaymentOptionsPage } from '@/pages/PaymentOptionsPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { TestimonialPage } from '@/pages/TestimonialPage'
import { ROUTES } from './paths'

/**
 * Route definitions only — no router instance, so this module stays free of
 * browser APIs and can be rendered into a memory router by tests.
 */
export const routes = [
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: `${ROUTES.products}/:slug`, element: <ProductDetailPage /> },
      { path: ROUTES.paymentOptions, element: <PaymentOptionsPage /> },
      { path: ROUTES.testimonial, element: <TestimonialPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
