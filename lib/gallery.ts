// ============================================================
// Galería — SSOT de trabajos fotografiados
// Cada entrada apunta a una toma real del lote del cliente. El nombre del
// archivo describe vehículo, parte y estado: se puede reconocer sin abrirlo.
// Los textos (alt y epígrafe) viven en messages/{es,en}.json bajo `gallery.photos`.
// ============================================================

export type GalleryCategory = 'exterior' | 'interiores' | 'focos' | 'maquinaria'

export interface GalleryPhoto {
  /** También es la clave de i18n del epígrafe: `gallery.photos.<id>` */
  id: string
  src: string
  width: number
  height: number
  category: GalleryCategory
}

export const galleryCategories: GalleryCategory[] = [
  'exterior',
  'interiores',
  'focos',
  'maquinaria',
]

const landscape = { width: 1280, height: 576 }
const portrait = { width: 576, height: 1280 }

export const galleryPhotos: GalleryPhoto[] = [
  // --- Exteriores ---
  {
    id: 'bmw-x3-perfil-lateral-despues',
    src: '/images/trabajos/exterior/bmw-x3-perfil-lateral-despues.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'bmw-x3-trasera-foco-encendido-despues',
    src: '/images/trabajos/exterior/bmw-x3-trasera-foco-encendido-despues.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'bmw-x3-trasera-xdrive30i-despues',
    src: '/images/trabajos/exterior/bmw-x3-trasera-xdrive30i-despues.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'bmw-x3-puerta-con-polvo-antes',
    src: '/images/trabajos/exterior/bmw-x3-puerta-con-polvo-antes.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'bmw-x3-llanta-delantera-despues',
    src: '/images/trabajos/exterior/bmw-x3-llanta-delantera-despues.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'porsche-boxster-trasera-limpia-despues',
    src: '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'porsche-boxster-aleta-con-sarro-antes',
    src: '/images/trabajos/exterior/porsche-boxster-aleta-con-sarro-antes.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'porsche-boxster-trasera-sucia-antes',
    src: '/images/trabajos/exterior/porsche-boxster-trasera-sucia-antes.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'porsche-boxster-perfil-lateral-despues',
    src: '/images/trabajos/exterior/porsche-boxster-perfil-lateral-despues.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'mercedes-glc-trasera-reflejos-despues',
    src: '/images/trabajos/exterior/mercedes-glc-trasera-reflejos-despues.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'mercedes-glc-parrilla-frontal-despues',
    src: '/images/trabajos/exterior/mercedes-glc-parrilla-frontal-despues.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'peugeot-landtrek-frontal-despues',
    src: '/images/trabajos/exterior/peugeot-landtrek-frontal-despues.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'peugeot-landtrek-trasera-despues',
    src: '/images/trabajos/exterior/peugeot-landtrek-trasera-despues.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'peugeot-landtrek-frontal-con-polvo-antes',
    src: '/images/trabajos/exterior/peugeot-landtrek-frontal-con-polvo-antes.webp',
    category: 'exterior',
    ...portrait,
  },
  {
    id: 'peugeot-landtrek-puerta-con-polvo-antes',
    src: '/images/trabajos/exterior/peugeot-landtrek-puerta-con-polvo-antes.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'peugeot-landtrek-bandeja-despues',
    src: '/images/trabajos/exterior/peugeot-landtrek-bandeja-despues.webp',
    category: 'exterior',
    ...landscape,
  },
  {
    id: 'renault-koleos-perfil-lateral-antes',
    src: '/images/trabajos/exterior/renault-koleos-perfil-lateral-antes.webp',
    category: 'exterior',
    ...landscape,
  },

  // --- Interiores ---
  {
    id: 'bmw-x3-consola-central-despues',
    src: '/images/trabajos/interiores/bmw-x3-consola-central-despues.webp',
    category: 'interiores',
    ...portrait,
  },
  {
    id: 'mercedes-glc-volante-despues',
    src: '/images/trabajos/interiores/mercedes-glc-volante-despues.webp',
    category: 'interiores',
    ...landscape,
  },
  {
    id: 'tapiz-beige-asiento-trasero-con-manchas',
    src: '/images/trabajos/interiores/tapiz-beige-asiento-trasero-con-manchas.webp',
    category: 'interiores',
    ...portrait,
  },
  {
    id: 'tapiz-beige-respaldo-limpio',
    src: '/images/trabajos/interiores/tapiz-beige-respaldo-limpio.webp',
    category: 'interiores',
    ...portrait,
  },
  {
    id: 'tapiz-gris-asiento-trasero-con-manchas',
    src: '/images/trabajos/interiores/tapiz-gris-asiento-trasero-con-manchas.webp',
    category: 'interiores',
    ...portrait,
  },
  {
    id: 'tapiz-gris-respaldo-trasero-limpio',
    src: '/images/trabajos/interiores/tapiz-gris-respaldo-trasero-limpio.webp',
    category: 'interiores',
    ...portrait,
  },

  // --- Focos ---
  {
    id: 'foco-delantero-amarillento-antes',
    src: '/images/trabajos/focos/foco-delantero-amarillento-antes.webp',
    category: 'focos',
    ...landscape,
  },
  {
    id: 'foco-delantero-restaurado-despues',
    src: '/images/trabajos/focos/foco-delantero-restaurado-despues.webp',
    category: 'focos',
    ...landscape,
  },

  // --- Maquinaria ---
  {
    id: 'motor-industrial-cat-con-grasa',
    src: '/images/trabajos/maquinaria/motor-industrial-cat-con-grasa.webp',
    category: 'maquinaria',
    ...landscape,
  },
  {
    id: 'motor-industrial-cat-en-limpieza',
    src: '/images/trabajos/maquinaria/motor-industrial-cat-en-limpieza.webp',
    category: 'maquinaria',
    ...landscape,
  },
  {
    id: 'motor-industrial-cat-bloque-limpio',
    src: '/images/trabajos/maquinaria/motor-industrial-cat-bloque-limpio.webp',
    category: 'maquinaria',
    ...landscape,
  },
  {
    id: 'motor-industrial-cat-detalle',
    src: '/images/trabajos/maquinaria/motor-industrial-cat-detalle.webp',
    category: 'maquinaria',
    ...portrait,
  },
]

/** Selección de la home: una toma por tipo de trabajo. */
export const galleryPreviewIds = [
  'bmw-x3-perfil-lateral-despues',
  'mercedes-glc-trasera-reflejos-despues',
  'tapiz-gris-respaldo-trasero-limpio',
  'motor-industrial-cat-en-limpieza',
  'foco-delantero-restaurado-despues',
] as const

export function getGalleryPhoto(id: string): GalleryPhoto | undefined {
  return galleryPhotos.find((photo) => photo.id === id)
}
