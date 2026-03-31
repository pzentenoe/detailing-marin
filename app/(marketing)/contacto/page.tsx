// ============================================================
// Contacto — /contacto
// Formulario + info de contacto
// ============================================================

import type { Metadata } from 'next'
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
    </div>
  )
}
