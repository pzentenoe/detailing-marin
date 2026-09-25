'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getAdminSession } from '@/lib/admin-auth'
import {
  getAdminService,
  isFileInAdminMediaFolder,
  listAdminServicePrices,
  writeDirectus,
} from '@/lib/directus-admin'
import { ADMIN_ICON_NAMES, ADMIN_SERVICE_STATUS, type AdminServicePriceInput } from '@/types/admin'

export interface ServiceFormState {
  error?: string
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const serviceSchema = z.object({
  status: z.enum(ADMIN_SERVICE_STATUS),
  sort: z.coerce.number().int().min(0),
  slug: z.string().trim().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title_es: z.string().trim().min(1).max(160),
  title_en: z.string().trim().min(1).max(160),
  short_description_es: z.string().max(600),
  short_description_en: z.string().max(600),
  full_description_es: z.string().max(8000),
  full_description_en: z.string().max(8000),
  features_es: z.string().max(6000),
  features_en: z.string().max(6000),
  price_label_es: z.string().max(120),
  price_label_en: z.string().max(120),
  duration: z.string().trim().min(1).max(100),
  icon: z.enum(ADMIN_ICON_NAMES),
  image: z.string().regex(UUID).or(z.literal('')),
  image_before: z.string().regex(UUID).or(z.literal('')),
  is_featured: z.boolean(),
  prices: z.array(z.object({
    id: z.number().int().positive().optional(),
    vehicle_type_es: z.string().trim().min(1).max(80),
    vehicle_type_en: z.string().trim().min(1).max(80),
    price: z.string().trim().min(1).max(40),
  })).max(50),
}).superRefine((value, context) => {
  const esTypes = value.prices.map((price) => price.vehicle_type_es.toLocaleLowerCase())
  const enTypes = value.prices.map((price) => price.vehicle_type_en.toLocaleLowerCase())
  if (new Set(esTypes).size !== esTypes.length || new Set(enTypes).size !== enTypes.length) {
    context.addIssue({ code: 'custom', path: ['prices'], message: 'Cada tipo de vehículo debe ser único en ambos idiomas.' })
  }
})

function readForm(formData: FormData) {
  let prices: unknown
  try {
    prices = JSON.parse(String(formData.get('prices') ?? '[]'))
  } catch {
    return { id: null, success: false as const }
  }

  const rawId = String(formData.get('id') ?? '').trim()
  const id = rawId ? Number(rawId) : null
  if (id !== null && (!Number.isSafeInteger(id) || id < 1)) return { id, success: false as const }

  const result = serviceSchema.safeParse({
    status: formData.get('status'),
    sort: formData.get('sort') || '0',
    slug: formData.get('slug'),
    title_es: formData.get('title_es'),
    title_en: formData.get('title_en'),
    short_description_es: formData.get('short_description_es') ?? '',
    short_description_en: formData.get('short_description_en') ?? '',
    full_description_es: formData.get('full_description_es') ?? '',
    full_description_en: formData.get('full_description_en') ?? '',
    features_es: formData.get('features_es') ?? '',
    features_en: formData.get('features_en') ?? '',
    price_label_es: formData.get('price_label_es') ?? '',
    price_label_en: formData.get('price_label_en') ?? '',
    duration: formData.get('duration'),
    icon: formData.get('icon'),
    image: formData.get('image') ?? '',
    image_before: formData.get('image_before') ?? '',
    is_featured: formData.get('is_featured') === 'true',
    prices,
  })

  return { id, success: result.success, data: result.success ? result.data : null }
}

async function canUseImage(imageId: string, existingIds: string[]) {
  return existingIds.includes(imageId) || isFileInAdminMediaFolder(imageId)
}

async function syncPrices(serviceId: number, prices: AdminServicePriceInput[]) {
  const existing = await listAdminServicePrices(serviceId)
  const existingById = new Map(existing.map((price) => [price.id, price]))
  for (const price of prices) {
    if (price.id && !existingById.has(price.id)) {
      throw new Error('Price row does not belong to this service')
    }
  }

  const retained = new Set<number>()
  for (const [index, price] of prices.entries()) {
    const data = {
      vehicle_type: price.vehicle_type_es,
      vehicle_type_es: price.vehicle_type_es,
      vehicle_type_en: price.vehicle_type_en,
      price: price.price,
      sort: index + 1,
    }
    const response = price.id
      ? await writeDirectus(`/items/detailing_service_prices/${price.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      : await writeDirectus('/items/detailing_service_prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service: serviceId }),
      })

    if (!response.ok) throw new Error(`Directus price write failed (${response.status})`)
    if (price.id) retained.add(price.id)
  }

  for (const price of existing) {
    if (retained.has(price.id)) continue
    const response = await writeDirectus(`/items/detailing_service_prices/${price.id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(`Directus price delete failed (${response.status})`)
  }
}

export async function saveAdminService(_state: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  const input = readForm(formData)
  if (!input.success || !input.data) {
    return { error: 'Revisa los campos e inténtalo de nuevo. El slug debe usar letras minúsculas y guiones.' }
  }

  let savedId: number
  try {
    const existing = input.id ? await getAdminService(input.id) : null
    if (input.id && !existing) return { error: 'El servicio ya no existe. Actualiza la lista.' }

    const existingImages = [existing?.image, existing?.image_before].filter((id): id is string => Boolean(id))
    for (const imageId of [input.data.image, input.data.image_before]) {
      if (imageId && !await canUseImage(imageId, existingImages)) {
        return { error: 'Una de las imágenes no pertenece a este sitio. Vuelve a subirla.' }
      }
    }

    const serviceData = {
      status: input.data.status,
      sort: input.data.sort,
      slug: input.data.slug,
      title_es: input.data.title_es,
      title_en: input.data.title_en,
      short_description_es: input.data.short_description_es,
      short_description_en: input.data.short_description_en,
      full_description_es: input.data.full_description_es,
      full_description_en: input.data.full_description_en,
      features_es: input.data.features_es,
      features_en: input.data.features_en,
      price_label_es: input.data.price_label_es,
      price_label_en: input.data.price_label_en,
      duration: input.data.duration,
      icon: input.data.icon,
      is_featured: input.data.is_featured,
      image: input.data.image || null,
      image_before: input.data.image_before || null,
    }

    const response = input.id
      ? await writeDirectus(`/items/detailing_services/${input.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      })
      : await writeDirectus('/items/detailing_services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      })

    if (!response.ok) throw new Error(`Directus service write failed (${response.status})`)
    const payload = await response.json() as { data?: { id: number } }
    savedId = Number(payload.data?.id ?? input.id)
    if (!Number.isSafeInteger(savedId) || savedId < 1) throw new Error('Directus returned an invalid service id')

    await syncPrices(savedId, input.data.prices)
  } catch {
    return { error: 'No fue posible guardar el servicio. Revisa la conexión a Directus e inténtalo de nuevo.' }
  }

  updateTag('directus-services')
  redirect(`/admin/servicios/${savedId}`)
}

export async function deleteAdminService(formData: FormData) {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  const id = Number(formData.get('id'))
  if (!Number.isSafeInteger(id) || id < 1) redirect('/admin/servicios')

  const service = await getAdminService(id)
  if (!service) redirect('/admin/servicios')

  const prices = await listAdminServicePrices(id)
  for (const price of prices) {
    const response = await writeDirectus(`/items/detailing_service_prices/${price.id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(`Directus price delete failed (${response.status})`)
  }

  const response = await writeDirectus(`/items/detailing_services/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error(`Directus service delete failed (${response.status})`)

  updateTag('directus-services')
  redirect('/admin/servicios')
}
