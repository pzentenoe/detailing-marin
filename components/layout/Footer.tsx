// ============================================================
// Footer — Links, copyright, eco branding
// ============================================================

import { getLocale } from 'next-intl/server'
import { getFooterContent } from '@/lib/footer-data'
import { projectFooterContent } from '@/lib/footer-content'
import { FooterView } from '@/components/layout/FooterView'

export async function Footer() {
  const locale = await getLocale() as 'es' | 'en'
  const content = projectFooterContent(await getFooterContent(), locale)
  return <FooterView content={content} locale={locale} />
}
