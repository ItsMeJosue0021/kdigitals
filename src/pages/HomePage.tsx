import { useDeferredValue, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { HomeHero } from '@/components/home/HomeHero'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductSearch } from '@/components/product/ProductSearch'
import { Button } from '@/components/ui/Button'
import { PRODUCTS } from '@/data/products'
import {
  ALL_CATEGORIES,
  filterProducts,
  type CategoryFilter,
} from '@/lib/products'
import { PRODUCT_CATEGORIES } from '@/types/product'

/** Query-string keys, so the current search is shareable and survives a reload. */
const QUERY_PARAM = 'q'
const CATEGORY_PARAM = 'category'

/** Anchor target for the hero's "Browse products" button. */
const CATALOGUE_ID = 'products'

function parseCategory(value: string | null): CategoryFilter {
  const match = PRODUCT_CATEGORIES.find((category) => category === value)
  return match ?? ALL_CATEGORIES
}

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get(QUERY_PARAM) ?? ''
  const category = parseCategory(searchParams.get(CATEGORY_PARAM))

  // Keeps typing responsive: the input updates immediately, the (heavier)
  // grid re-renders against a slightly stale query.
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => filterProducts(PRODUCTS, deferredQuery, category),
    [deferredQuery, category],
  )

  /** `replace` keeps every keystroke out of the browser history. */
  function updateParams(next: { query?: string; category?: CategoryFilter }) {
    const params = new URLSearchParams(searchParams)
    const nextQuery = next.query ?? query
    const nextCategory = next.category ?? category

    if (nextQuery) params.set(QUERY_PARAM, nextQuery)
    else params.delete(QUERY_PARAM)

    if (nextCategory !== ALL_CATEGORIES) params.set(CATEGORY_PARAM, nextCategory)
    else params.delete(CATEGORY_PARAM)

    setSearchParams(params, { replace: true })
  }

  const hasFilters = query !== '' || category !== ALL_CATEGORIES

  return (
    <>
      <HomeHero catalogueId={CATALOGUE_ID} />

      <section
        id={CATALOGUE_ID}
        className="max-w-page mx-auto scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <h2 className="sr-only">Browse products</h2>

        <ProductSearch
          query={query}
          onQueryChange={(value) => updateParams({ query: value })}
          category={category}
          onCategoryChange={(value) => updateParams({ category: value })}
        />

        <p aria-live="polite" className="text-ink-soft mt-6 mb-6 text-sm">
          {results.length === PRODUCTS.length
            ? `Showing all ${PRODUCTS.length} products`
            : `${results.length} of ${PRODUCTS.length} products`}
        </p>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="border-line/70 rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
            <p className="text-ink text-lg font-semibold">No products found</p>
            <p className="text-ink-soft mx-auto mt-2 max-w-md text-sm">
              We could not find anything matching your search. Try a different
              keyword, or browse all products.
            </p>

            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                className="mt-6"
                onClick={() =>
                  updateParams({ query: '', category: ALL_CATEGORIES })
                }
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </section>
    </>
  )
}
