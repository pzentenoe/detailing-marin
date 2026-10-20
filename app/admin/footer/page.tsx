import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdminFooterEditor } from '@/components/admin/AdminFooterEditor'
import { getAdminSession } from '@/lib/admin-auth'
import { getAdminFooter } from '@/lib/directus-admin'

export const metadata: Metadata = { title: 'Pie de página | Administración' }

export default async function AdminFooterPage() {
  if (!await getAdminSession()) redirect('/admin')

  let footer
  try {
    footer = await getAdminFooter()
  } catch (error) {
    const isMissingCollection = error instanceof Error && error.message === 'FOOTER_COLLECTION_MISSING'
    return <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-3xl font-semibold text-on-surface">Editar pie de página</h1>
      <p className="mt-5 rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">
        {isMissingCollection ? 'Falta la colección detailing_footer en Directus.' : 'No fue posible cargar el pie de página. Revisa la conexión y los permisos de lectura de Directus e inténtalo de nuevo.'}
      </p>
      <p className="mt-3 text-sm text-on-surface-variant">{isMissingCollection ? 'Crea la colección con los campos indicados en el plan de implementación y asigna permisos de lectura y actualización.' : 'La página no usa datos de respaldo para evitar sobrescribir contenido con un valor predeterminado.'}</p>
    </main>
  }

  if (!footer) return <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
    <h1 className="font-display text-3xl font-semibold text-on-surface">Editar pie de página</h1>
    <p className="mt-5 rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">No existe el elemento inicial de detailing_footer. Crea y carga el único elemento de configuración en Directus para habilitar la edición.</p>
  </main>

  return <AdminFooterEditor initialContent={footer.content} />
}
