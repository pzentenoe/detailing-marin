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
        'rounded-(--radius-lg)',
        'bg-(--color-surface-container-lowest)',
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
      <div className="w-12 h-12 rounded-md bg-primary text-on-primary flex items-center justify-center shrink-0">
        <Icon name={service.icon} size={24} />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-headline-md text-(--color-on-surface) font-display">
          {service.title}
        </h3>
        <p className="text-body-lg text-on-surface-variant">
          {variant === 'full' ? service.fullDescription : service.shortDescription}
        </p>
      </div>

      {/* Features — solo en variante full */}
      {variant === 'full' && (
        <ul className="flex flex-col gap-2 mt-2" aria-label={`Características de ${service.title}`}>
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-on-surface-variant"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Duración + CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
        <span className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant">
          <Icon name="clock" size={14} />
          {service.duration}
        </span>
        {showCTA && (
          <Link
            href={`/servicios#${service.slug}`}
            className="group inline-flex items-center gap-1.5 text-primary text-sm font-medium transition-colors hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Ver más detalles sobre ${service.title}`}
          >
            Saber más
            <Icon
              name="arrow-right"
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </Link>
        )}
      </div>
    </article>
  )
}
