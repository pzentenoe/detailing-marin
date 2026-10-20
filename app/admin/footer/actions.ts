'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin-auth'
import { footerContentSchema } from '@/lib/footer-content'
import { getAdminFooter, updateAdminFooter } from '@/lib/directus-admin'

export interface FooterActionState {
  error?: string
  success?: boolean
}

export async function saveAdminFooter(_state: FooterActionState, formData: FormData): Promise<FooterActionState> {
  if (!await getAdminSession()) redirect('/admin')

  let submitted: unknown
  try {
    submitted = JSON.parse(String(formData.get('content') ?? ''))
  } catch {
    return { error: 'No se pudo leer el contenido del formulario. Conserva los cambios e inténtalo de nuevo.' }
  }

  const parsed = footerContentSchema.safeParse(submitted)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return { error: `Revisa «${issue.path.join('.') || 'contenido'}»: ${issue.message}` }
  }

  try {
    const item = await getAdminFooter()
    if (!item) return { error: 'Falta el elemento inicial de detailing_footer. Configúralo en Directus antes de guardar.' }
    const response = await updateAdminFooter(item.id, parsed.data)
    if (!response.ok) throw new Error(`Directus update failed (${response.status})`)
  } catch (error) {
    if (error instanceof Error && error.message === 'FOOTER_COLLECTION_MISSING') {
      return { error: 'Falta la colección detailing_footer en Directus. Configúrala antes de guardar.' }
    }
    return { error: 'No fue posible guardar el pie de página. Revisa los permisos y la conexión a Directus e inténtalo de nuevo.' }
  }

  updateTag('directus-footer')
  return { success: true }
}
