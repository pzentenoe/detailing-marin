// ============================================================
// FeaturesSection — Los 3 pilares de Detailing Marin
// Grid de features con iconografía ecológica
// ============================================================

import { getTranslations } from 'next-intl/server'
import { Icon } from '@/components/ui/Icon'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { featuresConfig } from '@/lib/services'

export async function FeaturesSection() {
  const t = await getTranslations('features')

  const items = featuresConfig.map((f, idx) => ({
    ...f,
    title: t(`items.${f.id}.title`),
    description: t(`items.${f.id}.description`),
    idx,
  }))

  return (
    <SectionWrapper surface="container" id="pilares">
      <div className="text-center mb-14">
        <p className="text-label-md text-primary mb-3">{t('label')}</p>
        <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
        <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto mt-4">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map(({ id, icon, title, description, idx }) => (
          <article
            key={id}
            className={[
              'rounded-(--radius-xl) p-8 flex flex-col gap-5',
              'bg-(--color-surface-container-lowest)',
              'shadow-ambient hover:shadow-float hover:-translate-y-1',
              'transition-all duration-300 ease-out',
              idx === 0
                ? 'border-2 border-primary-fixed'
                : 'border border-outline-variant/20',
            ].join(' ')}
          >
            <div
              className={[
                'w-14 h-14 rounded-(--radius-lg) flex items-center justify-center shrink-0',
                idx === 0 ? 'gradient-primary' : 'bg-primary-fixed',
              ].join(' ')}
              aria-hidden="true"
            >
              <Icon
                name={icon}
                size={26}
                color={idx === 0 ? '#ffffff' : 'var(--color-primary)'}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-headline-md text-(--color-on-surface)">{title}</h3>
              <p className="text-body-lg text-on-surface-variant text-sm">{description}</p>
            </div>

            <span
              className="mt-auto self-end font-display font-bold text-5xl text-primary-fixed select-none"
              aria-hidden="true"
            >
              0{idx + 1}
            </span>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
