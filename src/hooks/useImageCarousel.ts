import { useCallback, useState } from 'react'

interface ImageCarousel {
  index: number
  next: () => void
  previous: () => void
}

/**
 * Wrap-around index state for a set of images.
 *
 * Shared by the product gallery, the expanded card, and the lightbox, so
 * paging past either end behaves the same in all three.
 */
export function useImageCarousel(count: number): ImageCarousel {
  const [index, setIndex] = useState(0)

  // An empty set would turn the modulo below into NaN.
  const length = Math.max(count, 1)

  const step = useCallback(
    (delta: number) =>
      setIndex((current) => (current + delta + length) % length),
    [length],
  )

  const next = useCallback(() => step(1), [step])
  const previous = useCallback(() => step(-1), [step])

  return { index, next, previous }
}
