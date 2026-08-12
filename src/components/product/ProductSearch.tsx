import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
} from '@/components/ui/icons'
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

/** Ignore sub-pixel scroll offsets when deciding if an edge is reached. */
const SCROLL_EPSILON = 2

export function ProductSearch({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: ProductSearchProps) {
  const inputId = useId()
  const filterRowRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState({ start: false, end: false })

  const syncOverflow = useCallback(() => {
    const row = filterRowRef.current
    if (!row) return

    const maxScroll = row.scrollWidth - row.clientWidth
    const start = row.scrollLeft > SCROLL_EPSILON
    const end = row.scrollLeft < maxScroll - SCROLL_EPSILON

    // Keep the previous object when nothing changed, so scrolling does not
    // re-render on every frame.
    setOverflow((previous) =>
      previous.start === start && previous.end === end
        ? previous
        : { start, end },
    )
  }, [])

  useEffect(() => {
    const row = filterRowRef.current
    if (!row) return

    // ResizeObserver fires once on observe, which seeds the initial state and
    // keeps it correct across rotation and breakpoint changes.
    const observer = new ResizeObserver(syncOverflow)
    observer.observe(row)

    return () => observer.disconnect()
  }, [syncOverflow])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor={inputId} className="sr-only">
          Search products
        </label>

        <div className="relative">
          <SearchIcon className="text-ink-soft pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2" />

          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search lesson plans, worksheets, forms…"
            autoComplete="off"
            className="border-line focus:border-brand-ink placeholder:text-ink-soft/80 focus:ring-brand/20 bg-surface text-ink w-full rounded-full border py-3.5 pr-14 pl-13 text-[0.9375rem] shadow-sm transition-colors outline-none focus:ring-2 [&::-webkit-search-cancel-button]:appearance-none"
          />

          {query !== '' && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="text-ink-soft hover:bg-ink/5 hover:text-ink absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg transition-colors"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* The negative margin lives on the wrapper so the scroll hints can sit
          flush against the screen edges. */}
      <div className="relative -mx-4 sm:mx-0">
        <div
          ref={filterRowRef}
          role="group"
          aria-label="Filter by category"
          onScroll={syncOverflow}
          className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
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
                  'shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors',
                  isActive
                    ? 'border-brand bg-brand text-white'
                    : 'border-line text-ink-soft hover:border-brand/50 bg-surface',
                )}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Decorative scroll hints: each fades the row out towards the edge and
            only appears while there is more to scroll that way. */}
        <ScrollHint side="start" visible={overflow.start} />
        <ScrollHint side="end" visible={overflow.end} />
      </div>
    </div>
  )
}

interface ScrollHintProps {
  side: 'start' | 'end'
  visible: boolean
}

function ScrollHint({ side, visible }: ScrollHintProps) {
  const isStart = side === 'start'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'from-parchment pointer-events-none absolute inset-y-0 flex w-14 items-center to-transparent transition-opacity duration-200 sm:hidden',
        isStart
          ? 'left-0 justify-start bg-linear-to-r pl-1'
          : 'right-0 justify-end bg-linear-to-l pr-1',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {isStart ? (
        <ChevronLeftIcon className="text-ink-soft size-5" />
      ) : (
        <ChevronRightIcon className="text-ink-soft size-5" />
      )}
    </div>
  )
}
