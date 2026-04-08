import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CoberturaSection } from '@/components/sections/CoberturaSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { buildAlternates, buildLocalBusinessJsonLd, SITE_NAME, SITE_URL, SERVED_COMMUNES } from '@/lib/seo'
import { PRIORITY_COMMUNES } from '@/lib/comunas'

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

        {/* Links internos a páginas de comunas prioritarias */}
        <SectionWrapper surface="low">
          <h2 className="text-headline-md text-(--color-on-surface) mb-2">
            Zonas con mayor demanda
          </h2>
          <p className="text-on-surface-variant mb-8">
            Estas comunas tienen página propia con información detallada del servicio en tu zona.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRIORITY_COMMUNES.map((commune) => (
              <Link
                key={commune.slug}
                href={`/comunas/${commune.slug}`}
                className="group rounded-(--radius-xl) bg-surface-container border border-outline-variant/20 p-5 flex flex-col gap-2 hover:border-primary/40 hover:shadow-ambient transition-all"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-primary">
                  {commune.zone}
                </p>
                <h3 className="font-semibold text-(--color-on-surface) group-hover:text-primary transition-colors">
                  {commune.name}
                </h3>
                <p className="text-xs text-on-surface-variant mt-auto">
                  Lavado a domicilio en {commune.name} →
                </p>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </>
  )
}
