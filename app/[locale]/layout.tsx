import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { QueryProvider } from '@/components/layout/QueryProvider'
import { buildLocalBusinessJsonLd, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'
import { routing } from '@/i18n/routing'
import '../globals.css'

const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Detailing Marin | Detailing automotriz a domicilio en Maipú',
    template: '%s | Detailing Marin',
  },
  description:
    'Servicio de detallado automotriz premium a domicilio en Maipú y alrededores. Lavado ecológico, pulido y más — sin moverte de casa.',
  authors: [{ name: 'Detailing Marin' }],
  creator: 'Detailing Marin',
  publisher: 'Detailing Marin',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE] },
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const localBusinessJsonLd = buildLocalBusinessJsonLd()

  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
