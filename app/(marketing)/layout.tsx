// ============================================================
// Marketing Layout — Navbar + Footer compartidos
// Route group: app/(marketing)/
// ============================================================

import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
