import type { Metadata } from 'next'
import { contactInfo, services } from '@/lib/services'

type LocaleCode = 'es' | 'en'
type ServiceSlug = 'pack-eco-diamond' | 'pack-eco-platinum' | 'pack-eco-silver' | 'pulido-abrillantador' | 'pulido-focos' | 'limpieza-tapiz'

export const SITE_URL = 'https://www.detailingmarin.cl'
export const SITE_NAME = 'Detailing Marin'
export const DEFAULT_OG_IMAGE = '/images/hero-detailing.webp'

export const SERVED_COMMUNES = [
  'Maipú', 'Pudahuel', 'Cerrillos', 'Cerro Navia', 'Lo Prado',
  'Quinta Normal', 'Estación Central', 'Santiago', 'Independencia',
  'Recoleta', 'Conchalí', 'Quilicura', 'Renca', 'Huechuraba',
  'Providencia', 'Ñuñoa', 'Macul', 'Peñalolén', 'La Florida',
  'La Granja', 'La Pintana', 'San Ramón', 'La Cisterna', 'El Bosque',
  'San Miguel', 'San Joaquín', 'Pedro Aguirre Cerda', 'Lo Espejo',
  'Las Condes', 'Vitacura', 'Lo Barnechea', 'Padre Hurtado', 'San Bernardo',
]

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
    alternateName: [
      'Detailing a domicilio Santiago',
      'Lavado de autos a domicilio Santiago',
      'Car detailing Santiago',
      'Lavado ecológico de autos Santiago',
      'Aspirado de autos a domicilio',
      'Detailing automotriz Región Metropolitana',
    ],
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl('/nadia-marin-logo.png'),
    description:
      'Servicio de detailing automotriz premium a domicilio en Santiago y Región Metropolitana. Lavado ecológico, aspirado, pulido y limpieza especializada.',
    areaServed: SERVED_COMMUNES,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    openingHours: ['Mo-Sa 09:00-19:00'],
    priceRange: '$$',
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
    sameAs: [
      'https://www.instagram.com/detailing_marin',
      'https://www.facebook.com/profile.php?id=61586193856361',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Detailing Marin',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.fullDescription,
          areaServed: SERVED_COMMUNES,
          provider: {
            '@type': 'AutomotiveBusiness',
            name: SITE_NAME,
          },
          url: absoluteUrl(`/servicios/${service.slug}`),
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
        name: '¿Cuánto cuesta un detailing a domicilio en Santiago?',
        text: 'Nuestros servicios parten desde $19.990 para el Pack Eco Silver (lavado esencial), $28.990 para el Pack Eco Platinum, $55.000 el par para pulido de focos, $55.990 para limpieza de tapiz, $69.990 para pulido abrillantador y $89.990 para el Pack Eco Diamond (servicio completo con pulido). El precio varía según el tipo de vehículo.',
      },
      {
        name: '¿Cuánto tiempo tarda el servicio de detailing?',
        text: 'El tiempo varía según el servicio: pulido de focos 45–60 min, Pack Eco Silver y limpieza de tapiz 60–90 min, Pack Eco Platinum y pulido abrillantador 90–120 min, Pack Eco Diamond 3–4 horas.',
      },
      {
        name: '¿El servicio incluye desplazamiento a domicilio?',
        text: 'Sí. Todos nuestros servicios incluyen desplazamiento a tu domicilio en Santiago y toda la Región Metropolitana sin costo extra. Llevamos todo el equipamiento necesario.',
      },
      {
        name: '¿Los productos son ecológicos?',
        text: 'Sí, usamos productos 100% biodegradables con tecnología hidrofóbica. Nuestro método de lavado ahorra hasta un 90% de agua comparado con un lavado tradicional.',
      },
      {
        name: '¿En qué comunas realizan el servicio?',
        text: 'Atendemos toda la Región Metropolitana de Santiago, incluyendo Maipú, Las Condes, Providencia, La Florida, Ñuñoa, Pudahuel, Quilicura, San Miguel, Vitacura, Peñalolén, La Cisterna, El Bosque y muchas más. Consultanos por tu ubicación específica.',
      },
      {
        name: '¿Qué métodos de pago aceptan?',
        text: 'Aceptamos pago en efectivo y transferencia bancaria al finalizar el servicio.',
      },
    ],
    en: [
      {
        name: 'How much does mobile car detailing cost in Santiago?',
        text: 'Our services start at CLP $19,990 for Pack Eco Silver (essential wash), $28,990 for Pack Eco Platinum, $55,000 per pair for headlight restoration, $55,990 for upholstery cleaning, $69,990 for paint polishing, and $89,990 for Pack Eco Diamond (full service with polish). Final pricing depends on vehicle type.',
      },
      {
        name: 'How long does each detailing service take?',
        text: 'Service time depends on the job: headlight restoration 45–60 min, Pack Eco Silver and upholstery cleaning 60–90 min, Pack Eco Platinum and paint polish 90–120 min, Pack Eco Diamond 3–4 hours.',
      },
      {
        name: 'Does the service include travel to my location?',
        text: 'Yes. All services include travel to your location across Santiago and the Metropolitan Region at no extra cost. We bring all required equipment.',
      },
      {
        name: 'Do you use eco-friendly products?',
        text: 'Yes. We use 100% biodegradable products with hydrophobic technology. Our wash process can save up to 90% of water compared with traditional washing.',
      },
      {
        name: 'What areas do you serve?',
        text: 'We serve the entire Santiago Metropolitan Region, including Maipú, Las Condes, Providencia, La Florida, Ñuñoa, Pudahuel, Quilicura, San Miguel, Vitacura, Peñalolén, La Cisterna, El Bosque, and many more. Contact us to confirm your address.',
      },
      {
        name: 'What payment methods do you accept?',
        text: 'We accept cash and bank transfer upon completion of the service.',
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
  'pack-eco-diamond': {
    es: [
      { name: '¿Qué incluye el Pack Eco Diamond?', text: 'El Pack Eco Diamond es nuestro servicio más completo. Incluye pulido abrillantador con máquina profesional, sellado con cera Carnauba, aspirado profundo, limpieza e hidratación de tableros, lavado en seco completo, marcos de entrepuertas, vidrios interior y exterior, llantas, neumáticos y renovador de gomas. Resultado showroom garantizado a domicilio.' },
      { name: '¿Cuánto cuesta el Pack Eco Diamond?', text: 'El Pack Eco Diamond parte desde $89.990 para Citycar, $99.990 para Sedán/Hatchback, $139.990 para SUV y $159.990 para camionetas de 3 corridas.' },
      { name: '¿Cuánto dura el servicio Pack Eco Diamond?', text: 'El servicio completo tarda entre 3 y 4 horas según el estado y tamaño del vehículo.' },
      { name: '¿El Pack Diamond incluye pulido de pintura?', text: 'Sí. Incluye pulido abrillantador profesional con máquina para eliminar micro-rayas y realzar el brillo, más sellado con cera Carnauba.' },
    ],
    en: [
      { name: 'What does the Pack Eco Diamond include?', text: 'Pack Eco Diamond is our most complete service. Includes professional machine paint polish, Carnauba wax seal, deep vacuuming, dashboard cleaning and conditioning, full dry wash, door frame cleaning, interior and exterior windows, rims, tires, and rubber conditioner. Showroom result guaranteed at your location.' },
      { name: 'How much does the Pack Eco Diamond cost?', text: 'Pack Eco Diamond starts at CLP $89,990 for Citycar, $99,990 for Sedan/Hatchback, $139,990 for SUV, and $159,990 for pickup trucks.' },
      { name: 'How long does the Pack Eco Diamond take?', text: 'The full service takes between 3 and 4 hours depending on vehicle size and condition.' },
      { name: 'Does Pack Diamond include paint polishing?', text: 'Yes. It includes professional machine polishing to remove light swirl marks and restore gloss, plus Carnauba wax sealing.' },
    ],
  },
  'pack-eco-platinum': {
    es: [
      { name: '¿Qué incluye el Pack Eco Platinum?', text: 'El Pack Eco Platinum incluye aspirado profundo, limpieza e hidratación de tableros y plásticos, lavado en seco con cera Carnauba, marcos de entrepuertas, vidrios interior y exterior, llantas, neumáticos, renovador de plásticos exteriores e interiores.' },
      { name: '¿Cuánto cuesta el Pack Eco Platinum?', text: 'El Pack Eco Platinum parte desde $28.990 para Citycar, $31.990 para Sedán/Hatchback, $34.990 para SUV y $37.990 para camionetas de 3 corridas.' },
      { name: '¿Cuánto dura el Pack Eco Platinum?', text: 'El servicio tarda entre 90 y 120 minutos dependiendo del estado y tamaño del vehículo.' },
      { name: '¿El Pack Platinum incluye cera Carnauba?', text: 'Sí. El lavado en seco se realiza con cera Carnauba premium, que protege la pintura y le da un acabado brillante duradero.' },
    ],
    en: [
      { name: 'What does the Pack Eco Platinum include?', text: 'Pack Eco Platinum includes deep vacuuming, dashboard and plastic cleaning and conditioning, Carnauba wax dry wash, door frame cleaning, interior and exterior windows, rims, tires, and exterior and interior plastic restorer.' },
      { name: 'How much does Pack Eco Platinum cost?', text: 'Pack Eco Platinum starts at CLP $28,990 for Citycar, $31,990 for Sedan/Hatchback, $34,990 for SUV, and $37,990 for pickup trucks.' },
      { name: 'How long does Pack Eco Platinum take?', text: 'The service takes between 90 and 120 minutes depending on vehicle size and condition.' },
      { name: 'Does Pack Platinum include Carnauba wax?', text: 'Yes. The dry wash is performed with premium Carnauba wax, which protects the paint and delivers a lasting shine.' },
    ],
  },
  'pack-eco-silver': {
    es: [
      { name: '¿Qué incluye el Pack Eco Silver?', text: 'El Pack Eco Silver es nuestro servicio esencial de mantenimiento. Incluye aspirado completo de interiores, limpieza superficial de tableros, lavado en seco de carrocería completa, limpieza de neumáticos y vidrios exteriores. Ideal para quienes buscan tener el auto impecable semana a semana.' },
      { name: '¿Cuánto cuesta el Pack Eco Silver?', text: 'El Pack Eco Silver parte desde $19.990 para Citycar, $23.990 para Sedán/Hatchback, $25.990 para SUV y $27.990 para camionetas de 3 corridas.' },
      { name: '¿Cuánto dura el Pack Eco Silver?', text: 'El servicio tarda entre 60 y 90 minutos.' },
      { name: '¿El lavado ecológico daña la pintura?', text: 'No. Usamos productos 100% biodegradables con técnica de lavado en seco controlada, segura para todo tipo de pintura y acabados.' },
    ],
    en: [
      { name: 'What does the Pack Eco Silver include?', text: 'Pack Eco Silver is our essential maintenance service. Includes full interior vacuuming, surface dashboard cleaning, full body dry wash, exterior windows and tire cleaning. Ideal for regular weekly upkeep.' },
      { name: 'How much does Pack Eco Silver cost?', text: 'Pack Eco Silver starts at CLP $19,990 for Citycar, $23,990 for Sedan/Hatchback, $25,990 for SUV, and $27,990 for pickup trucks.' },
      { name: 'How long does Pack Eco Silver take?', text: 'The service takes between 60 and 90 minutes.' },
      { name: 'Is eco wash safe for paint?', text: 'Yes. We use 100% biodegradable products with a controlled dry wash technique, safe for all paint types and finishes.' },
    ],
  },
  'pulido-abrillantador': {
    es: [
      { name: '¿Qué corrige el pulido abrillantador?', text: 'Ayuda a eliminar micro-rayas, marcas de lavado y oxidación superficial para devolver el brillo espejo original. Realzamos la profundidad del color con técnicas de corrección de pintura de nivel profesional.' },
      { name: '¿Cuánto cuesta el pulido abrillantador?', text: 'El servicio parte desde $69.990 para Citycar, $89.990 para Sedán/Hatchback, $120.990 para SUV y $139.990 para camionetas.' },
      { name: '¿Cuánto tiempo toma el pulido?', text: 'Suele demorar entre 90 y 120 minutos dependiendo del estado de la pintura.' },
      { name: '¿Se puede hacer a domicilio?', text: 'Sí, llevamos todo el equipamiento profesional y realizamos el servicio directamente en tu ubicación en Santiago y Región Metropolitana.' },
    ],
    en: [
      { name: 'What does paint polishing correct?', text: 'It eliminates light swirl marks, wash marks, and surface oxidation to restore the original mirror-like shine. We enhance color depth using professional-grade paint correction techniques.' },
      { name: 'How much does paint polishing cost?', text: 'The service starts at CLP $69,990 for Citycar, $89,990 for Sedan/Hatchback, $120,990 for SUV, and $139,990 for pickup trucks.' },
      { name: 'How long does polishing take?', text: 'It usually takes between 90 and 120 minutes depending on paint condition.' },
      { name: 'Can it be done at my location?', text: 'Yes. We bring all professional equipment and perform the service at your location across Santiago and the Metropolitan Region.' },
    ],
  },
  'pulido-focos': {
    es: [
      { name: '¿El pulido de focos mejora la visibilidad nocturna?', text: 'Sí, elimina opacidad y amarillamiento acumulados para recuperar la transparencia original y mejorar significativamente la visibilidad nocturna y la seguridad al volante.' },
      { name: '¿Cuánto cuesta el pulido de focos?', text: 'El servicio parte desde $55.000 el par de focos, a domicilio en Santiago y Región Metropolitana.' },
      { name: '¿El servicio incluye sellado de protección?', text: 'Sí, aplicamos sellado de protección UV para extender la duración del resultado y prevenir que el amarillamiento vuelva rápidamente.' },
      { name: '¿Cuánto tarda el pulido de focos?', text: 'Entre 45 y 60 minutos en la mayoría de los casos.' },
    ],
    en: [
      { name: 'Does headlight restoration improve night visibility?', text: 'Yes. It removes accumulated haze and yellowing to recover original clarity and significantly improve night driving visibility and safety.' },
      { name: 'How much does headlight restoration cost?', text: 'The service starts at CLP $55,000 per pair of headlights, at your location across Santiago and the Metropolitan Region.' },
      { name: 'Does it include UV protection?', text: 'Yes. We apply UV protective sealing to extend result durability and prevent yellowing from returning quickly.' },
      { name: 'How long does headlight restoration take?', text: 'Usually between 45 and 60 minutes.' },
    ],
  },
  'limpieza-tapiz': {
    es: [
      { name: '¿Qué incluye la limpieza de tapiz e interiores?', text: 'Incluye limpieza profunda de asientos, tapizado, alfombras y pisos con equipamiento de extracción especializado para eliminar manchas, olores y suciedad incrustada. Para asientos de cuero aplicamos acondicionador premium.' },
      { name: '¿Cuánto cuesta la limpieza de tapiz?', text: 'El servicio parte desde $55.990 para Citycar, $65.990 para Sedán/Hatchback y SUV, y $89.990 para camionetas de 3 corridas.' },
      { name: '¿La limpieza elimina olores del interior?', text: 'Sí, el proceso de extracción profunda ayuda a eliminar olores atrapados en textiles del interior, incluyendo tapizados, alfombras y pisos.' },
      { name: '¿Cuánto demora la limpieza de tapiz?', text: 'Generalmente entre 60 y 90 minutos según la condición del habitáculo y el tipo de vehículo.' },
    ],
    en: [
      { name: 'What does upholstery cleaning include?', text: 'Includes deep cleaning of seats, upholstery, carpets, and floors using specialized extraction equipment to remove stains, odors, and embedded dirt. Leather seats receive premium conditioner treatment.' },
      { name: 'How much does upholstery cleaning cost?', text: 'The service starts at CLP $55,990 for Citycar, $65,990 for Sedan/Hatchback and SUV, and $89,990 for pickup trucks.' },
      { name: 'Does it remove interior odors?', text: 'Yes. The deep extraction process helps eliminate odors trapped in interior textiles, including upholstery, carpets, and floors.' },
      { name: 'How long does upholstery cleaning take?', text: 'Usually between 60 and 90 minutes depending on cabin condition and vehicle type.' },
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

export function buildCoverageFaqJsonLd(locale: LocaleCode = 'es') {
  const faqByLocale: Record<LocaleCode, Array<{ name: string; text: string }>> = {
    es: [
      {
        name: '¿En qué comunas realizan el servicio de detailing a domicilio?',
        text: 'Atendemos toda la Región Metropolitana de Santiago, incluyendo Maipú, Las Condes, Providencia, La Florida, Ñuñoa, Pudahuel, Quilicura, San Miguel, Vitacura, Peñalolén, La Cisterna, El Bosque, San Bernardo y muchas más. Contáctanos para confirmar tu dirección específica.',
      },
      {
        name: '¿Tiene costo el traslado a domicilio en Santiago?',
        text: 'No. El desplazamiento a tu domicilio está incluido sin costo adicional en todos nuestros servicios, para cualquier comuna de Santiago y la Región Metropolitana.',
      },
      {
        name: '¿Atienden en comunas periféricas de Santiago?',
        text: 'Sí. Cubrimos comunas periféricas como Maipú, Pudahuel, Quilicura, La Pintana, El Bosque, San Bernardo, Padre Hurtado, Lo Barnechea y Huechuraba, entre otras. Si tenés dudas sobre tu zona, consúltanos por WhatsApp.',
      },
      {
        name: '¿En qué horarios atienden a domicilio?',
        text: 'Atendemos de lunes a sábado de 09:00 a 19:00 horas. Coordinamos el horario exacto de llegada al agendar tu servicio por WhatsApp o formulario de contacto.',
      },
      {
        name: '¿Cuántas comunas cubre Detailing Marin?',
        text: 'Cubrimos más de 30 comunas de la Región Metropolitana de Santiago. Contamos con páginas específicas para las comunas con mayor demanda donde podés ver toda la información del servicio en tu zona.',
      },
    ],
    en: [
      {
        name: 'Which areas do you serve for mobile car detailing in Santiago?',
        text: 'We serve the entire Santiago Metropolitan Region, including Maipú, Las Condes, Providencia, La Florida, Ñuñoa, Pudahuel, Quilicura, San Miguel, Vitacura, Peñalolén, La Cisterna, El Bosque, San Bernardo, and many more. Contact us to confirm your specific address.',
      },
      {
        name: 'Is there a travel fee for home service in Santiago?',
        text: 'No. Travel to your location is included at no extra cost in all our services, for any district across Santiago and the Metropolitan Region.',
      },
      {
        name: 'Do you serve outer districts of Santiago?',
        text: 'Yes. We cover outer districts like Maipú, Pudahuel, Quilicura, La Pintana, El Bosque, San Bernardo, Padre Hurtado, Lo Barnechea, and Huechuraba, among others. Contact us via WhatsApp if you have questions about your area.',
      },
      {
        name: 'What are your service hours?',
        text: 'We operate Monday to Saturday from 09:00 to 19:00. We coordinate the exact arrival time when you book via WhatsApp or the contact form.',
      },
      {
        name: 'How many districts does Detailing Marin cover?',
        text: 'We cover over 30 districts across the Santiago Metropolitan Region. We have dedicated pages for the highest-demand areas where you can find all service information for your zone.',
      },
    ],
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'en' ? 'en' : 'es-CL',
    mainEntity: faqByLocale[locale].map((faq) => ({
      '@type': 'Question',
      name: faq.name,
      acceptedAnswer: { '@type': 'Answer', text: faq.text },
    })),
  }
}

export function buildContactPageJsonLd(locale: LocaleCode = 'es') {
  const path = locale === 'en' ? '/en/contacto' : '/contacto'
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': absoluteUrl(`${path}#contactpage`),
    name: locale === 'en' ? 'Contact — Detailing Marin' : 'Contacto — Detailing Marin',
    url: absoluteUrl(path),
    description:
      locale === 'en'
        ? 'Book your mobile car detailing service across Santiago. Quick response via WhatsApp or email.'
        : 'Agenda tu servicio de detailing automotriz a domicilio en Santiago. Respuesta rápida por WhatsApp o email.',
    inLanguage: locale === 'en' ? 'en' : 'es-CL',
    isPartOf: { '@id': absoluteUrl('/#localbusiness') },
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
        areaServed: SERVED_COMMUNES,
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
