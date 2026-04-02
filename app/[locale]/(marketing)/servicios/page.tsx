import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { absoluteUrl, buildAlternates, buildBreadcrumbJsonLd, buildFaqJsonLd, buildServicesJsonLd, ogLocale, SITE_NAME } from '@/lib/seo'

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
    },
  }
}

export default function ServiciosPage() {
  const servicesJsonLd = buildServicesJsonLd()
  const faqJsonLd = buildFaqJsonLd()
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: SITE_NAME, url: absoluteUrl('/') },
    { name: 'Servicios', url: absoluteUrl('/servicios') },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="pt-20">
        <ServicesGrid />
      </div>
      <CTASection />
    </>
  )
}
