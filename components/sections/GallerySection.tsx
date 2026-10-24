import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BeforeAfterCard } from '@/components/ui/BeforeAfterCard'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { galleryPhotos, galleryPreviewIds } from '@/lib/gallery'

export async function GallerySection({ preview = false }: { preview?: boolean }) {
  const t = await getTranslations('gallery')
  const photos = preview
    ? galleryPreviewIds.flatMap((id) => {
        const photo = galleryPhotos.find((item) => item.id === id)
        return photo ? [photo] : []
      })
    : galleryPhotos

  return (
    <SectionWrapper surface={preview ? 'base' : 'low'} id={preview ? 'galeria' : 'trabajos-galeria'}>
      <header className="mb-10 max-w-3xl">
        <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
        <p className="mt-4 text-body-lg text-on-surface-variant">{t('description')}</p>
      </header>
      {!preview && (
        <div className="mb-14">
          <div className="mb-7 max-w-2xl">
            <h3 className="text-headline-lg text-(--color-on-surface)">{t('comparisons.heading')}</h3>
            <p className="mt-2 text-body-lg text-on-surface-variant">{t('comparisons.description')}</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <BeforeAfterCard
              label={t('comparisons.motor')}
              beforeLabel={t('comparisons.before')}
              afterLabel={t('comparisons.after')}
              before={{ src: '/images/lavado_motor/antes.webp', alt: t('comparisons.motorBeforeAlt') }}
              after={{ src: '/images/lavado_motor/despues.webp', alt: t('comparisons.motorAfterAlt') }}
            />
            <BeforeAfterCard
              label={t('comparisons.interior')}
              beforeLabel={t('comparisons.before')}
              afterLabel={t('comparisons.after')}
              before={{ src: '/images/asientos/antes.webp', alt: t('comparisons.interiorBeforeAlt') }}
              after={{ src: '/images/asientos/despues.webp', alt: t('comparisons.interiorAfterAlt') }}
            />
            <BeforeAfterCard
              label={t('comparisons.headlights')}
              beforeLabel={t('comparisons.before')}
              afterLabel={t('comparisons.after')}
              before={{ src: '/images/trabajos/focos/foco-delantero-amarillento-antes.webp', alt: t('comparisons.headlightsBeforeAlt') }}
              after={{ src: '/images/trabajos/focos/foco-delantero-restaurado-despues.webp', alt: t('comparisons.headlightsAfterAlt') }}
            />
            <BeforeAfterCard
              label={t('comparisons.exterior')}
              beforeLabel={t('comparisons.before')}
              afterLabel={t('comparisons.after')}
              before={{
                src: '/images/trabajos/exterior/porsche-boxster-trasera-sucia-antes.webp',
                alt: t('comparisons.exteriorBeforeAlt'),
              }}
              after={{
                src: '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp',
                alt: t('comparisons.exteriorAfterAlt'),
              }}
            />
          </div>
        </div>
      )}
      <GalleryGrid photos={photos} />
      {preview && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary transition-[filter,transform] hover:brightness-95 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={t('viewAllAria')}
          >
            {t('viewAll')}
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      )}
    </SectionWrapper>
  )
}
