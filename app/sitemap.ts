import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { servicesConfig } from '@/lib/services'

const lastModified = new Date()

const routes = [
  { path: '/',           enPath: '/en',              changeFrequency: 'weekly'  as const, priority: 1,    images: true  },
  { path: '/servicios',  enPath: '/en/servicios',   changeFrequency: 'weekly'  as const, priority: 0.9,  images: true  },
  { path: '/cobertura',  enPath: '/en/cobertura',   changeFrequency: 'monthly' as const, priority: 0.85, images: false },
  { path: '/contacto',   enPath: '/en/contacto',    changeFrequency: 'monthly' as const, priority: 0.8,  images: false },
]

const heroImage = absoluteUrl('/images/hero-detailing.webp')

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = routes.flatMap(({ path, enPath, changeFrequency, priority, images }) => {
    const languages = { es: absoluteUrl(path), en: absoluteUrl(enPath) }
    const shared = { lastModified, changeFrequency, priority, alternates: { languages } }
    const imageEntry = images ? { images: [heroImage] } : {}

    return [
      { url: absoluteUrl(path),   ...shared, ...imageEntry },
      { url: absoluteUrl(enPath), ...shared, ...imageEntry },
    ]
  })

  const serviceRoutes = servicesConfig.flatMap((service) => {
    const path = `/servicios/${service.slug}`
    const enPath = `/en/servicios/${service.slug}`
    const serviceImage = 'image' in service ? service.image : undefined
    const imageEntry = serviceImage ? { images: [absoluteUrl(serviceImage)] } : { images: [heroImage] }

    return [
      {
        url: absoluteUrl(path),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
        alternates: { languages: { es: absoluteUrl(path), en: absoluteUrl(enPath) } },
        ...imageEntry,
      },
      {
        url: absoluteUrl(enPath),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
        alternates: { languages: { es: absoluteUrl(path), en: absoluteUrl(enPath) } },
        ...imageEntry,
      },
    ]
  })

  return [...coreRoutes, ...serviceRoutes]
}
