import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { absoluteUrl, buildAlternates, buildBreadcrumbJsonLd, buildFaqJsonLd, buildServicesJsonLd, DEFAULT_OG_IMAGE, ogLocale } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { servicesConfig } from '@/lib/services'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.services' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/servicios'),
    openGraph: {
      url: locale === 'es' ? '/servicios' : '/en/servicios',
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: ogLocale(locale),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE] },
  }
}

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const localeCode = locale === 'en' ? 'en' : 'es'
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const tServices = await getTranslations({ locale, namespace: 'services' })

  const localizedServices = servicesConfig.map((service) => ({
    title: tServices(`${service.slug}.title`),
    fullDescription: tServices(`${service.slug}.fullDescription`),
    price: service.price,
  }))

  const servicesJsonLd = buildServicesJsonLd({ locale: localeCode, localizedServices })
  const faqJsonLd = buildFaqJsonLd(localeCode)

  const homePath = localeCode === 'en' ? '/en' : '/'
  const servicesPath = localeCode === 'en' ? '/en/servicios' : '/servicios'
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: absoluteUrl(homePath) },
    { name: tNav('services'), url: absoluteUrl(servicesPath) },
  ])

  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="pt-20">
        <ServicesGrid />
      </div>
      <CTASection />
    </>
  )
}
