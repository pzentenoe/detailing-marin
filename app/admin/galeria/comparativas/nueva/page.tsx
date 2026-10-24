import { AdminGalleryForm } from '@/components/admin/AdminGalleryForm'
import type { AdminGalleryComparison } from '@/lib/gallery-types'

const initialValues: AdminGalleryComparison = {
  id: null,
  status: 'draft',
  sort: 100,
  slug: '',
  title_es: '',
  title_en: '',
  before_image: '',
  after_image: '',
  before_alt_es: '',
  before_alt_en: '',
  after_alt_es: '',
  after_alt_en: '',
}

export default function NewGalleryComparisonPage() {
  return <AdminGalleryForm initialValues={initialValues} kind="comparison" />
}
