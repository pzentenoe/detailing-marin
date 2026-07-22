import type { ReactNode } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'

export default async function MarketingLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'nav' })

  return (
    <>
      <Navbar />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-surface-container-lowest px-4 py-2 font-semibold text-primary shadow-float focus:not-sr-only"
      >
        {t('skipToContent')}
      </a>
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
