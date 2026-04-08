// ============================================================
// Comunas prioritarias — landing pages SEO local
// Contenido único por comuna para evitar thin content
// ============================================================

export interface CommuneConfig {
  slug: string
  name: string
  zone: string
  description: string
  highlights: string[]
  faq: Array<{ q: string; a: string }>
}

export const PRIORITY_COMMUNES: CommuneConfig[] = [
  {
    slug: 'maipu',
    name: 'Maipú',
    zone: 'Zona Poniente',
    description:
      'Maipú es la comuna más grande de Chile con más de 600.000 habitantes y una de las zonas con mayor concentración de vehículos por hogar en Santiago. La alta densidad residencial y el ritmo de vida acelerado hacen que cada vez más familias opten por servicios que llegan directo a su puerta. En Detailing Marin atendemos toda la extensión de Maipú: desde Pajaritos y Ciudad Satélite hasta Maipú centro, Valle Grande, Los Quillayes y urbanizaciones nuevas del sector, sin costo de traslado.',
    highlights: [
      'Atendemos toda la extensión de Maipú sin costo extra',
      'Ideal para hogares con más de un vehículo',
      'Servicio en condominios, casas y estacionamientos privados',
      'Zona Poniente con mayor demanda de lavado a domicilio',
    ],
    faq: [
      {
        q: '¿Cuánto demoran en llegar a Maipú?',
        a: 'Maipú es una de nuestras zonas de mayor cobertura en el poniente. Coordinamos el horario de llegada con anticipación y llegamos puntual al lugar que indiques, ya sea tu casa, trabajo o condominio.',
      },
      {
        q: '¿Atienden en condominios y urbanizaciones cerradas de Maipú?',
        a: 'Sí. Trabajamos en condominios, conjuntos habitacionales y calles cerradas de Maipú sin problema. Solo necesitamos que nos confirmes el acceso al estacionamiento o la zona donde se encuentra el vehículo.',
      },
    ],
  },
  {
    slug: 'las-condes',
    name: 'Las Condes',
    zone: 'Zona Oriente',
    description:
      'Las Condes concentra algunas de las principales empresas de Santiago y una de las flotas de vehículos premium más grandes del país. Nuestro servicio de detailing a domicilio está diseñado para adaptarse al ritmo exigente de esta comuna: llegamos a tu domicilio, edificio corporativo o estacionamiento sin que tengas que interrumpir tu jornada. Atendemos El Golf, Escuela Militar, Los Dominicos, Manquehue y todos los sectores de Las Condes con el mismo estándar de servicio premium.',
    highlights: [
      'Servicio en edificios de oficinas y estacionamientos corporativos',
      'Especialistas en vehículos premium y de alta gama',
      'Sin interrumpir tu jornada laboral',
      'Sectores El Golf, Escuela Militar, Los Dominicos y más',
    ],
    faq: [
      {
        q: '¿Pueden hacer el servicio en el estacionamiento de mi oficina en Las Condes?',
        a: 'Sí. Trabajamos en estacionamientos subterráneos y al aire libre de edificios corporativos. Nuestro sistema de lavado ecológico no requiere manguera ni desagüe, por lo que podemos operar en cualquier tipo de estacionamiento.',
      },
      {
        q: '¿Tienen experiencia con autos de alta gama en Las Condes?',
        a: 'Sí. Trabajamos frecuentemente con vehículos BMW, Mercedes-Benz, Audi, Volvo y otros modelos premium. Nuestros productos y técnicas están seleccionados para respetar pinturas sensibles, acabados nacarados y superficies delicadas.',
      },
    ],
  },
  {
    slug: 'providencia',
    name: 'Providencia',
    zone: 'Zona Centro-Oriente',
    description:
      'Providencia es la comuna de los profesionales urbanos y de los departamentos con estacionamiento subterráneo. Si vivís en un edificio con parking, nuestro equipo está preparado para trabajar en espacios cubiertos sin conexión a agua corriente: nuestra tecnología de lavado ecológico no requiere manguera ni desagüe, solo un toma corriente estándar para el aspirador. Atendemos todo Providencia: Barrio Italia, Pedro de Valdivia, Manuel Montt, Los Leones y zonas residenciales del sector.',
    highlights: [
      'Funciona en estacionamientos subterráneos de edificios',
      'Sin conexión a agua corriente — solo necesitamos un enchufe',
      'Barrio Italia, Pedro de Valdivia, Manuel Montt, Los Leones',
      'Ideal para profesionales que trabajan desde casa o la oficina',
    ],
    faq: [
      {
        q: '¿El servicio funciona en el estacionamiento de mi edificio en Providencia?',
        a: 'Sí, es uno de los escenarios más frecuentes. Nuestro método de lavado ecológico no requiere agua a presión ni desagüe cercano. Solo necesitamos acceso al vehículo y, si usamos aspirador, un enchufe estándar.',
      },
      {
        q: '¿Pueden ir a Barrio Italia o Manuel Montt?',
        a: 'Sí. Atendemos todo Providencia incluyendo Barrio Italia, Manuel Montt, Pedro de Valdivia, Los Leones y sectores aledaños a Irarrázaval. Coordinamos el horario que mejor te acomode.',
      },
    ],
  },
  {
    slug: 'la-florida',
    name: 'La Florida',
    zone: 'Zona Sur-Oriente',
    description:
      'La Florida es una de las comunas con mayor crecimiento vehicular del sector sur-oriente de Santiago. La alta densidad habitacional y la distancia de los grandes centros de servicios hacen que el lavado a domicilio sea la opción más conveniente para miles de familias. En Detailing Marin cubrimos toda La Florida: Robles, Parque O\'Higgins, Los Quillayes, San José de la Estrella, Departamental y todas las poblaciones del sector, sin costo extra de traslado.',
    highlights: [
      'Cobertura completa de La Florida sin cargo adicional',
      'Robles, Los Quillayes, San José de la Estrella y más',
      'Ideal para familias con más de un vehículo',
      'Alternativa conveniente al lavado tradicional en esta zona',
    ],
    faq: [
      {
        q: '¿Cubren todos los sectores de La Florida?',
        a: 'Sí. Atendemos toda la extensión de La Florida, incluyendo sectores más alejados como San José de la Estrella, Robles, Los Quillayes, Parque O\'Higgins y Departamental. El costo de traslado siempre está incluido.',
      },
      {
        q: '¿Puedo agendar para varios autos el mismo día en La Florida?',
        a: 'Sí, podemos coordinar el servicio para dos o más vehículos en el mismo domicilio. Contáctanos por WhatsApp para organizar el horario y los servicios para cada auto.',
      },
    ],
  },
  {
    slug: 'nunoa',
    name: 'Ñuñoa',
    zone: 'Zona Centro-Oriente',
    description:
      'Ñuñoa es una de las comunas con mayor conciencia ambiental de Santiago, y nuestro servicio de lavado ecológico encaja perfecto con ese perfil. Ahorramos hasta 200 litros de agua por vehículo comparado con un lavado tradicional, utilizando productos 100% biodegradables que no contaminan el suelo ni las napas. Atendemos todo Ñuñoa: Irarrázaval, Ñuñoa centro, Plaza Egaña, Jorge Matte Gormaz y los barrios residenciales del sector oriente.',
    highlights: [
      'Ahorro de hasta 200 litros de agua por vehículo',
      'Productos 100% biodegradables — ideal para Ñuñoa',
      'Sin escorrentía contaminante en veredas ni patios',
      'Irarrázaval, Plaza Egaña, Ñuñoa centro y más',
    ],
    faq: [
      {
        q: '¿El lavado ecológico es realmente efectivo?',
        a: 'Sí. El lavado ecológico utiliza productos de última generación con agentes encapsuladores de suciedad que limpian profundo sin necesidad de grandes cantidades de agua. El resultado es comparable al de un lavado tradicional, con hasta 90% menos consumo de agua.',
      },
      {
        q: '¿Los productos que usan son seguros para mascotas y niños?',
        a: 'Sí. Todos nuestros productos son biodegradables, libres de parabenos y formulados para ser seguros en ambientes domésticos. No generan residuos tóxicos ni escorrentía contaminante.',
      },
    ],
  },
  {
    slug: 'vitacura',
    name: 'Vitacura',
    zone: 'Zona Oriente',
    description:
      'Vitacura concentra la mayor densidad de vehículos premium y de lujo de Chile. BMW, Mercedes-Benz, Porsche, Audi y modelos de edición limitada conviven en sus estacionamientos privados. Nuestro servicio de detailing profesional a domicilio está a la altura de esos vehículos: productos importados de primer nivel, técnicas de corrección de pintura para acabados sensibles y personal entrenado para trabajar con pinturas nacaradas, carbono y vinil. Cubrimos todo Vitacura: El Rodeo, Tabancura, Lo Curro y sectores residenciales exclusivos.',
    highlights: [
      'Especialistas en vehículos de lujo y alta gama',
      'Productos importados compatibles con pinturas y vinil premium',
      'Técnicas de corrección de pintura para acabados nacarados',
      'El Rodeo, Tabancura, Lo Curro y sectores exclusivos',
    ],
    faq: [
      {
        q: '¿Tienen experiencia con vehículos de lujo en Vitacura?',
        a: 'Sí. Trabajamos regularmente con BMW, Mercedes-Benz, Porsche, Audi, Land Rover y otros modelos de alta gama. Nuestros productos y técnicas están seleccionados específicamente para proteger pinturas sensibles y acabados premium.',
      },
      {
        q: '¿Pueden hacer pulido de corrección en autos con pintura metalizada o nacarada?',
        a: 'Sí. El pulido abrillantador que ofrecemos es compatible con pinturas metalizadas, nacaradas y de efecto espejo. Evaluamos el estado de la pintura antes de iniciar para aplicar la técnica y abrasivo adecuados.',
      },
    ],
  },
  {
    slug: 'pudahuel',
    name: 'Pudahuel',
    zone: 'Zona Poniente',
    description:
      'Pudahuel es una de las comunas con mayor crecimiento del poniente de Santiago. Su cercanía al Aeropuerto Internacional AMB genera un alto tráfico de vehículos de todo tipo: autos particulares, camionetas de trabajo, furgonetas comerciales y flotas pequeñas de empresas. Detailing Marin ofrece servicio a domicilio en toda la comuna: El Noviciado, Pudahuel centro, Pudahuel Sur y sectores aledaños, con especial atención para vehículos de trabajo que necesitan una puesta a punto rápida y eficiente.',
    highlights: [
      'Atendemos autos, camionetas y furgonetas de trabajo',
      'Servicio rápido y eficiente para vehículos de uso intenso',
      'El Noviciado, Pudahuel centro, Pudahuel Sur y más',
      'Zona cercana al aeropuerto con alta demanda vehicular',
    ],
    faq: [
      {
        q: '¿Atienden camionetas y vehículos de trabajo en Pudahuel?',
        a: 'Sí. Trabajamos con vehículos de cualquier tamaño: autos compactos, SUV, camionetas doble cabina y furgonetas. Para vehículos extra grandes o muy sucios, el precio puede variar — consultanos antes de agendar.',
      },
      {
        q: '¿Pueden ir a El Noviciado o sectores alejados de Pudahuel?',
        a: 'Sí. Cubrimos El Noviciado, el sector industrial de Pudahuel y zonas residenciales del sector sur, incluyendo Pudahuel Sur. El traslado siempre está incluido en el precio del servicio.',
      },
    ],
  },
  {
    slug: 'san-miguel',
    name: 'San Miguel',
    zone: 'Zona Sur',
    description:
      'San Miguel es una de las comunas más consolidadas del sector sur de Santiago, con un alto porcentaje de familias propietarias de vehículos y una demanda creciente de servicios convenientes a domicilio. Detailing Marin atiende todo San Miguel y sectores aledaños: Gran Avenida, Lo Blanco, Club Hípico, y también comunas vecinas como Pedro Aguirre Cerda y Lo Espejo, sin costo extra de traslado. Ideal para quienes trabajan desde casa o no pueden desplazarse durante el día.',
    highlights: [
      'Gran Avenida, Lo Blanco, Club Hípico y más',
      'También atendemos Pedro Aguirre Cerda y Lo Espejo',
      'Sin costo de traslado incluido en el precio',
      'Ideal para familias del sector sur de Santiago',
    ],
    faq: [
      {
        q: '¿Cubren Pedro Aguirre Cerda y Lo Espejo desde San Miguel?',
        a: 'Sí. Atendemos San Miguel y comunas colindantes como Pedro Aguirre Cerda y Lo Espejo. Al coordinar el servicio por WhatsApp confirmamos la disponibilidad para tu dirección específica.',
      },
      {
        q: '¿Cuánto tiempo antes debo agendar en San Miguel?',
        a: 'Lo ideal es agendar con 24 a 48 horas de anticipación para asegurar disponibilidad. En casos urgentes podemos evaluar disponibilidad del mismo día según nuestra agenda.',
      },
    ],
  },
]

export function getCommuneBySlug(slug: string): CommuneConfig | undefined {
  return PRIORITY_COMMUNES.find((c) => c.slug === slug)
}
