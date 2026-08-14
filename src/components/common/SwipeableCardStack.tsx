import {
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { useDragSwipe } from '@/hooks/useDragSwipe'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

interface SwipeableCardStackProps<T> {
  /** Paged with wrap-around, so swiping never runs out of cards. */
  items: readonly T[]
  index: number
  onNext: () => void
  /** Stable identity per item — cards are keyed by content, not by slot. */
  keyOf: (item: T) => string
  /** Contents of one card. `isTop` gates work only the front card needs. */
  renderCard: (item: T, isTop: boolean) => ReactNode
  /** Aspect class for the frame the deck sits in. */
  frame: string
  /** Chrome shared by every card: background, border, radius, shadow. */
  cardClassName?: string
  /**
   * Resting angle of the deck in degrees, with each card behind fanned a
   * little further round. Applied as the standalone `rotate` property so it
   * survives the `transform` the drag and the attract loop write.
   */
  tilt?: number
  /**
   * Names the deck for screen readers and makes it keyboard-pageable. Leave it
   * off for decorative decks — a focus stop inside `aria-hidden` content is
   * worse than no keyboard access at all.
   */
  label?: string
}

/** Cards drawn behind the top one. Any more and the peek stops reading. */
const DEPTH = 3
/** Each step back shrinks the card by this much. */
const DEPTH_SCALE = 0.06
/** …and slides it this far right, as a percentage of the card's own width. */
const DEPTH_SHIFT = 9.5
/**
 * Width of the frame kept clear to the right of the top card, as a percentage
 * of the column. The deck peeks into this strip: at the numbers above, the
 * furthest card reaches 1.13× the card width, just inside the 1.136× on offer.
 */
const PEEK_STRIP = 12
/** Degrees between one card in the fan and the next. */
const FAN = 2.5

/** How far the card tips, in degrees, at the far end of a drag. */
const MAX_TILT = 8

/**
 * A deck of cards browsed by throwing the top one aside.
 *
 * Paging is circular and one-way: a swipe in either direction deals the next
 * item, and only the throw follows the hand. So the deck is rendered as slots
 * counted forward from the current index rather than as a window into the array
 * — there is no first or last, and no way to run out. Each card is keyed by its
 * item, so advancing the index re-labels the slots and the survivors glide
 * forward under their own transition instead of snapping.
 */
export function SwipeableCardStack<T>({
  items,
  index,
  onNext,
  keyOf,
  renderCard,
  frame,
  cardClassName,
  tilt = 0,
  label,
}: SwipeableCardStackProps<T>) {
  // A thrown card outlives the index change, flying out over the deck that has
  // already closed up behind it.
  const [thrown, setThrown] = useState<{
    item: T
    direction: 1 | -1
    from: number
    id: number
  } | null>(null)
  // One touch of the deck is enough to prove the gesture was understood.
  const [isHandled, setIsHandled] = useState(false)

  const { ref: frameRef, inView } = useInView<HTMLDivElement>()

  const count = Math.max(items.length, 1)
  const isPaged = items.length > 1

  /** `direction` is only where the card flies; both ways deal the next item. */
  const throwCard = (direction: 1 | -1, from = 0) => {
    if (!isPaged) return
    // The id is the element's key, so a throw that interrupts one still in
    // flight remounts the card and restarts its animation from the new offset.
    setThrown((previous) => ({
      item: items[index],
      direction,
      from,
      id: (previous?.id ?? 0) + 1,
    }))
    setIsHandled(true)
    onNext()
  }

  const { offset, isDragging, handlers } = useDragSwipe({
    onSwipeLeft: (travelled) => throwCard(-1, travelled),
    onSwipeRight: (travelled) => throwCard(1, travelled),
    enabled: isPaged,
  })

  // Only as many slots as there are items, so the modulo below never repeats an
  // item — and so never repeats a React key — in a two- or one-card deck.
  const slots = Math.min(DEPTH, count)
  const dragTilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, offset / 14))
  const isHinting = isPaged && inView && !isHandled && !isDragging

  // Both `transform` and `rotate` are eased: a card moving up a slot changes
  // its fan angle as well as its position, and transitioning only the one would
  // snap the angle while the slide is still running.
  const card = cn(
    'absolute inset-0 overflow-hidden transition-[transform,rotate] duration-300 ease-out',
    cardClassName,
  )

  // Callers pass a placeholder rather than an empty list when they still want a
  // card; an empty deck has nothing to draw and no gesture worth binding.
  if (items.length === 0) return null

  return (
    /*
      Keyboard paging lives on the frame rather than on the top card: that card
      is keyed by its item, so paging unmounts it and focus would fall to the
      body after a single arrow press. This frame outlives every card.

      The right margin is the strip the deck peeks into.
    */
    <div
      ref={frameRef}
      style={{ marginRight: `${PEEK_STRIP}%` }}
      className={cn('relative select-none', frame)}
      {...(label
        ? {
            role: 'group',
            'aria-roledescription': 'carousel',
            'aria-label': label,
            tabIndex: isPaged ? 0 : undefined,
            onKeyDown: (event: KeyboardEvent) => {
              if (event.key === 'ArrowRight') throwCard(-1)
              else if (event.key === 'ArrowLeft') throwCard(1)
            },
          }
        : {})}
    >
      {Array.from({ length: slots }, (_, depth) => {
        const item = items[(index + depth) % count]
        const isTop = depth === 0
        const scale = 1 - depth * DEPTH_SCALE

        return (
          <div
            key={keyOf(item)}
            // Depth drives the stacking, not DOM order, which React shuffles as
            // the keys move between slots.
            style={{
              zIndex: slots - depth,
              rotate: `${tilt + depth * FAN}deg`,
              transform: isTop
                ? `translateX(${offset}px) rotate(${dragTilt}deg)`
                : `translateX(${depth * DEPTH_SHIFT}%) scale(${scale})`,
              // The top card has to track the finger exactly; everything else
              // eases into place.
              transition: isTop && isDragging ? 'none' : undefined,
            }}
            className={cn(
              card,
              isTop
                ? 'touch-pan-y'
                : // Inert: the gesture belongs to the top card, and screen
                  // readers should hear one item at a time.
                  'pointer-events-none',
              isTop &&
                isPaged &&
                (isDragging ? 'cursor-grabbing' : 'cursor-grab'),
              isTop && isHinting && 'card-nudge',
            )}
            {...(isTop
              ? {
                  ...handlers,
                  // Touching the deck proves the gesture landed, so the attract
                  // loop stops here rather than waiting for a completed swipe.
                  onPointerDown: (event: PointerEvent<HTMLElement>) => {
                    setIsHandled(true)
                    handlers.onPointerDown(event)
                  },
                }
              : { 'aria-hidden': true })}
          >
            {renderCard(item, isTop)}

            {/* Sinks the cards behind into the page, more so the further back
                they sit, so the top one reads as the one in hand. */}
            {!isTop && (
              <div
                style={{ opacity: 0.35 + depth * 0.2 }}
                className="bg-parchment absolute inset-0"
              />
            )}
          </div>
        )
      })}

      {thrown && (
        <div
          key={thrown.id}
          aria-hidden
          onAnimationEnd={() =>
            setThrown((current) => (current?.id === thrown.id ? null : current))
          }
          style={
            {
              rotate: `${tilt}deg`,
              '--throw-from': `${thrown.from}px`,
              '--throw-tilt-from': `${Math.max(-MAX_TILT, Math.min(MAX_TILT, thrown.from / 14))}deg`,
              '--throw-to': `${thrown.direction * 135}%`,
              '--throw-tilt-to': `${thrown.direction * MAX_TILT * 2}deg`,
            } as CSSProperties
          }
          className={cn(card, 'card-throw pointer-events-none z-20')}
        >
          {renderCard(thrown.item, true)}
        </div>
      )}

      {label && isPaged && (
        <p aria-live="polite" className="sr-only">
          {`${label}: ${index + 1} of ${items.length}`}
        </p>
      )}
    </div>
  )
}
