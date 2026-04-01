// ============================================================
// Contacto — /contacto
// Formulario + info de contacto
// ============================================================

import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá con Detailing Marin para agendar tu servicio de detailing a domicilio en Maipú y alrededores. Respondemos en menos de 24 horas.',
}

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <SectionWrapper surface="base">
        <ContactForm />
      </SectionWrapper>

      {/* Image Feature Banner — "Cuidamos los detalles que otros ignoran" */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-(--radius-xl) overflow-hidden aspect-[21/9] flex items-center px-8 md:px-12">
          <Image
            src="/images/hero-detailing.webp"
            alt="Detalle de pintura hidrofóbica con gotas de agua — Detailing Marin"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
          {/* Gradiente overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"
            aria-hidden="true"
          />
          {/* Contenido */}
          <div className="relative z-10 max-w-lg flex flex-col gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Cuidamos los detalles que otros ignoran.
            </h2>
            <p className="text-white/80 font-light text-lg leading-relaxed">
              Nuestra técnica de lavado sin aclarado excesivo ahorra hasta 200 litros
              de agua por vehículo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
