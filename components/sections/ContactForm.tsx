'use client'

// ============================================================
// ContactForm — /contacto
// Layout 12 col: izquierda (info + cómo funciona) + derecha (form)
// ============================================================

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { DatePicker } from '@/components/ui/DatePicker'
import { contactInfo } from '@/lib/services'

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

export function ContactForm() {
  const t = useTranslations('contact')
  const tf = useTranslations('contact.form')
  const tShared = useTranslations('shared')

  const [form, setForm] = useState<FormState>(initialState)

  const serviciosOpciones = [
    tf('service1'),
    tf('service2'),
    tf('service3'),
    tf('service4'),
  ]

  const comoFunciona = [
    { icon: 'calendar' as const, title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
    { icon: 'car' as const,      title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
    { icon: 'droplets' as const, title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
  ]

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: async (payload: FormState) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? tf('genericError'))
      }
    },
    onSuccess: () => setForm(initialState),
  })

  const handleTextChange = (e: { target: { name: string; value: string } }) => {
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

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    mutate(form)
  }

  const isFormValid =
    form.nombre.trim() !== '' &&
    form.telefono.trim() !== '' &&
    form.direccion.trim() !== '' &&
    form.tipoVehiculo !== '' &&
    form.fechaPreferida !== ''

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
        <header className="flex flex-col gap-5">
          <span className="inline-block self-start px-3 py-1 rounded-full bg-secondary-container text-primary font-bold text-xs tracking-widest uppercase">
            {t('badge')}
          </span>
          <h1 className="text-display-md text-(--color-on-surface) leading-tight">{t('heading')}</h1>
          <p className="text-body-lg text-on-surface-variant font-light">{t('description')}</p>
        </header>

        <section aria-labelledby="como-funciona-title">
          <h2
            id="como-funciona-title"
            className="text-lg font-bold text-primary flex items-center gap-3 mb-6"
          >
            <span className="block w-8 h-px bg-primary/20" aria-hidden="true" />
            {t('howItWorks.title')}
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

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(tShared('whatsappMessage'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'flex items-center gap-4 p-4 rounded-(--radius-lg)',
              'bg-surface-container-low border border-outline-variant/10',
              'hover:bg-surface-container transition-all duration-200',
            ].join(' ')}
            aria-label={t('whatsappAria')}
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <Icon name="message-circle" size={20} color="#25D366" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t('whatsappLabel')}</p>
              <p className="text-(--color-on-surface) font-medium">{contactInfo.phone}</p>
            </div>
          </a>

          <div className={['flex items-center gap-4 p-4 rounded-(--radius-lg)', 'bg-surface-container-low border border-outline-variant/10'].join(' ')}>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
              <Icon name="mail" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t('emailLabel')}</p>
              <a href={`mailto:${contactInfo.email}`} className="text-(--color-on-surface) font-medium hover:text-primary transition-colors">
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Columna derecha (7 cols): formulario glass ── */}
      <div className="lg:col-span-7">
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-container/30 blur-[80px] rounded-full -z-10 pointer-events-none" aria-hidden="true" />

          {isSuccess ? (
            <div className="glass rounded-(--radius-xl) p-10 text-center flex flex-col items-center gap-5 shadow-ambient">
              <span className="text-5xl" aria-hidden="true">✅</span>
              <h2 className="text-headline-md text-primary">{t('success.title')}</h2>
              <p className="text-on-surface-variant text-sm">{t('success.description')}</p>
              <Button variant="ghost" size="sm" onClick={reset}>{t('success.another')}</Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass border border-outline-variant/20 rounded-(--radius-xl) p-10 flex flex-col gap-7 shadow-ambient"
              aria-label={tf('ariaLabel')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-nombre" className={labelClass}>{tf('fullName')}</label>
                  <input
                    id="cf-nombre" name="nombre" type="text"
                    value={form.nombre} onChange={handleTextChange}
                    placeholder={tf('fullNamePlaceholder')} required
                    className={inputClass} aria-required="true"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-telefono" className={labelClass}>{tf('phone')}</label>
                  <input
                    id="cf-telefono" name="telefono" type="tel"
                    value={form.telefono} onChange={handleTextChange}
                    placeholder={tf('phonePlaceholder')} required
                    className={inputClass} aria-required="true"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="cf-direccion" className={labelClass}>{tf('address')}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none" aria-hidden="true">
                    <Icon name="map-pin" size={18} />
                  </span>
                  <input
                    id="cf-direccion" name="direccion" type="text"
                    value={form.direccion} onChange={handleTextChange}
                    placeholder={tf('addressPlaceholder')} required
                    className={inputClass.replace('px-4', 'pl-12 pr-4')} aria-required="true"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-vehiculo" className={labelClass}>{tf('vehicleType')}</label>
                  <select
                    id="cf-vehiculo" name="tipoVehiculo"
                    value={form.tipoVehiculo} onChange={handleTextChange}
                    required className={[inputClass, 'appearance-none cursor-pointer'].join(' ')} aria-required="true"
                  >
                    <option value="" disabled>{tf('vehiclePlaceholder')}</option>
                    <option>{tf('vehicleCompact')}</option>
                    <option>{tf('vehicleSuv')}</option>
                    <option>{tf('vehicle4x4')}</option>
                    <option>{tf('vehicleMoto')}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cf-fecha" className={labelClass}>{tf('preferredDate')}</label>
                  <DatePicker
                    id="cf-fecha"
                    value={form.fechaPreferida}
                    onChange={(val) => setForm((prev) => ({ ...prev, fechaPreferida: val }))}
                    required
                    className={[inputClass, 'text-on-surface-variant pr-12'].join(' ')}
                  />
                </div>
              </div>

              <fieldset>
                <legend className={[labelClass, 'block mb-3'].join(' ')}>{tf('servicesLabel')}</legend>
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
                          type="checkbox" checked={checked}
                          onChange={() => handleCheckbox(servicio)}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                          aria-label={servicio}
                        />
                        <span className="text-sm font-medium text-(--color-on-surface)">{servicio}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              {isError && (
                <p className="text-center text-sm text-error bg-error-container rounded-(--radius-md) px-4 py-3">
                  {error instanceof Error ? error.message : tf('genericError')}
                </p>
              )}

              <button
                type="submit"
                disabled={!isFormValid || isPending}
                className={[
                  'w-full py-5 rounded-(--radius-xl)',
                  'gradient-primary text-white font-bold text-lg',
                  'shadow-float hover:scale-[1.02] active:scale-[0.98]',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-3 group/btn',
                  'disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100',
                ].join(' ')}
              >
                {isPending ? tf('submitting') : tf('submit')}
                {!isPending && (
                  <Icon name="calendar" size={20} className="transition-transform group-hover/btn:translate-x-1" />
                )}
              </button>

              <p className="text-center text-xs text-on-surface-variant/60">{tf('confirmNote')}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
