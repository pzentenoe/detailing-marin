import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GallerySection } from '@/components/sections/GallerySection'
import { buildAlternates, DEFAULT_OG_IMAGE, ogLocale } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.gallery' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/galeria'),
    openGraph: {
      url: locale === 'es' ? '/galeria' : '/en/galeria',
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: ogLocale(locale),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE] },
  }
}

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <GallerySection />
    </div>
  )
}
