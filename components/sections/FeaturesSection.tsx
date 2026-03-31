// ============================================================
// FeaturesSection — Los 3 pilares de Detailing Marin
// Grid de features con iconografía ecológica
// ============================================================

import { Icon } from '@/components/ui/Icon'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { features } from '@/lib/services'

export function FeaturesSection() {
  return (
    <SectionWrapper surface="container" id="pilares">
      {/* Encabezado de sección */}
      <div className="text-center mb-14">
        <p className="text-label-md text-primary mb-3">Por qué elegirnos</p>
        <h2 className="text-display-md text-(--color-on-surface)">
          Elevamos el estándar
        </h2>
        <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto mt-4">
          Técnicas avanzadas y resultados impecables, con el menor impacto 
          posible en el medio ambiente.
        </p>
      </div>

      {/* Grid de features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, idx) => (
          <article
            key={feature.id}
            className={[
              'rounded-(--radius-xl) p-8 flex flex-col gap-5',
              'bg-(--color-surface-container-lowest)',
              'shadow-ambient hover:shadow-float hover:-translate-y-1',
              'transition-all duration-300 ease-out',
              // El primero es el destacado (primary variant)
              idx === 0
                ? 'border-2 border-primary-fixed'
                : 'border border-outline-variant/20',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {/* Icono ecológico */}
            <div
              className={[
                'w-14 h-14 rounded-(--radius-lg) flex items-center justify-center shrink-0',
                idx === 0
                  ? 'gradient-primary'
                  : 'bg-primary-fixed',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              <Icon
                name={feature.icon}
                size={26}
                color={idx === 0 ? '#ffffff' : 'var(--color-primary)'}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-headline-md text-(--color-on-surface)">
                {feature.title}
              </h3>
              <p className="text-body-lg text-on-surface-variant text-sm">
                {feature.description}
              </p>
            </div>

            {/* Número de índice decorativo */}
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
