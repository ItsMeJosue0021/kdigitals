import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'

/**
 * Copies text to the clipboard and reports the outcome for a few seconds.
 *
 * Must be called from a user gesture — browsers reject clipboard writes
 * outside one.
 */
export function useCopyToClipboard(resetAfterMs = 4000) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const copy = useCallback(
    async (text: string) => {
      clearTimeout(timeoutRef.current)

      try {
        // Unavailable outside secure contexts (plain http, some in-app browsers).
        await navigator.clipboard.writeText(text)
        setStatus('copied')
      } catch {
        setStatus('failed')
      }

      timeoutRef.current = setTimeout(() => setStatus('idle'), resetAfterMs)
    },
    [resetAfterMs],
  )

  return { status, copy }
}
