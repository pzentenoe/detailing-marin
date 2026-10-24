import { AdminGalleryForm } from '@/components/admin/AdminGalleryForm'
import type { AdminGalleryPhoto } from '@/lib/gallery-types'

const initialValues: AdminGalleryPhoto = {
  id: null,
  status: 'draft',
  sort: 100,
  slug: '',
  category: 'exterior',
  image: '',
  width: 1280,
  height: 960,
  caption_es: '',
  caption_en: '',
  alt_es: '',
  alt_en: '',
}

export default function NewGalleryPhotoPage() {
  return <AdminGalleryForm initialValues={initialValues} kind="photo" />
}
