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
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/privacidad'),
    robots: { index: true, follow: true },
  }
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacidad' })

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
              <p>{t('s2Intro')}</p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2 pl-2">
                <li>{t('s2Li1')}</li>
                <li>{t('s2Li2')}</li>
                <li>{t('s2Li3')}</li>
              </ul>
              <p className="mt-3">{t('s2Footer')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s3Title')}</h2>
              <p>{t('s3Body')}</p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s4Title')}</h2>
              <p>
                {t('s4Body').split(t('s4LinkText'))[0]}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('s4LinkText')}
                </a>
                {t('s4Body').split(t('s4LinkText'))[1]}
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s5Title')}</h2>
              <p>
                {t('s5Body')}{' '}
                <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                  {contactInfo.email}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">{t('s6Title')}</h2>
              <p>{t('s6Body')}</p>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
