import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import './globals.css'

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
  title: {
    default: 'Detailing Marin | Eco-Luxe Automotive Care',
    template: '%s | Detailing Marin',
  },
  description:
    'Servicio de detallado automotriz premium a domicilio en Maipú y alrededores. Lavado ecológico, pulido y más — sin moverte de casa.',
  keywords: [
    'detailing automotriz',
    'lavado a domicilio',
    'lavado ecológico',
    'pulido de autos',
    'Maipú',
    'detailing Maipú',
  ],
  authors: [{ name: 'Detailing Marin' }],
  creator: 'Detailing Marin',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://detailingmarin.cl',
    siteName: 'Detailing Marin',
    title: 'Detailing Marin | Eco-Luxe Automotive Care',
    description:
      'Servicio de detallado automotriz premium a domicilio en Maipú y alrededores.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
