// ============================================================
// ServiceCard — Tarjeta de servicio reutilizable
// Átomo del design system: surface container + icono + copy
// ============================================================

import Link from 'next/link'
import type { Service } from '@/types'
import { Icon } from '@/components/ui/Icon'

interface ServiceCardProps {
  service: Service
  showCTA?: boolean
  variant?: 'compact' | 'full'
}

export function ServiceCard({
  service,
  showCTA = true,
  variant = 'compact',
}: ServiceCardProps) {
  return (
    <article
      className={[
        'rounded-[var(--radius-lg)]',
        'bg-[var(--color-surface-container-lowest)]',
        'p-8 flex flex-col gap-4',
        'transition-all duration-300 ease-out',
        'hover:shadow-float hover:-translate-y-1',
        'shadow-ambient',
        variant === 'full' ? 'h-full' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Icono con contenedor eco */}
      <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary-fixed)] flex items-center justify-center flex-shrink-0">
        <Icon name={service.icon} size={24} color="var(--color-primary)" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-headline-md text-[var(--color-on-surface)] font-display">
          {service.title}
        </h3>
        <p className="text-body-lg text-[var(--color-on-surface-variant)]">
          {variant === 'full' ? service.fullDescription : service.shortDescription}
        </p>
      </div>

      {/* Features — solo en variante full */}
      {variant === 'full' && (
        <ul className="flex flex-col gap-2 mt-2" aria-label={`Características de ${service.title}`}>
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-[var(--color-on-surface-variant)]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Duración + CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-outline-variant)]/20">
        <span className="text-label-md text-[var(--color-on-surface-variant)]">
          ⏱ {service.duration}
        </span>
        {showCTA && (
          <Link
            href={`/servicios#${service.slug}`}
            className="text-[var(--color-primary)] text-sm font-medium hover:underline underline-offset-4 transition-colors"
            aria-label={`Ver más detalles sobre ${service.title}`}
          >
            Saber más →
          </Link>
        )}
      </div>
    </article>
  )
}
