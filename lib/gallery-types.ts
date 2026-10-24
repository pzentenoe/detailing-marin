import type { GalleryCategory } from '@/lib/gallery'

export const GALLERY_STATUSES = ['draft', 'published', 'archived'] as const
export type GalleryStatus = (typeof GALLERY_STATUSES)[number]

export interface AdminGalleryPhoto {
  id: number | null
  status: GalleryStatus
  sort: number
  slug: string
  category: GalleryCategory
  image: string
  width: number
  height: number
  caption_es: string
  caption_en: string
  alt_es: string
  alt_en: string
}

export interface AdminGalleryComparison {
  id: number | null
  status: GalleryStatus
  sort: number
  slug: string
  title_es: string
  title_en: string
  before_image: string
  after_image: string
  before_alt_es: string
  before_alt_en: string
  after_alt_es: string
  after_alt_en: string
}

export type GalleryFormState = {
  error?: string
  success?: boolean
  id?: number
}
