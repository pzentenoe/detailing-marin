import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { AdminServiceForm } from '@/components/admin/AdminServiceForm'
import { getAdminSession } from '@/lib/admin-auth'
import { getAdminService, listAdminServicePrices } from '@/lib/directus-admin'
import { ADMIN_ICON_NAMES, type AdminIconName, type AdminServiceFormValues } from '@/types/admin'

type PageProps = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Editar servicio | Administración' }

export default async function EditAdminServicePage({ params }: PageProps) {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  const { id: rawId } = await params
  const id = Number(rawId)
  if (!Number.isSafeInteger(id) || id < 1) notFound()

  const [service, prices] = await Promise.all([getAdminService(id), listAdminServicePrices(id)])
  if (!service) notFound()

  const icon = ADMIN_ICON_NAMES.includes(service.icon as AdminIconName)
    ? service.icon as AdminIconName
    : 'car'
  const initialValues: AdminServiceFormValues = {
    id: service.id,
    status: service.status,
    sort: service.sort ?? service.id,
    slug: service.slug ?? '',
    title_es: service.title_es ?? '',
    title_en: service.title_en ?? '',
    short_description_es: service.short_description_es ?? '',
    short_description_en: service.short_description_en ?? '',
    full_description_es: service.full_description_es ?? '',
    full_description_en: service.full_description_en ?? '',
    features_es: service.features_es ?? '',
    features_en: service.features_en ?? '',
    price_label_es: service.price_label_es ?? '',
    price_label_en: service.price_label_en ?? '',
    duration: service.duration ?? '',
    icon,
    is_featured: service.is_featured,
    image: service.image ?? '',
    image_before: service.image_before ?? '',
    prices,
  }

  return <AdminServiceForm initialValues={initialValues} />
}
