// ============================================================
// ServicesGrid — Bento grid de 12 columnas para /servicios
// Cada tarjeta tiene estilo editorial único según posición
// ============================================================

import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Icon } from '@/components/ui/Icon'
import { BeforeAfterCard } from '@/components/ui/BeforeAfterCard'
import { getServices } from '@/lib/service-catalog'

const cardLayouts = [
  {
    // Pack Eco Diamond — tarjeta editorial a ancho completo: el texto a la
    // izquierda y la fotografía real del servicio a la derecha, con proporción
    // fija (nunca estirada hasta quedar en un hilo vertical).
    colSpan: 'lg:col-span-12',
    cardClass: 'bg-(--color-surface-container-lowest)',
    iconBg: 'bg-secondary-container',
    iconColor: 'var(--color-primary)',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    showDecorativeBg: false,
    splitImage: true,
    photoBand: false,
    isHorizontal: false,
    isDark: false,
  },
  {
    // Pack Eco Platinum — fondo oscuro fijo con imagen en banda
    colSpan: 'lg:col-span-5',
    cardClass: 'bg-primary-container',
    iconBg: 'bg-white/20',
    iconColor: '#ffffff',
    titleClass: 'text-white',
    descClass: 'text-white/80',
    btnVariant: 'light' as const,
    showDecorativeBg: false,
    splitImage: false,
    photoBand: true,
    isHorizontal: false,
    isDark: true,
  },
  {
    // Pack Eco Silver — hydro tint
    colSpan: 'lg:col-span-5',
    cardClass: 'hydro-card',
    iconBg: 'bg-primary/10',
    iconColor: 'var(--color-primary)',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    showDecorativeBg: false,
    splitImage: false,
    photoBand: true,
    isHorizontal: false,
    isDark: false,
  },
  {
    // Pulido Abrillantador — imagen en banda
    colSpan: 'lg:col-span-7',
    cardClass: 'bg-surface-container-high',
    iconBg: 'bg-primary-container',
    iconColor: '#ffffff',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    showDecorativeBg: false,
    splitImage: false,
    photoBand: true,
    isHorizontal: false,
    isDark: false,
  },
  {
    // Pulido de Focos — texto arriba y fotografía en banda ancha (la columna
    // angosta dejaba el texto en 220px y lo partía en líneas de 3 palabras)
    colSpan: 'lg:col-span-7',
    cardClass: 'bg-(--color-surface-container-lowest)',
    iconBg: 'bg-secondary-container',
    iconColor: 'var(--color-primary)',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    showDecorativeBg: false,
    splitImage: false,
    photoBand: true,
    isHorizontal: false,
    isDark: false,
  },
  {
    // Limpieza de Tapiz — before/after a ancho completo
    colSpan: 'lg:col-span-12',
    cardClass: 'bg-surface-container-high',
    iconBg: 'bg-primary-container',
    iconColor: '#ffffff',
    titleClass: 'text-(--color-on-surface)',
    descClass: 'text-on-surface-variant',
    btnVariant: 'primary' as const,
    showDecorativeBg: false,
    splitImage: false,
    photoBand: false,
    isHorizontal: true,
    isDark: false,
  },
]

// Cada servicio tiene un tratamiento propio. Se ancla al slug (no al índice)
// para que reordenar el CMS no cambie el diseño de una tarjeta.
const layoutBySlug: Record<string, (typeof cardLayouts)[number]> = {
  'pack-eco-diamond': cardLayouts[0],
  'pack-eco-platinum': cardLayouts[1],
  'pack-eco-silver': cardLayouts[2],
  'pulido-abrillantador': cardLayouts[3],
  'pulido-focos': cardLayouts[4],
  'limpieza-tapiz': cardLayouts[5],
}

// Tabla de precios para tarjetas con fondo claro/tema adaptativo
function PricingTableLight({
  rows,
  label,
}: {
  rows: readonly { readonly label: string; readonly price: string }[]
  label: string
}) {
  return (
    <div className="mt-2 mb-6 rounded-(--radius-md) overflow-hidden ring-1 ring-outline-variant/40 dark:ring-outline-variant/70">
      <div className="px-4 py-2.5 bg-surface-container border-b border-outline-variant/20 dark:border-outline-variant/40">
        <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">{label}</p>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={[
            'flex justify-between items-center px-4 py-2.5',
            i % 2 === 0 ? 'bg-surface-container/50' : '',
          ].join(' ')}
        >
          <span className="text-sm text-on-surface-variant">{row.label}</span>
          <span className="text-sm font-bold text-primary tabular-nums">{row.price}</span>
        </div>
      ))}
    </div>
  )
}

// Tabla de precios para tarjeta Platinum (fondo oscuro fijo)
function PricingTableDark({
  rows,
  label,
}: {
  rows: readonly { readonly label: string; readonly price: string }[]
  label: string
}) {
  return (
    <div className="mt-2 mb-6 rounded-(--radius-md) overflow-hidden ring-1 ring-white/20">
      <div className="px-4 py-2.5 bg-white/10 border-b border-white/15">
        <p className="text-xs font-bold tracking-widest uppercase text-white/60">{label}</p>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={[
            'flex justify-between items-center px-4 py-2.5',
            i % 2 === 0 ? 'bg-white/8' : '',
          ].join(' ')}
        >
          <span className="text-sm text-white/70">{row.label}</span>
          <span className="text-sm font-bold text-white tabular-nums">{row.price}</span>
        </div>
      ))}
    </div>
  )
}

// Precio simple (sin tabla por tipo de vehículo)
function PricePill({ price, label }: { price: string; label: string }) {
  return (
    <div className="mt-2 mb-6 flex items-center gap-3 px-4 py-3 rounded-(--radius-md) bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/25 dark:ring-primary/40 w-fit">
      <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">{label}</span>
      <span className="font-bold text-primary text-base tabular-nums">{price}</span>
    </div>
  )
}

export async function ServicesGrid() {
  const t = await getTranslations('servicesGrid')
  const tr = await getTranslations('results')
  const locale = await getLocale()
  const services = await getServices(locale === 'en' ? 'en' : 'es')

  return (
    <SectionWrapper surface="base" id="todos-los-servicios">
      <header className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
          {t('badge')}
        </span>
        <h1 className="text-display-md text-(--color-on-surface)">{t('heading')}</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">{t('subheading')}</p>
      </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {services.map((service, idx) => {
          const layout = layoutBySlug[service.slug] ?? cardLayouts[idx % cardLayouts.length]

          const btnLabel = layout.isHorizontal ? t('requestServiceBtn') : t('requestBtn')

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
                      ? 'p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-center'
                    : layout.splitImage
                      ? 'p-6 md:p-8 flex flex-col lg:flex-row gap-6 overflow-hidden'
                      : 'p-8 md:p-10 flex flex-col justify-between overflow-hidden',
                ].join(' ')}
              >
                {/* Foto real del servicio — banda ancha en tablet, retrato a la
                    derecha en desktop. Nunca se estira hasta quedar en un hilo. */}
                {layout.splitImage && service.image && (
                  <div className="relative w-full lg:w-[38%] aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-(--radius-lg) shrink-0 order-first lg:order-last">
                    <Image
                      src={service.image}
                      alt={t('imageAfterAlt', { name: service.title })}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 1024px) 100vw, 34vw"
                    />
                  </div>
                )}

                <div
                  className={[
                    layout.isHorizontal ? 'flex-1' : '',
                    layout.splitImage ? 'lg:flex-1 min-w-0' : '',
                    'relative z-10',
                  ].join(' ')}
                >
                  {/* Icono */}
                  <div
                    className={['w-12 h-12 rounded-(--radius-lg) flex items-center justify-center mb-6', layout.iconBg].join(' ')}
                    aria-hidden="true"
                  >
                    <Icon name={service.icon} size={24} color={layout.iconColor} />
                  </div>

                  {/* Título */}
                  <h2
                    className={[
                      'font-display font-bold tracking-tight mb-3',
                      layout.splitImage ? 'text-3xl' : 'text-2xl',
                      layout.titleClass,
                    ].join(' ')}
                  >
                    {service.title}
                  </h2>

                  {/* Descripción */}
                  <p className={['max-w-[70ch] leading-relaxed mb-4', layout.descClass].join(' ')}>
                    {service.fullDescription}
                  </p>

                  {/* Features — servicio insignia, horizontales y banda de foto */}
                  {(layout.splitImage || layout.isHorizontal || layout.photoBand) && (
                    <ul
                      className="flex flex-col gap-2 mb-4"
                      aria-label={t('featuresAria', { name: service.title })}
                    >
                      {service.features.map((f) => (
                        <li key={f} className={['flex items-center gap-2 text-sm', layout.descClass].join(' ')}>
                          <span
                            className={[
                              'w-1.5 h-1.5 rounded-full shrink-0',
                              layout.isDark ? 'bg-white/60' : 'bg-primary',
                            ].join(' ')}
                            aria-hidden="true"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Pricing — tabla o pill según disponibilidad */}
                  {service.pricingTable ? (
                    layout.isDark ? (
                      <PricingTableDark rows={service.pricingTable} label={t('pricingTableLabel')} />
                    ) : (
                      <PricingTableLight rows={service.pricingTable} label={t('pricingTableLabel')} />
                    )
                  ) : (
                    <PricePill price={service.price ?? ''} label={t('priceLabel')} />
                  )}

                  {/* CTA */}
                  <Link
                    href={`/servicios/${service.slug}`}
                    className={[
                      'inline-flex items-center gap-2 px-6 py-3 rounded-(--radius-md)',
                      'font-semibold text-sm transition-all duration-200 w-fit',
                      'hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                      layout.btnVariant === 'light'
                        ? 'bg-white text-on-inverse hover:bg-white/90 w-full justify-center'
                        : 'gradient-primary text-white shadow-ambient hover:shadow-float',
                    ].join(' ')}
                  >
                    {btnLabel}
                  </Link>
                </div>

                {/* Imagen horizontal — before/after */}
                {layout.isHorizontal && service.imageBefore && service.image && (
                  <div className="flex-1 w-full shrink-0">
                    <BeforeAfterCard
                        label={service.title}
                      beforeLabel={tr('before')}
                      afterLabel={tr('after')}
                      before={{
                        src: service.imageBefore,
                        alt: t('imageBeforeAlt', { name: service.title }),
                      }}
                      after={{
                        src: service.image!,
                        alt: t('imageAfterAlt', { name: service.title }),
                      }}
                    />
                  </div>
                )}

                {/* Banda de fotografía a ancho completo de la tarjeta */}
                {layout.photoBand && service.image && (
                    <div className="relative w-full aspect-[16/9] max-h-[320px] overflow-hidden rounded-(--radius-lg) shrink-0">
                    <Image
                      src={service.image}
                      alt={t('imageAfterAlt', { name: service.title })}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
                    />
                  </div>
                )}

                {/* Imagen horizontal — foto sola */}
                {layout.isHorizontal && (!service.imageBefore || !service.image) && service.image && (
                  <div className="flex-1 w-full h-48 md:h-56 overflow-hidden rounded-(--radius-lg) shadow-float shrink-0">
                    <Image
                      src={service.image}
                      alt={t('imageAfterAlt', { name: service.title })}
                      width={480}
                      height={220}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                )}

                {/* Fondo decorativo — reservado a composiciones sin foto propia */}
                {layout.showDecorativeBg && !layout.splitImage && service.image && (
                  <div
                    className="absolute right-0 bottom-0 w-1/2 h-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    aria-hidden="true"
                  >
                    <Image src={service.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 20vw" />
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
          <span
            className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-white/15 text-white"
            aria-hidden="true"
          >
            <Icon name="car" size={26} />
          </span>
          <h2 className="text-headline-md text-white mb-4 max-w-3xl mx-auto">{t('ctaBannerTitle')}</h2>
          <p className="text-white/80 text-lg mb-8 font-light">{t('ctaBannerDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-(--radius-md) hover:scale-105 transition-transform active:scale-95 shadow-float"
            >
              {t('bookNow')}
            </Link>
            <Link
              href="/cobertura"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-semibold rounded-(--radius-md) hover:bg-white/20 transition-colors border border-white/20"
            >
              {t('viewCoverage')}
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
