import 'server-only'

import { z } from 'zod'
import en from '@/messages/en.json'
import es from '@/messages/es.json'
import {
	galleryComparisons,
	galleryPhotos,
	type GalleryCategory,
	type GalleryDisplayPhoto,
} from '@/lib/gallery'

export interface GalleryComparison {
	id: string
	title: string
	before: { src: string; alt: string }
	after: { src: string; alt: string }
}

export interface GalleryContent {
	photos: GalleryDisplayPhoto[]
	comparisons: GalleryComparison[]
}

const photoSchema = z.object({
	id: z.union([z.string().min(1), z.number()]),
	status: z.string(),
	sort: z.number().nullable(),
	slug: z.string().min(1),
	category: z.enum(['exterior', 'interiores', 'focos', 'maquinaria']),
	image: z.union([z.string(), z.object({ id: z.string() })]),
	width: z.number().nullable(),
	height: z.number().nullable(),
	caption_es: z.string().min(1),
	caption_en: z.string().min(1),
	alt_es: z.string().min(1),
	alt_en: z.string().min(1),
})

const comparisonSchema = z.object({
	id: z.union([z.string().min(1), z.number()]),
	status: z.string(),
	sort: z.number().nullable(),
	slug: z.string().min(1),
	title_es: z.string().min(1),
	title_en: z.string().min(1),
	before_image: z.union([z.string(), z.object({ id: z.string() })]),
	after_image: z.union([z.string(), z.object({ id: z.string() })]),
	before_alt_es: z.string().min(1),
	before_alt_en: z.string().min(1),
	after_alt_es: z.string().min(1),
	after_alt_en: z.string().min(1),
})

function fileId(value: string | { id: string }) {
	return typeof value === 'string' ? value : value.id
}

function assetUrl(id: string) {
	return `/api/directus-assets/${id}`
}

function staticGallery(locale: 'es' | 'en'): GalleryContent {
	const messages = locale === 'en' ? en.gallery : es.gallery
	const photos = galleryPhotos.map((photo) => {
		const key = photo.id as keyof typeof es.gallery.photos
		const caption = messages.photos[key]
		return { ...photo, src: photo.src, caption, alt: caption }
	})
	const comparisons = galleryComparisons.map(({ id, beforeSrc, afterSrc }) => {
		const item = messages.comparisons
		return {
			id,
			title: item[id as keyof typeof es.gallery.comparisons] as string,
			before: {
				src: beforeSrc,
				alt: item[`${id}BeforeAlt` as keyof typeof es.gallery.comparisons] as string,
			},
			after: {
				src: afterSrc,
				alt: item[`${id}AfterAlt` as keyof typeof es.gallery.comparisons] as string,
			},
		}
	})
	return { photos, comparisons }
}

function directusToken() {
	return process.env.DIRECTUS_TOKEN
}

async function readCollection<T>(collection: string, fields: string, schema: z.ZodType<T>) {
	const baseUrl = process.env.DIRECTUS_URL?.replace(/\/+$/, '')
	const token = directusToken()
	if (!baseUrl || !token) return null
	const url = new URL(`/items/${collection}`, baseUrl)
	url.search = new URLSearchParams({
		'filter[status][_eq]': 'published',
		fields,
		sort: 'sort,id',
		limit: '-1',
	}).toString()
	try {
		const response = await fetch(url, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate: 60, tags: ['directus-gallery'] },
			redirect: 'error',
		})
		if (!response.ok) return null
		const payload: unknown = await response.json()
		const data = z.object({ data: z.array(schema) }).safeParse(payload)
		return data.success ? data.data.data : null
	} catch {
		return null
	}
}

export async function getGalleryContent(locale: 'es' | 'en'): Promise<GalleryContent> {
	const [photoRows, comparisonRows] = await Promise.all([
		readCollection('detailing_gallery_photos', 'id,status,sort,slug,category,image,width,height,caption_es,caption_en,alt_es,alt_en', photoSchema),
		readCollection('detailing_gallery_comparisons', 'id,status,sort,slug,title_es,title_en,before_image,after_image,before_alt_es,before_alt_en,after_alt_es,after_alt_en', comparisonSchema),
	])
	if (!photoRows || !comparisonRows) return staticGallery(locale)

	const photos: GalleryDisplayPhoto[] = photoRows.map((photo) => ({
		id: photo.slug,
		src: assetUrl(fileId(photo.image)),
		width: photo.width || 1280,
		height: photo.height || 960,
		category: photo.category as GalleryCategory,
		caption: locale === 'en' ? photo.caption_en : photo.caption_es,
		alt: locale === 'en' ? photo.alt_en : photo.alt_es,
	}))
	const comparisons: GalleryComparison[] = comparisonRows.map((comparison) => ({
		id: comparison.slug,
		title: locale === 'en' ? comparison.title_en : comparison.title_es,
		before: {
			src: assetUrl(fileId(comparison.before_image)),
			alt: locale === 'en' ? comparison.before_alt_en : comparison.before_alt_es,
		},
		after: {
			src: assetUrl(fileId(comparison.after_image)),
			alt: locale === 'en' ? comparison.after_alt_en : comparison.after_alt_es,
		},
	}))
	return { photos, comparisons }
}

export async function isGalleryAssetReferenced(id: string) {
	const content = await getGalleryContent('es')
	return [...content.photos.map((photo) => photo.src), ...content.comparisons.flatMap(({ before, after }) => [before.src, after.src])]
		.includes(assetUrl(id))
}
