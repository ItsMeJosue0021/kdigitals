import { PRODUCTS } from '@/data/products'
import type { Product, ProductCategory } from '@/types/product'

/** Sentinel for "no category filter applied". */
export const ALL_CATEGORIES = 'all'

export type CategoryFilter = ProductCategory | typeof ALL_CATEGORIES

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

/** Fields a search query is matched against. */
function searchableText(product: Product): string {
  return [
    product.title,
    product.description,
    product.category,
    ...product.inclusions,
  ]
    .join(' ')
    .toLowerCase()
}

/**
 * Filters by category, then by query.
 *
 * The query is split into words and every word must appear somewhere in the
 * product, so "math grade 1" matches regardless of the order the teacher
 * typed the words in.
 */
export function filterProducts(
  products: readonly Product[],
  query: string,
  category: CategoryFilter,
): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  return products.filter((product) => {
    if (category !== ALL_CATEGORIES && product.category !== category) {
      return false
    }

    if (terms.length === 0) return true

    const haystack = searchableText(product)
    return terms.every((term) => haystack.includes(term))
  })
}
