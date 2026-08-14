import { useEffect, useRef } from 'react'
import { CloseIcon } from '@/components/ui/icons'
import { CarouselArrows } from './CarouselArrows'

interface ImageLightboxProps {
  open: boolean
  /** Never empty: the control that opens this is hidden without photos. */
  images: string[]
  index: number
  /** Product name, used for the dialog label and the image alt text. */
  title: string
  onNext: () => void
  onPrevious: () => void
  onClose: () => void
}

/**
 * Full-screen viewer for the product photos.
 *
 * A native `<dialog>`, like the rest of the site's modals: the top layer,
 * focus trap, backdrop, and Escape all come for free, and `.modal-dialog`
 * animates it in and out.
 */
export function ImageLightbox({
  open,
  images,
  index,
  title,
  onNext,
  onPrevious,
  onClose,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} photos`}
      className="modal-dialog"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') onNext()
        else if (event.key === 'ArrowLeft') onPrevious()
      }}
      // A click on the backdrop reports the dialog itself as the target,
      // which is what separates "clicked outside" from "clicked the image".
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="relative w-[min(60rem,calc(100vw-1.5rem))]">
        <div className="border-line/70 bg-surface shadow-modal flex items-center justify-center overflow-hidden rounded-2xl border p-2 sm:p-3">
          {/* A plain <img> rather than ProductImage: this frame sizes itself
              to the photo instead of cropping it into a fixed box. */}
          <img
            key={images[index]}
            src={images[index]}
            alt={`${title} — image ${index + 1} of ${images.length}`}
            className="fade-scale-in max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
          />
        </div>

        {images.length > 1 && (
          <CarouselArrows size="md" onPrevious={onPrevious} onNext={onNext} />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition duration-200 ease-out hover:scale-110 hover:bg-black/75 active:scale-95"
        >
          <CloseIcon className="size-5" />
        </button>

        {images.length > 1 && (
          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
            {index + 1} / {images.length}
          </p>
        )}
      </div>
    </dialog>
  )
}
