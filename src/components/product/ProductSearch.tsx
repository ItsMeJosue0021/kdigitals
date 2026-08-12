import { useId } from 'react'
import { CloseIcon, SearchIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { ALL_CATEGORIES, type CategoryFilter } from '@/lib/products'
import { PRODUCT_CATEGORIES } from '@/types/product'

interface ProductSearchProps {
  query: string
  onQueryChange: (query: string) => void
  category: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
}

const FILTERS: readonly { value: CategoryFilter; label: string }[] = [
  { value: ALL_CATEGORIES, label: 'All products' },
  ...PRODUCT_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  })),
]

export function ProductSearch({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: ProductSearchProps) {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor={inputId} className="sr-only">
          Search products
        </label>

        <div className="relative">
          <SearchIcon className="text-ink-soft pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />

          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search lesson plans, worksheets, forms…"
            autoComplete="off"
            className="border-line focus:border-brand placeholder:text-ink-soft/80 w-full rounded-xl border bg-white py-3.5 pr-12 pl-12 text-[0.9375rem] shadow-sm transition-colors outline-none focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:appearance-none"
          />

          {query !== '' && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="text-ink-soft hover:bg-ink/5 hover:text-ink absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg transition-colors"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Below `sm` the chips are one scrollable row that bleeds to the screen
          edge, so a clipped chip hints there is more to scroll. The negative
          margin mirrors the page gutter (`px-4`) on the parent section. */}
      <div
        role="group"
        aria-label="Filter by category"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {FILTERS.map((filter) => {
          const isActive = filter.value === category

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(filter.value)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors cursor-pointer',
                isActive
                  ? 'border-brand bg-brand text-white'
                  : 'border-line text-ink-soft hover:border-brand/50 bg-white',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
