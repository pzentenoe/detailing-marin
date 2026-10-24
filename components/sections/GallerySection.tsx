import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BeforeAfterCard } from '@/components/ui/BeforeAfterCard'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { galleryPreviewIds } from '@/lib/gallery'
import { getGalleryContent } from '@/lib/gallery-content'
import { getLocale } from 'next-intl/server'

export async function GallerySection({ preview = false }: { preview?: boolean }) {
  const t = await getTranslations('gallery')
  const locale = await getLocale() as 'es' | 'en'
  const gallery = await getGalleryContent(locale)
  const photos = preview
    ? galleryPreviewIds.flatMap((id) => {
        const photo = gallery.photos.find((item) => item.id === id)
        return photo ? [photo] : []
      })
    : gallery.photos

  return (
    <SectionWrapper surface={preview ? 'base' : 'low'} id={preview ? 'galeria' : 'trabajos-galeria'}>
      <header className="mb-10 max-w-3xl">
          {/* En la página de galería este es el encabezado principal de la
              página; en el home es una sección dentro del hero. */}
          {preview ? (
            <h2 className="text-display-md text-(--color-on-surface)">{t('previewHeading')}</h2>
          ) : (
            <h1 className="text-display-md text-(--color-on-surface)">{t('heading')}</h1>
          )}
          <p className="mt-4 text-body-lg text-on-surface-variant">
            {t(preview ? 'previewDescription' : 'description')}
          </p>
      </header>
      {!preview && (
        <div className="mb-14">
          <div className="mb-7 max-w-2xl">
            <h2 className="text-headline-lg text-(--color-on-surface)">{t('comparisons.heading')}</h2>
            <p className="mt-2 text-body-lg text-on-surface-variant">{t('comparisons.description')}</p>
          </div>
            <div className="grid gap-10 lg:grid-cols-2">
              {gallery.comparisons.map((comparison) => (
                <BeforeAfterCard
                  key={comparison.id}
                  label={comparison.title}
                  beforeLabel={t('comparisons.before')}
                  afterLabel={t('comparisons.after')}
                  before={comparison.before}
                  after={comparison.after}
                />
              ))}
            </div>
        </div>
      )}
        <GalleryGrid photos={photos} preview={preview} />
      {preview && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary transition-[filter,transform] hover:brightness-95 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('viewAll')}
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      )}
    </SectionWrapper>
  )
}
