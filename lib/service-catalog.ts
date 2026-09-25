import 'server-only'

import { getTranslations } from 'next-intl/server'
import type { Service } from '@/types'
import { servicesConfig } from '@/lib/services'
import { localizeVehicleType } from '@/lib/vehicle-types'

const SERVICE_FIELDS = [
  'id', 'slug', 'title_es', 'title_en', 'short_description_es', 'short_description_en',
  'full_description_es', 'full_description_en', 'features_es', 'features_en',
  'price_label_es', 'price_label_en', 'duration', 'icon', 'is_featured', 'image', 'image_before',
].join(',')

interface DirectusService {
  id: string | number
  slug: string
  title_es: string
  title_en: string
  short_description_es: string
  short_description_en: string
  full_description_es: string
  full_description_en: string
  features_es: string | null
  features_en: string | null
  price_label_es: string | null
  price_label_en: string | null
  duration: string
  icon: string
  is_featured: boolean
  image: string | { id: string } | null
  image_before: string | { id: string } | null
}

interface DirectusPrice {
  service: string | number | { id: string | number }
  vehicle_type: string | null
  vehicle_type_es: string | null
  vehicle_type_en: string | null
  price: string
}

interface DirectusResponse<T> {
  data: T[]
}

function features(text: string | null): string[] {
  return text?.split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean) ?? []
}

function localizePriceLabel(label: string | undefined, locale: 'es' | 'en') {
  if (locale !== 'en' || !label?.startsWith('Desde ')) return label
  return `From ${label.slice('Desde '.length).replace(/ el par$/, ' per pair')}`
}

function assetUrl(value: DirectusService['image']): string | undefined {
  const id = typeof value === 'string' ? value : value?.id
  return id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
    ? `/api/directus-assets/${id}`
    : undefined
}

async function getLocalServices(locale: 'es' | 'en'): Promise<Service[]> {
  const t = await getTranslations({ locale, namespace: 'services' })
  return servicesConfig.map((service) => ({
    id: service.id,
    slug: service.slug,
    title: t(`${service.slug}.title`),
    shortDescription: t(`${service.slug}.shortDescription`),
    fullDescription: t(`${service.slug}.fullDescription`),
    features: t.raw(`${service.slug}.features`) as string[],
    icon: service.icon,
    duration: service.duration,
    price: localizePriceLabel(service.price, locale),
    highlight: 'highlight' in service && service.highlight === true,
    image: 'image' in service ? service.image : undefined,
    imageBefore: 'imageBefore' in service ? service.imageBefore : undefined,
    pricingTable: 'pricingTable' in service
      ? service.pricingTable?.map(({ label, price }) => ({ label: localizeVehicleType(label, locale), price }))
      : undefined,
  }))
}

export async function getServices(locale: 'es' | 'en'): Promise<Service[]> {
  const baseUrl = process.env.DIRECTUS_URL?.replace(/\/+$/, '')
  const token = process.env.DIRECTUS_TOKEN
  if (!baseUrl || !token) return getLocalServices(locale)

  try {
    const headers = { Authorization: `Bearer ${token}` }
    const servicesUrl = new URL('/items/detailing_services', baseUrl)
    servicesUrl.search = new URLSearchParams({
      'filter[status][_eq]': 'published',
      sort: 'sort',
      fields: SERVICE_FIELDS,
    }).toString()
    const pricesUrl = new URL('/items/detailing_service_prices', baseUrl)
    pricesUrl.search = new URLSearchParams({
      sort: 'sort',
      fields: 'service,vehicle_type,vehicle_type_es,vehicle_type_en,price',
    }).toString()

    const options = { headers, next: { revalidate: 60, tags: ['directus-services'] } }
    const [servicesResponse, pricesResponse] = await Promise.all([
      fetch(servicesUrl, options),
      fetch(pricesUrl, options),
    ])
    if (!servicesResponse.ok || !pricesResponse.ok) return getLocalServices(locale)

    const [servicePayload, pricePayload] = await Promise.all([
      servicesResponse.json() as Promise<DirectusResponse<DirectusService>>,
      pricesResponse.json() as Promise<DirectusResponse<DirectusPrice>>,
    ])
    if (!Array.isArray(servicePayload.data) || !Array.isArray(pricePayload.data)) {
      return getLocalServices(locale)
    }

    const priceRows = new Map<string, DirectusPrice[]>()
    for (const price of pricePayload.data) {
      const relatedId = typeof price.service === 'object' ? price.service?.id : price.service
      if (relatedId === undefined || relatedId === null) continue
      const serviceId = String(relatedId)
      priceRows.set(serviceId, [...(priceRows.get(serviceId) ?? []), price])
    }

    return servicePayload.data.map((service) => ({
      id: String(service.id),
      slug: service.slug,
      title: locale === 'en' ? service.title_en : service.title_es,
      shortDescription: locale === 'en' ? service.short_description_en : service.short_description_es,
      fullDescription: locale === 'en' ? service.full_description_en : service.full_description_es,
      features: features(locale === 'en' ? service.features_en : service.features_es),
      icon: service.icon,
      duration: service.duration,
      price: locale === 'en' ? service.price_label_en ?? undefined : service.price_label_es ?? undefined,
      highlight: service.is_featured,
      image: assetUrl(service.image),
      imageBefore: assetUrl(service.image_before),
      pricingTable: priceRows.get(String(service.id))?.map((row) => ({
        label: locale === 'en'
          ? row.vehicle_type_en || localizeVehicleType(row.vehicle_type, 'en')
          : row.vehicle_type_es || localizeVehicleType(row.vehicle_type, 'es'),
        price: row.price,
      })),
    }))
  } catch {
    return getLocalServices(locale)
  }
}
