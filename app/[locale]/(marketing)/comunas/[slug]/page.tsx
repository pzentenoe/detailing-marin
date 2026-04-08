import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { CTASection } from '@/components/sections/CTASection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Icon } from '@/components/ui/Icon'
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo'
import { servicesConfig, services } from '@/lib/services'
import { getCommuneBySlug, PRIORITY_COMMUNES } from '@/lib/comunas'

type PageParams = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  // Solo español — estas páginas son SEO local para Chile
  return PRIORITY_COMMUNES.map((commune) => ({
    locale: 'es',
    slug: commune.slug,
  }))
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = await params

  if (locale !== 'es') return { robots: { index: false, follow: false } }

  const commune = getCommuneBySlug(slug)
  if (!commune) return { robots: { index: false, follow: false } }

  const title = `Lavado de autos a domicilio en ${commune.name} — Detailing Marin`
  const description = `Servicio de lavado ecológico, aspirado y detailing automotriz a domicilio en ${commune.name}, Santiago. Sin moverte de tu casa. Productos biodegradables y resultado premium.`
  const path = `/comunas/${commune.slug}`
  const canonical = absoluteUrl(path)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { es: canonical, 'x-default': canonical },
    },
    openGraph: {
      url: canonical,
      title,
      description,
      locale: 'es_CL',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE] },
  }
}

export default async function ComunaPage({ params }: { params: PageParams }) {
  const { locale, slug } = await params

  if (locale !== 'es') notFound()

  const commune = getCommuneBySlug(slug)
  if (!commune) notFound()

  const path = `/comunas/${commune.slug}`

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: SITE_NAME, url: absoluteUrl('/') },
    { name: 'Cobertura', url: absoluteUrl('/cobertura') },
    { name: commune.name, url: absoluteUrl(path) },
  ])

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': absoluteUrl(`${path}#localbusiness`),
    name: SITE_NAME,
    url: SITE_URL,
    description: `Servicio de detailing automotriz a domicilio en ${commune.name}, ${commune.zone}, Santiago.`,
    areaServed: {
      '@type': 'City',
      name: commune.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Región Metropolitana de Santiago',
      },
    },
    telephone: '+56954451422',
    openingHours: ['Mo-Sa 09:00-19:00'],
    priceRange: '$$',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es-CL',
    mainEntity: commune.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero de la comuna */}
      <SectionWrapper surface="base" innerClassName="pt-10">
        <Link href="/cobertura" className="text-sm font-semibold text-primary hover:underline w-fit inline-block mb-6">
          ← Ver todas las zonas
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <article className="flex flex-col gap-6">
            <p className="text-xs font-bold tracking-widest uppercase text-primary">{commune.zone}</p>

            <h1 className="text-display-md text-(--color-on-surface)">
              Lavado de autos a domicilio en {commune.name}
            </h1>

            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {commune.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commune.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 rounded-(--radius-md) bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            <Link
              href={`/contacto?zona=${encodeURIComponent(commune.name)}`}
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-(--radius-md) gradient-primary text-white font-semibold shadow-ambient hover:shadow-float transition-all"
            >
              Agendar en {commune.name}
            </Link>
          </article>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '$0', label: 'Costo de traslado a ' + commune.name },
              { value: '90%', label: 'Ahorro de agua vs. lavado tradicional' },
              { value: '+500', label: 'Autos atendidos en Santiago' },
              { value: '60–120', label: 'Minutos por servicio en domicilio' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-(--radius-xl) bg-surface-container-low border border-outline-variant/20 p-5 flex flex-col gap-1"
              >
                <p className="text-display-md text-primary font-bold">{stat.value}</p>
                <p className="text-xs text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Servicios disponibles */}
      <SectionWrapper surface="low">
        <h2 className="text-headline-md text-(--color-on-surface) mb-2">
          Servicios disponibles en {commune.name}
        </h2>
        <p className="text-on-surface-variant mb-8">
          Todos los servicios incluyen desplazamiento a tu domicilio en {commune.name} sin costo extra.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesConfig.map((service) => {
            const fullService = services.find((s) => s.slug === service.slug)
            return (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group rounded-(--radius-xl) bg-surface-container border border-outline-variant/20 p-5 flex flex-col gap-3 hover:border-primary/40 hover:shadow-ambient transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-(--radius-md) bg-secondary-container flex items-center justify-center shrink-0">
                    <Icon name={service.icon} size={18} color="var(--color-primary)" />
                  </span>
                  <p className="text-label-md text-primary font-semibold">{service.price}</p>
                </div>
                <h3 className="font-semibold text-(--color-on-surface) group-hover:text-primary transition-colors">
                  {fullService?.title ?? service.slug}
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2">
                  {fullService?.shortDescription}
                </p>
                <p className="text-xs text-on-surface-variant mt-auto">
                  {service.duration} · Ver detalle →
                </p>
              </Link>
            )
          })}
        </div>
      </SectionWrapper>

      {/* FAQ específico de la comuna */}
      <SectionWrapper surface="base">
        <section className="max-w-4xl">
          <h2 className="text-headline-md text-(--color-on-surface) mb-6">
            Preguntas frecuentes — {commune.name}
          </h2>
          <div className="grid gap-4">
            {commune.faq.map((item) => (
              <article
                key={item.q}
                className="rounded-(--radius-lg) bg-surface-container-low px-5 py-4"
              >
                <h3 className="font-semibold text-(--color-on-surface) mb-2">{item.q}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Links a otras comunas */}
      <SectionWrapper surface="low">
        <h2 className="text-headline-md text-(--color-on-surface) mb-6">
          También atendemos otras comunas
        </h2>
        <div className="flex flex-wrap gap-3">
          {PRIORITY_COMMUNES.filter((c) => c.slug !== commune.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/comunas/${c.slug}`}
              className="px-4 py-2 rounded-full border border-outline-variant text-sm text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CTASection />
    </div>
  )
}
