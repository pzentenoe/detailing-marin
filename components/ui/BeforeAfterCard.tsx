'use client'

// ============================================================
// BeforeAfterCard — Comparación visual antes / después
// Layout estático: dos mitades con divisor central
// ============================================================

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { PhotoViewerDialog } from '@/components/ui/PhotoViewerDialog'
import { useTranslations } from 'next-intl'

interface BeforeAfterCardProps {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  label: string
  beforeLabel: string
  afterLabel: string
}

export function BeforeAfterCard({
  before,
  after,
  label,
  beforeLabel,
  afterLabel,
}: BeforeAfterCardProps) {
  const t = useTranslations('gallery')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeViewer = useCallback(() => setActiveIndex(null), [])
  const changePhoto = useCallback((index: number) => setActiveIndex(index), [])
  const photos = [before, after]

  return (
    <>
      <figure className="flex flex-col gap-4">
      <figcaption className="text-label-md text-primary font-semibold tracking-wide uppercase">
        {label}
      </figcaption>

      <div className="relative flex aspect-[2/1] overflow-hidden rounded-(--radius-xl) shadow-ambient group sm:aspect-auto sm:h-72 md:h-80">
        {/* Antes */}
        <button
          type="button"
          className="group/photo relative flex-1 cursor-zoom-in overflow-hidden text-left focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
          onClick={() => setActiveIndex(0)}
          aria-label={t('openPhoto', { caption: before.alt })}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            className="object-cover object-center grayscale-[30%] transition-all duration-500 group-hover/photo:grayscale-0"
            sizes="(max-width: 1023px) 50vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            {beforeLabel}
          </span>
        </button>

        {/* Divisor central */}
        <div className="relative z-10 flex flex-col items-center justify-center shrink-0 w-px bg-white/80 shadow-[0_1px_8px_rgba(255,255,255,0.5)]">
          <div className="absolute w-7 h-7 rounded-full bg-white shadow-float flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4 7H10M4 7L2 5M4 7L2 9M10 7L12 5M10 7L12 9" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Después */}
        <button
          type="button"
          className="group/photo relative flex-1 cursor-zoom-in overflow-hidden text-left focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
          onClick={() => setActiveIndex(1)}
          aria-label={t('openPhoto', { caption: after.alt })}
        >
          <Image
            src={after.src}
            alt={after.alt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover/photo:scale-[1.025]"
            sizes="(max-width: 1023px) 50vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-primary/85 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            {afterLabel}
          </span>
        </button>
      </div>
      </figure>
      <PhotoViewerDialog
        photos={photos}
        activeIndex={activeIndex}
        labels={{
          dialogLabel: t('dialogAria'),
          closeLabel: t('close'),
          previousLabel: t('previous'),
          nextLabel: t('next'),
          counterFormat: t('counter', { current: '{current}', total: '{total}' }),
        }}
        onChange={changePhoto}
        onClose={closeViewer}
      />
    </>
  )
}
