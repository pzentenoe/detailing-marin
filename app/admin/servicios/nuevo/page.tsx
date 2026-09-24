import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdminServiceForm } from '@/components/admin/AdminServiceForm'
import { getAdminSession } from '@/lib/admin-auth'
import { listAdminServices } from '@/lib/directus-admin'
import { ADMIN_SERVICE_STATUS, type AdminServiceFormValues } from '@/types/admin'

export const metadata: Metadata = { title: 'Nuevo servicio | Administración' }

export default async function NewAdminServicePage() {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  const services = await listAdminServices()
  const nextSort = services.reduce((max, service) => Math.max(max, service.sort ?? service.id), 0) + 1
  const initialValues: AdminServiceFormValues = {
    status: ADMIN_SERVICE_STATUS.DRAFT,
    sort: nextSort,
    slug: '',
    title_es: '',
    title_en: '',
    short_description_es: '',
    short_description_en: '',
    full_description_es: '',
    full_description_en: '',
    features_es: '',
    features_en: '',
    price_label_es: '',
    price_label_en: '',
    duration: '',
    icon: 'car',
    is_featured: false,
    image: '',
    image_before: '',
    prices: [],
  }

  return <AdminServiceForm initialValues={initialValues} />
}
