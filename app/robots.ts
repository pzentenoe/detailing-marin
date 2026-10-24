import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // `/api/directus-assets` sirve imágenes públicas de la galería y de los
      // servicios; bloquearlo las dejaría incrawlables pese a estar publicadas
      // en el sitemap de imágenes.
      allow: ['/', '/api/directus-assets/'],
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
