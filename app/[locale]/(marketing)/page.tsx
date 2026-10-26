import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { ResultsSection } from '@/components/sections/ResultsSection'
import { CTASection } from '@/components/sections/CTASection'
import { GallerySection } from '@/components/sections/GallerySection'
import { IndustrialSection } from '@/components/sections/IndustrialSection'
import { Icon } from '@/components/ui/Icon'
import { buildAlternates, buildFaqJsonLd, DEFAULT_OG_IMAGE, ogLocale } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { getHomepageMedia } from '@/lib/homepage-content'

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
  const [t, homepageMedia] = await Promise.all([
    getTranslations({ locale, namespace: 'coverageTeaser' }),
    getHomepageMedia(),
  ])
  const asset = (id: string | null) => id ? `/api/directus-assets/${id}` : undefined

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HeroSection imageSrc={asset(homepageMedia.hero)} />
      <FeaturesSection imageSources={homepageMedia.features.map(asset)} />
      <ServicesPreview />
      <GallerySection preview />
      <IndustrialSection imageSrc={asset(homepageMedia.industrial)} />

      {/* Coverage teaser — internal link to /cobertura */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-(--radius-xl) bg-surface-container-low border border-outline-variant/20 px-6 py-7 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-label-md text-primary mb-2">{t('label')}</p>
            <h2 className="text-headline-md text-(--color-on-surface)">{t('title')}</h2>
            <p className="text-on-surface-variant text-sm mt-2 max-w-xl leading-relaxed">{t('description')}</p>
          </div>
          <Link
            href="/cobertura"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-white font-semibold text-sm shadow-ambient transition-all hover:shadow-float active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Icon name="map-pin" size={16} />
            {t('cta')}
            <Icon
              name="arrow-right"
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </Link>
        </div>
      </div>

      <ResultsSection images={{
        motor: { before: asset(homepageMedia.results.motor.before), after: asset(homepageMedia.results.motor.after) },
        tapiz: { before: asset(homepageMedia.results.tapiz.before), after: asset(homepageMedia.results.tapiz.after) },
        focos: { before: asset(homepageMedia.results.focos.before), after: asset(homepageMedia.results.focos.after) },
        exterior: { before: asset(homepageMedia.results.exterior.before), after: asset(homepageMedia.results.exterior.after) },
      }} />
      <CTASection />
    </>
  )
}
