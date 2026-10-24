import 'server-only'

import { z } from 'zod'
import { writeDirectus, isFileInAdminMediaFolder } from '@/lib/directus-admin'
import type { AdminGalleryComparison, AdminGalleryPhoto } from '@/lib/gallery-types'

interface DirectusData<T> {
  data: T
}

type ImageReference = string | { id: string } | null

interface PhotoRecord extends Omit<AdminGalleryPhoto, 'id' | 'image'> {
  id: number
  image: ImageReference
}

interface ComparisonRecord extends Omit<AdminGalleryComparison, 'id' | 'before_image' | 'after_image'> {
  id: number
  before_image: ImageReference
  after_image: ImageReference
}

const PHOTO_FIELDS = 'id,status,sort,slug,category,image,width,height,caption_es,caption_en,alt_es,alt_en'
const COMPARISON_FIELDS = 'id,status,sort,slug,title_es,title_en,before_image,after_image,before_alt_es,before_alt_en,after_alt_es,after_alt_en'

function baseUrl() {
  const value = process.env.DIRECTUS_URL
  if (!value) throw new Error('DIRECTUS_URL is not configured')
  return value.replace(/\/+$/, '')
}

function adminToken() {
  const value = process.env.DIRECTUS_ADMIN_TOKEN
  if (!value) throw new Error('DIRECTUS_ADMIN_TOKEN is not configured')
  return value
}

function asFileId(image: ImageReference) {
  return typeof image === 'string' ? image : image?.id ?? ''
}

function photo(record: PhotoRecord): AdminGalleryPhoto {
  return { ...record, image: asFileId(record.image) }
}

function comparison(record: ComparisonRecord): AdminGalleryComparison {
  return {
    ...record,
    before_image: asFileId(record.before_image),
    after_image: asFileId(record.after_image),
  }
}

async function readDirectus<T>(path: string): Promise<T> {
  const response = await fetch(new URL(path, baseUrl()), {
    headers: { Authorization: `Bearer ${adminToken()}` },
    cache: 'no-store',
    redirect: 'error',
  })
  if (!response.ok) throw new Error(`Directus gallery read failed (${response.status})`)
  return response.json() as Promise<T>
}

function collectionPath(collection: string, fields: string) {
  const url = new URL(`/items/${collection}`, baseUrl())
  url.search = new URLSearchParams({ fields, sort: 'sort,id', limit: '-1' }).toString()
  return `${url.pathname}${url.search}`
}

export async function listAdminGalleryPhotos() {
  const payload = await readDirectus<DirectusData<PhotoRecord[]>>(collectionPath('detailing_gallery_photos', PHOTO_FIELDS))
  return payload.data.map(photo)
}

export async function listAdminGalleryComparisons() {
  const payload = await readDirectus<DirectusData<ComparisonRecord[]>>(collectionPath('detailing_gallery_comparisons', COMPARISON_FIELDS))
  return payload.data.map(comparison)
}

export async function getAdminGalleryPhoto(id: number) {
  const payload = await readDirectus<DirectusData<PhotoRecord>>(`/items/detailing_gallery_photos/${id}?fields=${encodeURIComponent(PHOTO_FIELDS)}`)
  return photo(payload.data)
}

export async function getAdminGalleryComparison(id: number) {
  const payload = await readDirectus<DirectusData<ComparisonRecord>>(`/items/detailing_gallery_comparisons/${id}?fields=${encodeURIComponent(COMPARISON_FIELDS)}`)
  return comparison(payload.data)
}

export async function gallerySlugExists(kind: 'photo' | 'comparison', slug: string, exceptId?: number) {
  const collection = kind === 'photo' ? 'detailing_gallery_photos' : 'detailing_gallery_comparisons'
  const url = new URL(`/items/${collection}`, baseUrl())
  const params = new URLSearchParams({ 'filter[slug][_eq]': slug, fields: 'id', limit: '1' })
  if (exceptId) params.set('filter[id][_neq]', String(exceptId))
  url.search = params.toString()
  const payload = await readDirectus<DirectusData<{ id: number }[]>>(`${url.pathname}${url.search}`)
  return payload.data.length > 0
}

export async function galleryFilesAreManaged(ids: string[]) {
  const uniqueIds = [...new Set(ids)]
  const results = await Promise.all(uniqueIds.map(async (id) => {
    if (!z.uuid().safeParse(id).success) return false
    return isFileInAdminMediaFolder(id)
  }))
  return results.every(Boolean)
}

export async function saveGalleryRecord(kind: 'photo' | 'comparison', id: number | null, data: Record<string, unknown>) {
  const collection = kind === 'photo' ? 'detailing_gallery_photos' : 'detailing_gallery_comparisons'
  const path = id
    ? `/items/${collection}/${id}`
    : `/items/${collection}`
  const response = await writeDirectus(path, {
    method: id ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Directus gallery write failed (${response.status})`)
  const payload = await response.json() as DirectusData<{ id: number }>
  return Number(payload.data.id ?? id)
}
