// ============================================================
// ServicesGrid — Grid completo de servicios para /servicios
// Variante "full" de ServicesCard con todos los detalles
// ============================================================

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { services } from '@/lib/services'

export function ServicesGrid() {
  return (
    <SectionWrapper surface="base" id="todos-los-servicios">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-label-md text-[var(--color-primary)] mb-3">
          Servicio a domicilio · Maipú y alrededores
        </p>
        <h1 className="text-display-md text-[var(--color-on-surface)]">
          Nuestros Servicios a Domicilio
        </h1>
        <p className="text-body-lg text-[var(--color-on-surface-variant)] max-w-2xl mx-auto mt-4">
          Llevamos el mejor spa automotriz directamente a la puerta de tu casa. 
          Todos los servicios incluyen desplazamiento sin costo extra.
        </p>
      </div>

      {/* Grid completo: 2 col desktop */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        aria-label="Lista completa de servicios"
      >
        {services.map((service) => (
          <div key={service.id} id={service.slug}>
            <ServiceCard
              service={service}
              variant="full"
              showCTA={false}
            />
          </div>
        ))}
      </div>

      {/* Nota de cobertura */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-[var(--radius-xl)] bg-[var(--color-primary-fixed)]/30 text-[var(--color-primary)]">
          <span className="text-xl" aria-hidden="true">📍</span>
          <p className="text-sm font-medium">
            <strong>Todos nuestros servicios</strong> incluyen desplazamiento a tu domicilio en{' '}
            <strong>Maipú y alrededores</strong> sin costo extra.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
