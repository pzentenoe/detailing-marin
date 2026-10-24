import { access, readFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { config } from 'dotenv'
import { galleryComparisons, galleryPhotos } from '../lib/gallery'

config({ path: '.env.local' })

const projectRoot = process.cwd()
function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Configura ${name} en .env.local.`)
  return value
}

const baseUrl = requiredEnv('DIRECTUS_URL').replace(/\/+$/, '')
/** Solo necesario para crear las colecciones cuando todavía no existen en Directus. */
const schemaToken = process.env.DIRECTUS_SCHEMA_TOKEN
const adminToken = requiredEnv('DIRECTUS_ADMIN_TOKEN')
const readToken = requiredEnv('DIRECTUS_TOKEN')
const mediaFolder = requiredEnv('DIRECTUS_MEDIA_FOLDER_ID')

const photosCollection = 'detailing_gallery_photos'
const comparisonsCollection = 'detailing_gallery_comparisons'
const imagePaths = new Set([
  ...galleryPhotos.map(({ src }) => src),
  ...galleryComparisons.flatMap(({ beforeSrc, afterSrc }) => [beforeSrc, afterSrc]),
])

type Field = {
  field: string
  type: string
  interface: string
  schema?: Record<string, unknown>
  meta?: Record<string, unknown>
}

function field(fieldName: string, type: string, options: Partial<Field> = {}): Field {
  return { field: fieldName, type, interface: 'input', ...options }
}

function commonFields(): Field[] {
  return [
    field('id', 'integer', {
      schema: { is_primary_key: true, has_auto_increment: true, is_nullable: false },
      meta: { interface: 'input', hidden: true, readonly: true, width: 'full' },
    }),
    field('sort', 'integer', { schema: { default_value: 0, is_nullable: false }, meta: { interface: 'input', width: 'half' } }),
    field('status', 'string', {
      schema: { default_value: 'draft', max_length: 32, is_nullable: false },
      meta: { interface: 'select-dropdown', width: 'half', options: { choices: [
        { text: 'Borrador', value: 'draft' }, { text: 'Publicado', value: 'published' }, { text: 'Archivado', value: 'archived' },
      ] } },
    }),
    field('slug', 'string', { schema: { max_length: 120, is_nullable: false, is_unique: true }, meta: { interface: 'input', width: 'full', required: true } }),
  ]
}

function translatedFields(names: string[]) {
  return names.map((name) => field(name, 'text', {
    schema: { is_nullable: false },
    meta: { interface: 'input', width: 'full', required: true },
  }))
}

const collectionDefinitions = [
  {
    collection: photosCollection,
    icon: 'photo_library',
    note: 'Fotos individuales de la galería pública.',
    fields: [
      ...commonFields(),
      field('category', 'string', {
        schema: { default_value: 'exterior', max_length: 32, is_nullable: false },
        meta: { interface: 'select-dropdown', width: 'half', options: { choices: [
          { text: 'Exteriores', value: 'exterior' }, { text: 'Interiores', value: 'interiores' },
          { text: 'Focos', value: 'focos' }, { text: 'Maquinaria', value: 'maquinaria' },
        ] } },
      }),
      field('image', 'uuid', { schema: { is_nullable: false }, meta: { interface: 'file-image', width: 'full', required: true, special: ['file'] } }),
      field('width', 'integer', { schema: { default_value: 1280, is_nullable: false }, meta: { interface: 'input', hidden: true } }),
      field('height', 'integer', { schema: { default_value: 960, is_nullable: false }, meta: { interface: 'input', hidden: true } }),
      ...translatedFields(['caption_es', 'caption_en', 'alt_es', 'alt_en']),
    ],
    fileFields: ['image'],
  },
  {
    collection: comparisonsCollection,
    icon: 'compare',
    note: 'Pares de imágenes de antes y después de un mismo trabajo.',
    fields: [
      ...commonFields(),
      field('title_es', 'string', { schema: { max_length: 120, is_nullable: false }, meta: { interface: 'input', width: 'half', required: true } }),
      field('title_en', 'string', { schema: { max_length: 120, is_nullable: false }, meta: { interface: 'input', width: 'half', required: true } }),
      field('before_image', 'uuid', { schema: { is_nullable: false }, meta: { interface: 'file-image', width: 'half', required: true, special: ['file'] } }),
      field('after_image', 'uuid', { schema: { is_nullable: false }, meta: { interface: 'file-image', width: 'half', required: true, special: ['file'] } }),
      ...translatedFields(['before_alt_es', 'before_alt_en', 'after_alt_es', 'after_alt_en']),
    ],
    fileFields: ['before_image', 'after_image'],
  },
]

async function request<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(new URL(path, baseUrl), {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init?.headers },
    redirect: 'error',
  })
  const text = await response.text()
  if (!response.ok) {
    let message = ''
    try { message = JSON.parse(text)?.errors?.[0]?.message ?? '' } catch { /* Return only status if response isn't JSON. */ }
    throw new Error(`Directus ${response.status}${message ? `: ${message}` : ''}`)
  }
  return (text ? JSON.parse(text) : {}) as T
}

async function ensureSchema() {
  let existing: Set<string>
  if (schemaToken) {
    const payload = await request<{ data: Array<{ collection: string }> }>('/collections?fields=collection&limit=-1', schemaToken)
    existing = new Set(payload.data.map(({ collection }) => collection))
  } else {
    // Sin token de esquema no se puede listar colecciones: se comprueba cada una por separado.
    existing = new Set()
    for (const { collection } of collectionDefinitions) {
      const url = new URL(`/items/${collection}`, baseUrl)
      url.search = new URLSearchParams({ fields: 'id', limit: '1' }).toString()
      const response = await fetch(url, { headers: { Authorization: `Bearer ${adminToken}` }, redirect: 'error' })
      if (response.ok) existing.add(collection)
    }
  }

  const missing = collectionDefinitions.filter(({ collection }) => !existing.has(collection))
  if (!missing.length) return

  if (!schemaToken) {
    throw new Error(`Faltan las colecciones ${missing.map(({ collection }) => collection).join(', ')} en Directus. Configura DIRECTUS_SCHEMA_TOKEN para crearlas; no se subieron archivos.`)
  }

  for (const definition of missing) {
    await request('/collections', schemaToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection: definition.collection,
        schema: { name: definition.collection },
        icon: definition.icon,
        note: definition.note,
        sort_field: 'sort',
        hidden: false,
        fields: definition.fields,
      }),
    })
    for (const fileField of definition.fileFields) {
      await request('/relations', schemaToken, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: definition.collection,
          field: fileField,
          related_collection: 'directus_files',
        }),
      })
    }
  }
}

async function assertLocalImagesExist() {
  const missing: string[] = []
  await Promise.all([...imagePaths].map(async (src) => {
    try {
      await access(resolve(projectRoot, 'public', src.replace(/^\//, '')))
    } catch {
      missing.push(src)
    }
  }))
  if (missing.length) throw new Error(`Faltan imágenes locales; no se modificó Directus: ${missing.join(', ')}`)
}

async function assertReadPermissions() {
  for (const [tokenName, token] of [['DIRECTUS_TOKEN', readToken], ['DIRECTUS_ADMIN_TOKEN', adminToken]] as const) {
    for (const collection of [photosCollection, comparisonsCollection]) {
      const url = new URL(`/items/${collection}`, baseUrl)
      url.search = new URLSearchParams({ fields: 'id', limit: '1' }).toString()
      const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, redirect: 'error' })
      if (!response.ok) {
        throw new Error(`${tokenName} no puede consultar ${collection} (${response.status}). Configura permisos de lectura y filtro status=published para el token público; no se subieron archivos.`)
      }
    }
  }
}

interface RemoteFile {
  id: string
  width: number | null
  height: number | null
  filesize: string | number | null
}

async function findFilesByName(filename: string) {
  const url = new URL('/files', baseUrl)
  url.search = new URLSearchParams({
    'filter[folder][_eq]': mediaFolder,
    'filter[filename_download][_eq]': filename,
    fields: 'id,width,height,filesize',
    limit: '-1',
  }).toString()
  const payload = await request<{ data: RemoteFile[] }>(`${url.pathname}${url.search}`, readToken)
  return payload.data
}

const uploaded = new Map<string, { id: string; width: number; height: number }>()
const counters = { reused: 0, uploaded: 0 }

async function ensureFile(src: string) {
  const localPath = resolve(projectRoot, 'public', src.replace(/^\//, ''))
  const bytes = await readFile(localPath)
  const fileName = basename(src)

  // El nombre local no siempre es único: el tamaño del archivo lo desambigua.
  const reusable = (await findFilesByName(fileName)).find((file) => Number(file.filesize) === bytes.byteLength)
  if (reusable) {
    counters.reused += 1
    return { id: reusable.id, width: reusable.width ?? 1280, height: reusable.height ?? 960 }
  }

  const mime = src.endsWith('.webp') ? 'image/webp' : src.endsWith('.png') ? 'image/png' : 'image/jpeg'
  const form = new FormData()
  form.set('file', new Blob([bytes], { type: mime }), fileName)
  form.set('folder', mediaFolder)
  const payload = await request<{ data: { id: string; width?: number | null; height?: number | null } }>('/files', adminToken, { method: 'POST', body: form })
  counters.uploaded += 1
  return { id: payload.data.id, width: payload.data.width ?? 1280, height: payload.data.height ?? 960 }
}

async function ensureItem(collection: string, item: Record<string, unknown>) {
  const url = new URL(`/items/${collection}`, baseUrl)
  url.search = new URLSearchParams({ 'filter[slug][_eq]': String(item.slug), fields: 'id', limit: '1' }).toString()
  const existing = await request<{ data: Array<{ id: number }> }>(`${url.pathname}${url.search}`, adminToken)
  if (existing.data.length) return false
  await request(`/items/${collection}`, adminToken, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  return true
}

async function main() {
  const esMessages = JSON.parse(await readFile(join(projectRoot, 'messages/es.json'), 'utf8')) as typeof import('../messages/es.json')
  const enMessages = JSON.parse(await readFile(join(projectRoot, 'messages/en.json'), 'utf8')) as typeof import('../messages/en.json')

  await assertLocalImagesExist()
  await ensureSchema()
  await assertReadPermissions()

  for (const src of imagePaths) uploaded.set(src, await ensureFile(src))

  const photoCount = await Promise.all(galleryPhotos.map(async (photo, index) => {
    const file = uploaded.get(photo.src)!
    const key = photo.id as keyof typeof esMessages.gallery.photos
    const captionEs = esMessages.gallery.photos[key]
    const captionEn = enMessages.gallery.photos[key]
    return ensureItem(photosCollection, {
      status: 'published', sort: index + 1, slug: photo.id, category: photo.category,
      image: file.id, width: file.width || photo.width, height: file.height || photo.height,
      caption_es: captionEs, caption_en: captionEn, alt_es: captionEs, alt_en: captionEn,
    })
  }))

  const comparisonCount = await Promise.all(galleryComparisons.map(async (comparison, index) => {
    const messagesEs = esMessages.gallery.comparisons
    const messagesEn = enMessages.gallery.comparisons
    const { id } = comparison
    return ensureItem(comparisonsCollection, {
      status: 'published', sort: index + 1, slug: id,
      title_es: messagesEs[id as keyof typeof messagesEs],
      title_en: messagesEn[id as keyof typeof messagesEn],
      before_image: uploaded.get(comparison.beforeSrc)!.id,
      after_image: uploaded.get(comparison.afterSrc)!.id,
      before_alt_es: messagesEs[`${id}BeforeAlt` as keyof typeof messagesEs],
      before_alt_en: messagesEn[`${id}BeforeAlt` as keyof typeof messagesEn],
      after_alt_es: messagesEs[`${id}AfterAlt` as keyof typeof messagesEs],
      after_alt_en: messagesEn[`${id}AfterAlt` as keyof typeof messagesEn],
    })
  }))

  console.log(JSON.stringify({
    galleryAssets: uploaded.size,
    reusedFiles: counters.reused,
    uploadedFiles: counters.uploaded,
    insertedPhotos: photoCount.filter(Boolean).length,
    existingPhotos: photoCount.filter((value) => !value).length,
    insertedComparisons: comparisonCount.filter(Boolean).length,
    existingComparisons: comparisonCount.filter((value) => !value).length,
  }, null, 2))
}

void main()
