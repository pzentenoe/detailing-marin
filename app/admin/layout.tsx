import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import '../globals.css'

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
  title: 'Administración | Detailing Marin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-body antialiased text-on-background">
        {children}
      </body>
    </html>
  )
}
