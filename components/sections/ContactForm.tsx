'use client'

// ============================================================
// ContactForm — /contacto
// Layout 12 col: izquierda (info + cómo funciona) + derecha (form)
// Formulario completo con todos los campos del diseño
// ============================================================

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { contactInfo, WA_MESSAGE } from '@/lib/services'

interface FormState {
  nombre: string
  telefono: string
  direccion: string
  tipoVehiculo: string
  fechaPreferida: string
  serviciosSeleccionados: string[]
}

const initialState: FormState = {
  nombre: '',
  telefono: '',
  direccion: '',
  tipoVehiculo: '',
  fechaPreferida: '',
  serviciosSeleccionados: [],
}

const serviciosOpciones = [
  'Lavado Exterior Eco',
  'Limpieza Interior Profunda',
  'Encerado Premium',
  'Tratamiento de Ozono',
]

const comoFunciona = [
  {
    icon: 'calendar' as const,
    title: '1. Elige tu fecha',
    desc: 'Selecciona el día y la hora que mejor te convenga para el servicio.',
  },
  {
    icon: 'car' as const,
    title: '2. Confirmamos el vehículo',
    desc: 'Indícanos el tipo de coche y los servicios específicos que necesitas.',
  },
  {
    icon: 'droplets' as const,
    title: '3. Lavado Eco-Luxe',
    desc: 'Llegamos a tu ubicación y realizamos el tratamiento completo.',
  },
]

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleTextChange = (
    e: { target: { name: string; value: string } },
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCheckbox = (servicio: string) => {
    setForm((prev) => ({
      ...prev,
      serviciosSeleccionados: prev.serviciosSeleccionados.includes(servicio)
        ? prev.serviciosSeleccionados.filter((s) => s !== servicio)
        : [...prev.serviciosSeleccionados, servicio],
    }))
  }

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Error al enviar el formulario')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error desconocido')
      setStatus('error')
    }
  }

  const inputClass = [
    'w-full h-14 px-4 rounded-(--radius-lg)',
    'bg-surface-container-high border-none',
    'text-(--color-on-surface) text-sm',
    'placeholder:text-on-surface-variant/40',
    'focus:outline-none focus:ring-2 focus:ring-primary/20',
    'focus:bg-(--color-surface-container-lowest)',
    'transition-all duration-200',
  ].join(' ')

  const labelClass = 'text-xs font-bold text-primary tracking-widest uppercase pl-1'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

      {/* ── Columna izquierda (5 cols) ── */}
      <div className="lg:col-span-5 flex flex-col gap-12">

        {/* Header */}
        <header className="flex flex-col gap-5">
          <span className="inline-block self-start px-3 py-1 rounded-full bg-secondary-container text-primary font-bold text-xs tracking-widest uppercase">
            Premium Mobile Detailing
          </span>
          <h1 className="text-display-md text-(--color-on-surface) leading-tight">
            Reserva tu lavado a domicilio
          </h1>
          <p className="text-body-lg text-on-surface-variant font-light">
            Llevamos el cuidado de lujo directamente a tu puerta. Equipamiento
            profesional y productos biodegradables para un acabado impecable
            sin moverte de casa.
          </p>
        </header>

        {/* Cómo funciona */}
        <section aria-labelledby="como-funciona-title">
          <h2
            id="como-funciona-title"
            className="text-lg font-bold text-primary flex items-center gap-3 mb-6"
          >
            <span className="block w-8 h-px bg-primary/20" aria-hidden="true" />
            Cómo funciona
          </h2>

          <div className="flex flex-col gap-6">
            {comoFunciona.map((step) => (
              <div key={step.title} className="flex gap-5 group">
                <div
                  className={[
                    'shrink-0 w-12 h-12 rounded-(--radius-lg)',
                    'bg-surface-container-high flex items-center justify-center',
                    'text-primary transition-colors duration-200',
                    'group-hover:bg-primary-container group-hover:text-white',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  <Icon name={step.icon} size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-(--color-on-surface)">{step.title}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto shortcuts */}
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'flex items-center gap-4 p-4 rounded-(--radius-lg)',
              'bg-surface-container-low border border-outline-variant/10',
              'hover:bg-surface-container transition-all duration-200',
            ].join(' ')}
            aria-label="Contactar por WhatsApp directo"
          >
            <div
              className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <Icon name="message-circle" size={20} color="#25D366" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                WhatsApp Directo
              </p>
              <p className="text-(--color-on-surface) font-medium">{contactInfo.phone}</p>
            </div>
          </a>

          <div
            className={[
              'flex items-center gap-4 p-4 rounded-(--radius-lg)',
              'bg-surface-container-low border border-outline-variant/10',
            ].join(' ')}
          >
            <div
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <Icon name="mail" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Email de Contacto
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-(--color-on-surface) font-medium hover:text-primary transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Columna derecha (7 cols): formulario glass ── */}
      <div className="lg:col-span-7">
        <div className="relative">
          {/* Decoración de fondo */}
          <div
            className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-container/30 blur-[80px] rounded-full -z-10 pointer-events-none"
            aria-hidden="true"
          />

          {status === 'success' ? (
            <div className="glass rounded-(--radius-xl) p-10 text-center flex flex-col items-center gap-5 shadow-ambient">
              <span className="text-5xl" aria-hidden="true">✅</span>
              <h2 className="text-headline-md text-primary">
                ¡Reserva enviada!
              </h2>
              <p className="text-on-surface-variant text-sm">
                Recibiste un correo con los detalles. Te respondemos en menos de 24 horas.
              </p>
              <Button variant="ghost" size="sm" onClick={() => setStatus('idle')}>
                Enviar otra consulta
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass border border-outline-variant/20 rounded-(--radius-xl) p-10 flex flex-col gap-7 shadow-ambient"
              aria-label="Formulario de reserva"
            >
              {/* Nombre + Teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-nombre" className={labelClass}>
                    Nombre Completo
                  </label>
                  <input
                    id="cf-nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleTextChange}
                    placeholder="Ej: Juan Pérez"
                    required
                    className={inputClass}
                    aria-required="true"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-telefono" className={labelClass}>
                    Teléfono
                  </label>
                  <input
                    id="cf-telefono"
                    name="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={handleTextChange}
                    placeholder="+56 9 ..."
                    required
                    className={inputClass}
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-direccion" className={labelClass}>
                  Dirección de Servicio
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none"
                    aria-hidden="true"
                  >
                    <Icon name="map-pin" size={18} />
                  </span>
                  <input
                    id="cf-direccion"
                    name="direccion"
                    type="text"
                    value={form.direccion}
                    onChange={handleTextChange}
                    placeholder="Calle, número, ciudad"
                    required
                    className={inputClass.replace('px-4', 'pl-12 pr-4')}
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Tipo de Vehículo + Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-vehiculo" className={labelClass}>
                    Tipo de Vehículo
                  </label>
                  <select
                    id="cf-vehiculo"
                    name="tipoVehiculo"
                    value={form.tipoVehiculo}
                    onChange={handleTextChange}
                    required
                    className={[inputClass, 'appearance-none cursor-pointer'].join(' ')}
                    aria-required="true"
                  >
                    <option value="" disabled>Seleccionar...</option>
                    <option>Turismo / Compacto</option>
                    <option>SUV / Berlina</option>
                    <option>4x4 / Furgoneta</option>
                    <option>Motocicleta</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-fecha" className={labelClass}>
                    Fecha Preferida
                  </label>
                  <input
                    id="cf-fecha"
                    name="fechaPreferida"
                    type="date"
                    value={form.fechaPreferida}
                    onChange={handleTextChange}
                    required
                    className={[inputClass, 'text-on-surface-variant cursor-pointer'].join(' ')}
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Servicios — checkboxes */}
              <fieldset>
                <legend className={[labelClass, 'block mb-3'].join(' ')}>
                  Servicios Necesarios
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviciosOpciones.map((servicio) => {
                    const checked = form.serviciosSeleccionados.includes(servicio)
                    return (
                      <label
                        key={servicio}
                        className={[
                          'flex items-center gap-3 p-4 rounded-(--radius-lg) cursor-pointer',
                          'border transition-all duration-200',
                          checked
                            ? 'bg-secondary-container border-primary/20'
                            : 'bg-surface-container-low border-transparent hover:bg-secondary-container/30',
                        ].join(' ')}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCheckbox(servicio)}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                          aria-label={servicio}
                        />
                        <span className="text-sm font-medium text-(--color-on-surface)">
                          {servicio}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              {/* Error message */}
              {status === 'error' && (
                <p className="text-center text-sm text-error bg-error-container rounded-(--radius-md) px-4 py-3">
                  {errorMsg || 'Hubo un error al enviar. Intentá de nuevo.'}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={[
                  'w-full py-5 rounded-(--radius-xl)',
                  'gradient-primary text-white font-bold text-lg',
                  'shadow-float hover:scale-[1.02] active:scale-[0.98]',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-3 group/btn',
                  'disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100',
                ].join(' ')}
              >
                {status === 'loading' ? 'Enviando...' : 'Confirmar Reserva'}
                {status !== 'loading' && (
                  <Icon
                    name="calendar"
                    size={20}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                )}
              </button>

              <p className="text-center text-xs text-on-surface-variant/60">
                Te enviaremos la confirmación por correo electrónico.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
