import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CoberturaSection } from '@/components/sections/CoberturaSection'
import { buildAlternates, buildLocalBusinessJsonLd, SITE_NAME, SITE_URL, SERVED_COMMUNES } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.coverage' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/cobertura'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: locale === 'en'
        ? `${SITE_URL}/en/cobertura`
        : `${SITE_URL}/cobertura`,
    },
  }
}

export default async function CoberturaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const localBusinessJsonLd = {
    ...buildLocalBusinessJsonLd(),
    areaServed: SERVED_COMMUNES.map((commune) => ({
      '@type': 'City',
      name: commune,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Región Metropolitana de Santiago',
        containedInPlace: { '@type': 'Country', name: 'Chile' },
      },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'en' ? 'Coverage' : 'Cobertura',
        item: locale === 'en' ? `${SITE_URL}/en/cobertura` : `${SITE_URL}/cobertura`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="pt-20">
        <CoberturaSection />
      </div>
    </>
  )
}
