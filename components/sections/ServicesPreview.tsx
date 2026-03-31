// ============================================================
// ServicesPreview — Vista previa de servicios en Home
// Muestra los primeros 3 servicios con CTA a /servicios
// ============================================================

import Link from 'next/link'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { Button } from '@/components/ui/Button'
import { services } from '@/lib/services'

export function ServicesPreview() {
  const previewServices = services.slice(0, 3)

  return (
    <SectionWrapper surface="base" id="servicios-preview">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-label-md text-primary mb-3">
            Lo que hacemos
          </p>
          <h2 className="text-display-md text-(--color-on-surface)">
            Nuestros servicios
          </h2>
        </div>
        <Link href="/servicios" aria-label="Ver todos los servicios de Detailing Marin">
          <Button variant="secondary" size="md">
            Ver todos →
          </Button>
        </Link>
      </div>

      {/* Grid de servicios */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        aria-label="Servicios destacados"
      >
        {previewServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            variant="compact"
            showCTA
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
