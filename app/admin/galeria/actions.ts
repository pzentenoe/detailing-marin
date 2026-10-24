'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getAdminGalleryComparison, getAdminGalleryPhoto, galleryFilesAreManaged, gallerySlugExists, saveGalleryRecord } from '@/lib/gallery-admin'
import { getAdminSession } from '@/lib/admin-auth'
import type { GalleryFormState } from '@/lib/gallery-types'

const commonSchema = z.object({
  id: z.union([z.literal(''), z.string().regex(/^\d+$/)]),
  status: z.enum(['draft', 'published', 'archived']),
  sort: z.coerce.number().int().min(0).max(100000),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
})

const photoSchema = commonSchema.extend({
  kind: z.literal('photo'),
  category: z.enum(['exterior', 'interiores', 'focos', 'maquinaria']),
  image: z.string().uuid(),
  width: z.coerce.number().int().min(1).max(20000),
  height: z.coerce.number().int().min(1).max(20000),
  caption_es: z.string().trim().min(1).max(240),
  caption_en: z.string().trim().min(1).max(240),
  alt_es: z.string().trim().min(1).max(240),
  alt_en: z.string().trim().min(1).max(240),
})

const comparisonSchema = commonSchema.extend({
  kind: z.literal('comparison'),
  title_es: z.string().trim().min(1).max(120),
  title_en: z.string().trim().min(1).max(120),
  before_image: z.string().uuid(),
  after_image: z.string().uuid(),
  before_alt_es: z.string().trim().min(1).max(240),
  before_alt_en: z.string().trim().min(1).max(240),
  after_alt_es: z.string().trim().min(1).max(240),
  after_alt_en: z.string().trim().min(1).max(240),
})

function positiveId(value: string) {
  if (!value) return null
  const id = Number(value)
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

export async function saveGalleryEntry(_state: GalleryFormState, formData: FormData): Promise<GalleryFormState> {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  const kind = formData.get('kind')
  const parsed = (kind === 'photo' ? photoSchema : comparisonSchema).safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: 'Revisa los campos obligatorios y completa ambos idiomas.' }
  }

  const data = parsed.data
  const id = positiveId(data.id)
  if (data.id && !id) return { error: 'El elemento ya no es válido. Actualiza la página e inténtalo de nuevo.' }

  try {
    if (id) {
      const existing = data.kind === 'photo'
        ? await getAdminGalleryPhoto(id)
        : await getAdminGalleryComparison(id)
      if (!existing) return { error: 'El elemento ya no existe. Actualiza la lista.' }
    }
    if (await gallerySlugExists(data.kind, data.slug, id ?? undefined)) {
      return { error: 'Ya existe un elemento con ese identificador. Elige otro.' }
    }

    const fileIds = data.kind === 'photo' ? [data.image] : [data.before_image, data.after_image]
    if (!await galleryFilesAreManaged(fileIds)) {
      return { error: 'Una de las imágenes no pertenece a la carpeta de medios del sitio. Vuelve a subirla.' }
    }

    const record = Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'kind' && key !== 'id'))
    const savedId = await saveGalleryRecord(data.kind, id, record)
    updateTag('directus-gallery')
    return { success: true, id: savedId }
  } catch {
    return { error: 'No fue posible guardar el elemento. Revisa la conexión y los permisos de Directus.' }
  }
}

export async function archiveGalleryEntry(formData: FormData) {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  const kind = formData.get('kind')
  const id = Number(formData.get('id'))
  if ((kind !== 'photo' && kind !== 'comparison') || !Number.isSafeInteger(id) || id < 1) {
    redirect('/admin/galeria')
  }

  try {
    const existing = kind === 'photo'
      ? await getAdminGalleryPhoto(id)
      : await getAdminGalleryComparison(id)
    if (existing) {
      await saveGalleryRecord(kind, id, { status: 'archived' })
      updateTag('directus-gallery')
    }
  } catch {
    redirect('/admin/galeria?error=archive')
  }
  redirect('/admin/galeria?archived=1')
}
