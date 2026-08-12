/** Single source of truth for URLs, so links and route definitions cannot drift. */
export const ROUTES = {
  home: '/',
  products: '/products',
  paymentOptions: '/payment-options',
  testimonial: '/testimonial',
} as const

export function productPath(slug: string): string {
  return `${ROUTES.products}/${slug}`
}
