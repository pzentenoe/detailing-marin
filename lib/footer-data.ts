import 'server-only'

import { footerContentSchema, fallbackFooterContent } from '@/lib/footer-content'
import type { FooterContent } from '@/lib/footer-content'

const FOOTER_FIELDS = Object.keys(footerContentSchema.shape).join(',')

export async function getFooterContent(): Promise<FooterContent> {
  const directusUrl = process.env.DIRECTUS_URL
  const token = process.env.DIRECTUS_TOKEN
  if (!directusUrl || !token) return fallbackFooterContent

  try {
    const url = new URL('/items/detailing_footer', directusUrl)
    url.search = new URLSearchParams({ fields: FOOTER_FIELDS, limit: '1' }).toString()
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60, tags: ['directus-footer'] },
      redirect: 'error',
    })
    if (!response.ok) return fallbackFooterContent
    const payload = await response.json() as { data?: unknown[] }
    const parsed = footerContentSchema.safeParse(payload.data?.[0])
    return parsed.success ? parsed.data : fallbackFooterContent
  } catch {
    return fallbackFooterContent
  }
}
