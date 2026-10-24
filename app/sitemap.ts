import type { MetadataRoute } from 'next'
import { absoluteUrl, buildLanguageAlternates, localizedPaths } from '@/lib/seo'
import { getServices } from '@/lib/service-catalog'
import { getGalleryContent } from '@/lib/gallery-content'
import { PRIORITY_COMMUNES } from '@/lib/comunas'

/**
 * Imágenes que aparecen realmente en la página a la que se asocian.
 * Google exige que una imagen del image sitemap esté presente en la página.
 */
const HERO_IMAGE = '/images/trabajos/exterior/bmw-x3-perfil-lateral-despues.webp'
const CONTACT_IMAGE = '/images/trabajos/exterior/mercedes-glc-trasera-reflejos-despues.webp'

type RouteEntry = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

const routes: RouteEntry[] = [
  { path: '/',          changeFrequency: 'weekly',  priority: 1 },
  { path: '/servicios', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/galeria',   changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/cobertura', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/contacto',  changeFrequency: 'monthly', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, gallery] = await Promise.all([getServices('es'), getGalleryContent('es')])

  const imagesByRoute: Record<string, string[]> = {
    '/': [HERO_IMAGE],
    '/servicios': services.map((service) => service.image).filter((image): image is string => Boolean(image)),
    '/galeria': gallery.photos.map((photo) => photo.src).filter((src): src is string => Boolean(src)),
    '/contacto': [CONTACT_IMAGE],
  }

  const coreRoutes = routes.flatMap(({ path, changeFrequency, priority }) => {
    const { es, en } = localizedPaths(path)
    const shared = {
      changeFrequency,
      priority,
      alternates: { languages: buildLanguageAlternates(path) },
    }
    const images = imagesByRoute[path]
    const imageEntry = images ? { images: images.map((image) => absoluteUrl(image)) } : {}

    return [
      { url: absoluteUrl(es), ...shared, ...imageEntry },
      { url: absoluteUrl(en), ...shared, ...imageEntry },
    ]
  })

  const serviceRoutes = services.flatMap((service) => {
    const path = `/servicios/${service.slug}`
    const { es, en } = localizedPaths(path)
    const shared = {
      changeFrequency: 'weekly' as const,
      priority: 0.85,
      alternates: { languages: buildLanguageAlternates(path) },
    }
    const imageEntry = service.image ? { images: [absoluteUrl(service.image)] } : {}

    return [
      { url: absoluteUrl(es), ...shared, ...imageEntry },
      { url: absoluteUrl(en), ...shared, ...imageEntry },
    ]
  })

  const communeRoutes = PRIORITY_COMMUNES.map((commune) => {
    const path = `/comunas/${commune.slug}`
    return {
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      // Las landings por comuna solo se publican en español.
      alternates: { languages: buildLanguageAlternates(path, false) },
    }
  })

  return [...coreRoutes, ...serviceRoutes, ...communeRoutes]
}
