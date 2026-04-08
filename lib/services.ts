// ============================================================
// Data Layer — Services SSOT
// Fuente única de verdad para los servicios de Detailing Marin
// ============================================================

import type { Service, NavLink, ContactInfo } from '@/types'

// Non-translatable service metadata — used by i18n-aware components
export const servicesConfig = [
  { id: '1', slug: 'lavado-ecologico',     icon: 'droplets'  as const, duration: '60–90 min',  price: 'Desde $45.000', highlight: true, image: '/images/lavado_ecologico/lavado_ecologico.webp'                                       },
  { id: '2', slug: 'pulido-abrillantador', icon: 'sparkles'  as const, duration: '90–120 min', price: 'Desde $65.000'                                                                                                                         },
  { id: '3', slug: 'pulido-focos',         icon: 'zap'       as const, duration: '45–60 min',  price: 'Desde $35.000',                  image: '/images/focos/despues.webp'                                                           },
  { id: '4', slug: 'limpieza-motor',       icon: 'settings'  as const, duration: '60–90 min',  price: 'Desde $55.000',                  image: '/images/lavado_motor/despues.webp',  imageBefore: '/images/lavado_motor/antes.webp'  },
  { id: '5', slug: 'lavado-tapiz',         icon: 'armchair'  as const, duration: '60–90 min',  price: 'Desde $50.000',                  image: '/images/asientos/despues.webp',      imageBefore: '/images/asientos/antes.webp'      },
] as const

// Non-translatable feature (pillar) metadata — used by i18n-aware components
export const featuresConfig = [
  { id: 'eco',       icon: 'leaf'    as const },
  { id: 'domicilio', icon: 'map-pin' as const },
  { id: 'premium',   icon: 'award'   as const },
] as const

// Nav hrefs — labels come from i18n messages
export const navHrefs = [
  { href: '/',          labelKey: 'home'     as const },
  { href: '/servicios', labelKey: 'services' as const },
  { href: '/cobertura', labelKey: 'coverage' as const },
  { href: '/contacto',  labelKey: 'contact'  as const },
] as const

export const services: Service[] = [
  {
    id: '1',
    slug: 'lavado-ecologico',
    title: 'Lavado Ecológico',
    shortDescription: 'Limpieza profunda sin desperdicio de agua.',
    fullDescription:
      'Lavado ecológico de autos a domicilio en Santiago y Región Metropolitana. Incluye aspirado completo de interiores, lavado exterior e interior con productos biodegradables y tecnología hidrofóbica de bajo consumo de agua. Ahorro de hasta 90% de agua vs. lavado tradicional. Sin moverte de tu casa u oficina.',
    icon: 'droplets',
    features: [
      'Aspirado de interiores incluido',
      'Productos 100% biodegradables',
      'Ahorro hasta 90% de agua',
      'Protección de pintura incluida',
    ],
    duration: '60–90 min',
    price: 'Desde $45.000',
    highlight: true,
    image: '/images/lavado_ecologico/lavado_ecologico.webp',
  },
  {
    id: '2',
    slug: 'pulido-abrillantador',
    title: 'Pulido Abrillantador',
    shortDescription: 'Restauración del brillo espejo original.',
    fullDescription:
      'Pulido abrillantador a domicilio en Santiago y Región Metropolitana. Eliminamos micro-rayas, realzamos la profundidad del color y devolvemos el brillo espejo original con técnicas de corrección de pintura profesional. Incluye sellado UV. Resultado showroom garantizado.',
    icon: 'sparkles',
    features: [
      'Eliminación de micro-rayas',
      'Realce de profundidad de color',
      'Sellado de pintura UV',
      'Resultado de showroom',
    ],
    duration: '90–120 min',
    price: 'Desde $65.000',
  },
  {
    id: '3',
    slug: 'pulido-focos',
    title: 'Pulido de Focos',
    shortDescription: 'Recupera la transparencia y seguridad.',
    fullDescription:
      'Pulido y restauración de focos a domicilio en Santiago. Eliminamos amarillamiento y opacidad, recuperando la transparencia original con sellado UV de 12 meses. Mejora visibilidad nocturna y seguridad. Servicio en toda la Región Metropolitana.',
    icon: 'zap',
    features: [
      'Eliminación de amarillamiento',
      'Sellado UV de larga duración',
      'Mejora visibilidad nocturna',
      'Garantía de 12 meses',
    ],
    duration: '45–60 min',
    price: 'Desde $35.000',
    image: '/images/focos/despues.webp',
  },
  {
    id: '4',
    slug: 'limpieza-motor',
    title: 'Limpieza de Motor',
    shortDescription: 'Limpieza técnica en seco impecable.',
    fullDescription:
      'Limpieza técnica de motor a domicilio en Santiago y Región Metropolitana. Proceso en seco que elimina grasa acumulada protegiendo mangueras y plásticos. Incluye dressing protector anti-corrosión. Sin moverte de tu domicilio.',
    icon: 'settings',
    features: [
      'Limpieza en seco sin daños',
      'Tratamiento anti-corrosión',
      'Protección de mangueras y plásticos',
      'Aplicación de dressing protector',
    ],
    duration: '60–90 min',
    price: 'Desde $55.000',
    image: '/images/lavado_motor/despues.webp',
    imageBefore: '/images/lavado_motor/antes.webp',
  },
  {
    id: '5',
    slug: 'lavado-tapiz',
    title: 'Lavado de Tapiz',
    shortDescription: 'Restauración profunda del interior y asientos.',
    fullDescription:
      'Lavado de tapiz e interior a domicilio en Santiago y Región Metropolitana. Limpieza profunda de asientos, tapizado y alfombras con equipamiento de extracción especializado. Eliminamos manchas, olores y suciedad incrustada. Incluye acondicionador de cuero si aplica.',
    icon: 'armchair',
    features: [
      'Extracción de manchas profundas',
      'Eliminación de olores',
      'Tratamiento de alfombras y pisos',
      'Acondicionador de cuero (si aplica)',
    ],
    duration: '60–90 min',
    price: 'Desde $50.000',
    image: '/images/asientos/despues.webp',
    imageBefore: '/images/asientos/antes.webp',
  },
]

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
]

export const contactInfo: ContactInfo = {
  phone: '+56 9 5445 1422',
  whatsapp: '+56954451422',
  email: 'marin.mac.len@gmail.com',
  zone: 'Santiago y Región Metropolitana',
}

export const features = [
  {
    id: 'eco',
    icon: 'leaf',
    title: '100% Ecológico',
    description:
      'Utilizamos productos premium biodegradables que no dañan el medio ambiente ni la pintura de tu vehículo.',
  },
  {
    id: 'domicilio',
    icon: 'map-pin',
    title: 'A Domicilio',
    description:
      'Llevamos todo el equipamiento necesario hasta la puerta de tu casa u oficina para tu total comodidad.',
  },
  {
    id: 'premium',
    icon: 'award',
    title: 'Calidad Premium',
    description:
      'Atención al detalle minuciosa y resultados de showroom que protegen tu inversión a largo plazo.',
  },
]
