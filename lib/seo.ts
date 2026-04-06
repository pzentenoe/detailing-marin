import type { Metadata } from 'next'
import { contactInfo, services } from '@/lib/services'

type LocaleCode = 'es' | 'en'

export const SITE_URL = 'https://www.detailingmarin.cl'
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

export function buildFaqJsonLd(locale: LocaleCode = 'es') {
  const faqByLocale: Record<LocaleCode, Array<{ name: string; text: string }>> = {
    es: [
      {
        name: '¿Cuánto cuesta un detailing a domicilio en Maipú?',
        text: 'Nuestros servicios parten desde $35.000 CLP para el pulido de focos, $45.000 para lavado ecológico, $55.000 para limpieza de motor y $65.000 para pulido abrillantador. El precio final depende del estado y tamaño del vehículo.',
      },
      {
        name: '¿Cuánto tiempo tarda el servicio de detailing?',
        text: 'El tiempo varía según el servicio: pulido de focos 45–60 min, lavado ecológico y limpieza de motor 60–90 min, pulido abrillantador 90–120 min.',
      },
      {
        name: '¿El servicio incluye desplazamiento a domicilio?',
        text: 'Sí. Todos nuestros servicios incluyen desplazamiento a tu domicilio en Maipú y comunas cercanas sin costo extra. Llevamos todo el equipamiento necesario.',
      },
      {
        name: '¿Los productos son ecológicos?',
        text: 'Sí, usamos productos 100% biodegradables con tecnología hidrofóbica. Nuestro método de lavado ahorra hasta un 90% de agua comparado con un lavado tradicional.',
      },
      {
        name: '¿En qué comunas realizan el servicio?',
        text: 'Atendemos Maipú y alrededores, incluyendo comunas como Pudahuel, Cerrillos, Padre Hurtado y otras zonas de la Región Metropolitana. Consultanos por tu ubicación específica.',
      },
    ],
    en: [
      {
        name: 'How much does mobile car detailing cost in Maipú?',
        text: 'Our services start at CLP $35,000 for headlight restoration, $45,000 for eco wash, $55,000 for engine cleaning, and $65,000 for paint polish. Final pricing depends on your vehicle size and condition.',
      },
      {
        name: 'How long does each detailing service take?',
        text: 'Service time depends on the job: headlight restoration 45–60 min, eco wash and engine cleaning 60–90 min, and paint polish 90–120 min.',
      },
      {
        name: 'Does the service include travel to my location?',
        text: 'Yes. All services include travel to your location in Maipú and nearby areas at no extra cost. We bring all required equipment.',
      },
      {
        name: 'Do you use eco-friendly products?',
        text: 'Yes. We use 100% biodegradable products with hydrophobic technology. Our wash process can save up to 90% of water compared with traditional washing.',
      },
      {
        name: 'What areas do you serve?',
        text: 'We serve Maipú and nearby districts, including Pudahuel, Cerrillos, Padre Hurtado, and other areas of the Santiago Metropolitan Region. Contact us to confirm your address.',
      },
    ],
  }

  const selectedFaq = faqByLocale[locale]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'en' ? 'en' : 'es-CL',
    mainEntity: selectedFaq.map((faq) => ({
      '@type': 'Question',
      name: faq.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.text,
      },
    })),
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

export function buildServicesJsonLd({
  locale = 'es',
  localizedServices = services,
}: {
  locale?: LocaleCode
  localizedServices?: Array<{ title: string; fullDescription: string; price?: string }>
} = {}) {
  const contactPath = locale === 'en' ? '/en/contacto' : '/contacto'

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de Detailing Marin',
    inLanguage: locale === 'en' ? 'en' : 'es-CL',
    itemListElement: localizedServices.map((service, index) => ({
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
          description: service.price ?? 'Consultar',
          url: absoluteUrl(contactPath),
        },
      },
    })),
  }
}
