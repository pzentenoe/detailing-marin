'use client'

// ============================================================
// ContactForm — Formulario de contacto (UI pura)
// /contacto — con validación básica de HTML5
// ============================================================

import { useState } from 'react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { contactInfo, services } from '@/lib/services'

interface FormState {
  nombre: string
  telefono: string
  servicio: string
  mensaje: string
}

const initialState: FormState = {
  nombre: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En producción: conectar a API route o Formspree
    const whatsappMsg = encodeURIComponent(
      `Hola, me llamo ${form.nombre}. Me interesa el servicio: ${form.servicio}.\n\nMensaje: ${form.mensaje}\n\nTeléfono: ${form.telefono}`,
    )
    window.open(`https://wa.me/56912345678?text=${whatsappMsg}`, '_blank')
    setSubmitted(true)
  }

  const inputBaseClass = [
    'w-full px-4 py-3 rounded-[var(--radius-md)]',
    'bg-[var(--color-surface-container-lowest)]',
    'border border-[var(--color-outline-variant)]/30',
    'text-[var(--color-on-surface)] text-sm',
    'placeholder:text-[var(--color-on-surface-variant)]/50',
    'focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-fixed)]',
    'transition-all duration-200',
  ].join(' ')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Formulario */}
      <div>
        <p className="text-label-md text-[var(--color-primary)] mb-3">
          Agendar servicio
        </p>
        <h1 className="text-display-md text-[var(--color-on-surface)] mb-8">
          Contáctanos
        </h1>

        {submitted ? (
          <div className="rounded-[var(--radius-xl)] bg-[var(--color-primary-fixed)]/30 p-8 text-center flex flex-col items-center gap-4">
            <span className="text-4xl" aria-hidden="true">✅</span>
            <h2 className="text-headline-md text-[var(--color-primary)]">
              ¡Listo! Te redirectamos a WhatsApp
            </h2>
            <p className="text-[var(--color-on-surface-variant)] text-sm">
              Te respondemos en menos de 24 horas. También podés escribirnos directamente.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSubmitted(false)}
            >
              Enviar otro mensaje
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            aria-label="Formulario de contacto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-nombre"
                  className="text-sm font-medium text-[var(--color-on-surface)]"
                >
                  Nombre
                </label>
                <input
                  id="contact-nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className={inputBaseClass}
                  aria-required="true"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-telefono"
                  className="text-sm font-medium text-[var(--color-on-surface)]"
                >
                  Teléfono
                </label>
                <input
                  id="contact-telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+56 9 ..."
                  required
                  className={inputBaseClass}
                  aria-required="true"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-servicio"
                className="text-sm font-medium text-[var(--color-on-surface)]"
              >
                Servicio de interés
              </label>
              <select
                id="contact-servicio"
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
                required
                className={inputBaseClass}
                aria-required="true"
              >
                <option value="" disabled>
                  Seleccionar servicio...
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Consulta general">Consulta general</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-mensaje"
                className="text-sm font-medium text-[var(--color-on-surface)]"
              >
                Mensaje (opcional)
              </label>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Domicilio, horario preferido, modelo del vehículo..."
                className={`${inputBaseClass} resize-none`}
              />
            </div>

            <Button variant="primary" size="lg" type="submit" fullWidth>
              💬 Enviar por WhatsApp
            </Button>
            <p className="text-xs text-center text-[var(--color-on-surface-variant)]">
              Al enviar, serás redirigido a WhatsApp para confirmar tu solicitud.
            </p>
          </form>
        )}
      </div>

      {/* Info de contacto */}
      <div className="flex flex-col gap-8">
        <div className="rounded-[var(--radius-xl)] bg-[var(--color-surface-container-low)] p-8 flex flex-col gap-6 shadow-ambient">
          <h2 className="text-headline-md text-[var(--color-on-surface)]">
            Información de contacto
          </h2>

          {[
            { icon: '📞', label: 'Teléfono', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
            { icon: '✉️', label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
            { icon: '📍', label: 'Zona de cobertura', value: contactInfo.zone },
            { icon: '🕐', label: 'Horario de atención', value: contactInfo.hours },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="text-label-md text-[var(--color-on-surface-variant)] mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[var(--color-on-surface)] font-medium hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[var(--color-on-surface)] font-medium">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA directo */}
        <a
          href="https://wa.me/56912345678?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios"
          target="_blank"
          rel="noopener noreferrer"
          className={[
            'flex items-center gap-4 p-6',
            'rounded-[var(--radius-xl)]',
            'bg-[#25D366] text-white',
            'hover:bg-[#1ebe5d] transition-colors',
            'shadow-ambient hover:shadow-float',
          ].join(' ')}
          aria-label="Contactar directamente por WhatsApp"
        >
          <span className="text-3xl" aria-hidden="true">💬</span>
          <div>
            <p className="font-display font-bold">Escríbenos por WhatsApp</p>
            <p className="text-sm text-white/80">Respuesta en menos de 24 horas</p>
          </div>
          <span className="ml-auto text-xl" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}
