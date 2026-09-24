import 'server-only'

import type { AdminServicePriceRecord, AdminServiceRecord } from '@/types/admin'

interface DirectusData<T> {
  data: T
}

interface DirectusServiceRecord extends Omit<AdminServiceRecord, 'image' | 'image_before'> {
  image: string | { id: string } | null
  image_before: string | { id: string } | null
}

interface DirectusPriceRecord extends AdminServicePriceRecord {
  service: number | { id: number }
}

const SERVICE_FIELDS = [
  'id', 'status', 'sort', 'slug', 'title_es', 'title_en', 'short_description_es', 'short_description_en',
  'full_description_es', 'full_description_en', 'features_es', 'features_en', 'price_label_es', 'price_label_en',
  'duration', 'icon', 'is_featured', 'image', 'image_before',
].join(',')

function baseUrl() {
  const value = process.env.DIRECTUS_URL
  if (!value) throw new Error('DIRECTUS_URL is not configured')
  return value.replace(/\/+$/, '')
}

function token(name: 'DIRECTUS_TOKEN' | 'DIRECTUS_ADMIN_TOKEN') {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

function fileId(value: DirectusServiceRecord['image']) {
  return typeof value === 'string' ? value : value?.id ?? null
}

async function readDirectus<T>(path: string): Promise<T> {
  const response = await fetch(new URL(path, baseUrl()), {
    headers: { Authorization: `Bearer ${token('DIRECTUS_TOKEN')}` },
    cache: 'no-store',
    redirect: 'error',
  })
  if (!response.ok) throw new Error(`Directus read failed (${response.status})`)
  return response.json() as Promise<T>
}

export async function writeDirectus(path: string, init: RequestInit) {
  return fetch(new URL(path, baseUrl()), {
    ...init,
    headers: {
      Authorization: `Bearer ${token('DIRECTUS_ADMIN_TOKEN')}`,
      ...init.headers,
    },
    cache: 'no-store',
    redirect: 'error',
  })
}

export async function listAdminServices(): Promise<AdminServiceRecord[]> {
  const url = new URL('/items/detailing_services', baseUrl())
  url.search = new URLSearchParams({ fields: SERVICE_FIELDS, sort: 'sort,id', limit: '-1' }).toString()
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token('DIRECTUS_TOKEN')}` },
    cache: 'no-store',
    redirect: 'error',
  })
  if (!response.ok) throw new Error(`Directus read failed (${response.status})`)
  const payload = await response.json() as DirectusData<DirectusServiceRecord[]>
  return payload.data.map((service) => ({
    ...service,
    image: fileId(service.image),
    image_before: fileId(service.image_before),
  }))
}

export async function getAdminService(id: number): Promise<AdminServiceRecord | null> {
  const path = `/items/detailing_services/${id}?fields=${encodeURIComponent(SERVICE_FIELDS)}`
  const response = await fetch(new URL(path, baseUrl()), {
    headers: { Authorization: `Bearer ${token('DIRECTUS_TOKEN')}` },
    cache: 'no-store',
    redirect: 'error',
  })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Directus read failed (${response.status})`)
  const payload = await response.json() as DirectusData<DirectusServiceRecord>
  return {
    ...payload.data,
    image: fileId(payload.data.image),
    image_before: fileId(payload.data.image_before),
  }
}

export async function listAdminServicePrices(serviceId: number): Promise<AdminServicePriceRecord[]> {
  const url = new URL('/items/detailing_service_prices', baseUrl())
  url.search = new URLSearchParams({
    'filter[service][_eq]': String(serviceId),
    fields: 'id,vehicle_type,price,sort',
    sort: 'sort,id',
    limit: '-1',
  }).toString()
  const payload = await readDirectus<DirectusData<DirectusPriceRecord[]>>(url.pathname + url.search)
  return payload.data
}

export function adminAssetUrl(id: string | null) {
  return id ? `/admin/assets/${id}` : null
}

export async function isFileInAdminMediaFolder(id: string) {
  const folderId = process.env.DIRECTUS_MEDIA_FOLDER_ID
  if (!folderId) throw new Error('DIRECTUS_MEDIA_FOLDER_ID is not configured')

  const response = await writeDirectus(`/files/${id}?fields=id,folder`, { method: 'GET' })
  if (!response.ok) return false
  const payload = await response.json() as DirectusData<{ folder: string | { id: string } | null }>
  const actualFolder = typeof payload.data.folder === 'string' ? payload.data.folder : payload.data.folder?.id
  return actualFolder === folderId
}

export async function isFileReferencedByService(id: string) {
  const url = new URL('/items/detailing_services', baseUrl())
  url.search = new URLSearchParams({
    'filter[_or][0][image][_eq]': id,
    'filter[_or][1][image_before][_eq]': id,
    fields: 'id',
    limit: '1',
  }).toString()
  const payload = await readDirectus<DirectusData<{ id: number }[]>>(url.pathname + url.search)
  return payload.data.length > 0
}
