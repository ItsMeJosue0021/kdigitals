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
export function buildMessengerHref(handle: string, preferApp: boolean): string {
  const target = encodeURIComponent(handle)

  return preferApp
    ? `${MESSENGER_UNIVERSAL_LINK}/${target}`
    : `${FACEBOOK_THREAD_URL}/${target}`
}
