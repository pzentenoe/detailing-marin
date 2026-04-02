// ============================================================
// ServicesPreview — Home page services con imagen
// Layout: 1 hydro-card grande + grid 3 tarjetas pequeñas
// ============================================================

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { servicesConfig } from '@/lib/services'

export async function ServicesPreview() {
  const t = await getTranslations('servicesPreview')
  const ts = await getTranslations('services')

  const services = servicesConfig.map((s) => ({
    ...s,
    title: ts(`${s.slug}.title`),
    shortDescription: ts(`${s.slug}.shortDescription`),
    image: ('image' in s ? s.image : undefined) as string | undefined,
  }))

  const [featured, ...rest] = services

  return (
    <SectionWrapper surface="base" id="servicios-preview">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-label-md text-primary mb-3">{t('label')}</p>
          <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
          <p className="text-body-lg text-on-surface-variant max-w-lg mt-3">{t('description')}</p>
        </div>
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 pb-2 border-b-2 border-primary-container text-primary font-bold text-sm hover:gap-4 transition-all whitespace-nowrap shrink-0"
          aria-label={t('viewAllAria')}
        >
          {t('viewAll')}
        </Link>
      </div>

      {/* Grid principal: 2 columnas desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Tarjeta grande — h-full para igualar altura de la columna derecha */}
        <Link
          href={`/servicios#${featured.slug}`}
          className="group rounded-(--radius-xl) overflow-hidden cursor-pointer block h-full"
          aria-label={`Ver servicio: ${featured.title}`}
        >
          <div className="relative w-full h-full min-h-[480px]">
            <Image
              src={featured.image!}
              alt={`${featured.title} — resultado Detailing Marin`}
              fill
              className="object-cover brightness-95 dark:brightness-75 group-hover:scale-105 group-hover:brightness-100 dark:group-hover:brightness-90 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            {/* Badge glassmorphic — esquina superior */}
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold tracking-wide">
                ✦ {t('featuredBadge')}
              </span>
            </div>

            {/* Gradiente cinematic — fade solo en zona inferior */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, transparent 60%)' }}
              aria-hidden="true"
            />

            {/* Texto overlaid */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3
                className="font-display text-3xl font-bold mb-2 text-white"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
              >
                {featured.title}
              </h3>
              <p className="text-white/75 max-w-sm mb-6 text-sm leading-relaxed">{featured.shortDescription}</p>
              <span className={[
                'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                'bg-white text-primary dark:text-on-primary font-bold text-sm',
                'group-hover:bg-primary group-hover:text-white transition-colors duration-300',
              ].join(' ')}>
                {featured.price} ›
              </span>
            </div>
          </div>
        </Link>

        {/* Grid tarjetas pequeñas + CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          {rest.map((service) => (
            <Link
              key={service.id}
              href={`/servicios#${service.slug}`}
              className="group rounded-(--radius-xl) overflow-hidden cursor-pointer block"
              aria-label={`Ver servicio: ${service.title}`}
            >
              <div className="relative w-full h-52">
                {service.image ? (
                  <>
                    <Image
                      src={service.image}
                      alt={`${service.title} — resultado Detailing Marin`}
                      fill
                      className="object-cover scale-110 brightness-90 dark:brightness-75 group-hover:scale-100 group-focus-within:scale-100 group-hover:brightness-100 group-focus-within:brightness-100 dark:group-hover:brightness-90 dark:group-focus-within:brightness-90 transition-all duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 gradient-primary opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                )}
                {/* Texto overlaid */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-bold text-lg mb-1 text-white">{service.title}</h3>
                  {service.price && (
                    <span className="text-white/80 text-xs font-medium">{service.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* Tarjeta CTA "Ver todos" */}
          <Link
            href="/servicios"
            className={[
              'group rounded-(--radius-xl) overflow-hidden h-52',
              'bg-surface-container-low hover:bg-surface-container',
              'flex flex-col items-center justify-center gap-3',
              'border border-outline-variant/20 transition-all duration-300',
            ].join(' ')}
            aria-label={t('viewAllAria')}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true">✨</span>
            <p className="font-display font-bold text-primary text-sm text-center px-4">{t('viewAll')}</p>
            <span className="text-xs text-on-surface-variant group-hover:text-primary transition-colors">→</span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
