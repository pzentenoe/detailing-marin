export const HOMEPAGE_MEDIA_KEY = '_media'

export const HOMEPAGE_RESULT_KEYS = ['motor', 'tapiz', 'focos', 'exterior'] as const

export const DEFAULT_HOMEPAGE_IMAGE_SOURCES = {
  hero: '/images/trabajos/exterior/bmw-x3-perfil-lateral-despues.webp',
  features: [
    '/images/lavado_ecologico/lavado_ecologico.webp',
    '/images/trabajos/exterior/peugeot-landtrek-frontal-despues.webp',
    '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp',
  ],
  industrial: '/images/trabajos/maquinaria/motor-industrial-cat-en-limpieza.webp',
  results: {
    motor: { before: '/images/lavado_motor/antes.webp', after: '/images/lavado_motor/despues.webp' },
    tapiz: { before: '/images/asientos/antes.webp', after: '/images/asientos/despues.webp' },
    focos: {
      before: '/images/trabajos/focos/foco-delantero-amarillento-antes.webp',
      after: '/images/trabajos/focos/foco-delantero-restaurado-despues.webp',
    },
    exterior: {
      before: '/images/trabajos/exterior/porsche-boxster-trasera-sucia-antes.webp',
      after: '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp',
    },
  },
} as const

type ImagePair = { before: string | null; after: string | null }

export type HomepageMedia = {
  hero: string | null
  features: [string | null, string | null, string | null]
  industrial: string | null
  results: Record<(typeof HOMEPAGE_RESULT_KEYS)[number], ImagePair>
}

export const DEFAULT_HOMEPAGE_MEDIA: HomepageMedia = {
  hero: null,
  features: [null, null, null],
  industrial: null,
  results: {
    motor: { before: null, after: null },
    tapiz: { before: null, after: null },
    focos: { before: null, after: null },
    exterior: { before: null, after: null },
  },
}

const FILE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isImageId(value: unknown): value is string | null {
  return value === null || (typeof value === 'string' && FILE_ID.test(value))
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]) {
  return Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key))
}

export function isHomepageMedia(value: unknown): value is HomepageMedia {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const media = value as Record<string, unknown>
  if (!hasExactKeys(media, ['hero', 'features', 'industrial', 'results'])) return false
  if (!isImageId(media.hero) || !isImageId(media.industrial)) return false
  if (!Array.isArray(media.features) || media.features.length !== 3 || !media.features.every(isImageId)) return false
  if (!media.results || typeof media.results !== 'object' || Array.isArray(media.results)) return false

  const results = media.results as Record<string, unknown>
  return hasExactKeys(results, HOMEPAGE_RESULT_KEYS) && HOMEPAGE_RESULT_KEYS.every((key) => {
    const pair = results[key]
    return !!pair && typeof pair === 'object' && !Array.isArray(pair)
      && hasExactKeys(pair as Record<string, unknown>, ['before', 'after'])
      && isImageId((pair as Record<string, unknown>).before)
      && isImageId((pair as Record<string, unknown>).after)
  })
}

export function homepageMediaFromContent(value: unknown): HomepageMedia {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return DEFAULT_HOMEPAGE_MEDIA
  const media = (value as Record<string, unknown>)[HOMEPAGE_MEDIA_KEY]
  return isHomepageMedia(media) ? media : DEFAULT_HOMEPAGE_MEDIA
}

export function homepageMediaIds(media: HomepageMedia): string[] {
  return [
    media.hero,
    ...media.features,
    media.industrial,
    ...HOMEPAGE_RESULT_KEYS.flatMap((key) => [media.results[key].before, media.results[key].after]),
  ].filter((id): id is string => id !== null)
}

export function homepageAssetUrl(id: string | null): string | undefined {
  return id ? `/api/directus-assets/${id}` : undefined
}
