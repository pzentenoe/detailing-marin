// ============================================================
// Home — Página principal /
// ============================================================

import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Detailing Marin — El mejor lavado detallado y pulido para tu auto, sin moverte de tu casa. Tecnología hidrofóbica y productos biodegradables. Maipú y alrededores.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <CTASection />
    </>
  )
}
