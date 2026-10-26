// ============================================================
// ResultsSection — Sección antes/después para home page
// Muestra resultados reales de motor, asientos y focos
// ============================================================

import { getTranslations } from 'next-intl/server'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BeforeAfterCard } from '@/components/ui/BeforeAfterCard'
import { DEFAULT_HOMEPAGE_IMAGE_SOURCES } from '@/lib/homepage-media'

type ResultImageSources = Partial<Record<'motor' | 'tapiz' | 'focos' | 'exterior', { before?: string; after?: string }>>

export async function ResultsSection({ images }: { images?: ResultImageSources }) {
  const t = await getTranslations('results')

  return (
    <SectionWrapper surface="low" id="resultados">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-label-md text-primary mb-3">{t('label')}</p>
        <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          {t('description')}
        </p>
      </div>

      {/* Cuatro comparativas completas, cada antes y después junto al otro. */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <BeforeAfterCard
          label={t('motorLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{ src: images?.motor?.before ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.motor.before, alt: t('motorBeforeAlt') }}
          after={{ src: images?.motor?.after ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.motor.after, alt: t('motorAfterAlt') }}
        />
        <BeforeAfterCard
          label={t('tapizLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{ src: images?.tapiz?.before ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.tapiz.before, alt: t('asientosBeforeAlt') }}
          after={{ src: images?.tapiz?.after ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.tapiz.after, alt: t('asientosAfterAlt') }}
        />
        <BeforeAfterCard
          label={t('focosLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{
            src: images?.focos?.before ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.focos.before,
            alt: t('focosBeforeAlt'),
          }}
          after={{
            src: images?.focos?.after ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.focos.after,
            alt: t('focosAfterAlt'),
          }}
        />
        <BeforeAfterCard
          label={t('exteriorLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{
            src: images?.exterior?.before ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.exterior.before,
            alt: t('exteriorBeforeAlt'),
          }}
          after={{
            src: images?.exterior?.after ?? DEFAULT_HOMEPAGE_IMAGE_SOURCES.results.exterior.after,
            alt: t('exteriorAfterAlt'),
          }}
        />
      </div>
    </SectionWrapper>
  )
}
