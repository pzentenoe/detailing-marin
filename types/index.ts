// ============================================================
// Types — Detailing Marin
// Single source of truth para entidades del dominio
// ============================================================

export interface PricingRow {
  label: string
  price: string
}

export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  icon: string
  features: string[]
  duration: string
  price?: string
  highlight?: boolean
  image?: string
  imageBefore?: string
  pricingTable?: PricingRow[]
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  zone: string
  hours?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
