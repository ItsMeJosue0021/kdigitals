import { useCallback, useRef, useState, type PointerEvent } from 'react'

/** Horizontal travel, in px, that commits a swipe instead of springing back. */
const COMMIT_DISTANCE = 56
/** A flick this quick commits even when it never travelled the full distance. */
const COMMIT_VELOCITY = 0.4
/** Below this the gesture is a tap, and no amount of speed makes it a swipe. */
const DRAG_SLOP = 6

interface DragSwipeOptions {
  /**
   * Dragging left reveals what comes after the current item. Both callbacks
   * receive the gesture's final travel, so the caller can hand an exit
   * animation the offset the card was released at.
   */
  onSwipeLeft: (travelled: number) => void
  onSwipeRight: (travelled: number) => void
  enabled?: boolean
}

interface DragSwipe {
  /** Live horizontal travel of the gesture; back to 0 the moment it ends. */
  offset: number
  isDragging: boolean
  handlers: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void
    onPointerMove: (event: PointerEvent<HTMLElement>) => void
    onPointerUp: (event: PointerEvent<HTMLElement>) => void
    onPointerCancel: (event: PointerEvent<HTMLElement>) => void
  }
}

interface Gesture {
  id: number
  startX: number
  lastX: number
  lastTime: number
  velocity: number
}

/**
 * Pointer-drag paging for a carousel, from one gesture handler set that covers
 * touch, pen, and mouse alike.
 *
 * The element this binds to needs `touch-pan-y`: that hands vertical drags back
 * to the browser as page scrolling — which arrives here as a `pointercancel` —
 * while horizontal ones stay with us.
 */
export function useDragSwipe({
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}: DragSwipeOptions): DragSwipe {
  const gesture = useRef<Gesture | null>(null)
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const end = useCallback(() => {
    gesture.current = null
    setOffset(0)
    setIsDragging(false)
  }, [])

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      // Secondary mouse buttons open context menus rather than drag.
      if (!enabled || (event.pointerType === 'mouse' && event.button !== 0)) {
        return
      }

      gesture.current = {
        id: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        lastTime: event.timeStamp,
        velocity: 0,
      }
      // Capture so a drag that leaves the card still reports its moves here.
      event.currentTarget.setPointerCapture(event.pointerId)
      setIsDragging(true)
    },
    [enabled],
  )

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const active = gesture.current
    if (!active || active.id !== event.pointerId) return

    const elapsed = event.timeStamp - active.lastTime
    if (elapsed > 0) {
      active.velocity = (event.clientX - active.lastX) / elapsed
      active.lastX = event.clientX
      active.lastTime = event.timeStamp
    }

    setOffset(event.clientX - active.startX)
  }, [])

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const active = gesture.current
      if (!active || active.id !== event.pointerId) return

      const travelled = event.clientX - active.startX
      const committed =
        Math.abs(travelled) >= COMMIT_DISTANCE ||
        // Direction has to agree, or a flick back towards centre would page.
        (Math.abs(active.velocity) >= COMMIT_VELOCITY &&
          Math.sign(active.velocity) === Math.sign(travelled) &&
          Math.abs(travelled) > DRAG_SLOP)

      // Cleared before the callback so the stack re-renders from a neutral
      // offset with the new index already applied.
      end()

      if (committed) {
        if (travelled < 0) onSwipeLeft(travelled)
        else onSwipeRight(travelled)
      }
    },
    [end, onSwipeLeft, onSwipeRight],
  )

  const onPointerCancel = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (gesture.current?.id !== event.pointerId) return
      end()
    },
    [end],
  )

  return {
    offset,
    isDragging,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  }
}
