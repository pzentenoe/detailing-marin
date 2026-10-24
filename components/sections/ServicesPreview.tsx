// ============================================================
// ServicesPreview — Home page services con imagen
// Layout: 1 tarjeta editorial grande + grid de tarjetas con placeholder
// diseñado cuando el servicio todavía no tiene fotografía en el CMS.
// ============================================================

import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Icon } from '@/components/ui/Icon'
import { getServices } from '@/lib/service-catalog'

export async function ServicesPreview() {
  const t = await getTranslations('servicesPreview')
  const locale = await getLocale()
  const services = await getServices(locale === 'en' ? 'en' : 'es')
  const featured = services.find((service) => service.highlight) ?? services[0]
  if (!featured) return null
  const rest = services.filter((service) => service.id !== featured.id).slice(0, 4)

  return (
    <SectionWrapper surface="base" id="servicios-preview">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-12">
        <div>
          <p className="text-label-md text-primary mb-3">{t('label')}</p>
          <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
          <p className="text-body-lg text-on-surface-variant max-w-lg mt-3">{t('description')}</p>
        </div>
        <Link
          href="/servicios"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-outline-variant/30 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={t('viewAllAria')}
        >
          {t('viewAll')}
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      </div>

      {/* Grid principal: 2 columnas desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        {/* Tarjeta grande — h-full para igualar altura de la columna derecha */}
        <Link
          href={`/servicios/${featured.slug}`}
          className="group relative block h-full overflow-hidden rounded-(--radius-xl) bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="relative w-full h-full min-h-[480px]">
            {featured.image ? (
              <>
                <Image
                  src={featured.image}
                  alt={t('serviceImageAlt', { title: featured.title })}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Gradiente cinematic — fade solo en zona inferior */}
                <div className="absolute inset-0 scrim-strong" aria-hidden="true" />
              </>
            ) : (
              <ServicePlaceholder icon={featured.icon} />
            )}

            {/* Badge glassmorphic — esquina superior */}
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm border border-white/25">
                <Icon name="sparkles" size={14} />
                {t('featuredBadge')}
              </span>
            </div>

            {/* Texto overlaid */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3
                className={[
                  'font-display text-3xl font-bold mb-2',
                  featured.image ? 'text-white' : 'text-(--color-on-surface)',
                ].join(' ')}
              >
                {featured.title}
              </h3>
              <p
                className={[
                  'max-w-sm mb-6 text-sm leading-relaxed',
                  featured.image ? 'text-white/80' : 'text-on-surface-variant',
                ].join(' ')}
              >
                {featured.shortDescription}
              </p>
              <span
                className={[
                  'inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm transition-colors duration-300',
                  featured.image
                    ? 'bg-white text-on-inverse group-hover:bg-primary group-hover:text-on-primary'
                    : 'bg-primary text-on-primary',
                ].join(' ')}
              >
                {featured.price}
                <Icon name="arrow-right" size={16} />
              </span>
            </div>
          </div>
        </Link>

        {/* Grid tarjetas pequeñas + CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          {rest.map((service) => (
            <Link
              key={service.id}
              href={`/servicios/${service.slug}`}
              className="group block overflow-hidden rounded-(--radius-xl) bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="relative w-full h-52">
                {service.image ? (
                  <>
                    <Image
                      src={service.image}
                      alt={t('serviceImageAlt', { title: service.title })}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 scrim-soft" aria-hidden="true" />
                  </>
                ) : (
                  <ServicePlaceholder icon={service.icon} />
                )}
                {/* Texto overlaid */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className={[
                      'font-display font-bold text-[1.0625rem] leading-snug mb-1.5',
                      service.image ? 'text-white' : 'text-(--color-on-surface)',
                    ].join(' ')}
                  >
                    {service.title}
                  </h3>
                  {service.price && (
                    <span
                      className={[
                        'text-[0.8125rem] font-medium',
                        service.image ? 'text-white/90' : 'text-on-surface-variant',
                      ].join(' ')}
                    >
                      {service.price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* Tarjeta CTA "Ver todos" */}
          <Link
            href="/servicios"
            className="group flex h-52 flex-col items-center justify-center gap-3 rounded-(--radius-xl) border border-outline-variant/25 bg-surface-container-low transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={t('viewAllAria')}
          >
            <span
              className="grid size-11 place-items-center rounded-full bg-primary text-on-primary transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              aria-hidden="true"
            >
              <Icon name="arrow-right" size={20} />
            </span>
            <p className="font-display font-bold text-primary text-sm text-center px-4">{t('viewAll')}</p>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}

/**
 * Placeholder para servicios sin fotografía en el CMS.
 * Sustituye al bloque verde plano por una superficie del sistema con
 * marca de agua del icono: mantiene la retícula y la jerarquía.
 */
function ServicePlaceholder({ icon }: { icon: string }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden bg-surface-container"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--color-primary) 22%, transparent) 0%, transparent 55%), radial-gradient(circle at 75% 80%, color-mix(in oklab, var(--color-secondary-container) 35%, transparent) 0%, transparent 60%)',
        }}
      />
      <Icon name={icon} size={72} className="relative text-primary/25" />
    </div>
  )
}
