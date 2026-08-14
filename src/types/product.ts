export const PRODUCT_CATEGORIES = [
  'Lesson Planning',
  'Teacher Forms',
  'Classroom Decor',
  'Worksheets',
  'Presentations',
  'Planners',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export interface Product {
  /** Stable identifier used as a React key and image seed. */
  id: string
  /** URL segment: /products/<slug>. Must be unique and kebab-case. */
  slug: string
  title: string
  /**
   * Image URLs, first is the cover. Import files from `src/assets` or point
   * at `public/`. When empty, a generated brand placeholder is shown instead.
   */
  images: string[]
  /**
   * Shape of the files in `images`. Landscape is the default, and what the
   * generated placeholder uses; portrait gives the detail gallery a tall
   * frame, so full-page scans fill it instead of being cropped to a strip.
   * Card covers keep the shared 4:3 frame either way, to hold the grid
   * aligned — the expanded view is where the whole photo is seen.
   */
  imageOrientation?: 'landscape' | 'portrait'
  description: string
  /** What the buyer receives, one line per item. */
  inclusions: string[]
  /** Whole pesos (PHP). Kept as a number so it can be formatted and sorted. */
  price: number
  category: ProductCategory
}
