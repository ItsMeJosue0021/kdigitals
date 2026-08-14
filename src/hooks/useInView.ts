import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is on screen.
 *
 * Used to hold an attract animation until the visitor is actually looking at
 * it, so the hint is not spent while the section is scrolled past.
 */
export function useInView<T extends Element>(threshold = 0.5) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
