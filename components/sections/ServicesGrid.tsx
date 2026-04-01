// ============================================================
// ServicesGrid — Bento grid de 12 columnas para /servicios
// Cada tarjeta tiene estilo editorial único según posición
// ============================================================

import Link from 'next/link'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Icon } from '@/components/ui/Icon'
import { services } from '@/lib/services'

// Estilo editorial por posición de tarjeta
const cardLayouts = [
  {
    colSpan: 'md:col-span-7',
    cardClass: 'bg-(--color-surface-container-lowest)',
    iconBg: 'bg-secondary-container',
    iconColor: 'var(--color-primary)',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    btnLabel: 'Solicitar',
    showDecorativeBg: true,
    isHorizontal: false,
  },
  {
    colSpan: 'md:col-span-5',
    cardClass: 'bg-primary-container',
    iconBg: 'bg-white/20',
    iconColor: '#ffffff',
    titleClass: 'text-white',
    descClass: 'text-white/80',
    btnVariant: 'light' as const,
    btnLabel: 'Solicitar',
    showDecorativeBg: false,
    isHorizontal: false,
  },
  {
    colSpan: 'md:col-span-5',
    cardClass: 'hydro-card',
    iconBg: 'bg-primary/10',
    iconColor: 'var(--color-primary)',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    btnLabel: 'Solicitar',
    showDecorativeBg: false,
    isHorizontal: false,
  },
  {
    colSpan: 'md:col-span-7',
    cardClass: 'bg-surface-container-high',
    iconBg: 'bg-primary-container',
    iconColor: '#ffffff',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    btnLabel: 'Solicitar Servicio',
    showDecorativeBg: false,
    isHorizontal: true,
  },
]

export function ServicesGrid() {
  return (
    <SectionWrapper surface="base" id="todos-los-servicios">
      {/* Header centrado */}
      <header className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
          Premium Care
        </span>
        <h1 className="text-display-md text-(--color-on-surface)">
          Nuestros Servicios a Domicilio
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Llevamos el mejor spa automotriz directamente a la puerta de tu casa.
        </p>
      </header>

      {/* Bento Grid 12 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {services.map((service, idx) => {
          const layout = cardLayouts[idx]
          if (!layout) return null

          return (
            <div
              key={service.id}
              id={service.slug}
              className={[
                layout.colSpan,
                'group relative overflow-hidden rounded-(--radius-xl)',
                'bg-surface-container-low p-px',
              ].join(' ')}
            >
              <div
                className={[
                  'relative h-full rounded-[calc(var(--radius-xl)-1px)]',
                  layout.cardClass,
                  layout.isHorizontal
                    ? 'p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center'
                    : 'p-8 md:p-10 flex flex-col justify-between overflow-hidden',
                ].join(' ')}
              >
                {/* Columna de contenido */}
                <div className={[layout.isHorizontal ? 'flex-1' : '', 'relative z-10'].join(' ')}>
                  {/* Icono */}
                  <div
                    className={[
                      'w-12 h-12 rounded-(--radius-lg) flex items-center justify-center mb-6',
                      layout.iconBg,
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    <Icon name={service.icon} size={24} color={layout.iconColor} />
                  </div>

                  {/* Título */}
                  <h2
                    className={[
                      'font-display font-bold tracking-tight mb-3',
                      idx === 0 ? 'text-3xl' : 'text-2xl',
                      layout.titleClass,
                    ].join(' ')}
                  >
                    {service.title}
                  </h2>

                  {/* Descripción */}
                  <p className={['leading-relaxed mb-6', layout.descClass].join(' ')}>
                    {service.fullDescription}
                  </p>

                  {/* Features list — tarjetas grandes */}
                  {(idx === 0 || layout.isHorizontal) && (
                    <ul
                      className="flex flex-col gap-2 mb-8"
                      aria-label={`Características de ${service.title}`}
                    >
                      {service.features.map((f) => (
                        <li key={f} className={['flex items-center gap-2 text-sm', layout.descClass].join(' ')}>
                          <span
                            className={[
                              'w-1.5 h-1.5 rounded-full shrink-0',
                              idx === 0 ? 'bg-primary' : 'bg-white/60',
                            ].join(' ')}
                            aria-hidden="true"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(service.title)}`}
                    className={[
                      'inline-flex items-center gap-2 px-6 py-3 rounded-(--radius-md)',
                      'font-semibold text-sm transition-all duration-200 w-fit',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      layout.btnVariant === 'light'
                        ? 'bg-white text-primary hover:bg-white/90 w-full justify-center'
                        : 'gradient-primary text-white shadow-ambient hover:shadow-float',
                    ].join(' ')}
                  >
                    {layout.btnLabel}
                  </Link>
                </div>

                {/* Imagen decorativa horizontal — Card 4 (Limpieza de Motor) */}
                {layout.isHorizontal && (
                  <div className="flex-1 w-full h-48 md:h-56 overflow-hidden rounded-(--radius-lg) shadow-float shrink-0">
                    <Image
                      src="/images/hero-detailing.webp"
                      alt={`${service.title} — Detailing Marin`}
                      width={480}
                      height={320}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                )}

                {/* Imagen de fondo decorativa — Card 1 (Lavado Ecológico) */}
                {layout.showDecorativeBg && (
                  <div
                    className="absolute right-0 bottom-0 w-1/2 h-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    aria-hidden="true"
                  >
                    <Image
                      src="/images/hero-detailing.webp"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA Banner */}
      <div className="mt-16 relative overflow-hidden rounded-(--radius-xl) bg-primary-container p-8 md:p-16 text-center shadow-float">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(45,90,39,0.4), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <span className="text-4xl mb-6 block" aria-hidden="true">🚐</span>
          <h2 className="text-headline-md text-white mb-4 max-w-3xl mx-auto">
            Todos nuestros servicios incluyen desplazamiento a tu domicilio en{' '}
            <strong>Maipú y alrededores</strong> sin costo extra.
          </h2>
          <p className="text-white/80 text-lg mb-8 font-light">
            Comodidad absoluta para ti, máxima excelencia para tu auto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-(--radius-md) hover:scale-105 transition-transform active:scale-95 shadow-float"
            >
              Agendar Ahora
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-semibold rounded-(--radius-md) hover:bg-white/20 transition-colors border border-white/20"
            >
              Ver Cobertura
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
