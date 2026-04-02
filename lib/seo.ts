import type { Metadata } from 'next'
import { contactInfo, services } from '@/lib/services'

export const SITE_URL = 'https://detailingmarin.cl'
export const SITE_NAME = 'Detailing Marin'
export const DEFAULT_OG_IMAGE = '/images/hero-detailing.webp'

export function absoluteUrl(path: string = '/') {
  return new URL(path, SITE_URL).toString()
}

/** Returns locale-aware alternates: canonical + hreflang + x-default */
export function buildAlternates(locale: string, path: string): Metadata['alternates'] {
  const enPath = `/en${path === '/' ? '' : path}`
  const canonical = locale === 'es' ? absoluteUrl(path) : absoluteUrl(enPath)
  return {
    canonical,
    languages: {
      es: absoluteUrl(path),
      en: absoluteUrl(enPath),
      'x-default': absoluteUrl(path),
    },
  }
}

/** Maps locale code to Open Graph locale string */
export function ogLocale(locale: string): string {
  return locale === 'en' ? 'en_US' : 'es_CL'
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': absoluteUrl('/#localbusiness'),
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl('/nadia-marin-logo.png'),
    description:
      'Servicio de detailing automotriz premium a domicilio en Maipú y alrededores con lavado ecológico, pulido y limpieza especializada.',
    areaServed: contactInfo.zone,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    openingHours: 'Mo-Sa 09:00-19:00',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maipú',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.5167,
      longitude: -70.7583,
    },
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Detailing Marin',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.fullDescription,
          areaServed: contactInfo.zone,
          provider: {
            '@type': 'AutomotiveBusiness',
            name: SITE_NAME,
          },
          url: absoluteUrl('/servicios'),
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'CLP',
          description: service.price,
        },
      })),
    },
  }
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta un detailing a domicilio en Maipú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestros servicios parten desde $35.000 CLP para el pulido de focos, $45.000 para lavado ecológico, $55.000 para limpieza de motor y $65.000 para pulido abrillantador. El precio final depende del estado y tamaño del vehículo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo tarda el servicio de detailing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tiempo varía según el servicio: pulido de focos 45–60 min, lavado ecológico y limpieza de motor 60–90 min, pulido abrillantador 90–120 min.',
        },
      },
      {
        '@type': 'Question',
        name: '¿El servicio incluye desplazamiento a domicilio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Todos nuestros servicios incluyen desplazamiento a tu domicilio en Maipú y comunas cercanas sin costo extra. Llevamos todo el equipamiento necesario.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Los productos son ecológicos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, usamos productos 100% biodegradables con tecnología hidrofóbica. Nuestro método de lavado ahorra hasta un 90% de agua comparado con un lavado tradicional.',
        },
      },
      {
        '@type': 'Question',
        name: '¿En qué comunas realizan el servicio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Atendemos Maipú y alrededores, incluyendo comunas como Pudahuel, Cerrillos, Padre Hurtado y otras zonas de la Región Metropolitana. Consultanos por tu ubicación específica.',
        },
      },
    ],
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildServicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de Detailing Marin',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.fullDescription,
        provider: {
          '@type': 'AutomotiveBusiness',
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: contactInfo.zone,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CLP',
          description: service.price,
          url: absoluteUrl('/contacto'),
        },
      },
    })),
  }
}
