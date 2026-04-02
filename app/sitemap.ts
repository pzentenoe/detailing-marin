import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'

const lastModified = new Date()

const routes = [
  { path: '/',           enPath: '/en',            changeFrequency: 'weekly'  as const, priority: 1,   images: true },
  { path: '/servicios',  enPath: '/en/servicios',  changeFrequency: 'weekly'  as const, priority: 0.9, images: true },
  { path: '/contacto',   enPath: '/en/contacto',   changeFrequency: 'monthly' as const, priority: 0.8, images: false },
  { path: '/privacidad', enPath: '/en/privacidad', changeFrequency: 'yearly'  as const, priority: 0.3, images: false },
  { path: '/terminos',   enPath: '/en/terminos',   changeFrequency: 'yearly'  as const, priority: 0.3, images: false },
]

const heroImage = absoluteUrl('/images/hero-detailing.webp')

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, enPath, changeFrequency, priority, images }) => {
    const languages = { es: absoluteUrl(path), en: absoluteUrl(enPath) }
    const shared = { lastModified, changeFrequency, priority, alternates: { languages } }
    const imageEntry = images ? { images: [heroImage] } : {}

    return [
      { url: absoluteUrl(path),   ...shared, ...imageEntry },
      { url: absoluteUrl(enPath), ...shared, ...imageEntry },
    ]
  })
}
