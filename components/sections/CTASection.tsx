'use client'

// ============================================================
// CTASection — Banner de conversión con gradiente primario
// Agenda tu detailing + WhatsApp link
// ============================================================

import { Button } from '@/components/ui/Button'
import { EcoChip } from '@/components/ui/EcoChip'

export function CTASection() {
  return (
    <section
      className="w-full relative overflow-hidden"
      aria-label="Llamado a la acción"
    >
      {/* Gradiente de fondo */}
      <div className="gradient-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        {/* Decoración: círculos blancos translúcidos */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white opacity-5 translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white opacity-5 -translate-x-1/4 translate-y-1/4 pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl text-center flex flex-col items-center gap-8">
          <EcoChip stat="Domicilio" label="sin costo extra" icon="🚗" />

          <h2 className="text-display-md text-white leading-tight">
            Agenda hoy mismo tu servicio a domicilio
          </h2>

          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            Ofrecemos un servicio de estética automotriz de alta gama, respetando 
            el medio ambiente y valorando tu tiempo. Maipú y alrededores.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="ghost"
              size="lg"
              className="!text-white !font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 !no-underline rounded-[var(--radius-full)] px-8 py-4"
              onClick={() =>
                window.open(
                  'https://wa.me/56912345678?text=Hola%2C%20quiero%20agendar%20un%20servicio',
                  '_blank',
                )
              }
              aria-label="Contactar por WhatsApp para agendar"
            >
              💬 WhatsApp
            </Button>
            <a
              href="mailto:hola@detailingmarin.cl"
              className={[
                'inline-flex items-center justify-center gap-2',
                'px-8 py-4 rounded-[var(--radius-full)]',
                'bg-white text-[var(--color-primary)]',
                'font-semibold text-lg',
                'hover:bg-white/90 transition-all duration-200',
                'shadow-float',
              ].join(' ')}
              aria-label="Enviar email a Detailing Marin"
            >
              ✉️ Enviar Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
