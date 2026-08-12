import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: readonly Product[]
}

/** Cards in the first row on a wide screen — these load without lazy loading. */
const EAGER_COUNT = 3

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product, index) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} eager={index < EAGER_COUNT} />
        </li>
      ))}
    </ul>
  )
}
