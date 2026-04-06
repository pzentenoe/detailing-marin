import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <ResultsSection />
      <CTASection />
    </>
  )
}
