'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface ViewerPhoto {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface PhotoViewerLabels {
  dialogLabel: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  counterFormat: string
}

interface PhotoViewerDialogProps {
  photos: ViewerPhoto[]
  activeIndex: number | null
  labels: PhotoViewerLabels
  onChange: (index: number) => void
  onClose: () => void
}

export function PhotoViewerDialog({
  photos,
  activeIndex,
  labels,
  onChange,
  onClose,
}: PhotoViewerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const photo = activeIndex === null ? null : photos[activeIndex]
  const isOpen = photo !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen) return

    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || photos.length < 2) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      const direction = event.key === 'ArrowRight' ? 1 : -1
      onChange((activeIndex! + direction + photos.length) % photos.length)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, isOpen, onChange, photos.length])

  const move = (direction: -1 | 1) => {
    if (activeIndex === null || photos.length < 2) return
    onChange((activeIndex + direction + photos.length) % photos.length)
  }

  const counter = labels.counterFormat
    .replace('{current}', String((activeIndex ?? 0) + 1))
    .replace('{total}', String(photos.length))

  return (
    <dialog
      ref={dialogRef}
      className="hidden open:flex fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-hidden border-0 bg-transparent p-4 text-white backdrop:bg-black/75 sm:p-8"
      aria-label={labels.dialogLabel}
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      {photo && (
        <>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={labels.closeLabel}
          >
            <X size={18} aria-hidden="true" />
            {labels.closeLabel}
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => move(-1)}
                className="absolute left-2 z-10 grid size-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
                aria-label={labels.previousLabel}
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="absolute right-2 z-10 grid size-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
                aria-label={labels.nextLabel}
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </>
          )}
          <div className="flex h-[min(82dvh,900px)] w-[min(92vw,1600px)] flex-col items-center justify-center gap-3">
            <div className="relative min-h-0 w-full flex-1">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1720px) 92vw, 1600px"
                className="rounded-(--radius-md) object-contain shadow-float"
                priority
              />
            </div>
            <p className="max-w-[65ch] text-center text-sm leading-relaxed text-white">{photo.alt}</p>
            {photos.length > 1 && <p className="text-xs text-white/75">{counter}</p>}
          </div>
        </>
      )}
    </dialog>
  )
}
