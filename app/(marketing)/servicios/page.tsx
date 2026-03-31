// ============================================================
// Servicios — /servicios
// Grid completo de los 4 servicios con CTA WhatsApp
// ============================================================

import type { Metadata } from 'next'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Descubrí todos los servicios de Detailing Marin: lavado ecológico, pulido abrillantador, pulido de focos y limpieza de motor — todos a domicilio en Maipú y alrededores.',
}

export default function ServiciosPage() {
  return (
    <>
      <div className="pt-20">
        <ServicesGrid />
      </div>
      <CTASection />
    </>
  )
}
