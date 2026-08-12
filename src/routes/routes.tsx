import { RootLayout } from '@/components/layout/RootLayout'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
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
      {
        path: ROUTES.paymentOptions,
        element: <ComingSoonPage title="Payment Options" />,
      },
      {
        path: ROUTES.testimonial,
        element: <ComingSoonPage title="Testimonial" />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
