'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import { galleryCategories, type GalleryCategory, type GalleryDisplayPhoto } from '@/lib/gallery'
import { PhotoViewerDialog } from '@/components/ui/PhotoViewerDialog'

export function GalleryGrid({ photos, preview = false }: { photos: GalleryDisplayPhoto[]; preview?: boolean }) {
  const t = useTranslations('gallery')
  const [category, setCategory] = useState<GalleryCategory | 'all'>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const visiblePhotos = category === 'all' ? photos : photos.filter((photo) => photo.category === category)
  const close = useCallback(() => setActiveIndex(null), [])
  const changePhoto = useCallback((index: number) => setActiveIndex(index), [])
  return (
    <>
        {!preview && <div className="mb-8 flex flex-wrap items-center gap-2" aria-label={t('filtersAria')}>
        <button
          type="button"
          onClick={() => { setCategory('all'); setActiveIndex(null) }}
          aria-pressed={category === 'all'}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${category === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'}`}
        >
          {t('filterAll')}
        </button>
        {galleryCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => { setCategory(item); setActiveIndex(null) }}
            aria-pressed={category === item}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${category === item ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'}`}
          >
            {t(`categories.${item}`)}
          </button>
        ))}
        <span className="ml-auto text-sm text-on-surface-variant" aria-live="polite">
          {t('photoCount', { count: visiblePhotos.length })}
        </span>
        </div>}

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visiblePhotos.map((photo, index) => (
          <figure key={photo.id} className="mb-5 break-inside-avoid overflow-hidden rounded-(--radius-lg) bg-surface-container">
            <button
              type="button"
              className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setActiveIndex(index)}
                aria-label={t('openPhoto', { caption: photo.alt })}
            >
              <Image
                src={photo.src}
                  alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
              />
            </button>
            <figcaption className="px-4 py-3 text-sm leading-relaxed text-on-surface-variant">
                {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <PhotoViewerDialog
        photos={visiblePhotos.map((photo) => ({
          ...photo,
            alt: photo.alt,
        }))}
        activeIndex={activeIndex}
        onChange={changePhoto}
        onClose={close}
        labels={{
          dialogLabel: t('dialogAria'),
          closeLabel: t('close'),
          previousLabel: t('previous'),
          nextLabel: t('next'),
          counterFormat: t('counter', { current: '{current}', total: '{total}' }),
        }}
      />
    </>
  )
}
