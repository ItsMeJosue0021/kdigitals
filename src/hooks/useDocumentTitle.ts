import { useEffect } from 'react'
import { BRAND } from '@/config/site'

const SITE_NAME = `${BRAND.namePrefix}${BRAND.nameSuffix}`

/** Sets the browser tab title for a page, restoring it on unmount. */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME

    return () => {
      document.title = previous
    }
  }, [title])
}
