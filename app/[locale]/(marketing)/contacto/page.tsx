import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ContactForm } from '@/components/sections/ContactForm'
import { buildAlternates, ogLocale } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.contact' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/contacto'),
    openGraph: {
      url: locale === 'es' ? '/contacto' : '/en/contacto',
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: ogLocale(locale),
    },
  }
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <div className="pt-20">
      <SectionWrapper surface="base">
        <ContactForm />
      </SectionWrapper>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-(--radius-xl) overflow-hidden aspect-[21/9] flex items-center px-8 md:px-12">
          <Image
            src="/images/hero-detailing.webp"
            alt={t('banner.imageAlt')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-lg flex flex-col gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              {t('banner.title')}
            </h2>
            <p className="text-white/80 font-light text-lg leading-relaxed">
              {t('banner.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
