// ============================================================
// Data Layer — Services SSOT
// Fuente única de verdad para los servicios de Detailing Marin
// ============================================================

import type { Service, NavLink, ContactInfo } from '@/types'

// Non-translatable service metadata — used by i18n-aware components
export const servicesConfig = [
  {
    id: '1',
    slug: 'pack-eco-diamond',
    icon: 'car' as const,
    duration: '3–4 hrs',
    price: 'Desde $89.990',
    highlight: true,
    image: '/images/lavado_ecologico/lavado_ecologico.webp',
    pricingTable: [
      { label: 'Citycar', price: '$89.990' },
      { label: 'Sedán / Hatchback', price: '$99.990' },
      { label: 'SUV', price: '$139.990' },
      { label: '3 corridas', price: '$159.990' },
    ],
  },
  {
    id: '2',
    slug: 'pack-eco-platinum',
    icon: 'award' as const,
    duration: '90–120 min',
    price: 'Desde $28.990',
    pricingTable: [
      { label: 'Citycar', price: '$28.990' },
      { label: 'Sedán / Hatchback', price: '$31.990' },
      { label: 'SUV', price: '$34.990' },
      { label: '3 corridas', price: '$37.990' },
    ],
  },
  {
    id: '3',
    slug: 'pack-eco-silver',
    icon: 'droplets' as const,
    duration: '60–90 min',
    price: 'Desde $19.990',
    pricingTable: [
      { label: 'Citycar', price: '$19.990' },
      { label: 'Sedán / Hatchback', price: '$23.990' },
      { label: 'SUV', price: '$25.990' },
      { label: '3 corridas', price: '$27.990' },
    ],
  },
  {
    id: '4',
    slug: 'pulido-abrillantador',
    icon: 'sparkles' as const,
    duration: '90–120 min',
    price: 'Desde $69.990',
    pricingTable: [
      { label: 'Citycar', price: '$69.990' },
      { label: 'Sedán / Hatchback', price: '$89.990' },
      { label: 'SUV', price: '$120.990' },
      { label: '3 corridas', price: '$139.990' },
    ],
  },
  {
    id: '5',
    slug: 'pulido-focos',
    icon: 'zap' as const,
    duration: '45–60 min',
    price: 'Desde $55.000 el par',
    image: '/images/focos/despues.webp',
  },
  {
    id: '6',
    slug: 'limpieza-tapiz',
    icon: 'armchair' as const,
    duration: '60–90 min',
    price: 'Desde $55.990',
    image: '/images/asientos/despues.webp',
    imageBefore: '/images/asientos/antes.webp',
    pricingTable: [
      { label: 'Citycar', price: '$55.990' },
      { label: 'Sedán / Hatchback', price: '$65.990' },
      { label: 'SUV', price: '$65.990' },
      { label: '3 corridas', price: '$89.990' },
    ],
  },
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
    slug: 'pack-eco-diamond',
    title: 'Pack Eco Diamond',
    shortDescription: 'Pulido completo + cera Carnauba + limpieza showroom.',
    fullDescription:
      'Nuestro servicio más completo. Pulido abrillantador de carrocería con máquina profesional, sellado con cera Carnauba, aspirado profundo, limpieza e hidratación de tableros y plásticos, lavado en seco completo, marcos de entrepuertas, vidrios interior y exterior, llantas, neumáticos y renovador de gomas. Resultado showroom garantizado a domicilio.',
    icon: 'car',
    features: [
      'Pulido abrillantador con máquina profesional',
      'Sellado con cera Carnauba',
      'Aspirado profundo + limpieza completa de interiores',
      'Vidrios, llantas y gomas incluidos',
    ],
    duration: '3–4 hrs',
    price: 'Desde $89.990',
    highlight: true,
    image: '/images/lavado_ecologico/lavado_ecologico.webp',
    pricingTable: [
      { label: 'Citycar', price: '$89.990' },
      { label: 'Sedán / Hatchback', price: '$99.990' },
      { label: 'SUV', price: '$139.990' },
      { label: '3 corridas', price: '$159.990' },
    ],
  },
  {
    id: '2',
    slug: 'pack-eco-platinum',
    title: 'Pack Eco Platinum',
    shortDescription: 'Lavado en seco con cera Carnauba + limpieza premium de interiores.',
    fullDescription:
      'Servicio premium completo a domicilio. Aspirado profundo, limpieza e hidratación de tableros y plásticos, lavado en seco de carrocería con cera Carnauba, marcos de entrepuertas, vidrios interior y exterior, llantas, neumáticos, renovador de plásticos exteriores, gomas y neumáticos.',
    icon: 'award',
    features: [
      'Lavado en seco con cera Carnauba',
      'Aspirado profundo + tableros hidratados',
      'Vidrios, llantas y neumáticos incluidos',
      'Renovador de plásticos exteriores e interiores',
    ],
    duration: '90–120 min',
    price: 'Desde $28.990',
    pricingTable: [
      { label: 'Citycar', price: '$28.990' },
      { label: 'Sedán / Hatchback', price: '$31.990' },
      { label: 'SUV', price: '$34.990' },
      { label: '3 corridas', price: '$37.990' },
    ],
  },
  {
    id: '3',
    slug: 'pack-eco-silver',
    title: 'Pack Eco Silver',
    shortDescription: 'Lavado en seco esencial + aspirado + vidrios.',
    fullDescription:
      'El servicio esencial para el mantenimiento regular de tu vehículo. Incluye aspirado completo de interiores, limpieza superficial de tableros, lavado en seco de carrocería completa, limpieza de neumáticos y vidrios exteriores. Ideal para quienes buscan tener el auto impecable semana a semana.',
    icon: 'droplets',
    features: [
      'Aspirado completo de interiores',
      'Lavado en seco de carrocería',
      'Limpieza de neumáticos y vidrios',
      'Ideal para mantenimiento regular',
    ],
    duration: '60–90 min',
    price: 'Desde $19.990',
    pricingTable: [
      { label: 'Citycar', price: '$19.990' },
      { label: 'Sedán / Hatchback', price: '$23.990' },
      { label: 'SUV', price: '$25.990' },
      { label: '3 corridas', price: '$27.990' },
    ],
  },
  {
    id: '4',
    slug: 'pulido-abrillantador',
    title: 'Pulido Abrillantador',
    shortDescription: 'Corrección de pintura profesional para eliminar micro-rayas.',
    fullDescription:
      'Pulido abrillantador profesional a domicilio en Santiago y Región Metropolitana. Eliminamos micro-rayas, marcas de lavado y oxidación superficial para devolver el brillo espejo original. Realzamos la profundidad del color con técnicas de corrección de pintura de nivel profesional. Disponible de forma independiente o incluido en el Pack Eco Diamond.',
    icon: 'sparkles',
    features: [
      'Eliminación de micro-rayas y oxidación superficial',
      'Realce de profundidad y brillo del color',
      'Máquina pulidora profesional',
      'Disponible incluido en el Pack Diamond',
    ],
    duration: '90–120 min',
    price: 'Desde $69.990',
    pricingTable: [
      { label: 'Citycar', price: '$69.990' },
      { label: 'Sedán / Hatchback', price: '$89.990' },
      { label: 'SUV', price: '$120.990' },
      { label: '3 corridas', price: '$139.990' },
    ],
  },
  {
    id: '5',
    slug: 'pulido-focos',
    title: 'Pulido de Focos',
    shortDescription: 'Recupera la transparencia y claridad de tus focos.',
    fullDescription:
      'Recuperamos la transparencia y claridad de tus focos eliminando el amarillamiento y opacidad acumulados. Mejora significativamente la visibilidad nocturna y la seguridad al volante. Incluye sellado de protección para extender el resultado. Servicio por par de focos, a domicilio en Santiago y Región Metropolitana.',
    icon: 'zap',
    features: [
      'Eliminación de amarillamiento y opacidad',
      'Mejora visibilidad nocturna',
      'Sellado de protección incluido',
      'Servicio por par de focos',
    ],
    duration: '45–60 min',
    price: 'Desde $55.000 el par',
    image: '/images/focos/despues.webp',
  },
  {
    id: '6',
    slug: 'limpieza-tapiz',
    title: 'Limpieza de Tapiz e Interiores',
    shortDescription: 'Limpieza profunda de asientos, tapizado y alfombras.',
    fullDescription:
      'Limpieza profunda de asientos, tapizado, alfombras y pisos a domicilio en Santiago y Región Metropolitana. Trabajamos con equipamiento de extracción especializado para eliminar manchas, olores y suciedad incrustada. Para asientos de cuero aplicamos acondicionador premium. Precio según tipo y tamaño de vehículo.',
    icon: 'armchair',
    features: [
      'Extracción de manchas profundas',
      'Eliminación de olores',
      'Tratamiento de alfombras y pisos',
      'Acondicionador de cuero (si aplica)',
    ],
    duration: '60–90 min',
    price: 'Desde $55.990',
    image: '/images/asientos/despues.webp',
    imageBefore: '/images/asientos/antes.webp',
    pricingTable: [
      { label: 'Citycar', price: '$55.990' },
      { label: 'Sedán / Hatchback', price: '$65.990' },
      { label: 'SUV', price: '$65.990' },
      { label: '3 corridas', price: '$89.990' },
    ],
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
