import { notFound } from 'next/navigation'
import { AdminGalleryForm } from '@/components/admin/AdminGalleryForm'
import { getAdminGalleryComparison } from '@/lib/gallery-admin'
import type { AdminGalleryComparison } from '@/lib/gallery-types'

export default async function EditGalleryComparisonPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id)
  if (!Number.isSafeInteger(id) || id < 1) notFound()
  let comparison: AdminGalleryComparison
  try {
    comparison = await getAdminGalleryComparison(id)
  } catch {
    notFound()
  }
  if (!comparison) notFound()
  return <AdminGalleryForm initialValues={comparison} kind="comparison" />
}
