import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { contactInfo } from '@/lib/services'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.terms' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/terminos'),
    robots: { index: true, follow: true },
  }
}

export default async function TerminosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terminos' })
  const tShared = await getTranslations({ locale, namespace: 'shared' })

  return (
    <div className="pt-20">
      <SectionWrapper surface="base">
        <div className="max-w-3xl mx-auto py-8">
          <header className="flex flex-col gap-4 mb-12">
            <span className="inline-block self-start px-3 py-1 rounded-full bg-secondary-container text-primary font-bold text-xs tracking-widest uppercase">
              {t('badge')}
            </span>
            <h1 className="text-display-md text-(--color-on-surface) leading-tight">
              {t('heading')}
            </h1>
            <p className="text-on-surface-variant text-sm">{t('lastUpdated')}</p>
          </header>

          <div className="flex flex-col gap-10 text-body-lg text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s1Title')}</h2>
              <p>{t('s1Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s2Title')}</h2>
              <p>{t('s2Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s3Title')}</h2>
              <p>{t('s3Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s4Title')}</h2>
              <p>{t('s4Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s5Title')}</h2>
              <p>{t('s5Intro')}</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2 pl-2">
                <li>{t('s5Li1')}</li>
                <li>{t('s5Li2')}</li>
                <li>{t('s5Li3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s6Title')}</h2>
              <p>{t('s6Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s7Title')}</h2>
              <p>{t('s7Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s8Title')}</h2>
              <p>{t('s8Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s9Title')}</h2>
              <p>
                {t('s9Prefix')}{' '}
                <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                  {contactInfo.email}
                </a>{' '}
                {t('s9Mid')}{' '}
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(tShared('whatsappMessage'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('s9Phone')}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
