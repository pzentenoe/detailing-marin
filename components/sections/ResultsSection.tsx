// ============================================================
// ResultsSection — Sección antes/después para home page
// Muestra resultados reales de motor, asientos y focos
// ============================================================

import { getTranslations } from 'next-intl/server'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BeforeAfterCard } from '@/components/ui/BeforeAfterCard'

export async function ResultsSection() {
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
          before={{ src: '/images/lavado_motor/antes.webp', alt: t('motorBeforeAlt') }}
          after={{ src: '/images/lavado_motor/despues.webp', alt: t('motorAfterAlt') }}
        />
        <BeforeAfterCard
          label={t('tapizLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{ src: '/images/asientos/antes.webp', alt: t('asientosBeforeAlt') }}
          after={{ src: '/images/asientos/despues.webp', alt: t('asientosAfterAlt') }}
        />
        <BeforeAfterCard
          label={t('focosLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{
            src: '/images/trabajos/focos/foco-delantero-amarillento-antes.webp',
            alt: t('focosBeforeAlt'),
          }}
          after={{
            src: '/images/trabajos/focos/foco-delantero-restaurado-despues.webp',
            alt: t('focosAfterAlt'),
          }}
        />
        <BeforeAfterCard
          label={t('exteriorLabel')}
          beforeLabel={t('before')}
          afterLabel={t('after')}
          before={{
            src: '/images/trabajos/exterior/porsche-boxster-trasera-sucia-antes.webp',
            alt: t('exteriorBeforeAlt'),
          }}
          after={{
            src: '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp',
            alt: t('exteriorAfterAlt'),
          }}
        />
      </div>
    </SectionWrapper>
  )
}
