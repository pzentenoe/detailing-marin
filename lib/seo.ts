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
      addressCountry: 'CL',
    },
    sameAs: [absoluteUrl('/contacto')],
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
