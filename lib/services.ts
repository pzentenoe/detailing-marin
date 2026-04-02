// ============================================================
// Data Layer — Services SSOT
// Fuente única de verdad para los servicios de Detailing Marin
// ============================================================

import type { Service, NavLink, ContactInfo } from '@/types'

// Non-translatable service metadata — used by i18n-aware components
export const servicesConfig = [
  { id: '1', slug: 'lavado-ecologico',    icon: 'droplets'  as const, duration: '60–90 min',  price: 'Desde $45.000', highlight: true  },
  { id: '2', slug: 'pulido-abrillantador', icon: 'sparkles'  as const, duration: '90–120 min', price: 'Desde $65.000'                   },
  { id: '3', slug: 'pulido-focos',         icon: 'zap'       as const, duration: '45–60 min',  price: 'Desde $35.000'                   },
  { id: '4', slug: 'limpieza-motor',       icon: 'settings'  as const, duration: '60–90 min',  price: 'Desde $55.000'                   },
] as const

// Non-translatable feature (pillar) metadata — used by i18n-aware components
export const featuresConfig = [
  { id: 'eco',       icon: 'leaf'    as const },
  { id: 'domicilio', icon: 'map-pin' as const },
  { id: 'premium',   icon: 'award'   as const },
] as const

// Nav hrefs — labels come from i18n messages
export const navHrefs = [
  { href: '/', labelKey: 'home'     as const },
  { href: '/servicios', labelKey: 'services' as const },
  { href: '/contacto',  labelKey: 'contact'  as const },
] as const

export const services: Service[] = [
  {
    id: '1',
    slug: 'lavado-ecologico',
    title: 'Lavado Ecológico',
    shortDescription: 'Limpieza profunda sin desperdicio de agua.',
    fullDescription:
      'Limpieza profunda utilizando tecnología de bajo consumo de agua y productos biodegradables que protegen la pintura y el medio ambiente. Hasta un 90% de ahorro de agua vs. lavado tradicional.',
    icon: 'droplets',
    features: [
      'Productos 100% biodegradables',
      'Ahorro hasta 90% de agua',
      'Protección de pintura incluida',
      'Limpieza de interior y exterior',
    ],
    duration: '60–90 min',
    price: 'Desde $45.000',
    highlight: true,
  },
  {
    id: '2',
    slug: 'pulido-abrillantador',
    title: 'Pulido Abrillantador',
    shortDescription: 'Restauración del brillo espejo original.',
    fullDescription:
      'Restauramos el brillo original de tu vehículo eliminando micro-rayas y realzando la profundidad del color mediante técnicas de corrección de pintura de nivel profesional.',
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
      'Recupera la transparencia y seguridad de tus focos. Eliminamos lo amarillento y opaco con sellado UV que prolonga el resultado hasta 12 meses.',
    icon: 'zap',
    features: [
      'Eliminación de amarillamiento',
      'Sellado UV de larga duración',
      'Mejora visibilidad nocturna',
      'Garantía de 12 meses',
    ],
    duration: '45–60 min',
    price: 'Desde $35.000',
  },
  {
    id: '4',
    slug: 'limpieza-motor',
    title: 'Limpieza de Motor',
    shortDescription: 'Limpieza técnica en seco impecable.',
    fullDescription:
      'Limpieza técnica detallada que elimina grasa y suciedad acumulada, protegiendo mangueras y componentes plásticos sin usar agua. Mantén el corazón de tu auto en óptimas condiciones.',
    icon: 'settings',
    features: [
      'Limpieza en seco sin daños',
      'Tratamiento anti-corrosión',
      'Protección de mangueras y plásticos',
      'Aplicación de dressing protector',
    ],
    duration: '60–90 min',
    price: 'Desde $55.000',
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
  zone: 'Maipú y alrededores',
  hours: 'Lunes a Sábado, 9:00 – 19:00',
}

export const WA_MESSAGE =
  'Hola! Te escribo desde la web detailingmarin.cl. Quisiera mas informacion sobre sus servicios y agendar un servicio'

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
