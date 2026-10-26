import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdminHomepageEditor } from '@/components/admin/AdminHomepageEditor'
import { getAdminSession } from '@/lib/admin-auth'
import { getAdminHomepage } from '@/lib/directus-admin'
import { getDefaultHomepageContent, isHomepageContent } from '@/lib/homepage-content'
import { homepageMediaFromContent } from '@/lib/homepage-media'

export const metadata: Metadata = { title: 'Inicio | Administración' }

function localizedContent(value: Record<string, unknown> | null | undefined, locale: 'es' | 'en') {
  if (!value) return getDefaultHomepageContent(locale)
  const content = Object.fromEntries(Object.entries(value).filter(([key]) => key !== '_media'))
  return isHomepageContent(content, locale) ? content : getDefaultHomepageContent(locale)
}

export default async function AdminHomepagePage() {
  if (!await getAdminSession()) redirect('/admin')

  let homepage
  try {
    homepage = await getAdminHomepage()
  } catch {
    return <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-3xl font-semibold text-on-surface">Editar Inicio</h1>
      <p className="mt-5 rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">No fue posible leer detailing_homepage en Directus. Verifica la colección y los permisos de lectura.</p>
      <p className="mt-3 text-sm text-on-surface-variant">La página pública conserva el contenido local hasta que Directus esté configurado correctamente.</p>
    </main>
  }

  const initialContent = {
    es: localizedContent(homepage?.content_es, 'es'),
    en: localizedContent(homepage?.content_en, 'en'),
  }
  return <AdminHomepageEditor initialContent={initialContent} initialMedia={homepageMediaFromContent(homepage?.content_es)} />
}
