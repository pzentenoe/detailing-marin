'use client'

// ============================================================
// CTASection — Banner de conversión con gradiente primario
// Agenda tu detailing + WhatsApp link
// ============================================================

import { EcoChip } from '@/components/ui/EcoChip'
import { contactInfo, WA_MESSAGE } from '@/lib/services'

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? contactInfo.whatsapp.replace(/\D/g, '')

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.004 2C8.274 2 2 8.272 2 15.999c0 2.467.644 4.883 1.869 7.01L2 30l7.236-1.896A14.01 14.01 0 0 0 16.004 30C23.732 30 30 23.727 30 16c0-3.738-1.458-7.252-4.104-9.896A13.952 13.952 0 0 0 16.004 2zm0 2.162c3.202 0 6.21 1.249 8.47 3.515A11.874 11.874 0 0 1 27.84 16c0 6.542-5.294 11.838-11.836 11.838a11.79 11.79 0 0 1-5.99-1.632l-.43-.256-4.447 1.164 1.185-4.33-.28-.445A11.782 11.782 0 0 1 4.162 16C4.162 9.459 9.46 4.162 16.004 4.162zm-3.26 6.8c-.208 0-.545.079-.83.39-.285.312-1.088 1.064-1.088 2.594s1.114 3.009 1.268 3.217c.156.208 2.17 3.424 5.315 4.66 2.625 1.036 3.155.829 3.726.777.57-.052 1.839-.752 2.098-1.478.26-.727.26-1.35.182-1.478-.078-.13-.286-.208-.598-.364-.312-.156-1.84-.908-2.125-1.013-.286-.104-.494-.156-.701.156-.208.312-.804 1.013-.986 1.22-.182.208-.364.234-.676.078-.312-.156-1.317-.486-2.51-1.549-.927-.828-1.553-1.85-1.735-2.163-.182-.312-.02-.48.136-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.697-1.69-.963-2.313-.254-.604-.512-.52-.701-.53a12.5 12.5 0 0 0-.598-.013z" />
    </svg>
  )
}

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
            {/* WhatsApp — borde blanco translúcido, texto blanco */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center justify-center gap-2',
                'px-8 py-4 rounded-full',
                'text-white font-semibold text-lg',
                'border-2 border-white/30 hover:border-white/60 hover:bg-white/10',
                'transition-all duration-200',
              ].join(' ')}
              aria-label="Contactar por WhatsApp para agendar"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>

            {/* Email — fondo blanco, texto siempre verde oscuro (no cambia en dark mode) */}
            <a
              href={`mailto:${contactInfo.email}`}
              className={[
                'inline-flex items-center justify-center gap-2',
                'px-8 py-4 rounded-full',
                'bg-white text-[#154212]',
                'font-semibold text-lg',
                'hover:bg-white/90 transition-all duration-200',
                'shadow-float',
              ].join(' ')}
              aria-label="Enviar email a Detailing Marin"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Enviar Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
