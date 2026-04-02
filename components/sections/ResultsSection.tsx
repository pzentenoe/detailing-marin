// ============================================================
// ResultsSection — Sección antes/después para home page
// Muestra resultados reales de motor y asientos
// ============================================================

import Image from 'next/image'
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

      {/* Grid principal: motor + tapiz a la izquierda, focos a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna izquierda: motor + tapiz (2/3 del ancho) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <BeforeAfterCard
            label={t('motorLabel')}
            beforeLabel={t('before')}
            afterLabel={t('after')}
            before={{
              src: '/images/lavado_motor/antes.webp',
              alt: t('motorBeforeAlt'),
            }}
            after={{
              src: '/images/lavado_motor/despues.webp',
              alt: t('motorAfterAlt'),
            }}
          />
          <BeforeAfterCard
            label={t('tapizLabel')}
            beforeLabel={t('before')}
            afterLabel={t('after')}
            before={{
              src: '/images/asientos/antes.webp',
              alt: t('asientosBeforeAlt'),
            }}
            after={{
              src: '/images/asientos/despues.webp',
              alt: t('asientosAfterAlt'),
            }}
          />
        </div>

        {/* Columna derecha: focos compuesto (1/3 del ancho) */}
        <figure className="flex flex-col gap-4 lg:col-span-1">
          <figcaption className="text-label-md text-primary font-semibold tracking-wide uppercase">
            {t('focosLabel')}
          </figcaption>
          <div className="relative overflow-hidden rounded-(--radius-xl) shadow-ambient group flex-1">
            <Image
              src="/images/focos/focos_antes_despues.webp"
              alt={t('focosAfterAlt')}
              width={700}
              height={935}
              className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </figure>

      </div>
    </SectionWrapper>
  )
}
