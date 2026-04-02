import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { CTASection } from '@/components/sections/CTASection'
import { buildAlternates, ogLocale } from '@/lib/seo'

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
    },
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <CTASection />
    </>
  )
}
