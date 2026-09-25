export const ADMIN_SERVICE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export type AdminServiceStatus = (typeof ADMIN_SERVICE_STATUS)[keyof typeof ADMIN_SERVICE_STATUS]

export const ADMIN_ICON_NAMES = [
  'droplets', 'sparkles', 'zap', 'settings', 'leaf', 'map-pin', 'award', 'arrow-right', 'phone', 'mail',
  'clock', 'check-circle', 'chevron-down', 'menu', 'x', 'sun', 'moon', 'calendar', 'car', 'wrench',
  'message-circle', 'armchair',
] as const

export type AdminIconName = (typeof ADMIN_ICON_NAMES)[number]

export interface AdminServiceRecord {
  id: number
  status: AdminServiceStatus
  sort: number | null
  slug: string | null
  title_es: string | null
  title_en: string | null
  short_description_es: string | null
  short_description_en: string | null
  full_description_es: string | null
  full_description_en: string | null
  features_es: string | null
  features_en: string | null
  price_label_es: string | null
  price_label_en: string | null
  duration: string | null
  icon: string | null
  is_featured: boolean
  image: string | null
  image_before: string | null
}

export interface AdminServicePriceRecord {
  id: number
  vehicle_type_es: string
  vehicle_type_en: string
  price: string
  sort: number | null
}

export interface AdminServicePriceInput {
  id?: number
  vehicle_type_es: string
  vehicle_type_en: string
  price: string
  sort?: number | null
}

export interface AdminServiceFormValues {
  id?: number
  status: AdminServiceStatus
  sort: number
  slug: string
  title_es: string
  title_en: string
  short_description_es: string
  short_description_en: string
  full_description_es: string
  full_description_en: string
  features_es: string
  features_en: string
  price_label_es: string
  price_label_en: string
  duration: string
  icon: AdminIconName
  is_featured: boolean
  image: string
  image_before: string
  prices: AdminServicePriceInput[]
}
