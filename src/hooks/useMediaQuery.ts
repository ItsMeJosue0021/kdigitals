import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query so components can react to breakpoints.
 * Use only for behaviour (e.g. closing a mobile menu); presentation
 * belongs in CSS media queries.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener('change', onStoreChange)
      return () => mediaQueryList.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  // Media queries cannot be evaluated without a browser environment.
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
