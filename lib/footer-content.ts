import { z } from 'zod'
import type { Locale } from '@/i18n/routing'

export const FOOTER_NAV_TARGETS = {
  HOME: 'home',
  SERVICES: 'services',
  COVERAGE: 'coverage',
  CONTACT: 'contact',
} as const

export const FOOTER_SOCIAL_PLATFORMS = {
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  LINK: 'link',
} as const

const nonEmptyText = z.string().trim().min(1).max(500)
const httpUrl = z.string().trim().url().refine((value) => /^https?:\/\//i.test(value), 'Usa una URL HTTP o HTTPS.')

const navigationLinkSchema = z.object({
  target: z.enum(FOOTER_NAV_TARGETS),
  label_es: nonEmptyText,
  label_en: nonEmptyText,
})

const socialLinkSchema = z.object({
  platform: z.enum(FOOTER_SOCIAL_PLATFORMS),
  label_es: nonEmptyText,
  label_en: nonEmptyText,
  url: httpUrl,
})

export const footerContentSchema = z.object({
    brand_name: z.string().trim().min(1).max(255),
  eco_stat: nonEmptyText,
  phone_display: nonEmptyText,
  phone_href: z.string().trim().regex(/^\+[\d\s().-]{8,24}$/),
  email: z.string().trim().email(),
  tagline_es: nonEmptyText,
  tagline_en: nonEmptyText,
  eco_label_es: nonEmptyText,
  eco_label_en: nonEmptyText,
  navigation_title_es: nonEmptyText,
  navigation_title_en: nonEmptyText,
  contact_title_es: nonEmptyText,
  contact_title_en: nonEmptyText,
  zone_es: nonEmptyText,
  zone_en: nonEmptyText,
  hours_es: nonEmptyText,
  hours_en: nonEmptyText,
  social_title_es: nonEmptyText,
  social_title_en: nonEmptyText,
  privacy_label_es: nonEmptyText,
  privacy_label_en: nonEmptyText,
  terms_label_es: nonEmptyText,
  terms_label_en: nonEmptyText,
  copyright_es: nonEmptyText,
  copyright_en: nonEmptyText,
  navigation_links: z.array(navigationLinkSchema).max(20),
  social_links: z.array(socialLinkSchema).max(20),
})

export type FooterContent = z.infer<typeof footerContentSchema>

export interface FooterViewContent {
  brandName: string
  tagline: string
  ecoStat: string
  ecoLabel: string
  navigationTitle: string
  contactTitle: string
  phoneDisplay: string
  phoneHref: string
  email: string
  zone: string
  hours: string
  socialTitle: string
  copyright: string
  privacyLabel: string
  termsLabel: string
  navigationLinks: { target: (typeof FOOTER_NAV_TARGETS)[keyof typeof FOOTER_NAV_TARGETS]; label: string }[]
  socialLinks: { platform: (typeof FOOTER_SOCIAL_PLATFORMS)[keyof typeof FOOTER_SOCIAL_PLATFORMS]; label: string; url: string }[]
}

export const fallbackFooterContent: FooterContent = {
  brand_name: 'Detailing Marin',
  eco_stat: '90%',
  phone_display: '+56 9 5445 1422',
  phone_href: '+56 9 5445 1422',
  email: 'marin.mac.lean@gmail.com',
  tagline_es: 'Servicio de detallado automotriz premium a domicilio. Cuidamos tu vehículo y el planeta.',
  tagline_en: 'Premium mobile automotive detailing. We care for your vehicle and the planet.',
  eco_label_es: 'Ahorro de agua',
  eco_label_en: 'Water savings',
  navigation_title_es: 'Explora',
  navigation_title_en: 'Explore',
  contact_title_es: 'Contacto',
  contact_title_en: 'Contact',
  zone_es: 'Santiago y Región Metropolitana',
  zone_en: 'Santiago, Metropolitan Region',
  hours_es: 'Lunes a Sábado, 9:00 – 19:00',
  hours_en: 'Monday to Saturday, 9:00 – 19:00',
  social_title_es: 'Síguenos',
  social_title_en: 'Follow us',
  privacy_label_es: 'Privacidad',
  privacy_label_en: 'Privacy',
  terms_label_es: 'Términos',
  terms_label_en: 'Terms',
  copyright_es: 'Detailing Marin. Eco-Luxe Automotive Care.',
  copyright_en: 'Detailing Marin. Eco-Luxe Automotive Care.',
  navigation_links: [
    { target: 'home', label_es: 'Inicio', label_en: 'Home' },
    { target: 'services', label_es: 'Servicios', label_en: 'Services' },
    { target: 'coverage', label_es: 'Cobertura', label_en: 'Coverage' },
    { target: 'contact', label_es: 'Contacto', label_en: 'Contact' },
  ],
  social_links: [
    { platform: 'instagram', label_es: 'Instagram', label_en: 'Instagram', url: 'https://www.instagram.com/detailing_marin' },
    { platform: 'facebook', label_es: 'Facebook', label_en: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61586193856361' },
  ],
}

export function projectFooterContent(content: FooterContent, locale: Locale): FooterViewContent {
  const suffix = locale === 'es' ? 'es' : 'en'
  return {
    brandName: content.brand_name,
    tagline: content[`tagline_${suffix}`],
    ecoStat: content.eco_stat,
    ecoLabel: content[`eco_label_${suffix}`],
    navigationTitle: content[`navigation_title_${suffix}`],
    contactTitle: content[`contact_title_${suffix}`],
    phoneDisplay: content.phone_display,
    phoneHref: content.phone_href,
    email: content.email,
    zone: content[`zone_${suffix}`],
    hours: content[`hours_${suffix}`],
    socialTitle: content[`social_title_${suffix}`],
    copyright: content[`copyright_${suffix}`],
    privacyLabel: content[`privacy_label_${suffix}`],
    termsLabel: content[`terms_label_${suffix}`],
    navigationLinks: content.navigation_links.map(({ target, label_es, label_en }) => ({ target, label: locale === 'es' ? label_es : label_en })),
    socialLinks: content.social_links.map(({ platform, label_es, label_en, url }) => ({ platform, label: locale === 'es' ? label_es : label_en, url })),
  }
}
