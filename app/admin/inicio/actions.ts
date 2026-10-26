'use server'

import { updateTag } from 'next/cache'
import { getAdminSession } from '@/lib/admin-auth'
import { createAdminHomepage, getAdminHomepage, isFileInAdminMediaFolder, updateAdminHomepage } from '@/lib/directus-admin'
import { isHomepageContent } from '@/lib/homepage-content'
import { HOMEPAGE_MEDIA_KEY, homepageMediaFromContent, homepageMediaIds, isHomepageMedia } from '@/lib/homepage-media'

export type HomepageActionState = { success?: boolean; error?: string }

export async function saveAdminHomepage(_state: HomepageActionState, formData: FormData): Promise<HomepageActionState> {
  if (!await getAdminSession()) return { error: 'Tu sesión expiró. Inicia sesión e inténtalo de nuevo.' }
  let contentEs: unknown
  let contentEn: unknown
  let media: unknown
  try {
    contentEs = JSON.parse(String(formData.get('content_es') ?? ''))
    contentEn = JSON.parse(String(formData.get('content_en') ?? ''))
    media = JSON.parse(String(formData.get('media') ?? ''))
  } catch {
    return { error: 'El contenido de Inicio no tiene un formato válido.' }
  }
  if (!isHomepageContent(contentEs, 'es') || !isHomepageContent(contentEn, 'en')) {
    return { error: 'El contenido no coincide con la estructura de las secciones de Inicio.' }
  }
  if (!isHomepageMedia(media)) return { error: 'Las imágenes seleccionadas no tienen un formato válido.' }

  let existing
  try {
    existing = await getAdminHomepage()
  } catch {
    return { error: 'No se pudo leer Inicio. Revisa la colección detailing_homepage y los permisos de Directus.' }
  }

  try {
    const existingIds = new Set(homepageMediaIds(homepageMediaFromContent(existing?.content_es)))
    const newIds = [...new Set(homepageMediaIds(media))].filter((id) => !existingIds.has(id))
    const filesAreManaged = await Promise.all(newIds.map(isFileInAdminMediaFolder))
    if (filesAreManaged.some((managed) => !managed)) {
      return { error: 'Una o más imágenes no pertenecen a la carpeta multimedia del sitio. Vuelve a seleccionarlas.' }
    }
  } catch {
    return { error: 'No fue posible validar las imágenes en Directus. Revisa los permisos de archivos.' }
  }

  try {
    const content = {
      content_es: { ...contentEs, [HOMEPAGE_MEDIA_KEY]: media },
      content_en: contentEn,
    }
    const response = existing
      ? await updateAdminHomepage(existing.id, content)
      : await createAdminHomepage(content)
    if (!response.ok) throw new Error(`Directus update failed (${response.status})`)
  } catch {
    return { error: 'No se pudo guardar Inicio. Revisa la colección detailing_homepage y los permisos de Directus.' }
  }
  updateTag('directus-homepage')
  return { success: true }
}
