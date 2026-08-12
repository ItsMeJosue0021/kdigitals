import { buildMessengerHref } from '@/lib/messenger'
import { useMediaQuery } from './useMediaQuery'

/**
 * Touch devices without hover — phones and tablets, i.e. where the
 * Messenger app is likely installed. Deliberately not a width breakpoint:
 * a narrow desktop window is still a desktop.
 */
const TOUCH_DEVICE_QUERY = '(hover: none) and (pointer: coarse)'

/**
 * Returns the Messenger conversation link best suited to the current device:
 * the app on mobile, Facebook's inbox on desktop.
 */
export function useMessengerLink(handle: string): string {
  const isTouchDevice = useMediaQuery(TOUCH_DEVICE_QUERY)

  return buildMessengerHref(handle, isTouchDevice)
}
