import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { buildAlternates, buildServicesJsonLd, ogLocale } from '@/lib/seo'

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <div className="pt-20">
        <ServicesGrid />
      </div>
      <CTASection />
    </>
  )
}
