import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { ResultsSection } from '@/components/sections/ResultsSection'
import { CTASection } from '@/components/sections/CTASection'
import { buildAlternates, buildFaqJsonLd, DEFAULT_OG_IMAGE, ogLocale } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/'),
    openGraph: {
      url: locale === 'es' ? '/' : '/en',
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: ogLocale(locale),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE] },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const faqJsonLd = buildFaqJsonLd(locale === 'en' ? 'en' : 'es')
  const t = await getTranslations({ locale, namespace: 'coverageTeaser' })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />

      {/* Coverage teaser — internal link to /cobertura */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-1">{t('label')}</p>
            <h2 className="text-headline-md text-(--color-on-surface)">{t('title')}</h2>
            <p className="text-on-surface-variant text-sm mt-1">{t('description')}</p>
          </div>
          <Link
            href="/cobertura"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold text-sm shadow-ambient hover:shadow-float transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('cta')}
          </Link>
        </div>
      </div>

      <ResultsSection />
      <CTASection />
    </>
  )
}
