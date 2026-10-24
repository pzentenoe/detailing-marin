import { notFound } from 'next/navigation'
import { AdminGalleryForm } from '@/components/admin/AdminGalleryForm'
import { getAdminGalleryPhoto } from '@/lib/gallery-admin'
import type { AdminGalleryPhoto } from '@/lib/gallery-types'

export default async function EditGalleryPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  if (!Number.isSafeInteger(id) || id < 1) notFound()
  let photo: AdminGalleryPhoto
  try {
    photo = await getAdminGalleryPhoto(id)
  } catch {
    notFound()
  }
  if (!photo) notFound()
  return <AdminGalleryForm initialValues={photo} kind="photo" />
}
