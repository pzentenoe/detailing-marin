import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CTASection } from '@/components/sections/CTASection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BeforeAfterCard } from '@/components/ui/BeforeAfterCard'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/i18n/navigation'
import { absoluteUrl, buildAlternates, buildBreadcrumbJsonLd, buildServiceFaqJsonLd, DEFAULT_OG_IMAGE, getServiceFaqEntries, ogLocale, SERVED_COMMUNES, SITE_NAME, SITE_URL } from '@/lib/seo'
import { servicesConfig } from '@/lib/services'

type PageParams = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return servicesConfig.flatMap((service) => [
    { locale: 'es', slug: service.slug },
    { locale: 'en', slug: service.slug },
  ])
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const { locale, slug } = await params
  const service = servicesConfig.find((item) => item.slug === slug)

  if (!service) {
    return {
      title: locale === 'en' ? 'Service not found' : 'Servicio no encontrado',
      robots: { index: false, follow: false },
    }
  }

  const ts = await getTranslations({ locale, namespace: 'services' })
  const serviceTitle = ts(`${service.slug}.title`)
  const serviceDescription = ts(`${service.slug}.fullDescription`)
  const pagePath = `/servicios/${service.slug}`
  const ogImage = 'image' in service ? service.image : DEFAULT_OG_IMAGE

  const localeLead = locale === 'en'
    ? `${serviceTitle} in Santiago`
    : `${serviceTitle} en Santiago`

  const shortDescription = `${localeLead} — ${serviceDescription}`.slice(0, 158)

  return {
    title: locale === 'en' ? `${serviceTitle} | Mobile service` : `${serviceTitle} | Servicio a domicilio`,
    description: shortDescription,
    alternates: buildAlternates(locale, pagePath),
    openGraph: {
      url: locale === 'en' ? `/en/servicios/${service.slug}` : pagePath,
      title: localeLead,
      description: shortDescription,
      locale: ogLocale(locale),
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: PageParams
}) {
  const { locale, slug } = await params
  const service = servicesConfig.find((item) => item.slug === slug)

  if (!service) {
    notFound()
  }

  const ts = await getTranslations({ locale, namespace: 'services' })
  const tr = await getTranslations({ locale, namespace: 'results' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  const title = ts(`${service.slug}.title`)
  const shortDescription = ts(`${service.slug}.shortDescription`)
  const fullDescription = ts(`${service.slug}.fullDescription`)
  const features = ts.raw(`${service.slug}.features`) as string[]
  const serviceImage = ('image' in service ? service.image : undefined) ?? DEFAULT_OG_IMAGE
  const serviceImageBefore = 'imageBefore' in service ? service.imageBefore : undefined

  const localePrefix = locale === 'en' ? '/en' : ''
  const localeCode = locale === 'en' ? 'en' : 'es'
  const contactPath = `${localePrefix}/contacto?servicio=${encodeURIComponent(title)}`
  const serviceFaqEntries = getServiceFaqEntries(service.slug, localeCode)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: SITE_NAME, url: absoluteUrl(localePrefix || '/') },
    { name: tNav('services'), url: absoluteUrl(`${localePrefix}/servicios`) },
    { name: title, url: absoluteUrl(`${localePrefix}/servicios/${service.slug}`) },
  ])

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl(`${localePrefix}/servicios/${service.slug}#service`),
    name: title,
    description: fullDescription,
    serviceType: title,
    provider: {
      '@type': 'AutomotiveBusiness',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: SERVED_COMMUNES,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CLP',
      description: service.price ?? (locale === 'en' ? 'Request quote' : 'Consultar precio'),
      url: absoluteUrl(contactPath),
    },
  }

  const serviceFaqJsonLd = buildServiceFaqJsonLd(service.slug, localeCode)

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {serviceFaqEntries.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqJsonLd) }}
        />
      )}

      <SectionWrapper surface="base" innerClassName="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <article className="flex flex-col gap-6">
            <Link href="/servicios" className="text-sm font-semibold text-primary hover:underline w-fit">
              ← {tNav('services')}
            </Link>

            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-(--radius-md) bg-secondary-container flex items-center justify-center">
                <Icon name={service.icon} size={20} color="var(--color-primary)" />
              </span>
              <p className="text-label-md text-primary">{service.price ?? (locale === 'en' ? 'Request quote' : 'Consultar')}</p>
            </div>

            <h1 className="text-display-md text-(--color-on-surface)">{title}</h1>
            <p className="text-body-lg text-on-surface-variant">{shortDescription}</p>
            <p className="text-on-surface-variant leading-relaxed">{fullDescription}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={locale === 'en' ? `${title} features` : `Características de ${title}`}>
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 rounded-(--radius-md) bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={contactPath}
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-(--radius-md) gradient-primary text-white font-semibold shadow-ambient hover:shadow-float transition-all"
            >
              {locale === 'en' ? 'Request this service' : 'Solicitar este servicio'}
            </Link>
          </article>

          <div className="relative rounded-(--radius-xl) overflow-hidden min-h-[380px] bg-surface-container-low">
            <Image
              src={serviceImage}
              alt={`${title} — ${SITE_NAME}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </SectionWrapper>

      {serviceImageBefore && (
        <SectionWrapper surface="low" innerClassName="pt-0">
          <BeforeAfterCard
            label={title}
            beforeLabel={tr('before')}
            afterLabel={tr('after')}
            before={{
              src: serviceImageBefore,
              alt: locale === 'en' ? `${title} before service` : `${title} antes del servicio`,
            }}
            after={{
              src: serviceImage,
              alt: locale === 'en' ? `${title} after service` : `${title} después del servicio`,
            }}
          />
        </SectionWrapper>
      )}

      {serviceFaqEntries.length > 0 && (
        <SectionWrapper surface="base" innerClassName="pt-0">
          <section className="max-w-4xl">
            <h2 className="text-headline-md text-(--color-on-surface) mb-6">
              {locale === 'en' ? `Frequently asked questions about ${title}` : `Preguntas frecuentes sobre ${title}`}
            </h2>

            <div className="grid gap-4">
              {serviceFaqEntries.map((faq) => (
                <article key={faq.name} className="rounded-(--radius-lg) bg-surface-container-low px-5 py-4">
                  <h3 className="font-semibold text-(--color-on-surface) mb-2">{faq.name}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{faq.text}</p>
                </article>
              ))}
            </div>
          </section>
        </SectionWrapper>
      )}

      <CTASection />
    </div>
  )
}
