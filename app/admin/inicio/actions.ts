'use server'

import { updateTag } from 'next/cache'
import { getAdminSession } from '@/lib/admin-auth'
import { createAdminHomepage, getAdminHomepage, updateAdminHomepage } from '@/lib/directus-admin'
import { isHomepageContent } from '@/lib/homepage-content'

export type HomepageActionState = { success?: boolean; error?: string }

export async function saveAdminHomepage(_state: HomepageActionState, formData: FormData): Promise<HomepageActionState> {
  if (!await getAdminSession()) return { error: 'Tu sesión expiró. Inicia sesión e inténtalo de nuevo.' }
  let contentEs: unknown
  let contentEn: unknown
  try {
    contentEs = JSON.parse(String(formData.get('content_es') ?? ''))
    contentEn = JSON.parse(String(formData.get('content_en') ?? ''))
  } catch {
    return { error: 'El contenido debe ser JSON válido en ambos idiomas.' }
  }
  if (!isHomepageContent(contentEs, 'es') || !isHomepageContent(contentEn, 'en')) {
    return { error: 'El contenido no coincide con la estructura de las secciones de Inicio.' }
  }

  try {
    const existing = await getAdminHomepage()
    const content = { content_es: contentEs, content_en: contentEn }
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
