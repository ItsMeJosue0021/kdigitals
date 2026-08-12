/**
 * Builds a link that opens a Messenger conversation *with the page owner*.
 *
 * Both URLs below resolve to the same thread — only the surface differs:
 * - `m.me` is a universal/app link. On a phone the OS hands it to the
 *   Messenger app; if the app is missing it degrades to the mobile web
 *   chat instead of failing silently the way `fb-messenger://` does.
 * - `facebook.com/messages/t` opens the thread inside Facebook's own
 *   inbox UI, which is what desktop users expect.
 */

const MESSENGER_UNIVERSAL_LINK = 'https://m.me'
const FACEBOOK_THREAD_URL = 'https://www.facebook.com/messages/t'

/**
 * @param handle Page username (facebook.com/<username>) or numeric Page ID.
 *   The numeric ID is the most reliable, since usernames can be changed.
 * @param preferApp Whether to target the Messenger app (mobile/tablet).
 */
/**
 * Absolute URL for a path, falling back to the path itself when there is no
 * browser (server rendering, tests).
 */
export function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path
  return new URL(path, window.location.origin).href
}

/**
 * The message a buyer pastes into the chat, so the seller immediately knows
 * which product is meant. Includes the page URL, because product titles can
 * look alike once several bundles exist.
 */
export function buildProductEnquiry(options: {
  shopName: string
  title: string
  price: string
  url: string
}): string {
  const { shopName, title, price, url } = options

  return [
    `Hi ${shopName}! I'd like to order this resource:`,
    '',
    `${title} — ${price}`,
    url,
  ].join('\n')
}

export function buildMessengerHref(handle: string, preferApp: boolean): string {
  const target = encodeURIComponent(handle)

  return preferApp
    ? `${MESSENGER_UNIVERSAL_LINK}/${target}`
    : `${FACEBOOK_THREAD_URL}/${target}`
}
