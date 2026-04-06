import type { Metadata } from 'next'
import { contactInfo, services } from '@/lib/services'

type LocaleCode = 'es' | 'en'
type ServiceSlug = 'lavado-ecologico' | 'pulido-abrillantador' | 'pulido-focos' | 'limpieza-motor' | 'lavado-tapiz'

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

const serviceFaqBySlug: Record<ServiceSlug, Record<LocaleCode, Array<{ name: string; text: string }>>> = {
  'lavado-ecologico': {
    es: [
      { name: '¿Cuánta agua ahorra el lavado ecológico?', text: 'Nuestro proceso puede ahorrar hasta un 90% de agua frente a un lavado tradicional, usando productos biodegradables y técnica de limpieza controlada.' },
      { name: '¿El lavado ecológico daña la pintura?', text: 'No. Está diseñado para proteger la pintura con productos premium y técnica segura para exterior e interior.' },
      { name: '¿Cuánto dura el servicio de lavado ecológico?', text: 'Generalmente entre 60 y 90 minutos, según el estado y tamaño del vehículo.' },
    ],
    en: [
      { name: 'How much water does eco wash save?', text: 'Our eco wash process can save up to 90% of water compared with traditional washing using biodegradable products and controlled cleaning techniques.' },
      { name: 'Is eco wash safe for paint?', text: 'Yes. It is designed to protect your paint using premium products and a safe exterior/interior process.' },
      { name: 'How long does an eco wash take?', text: 'Usually between 60 and 90 minutes depending on your vehicle size and condition.' },
    ],
  },
  'pulido-abrillantador': {
    es: [
      { name: '¿Qué corrige el pulido abrillantador?', text: 'Ayuda a reducir micro-rayas, realza el color y devuelve brillo visual tipo showroom.' },
      { name: '¿Cuánto tiempo toma el pulido?', text: 'Suele demorar entre 90 y 120 minutos dependiendo del estado de la pintura.' },
      { name: '¿Se puede hacer a domicilio?', text: 'Sí, llevamos el equipo y realizamos el servicio directamente en tu ubicación.' },
    ],
    en: [
      { name: 'What does paint polishing correct?', text: 'It helps reduce light swirl marks, enhances color depth, and restores a showroom-like finish.' },
      { name: 'How long does polishing take?', text: 'It usually takes between 90 and 120 minutes depending on paint condition.' },
      { name: 'Can it be done at my location?', text: 'Yes. We bring all required equipment and perform the service at your location.' },
    ],
  },
  'pulido-focos': {
    es: [
      { name: '¿El pulido de focos mejora la visibilidad?', text: 'Sí, elimina opacidad y amarillamiento para recuperar transparencia y seguridad nocturna.' },
      { name: '¿Incluye sellado UV?', text: 'Sí, aplicamos sellado UV para extender la duración del resultado.' },
      { name: '¿Cuánto tarda este servicio?', text: 'Entre 45 y 60 minutos en la mayoría de los casos.' },
    ],
    en: [
      { name: 'Does headlight restoration improve visibility?', text: 'Yes. It removes haze and yellowing to recover clarity and improve night driving visibility.' },
      { name: 'Is UV protection included?', text: 'Yes. We apply UV sealing to extend result durability.' },
      { name: 'How long does it take?', text: 'Usually between 45 and 60 minutes.' },
    ],
  },
  'limpieza-motor': {
    es: [
      { name: '¿La limpieza de motor usa agua?', text: 'Aplicamos proceso técnico controlado para limpiar sin dañar componentes sensibles.' },
      { name: '¿Qué partes se tratan?', text: 'Se limpian superficies con grasa y suciedad acumulada, además de proteger plásticos y mangueras.' },
      { name: '¿Cuánto dura el servicio?', text: 'Normalmente entre 60 y 90 minutos.' },
    ],
    en: [
      { name: 'Does engine cleaning use water?', text: 'We use a controlled technical process to clean safely without damaging sensitive components.' },
      { name: 'What areas are treated?', text: 'We clean grease and grime buildup and protect plastics and hoses.' },
      { name: 'How long does this service take?', text: 'Typically between 60 and 90 minutes.' },
    ],
  },
  'lavado-tapiz': {
    es: [
      { name: '¿Qué incluye el lavado de tapiz?', text: 'Incluye limpieza profunda de asientos, tapizado y alfombras para remover manchas y suciedad incrustada.' },
      { name: '¿Elimina olores?', text: 'Sí, el proceso ayuda a reducir olores atrapados en textiles del interior.' },
      { name: '¿Cuánto demora la limpieza interior?', text: 'Generalmente entre 60 y 90 minutos según condición del habitáculo.' },
    ],
    en: [
      { name: 'What does upholstery cleaning include?', text: 'It includes deep cleaning of seats, upholstery, and carpets to remove embedded dirt and stains.' },
      { name: 'Does it help remove odors?', text: 'Yes. The process helps reduce odors trapped in interior fabrics.' },
      { name: 'How long does interior cleaning take?', text: 'Usually between 60 and 90 minutes depending on cabin condition.' },
    ],
  },
}

export function getServiceFaqEntries(slug: string, locale: LocaleCode = 'es') {
  const record = serviceFaqBySlug[slug as ServiceSlug]
  return record ? record[locale] : []
}

export function buildServiceFaqJsonLd(slug: string, locale: LocaleCode = 'es') {
  const entries = getServiceFaqEntries(slug, locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'en' ? 'en' : 'es-CL',
    mainEntity: entries.map((faq) => ({
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
