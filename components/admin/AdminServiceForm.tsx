'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ImagePlus, Plus, Trash2 } from 'lucide-react'
import { deleteAdminService, saveAdminService, type ServiceFormState } from '@/app/admin/servicios/actions'
import { Icon } from '@/components/ui/Icon'
import { ADMIN_ICON_NAMES, ADMIN_SERVICE_STATUS, type AdminServiceFormValues } from '@/types/admin'

interface AdminServiceFormProps {
  initialValues: AdminServiceFormValues
}

interface ImagePreview {
  image: string | null
  image_before: string | null
}

const initialState: ServiceFormState = {}

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 3,
}: {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  multiline?: boolean
  rows?: number
}) {
  const className = 'w-full rounded-xl border border-outline-variant/70 bg-surface px-3.5 py-3 text-sm text-on-surface outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20'

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea className={className} id={id} name={name} onChange={(event) => onChange(event.target.value)} required={required} rows={rows} value={value} />
      ) : (
        <input className={className} id={id} name={name} onChange={(event) => onChange(event.target.value)} required={required} value={value} />
      )}
    </div>
  )
}

function ImageUploadField({
  label,
  preview,
  uploading,
  onUpload,
  onRemove,
}: {
  label: string
  preview: string | null
  uploading: boolean
  onUpload: (file: File | null) => void
  onRemove: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">{label}</h3>
        {preview && (
          <button className="text-xs font-medium text-error hover:underline" onClick={onRemove} type="button">
            Quitar imagen
          </button>
        )}
      </div>
      {preview ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface-container-low">
          <Image alt={`Vista previa: ${label}`} className="object-cover" fill sizes="(max-width: 768px) 100vw, 40vw" src={preview} unoptimized />
        </div>
      ) : (
        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant bg-surface-container-low px-4 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5">
          <ImagePlus aria-hidden="true" className="text-primary" size={24} />
          <span className="text-sm font-medium">{uploading ? 'Subiendo imagen…' : 'Seleccionar imagen'}</span>
          <span className="text-xs text-on-surface-variant">JPG, PNG, WebP, AVIF o GIF · Máximo 8 MB</span>
          <input accept="image/avif,image/gif,image/jpeg,image/png,image/webp" className="sr-only" disabled={uploading} onChange={(event) => onUpload(event.currentTarget.files?.[0] ?? null)} type="file" />
        </label>
      )}
    </div>
  )
}

export function AdminServiceForm({ initialValues }: AdminServiceFormProps) {
  const [state, action, pending] = useActionState(saveAdminService, initialState)
  const [draft, setDraft] = useState(initialValues)
  const [preview, setPreview] = useState<ImagePreview>({
    image: initialValues.image ? `/admin/assets/${initialValues.image}` : null,
    image_before: initialValues.image_before ? `/admin/assets/${initialValues.image_before}` : null,
  })
  const [uploading, setUploading] = useState({ image: false, image_before: false })
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewLocale, setPreviewLocale] = useState<'es' | 'en'>('es')
  const previewUrls = useRef<string[]>([])

  useEffect(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), [])

  const updateField = (field: keyof AdminServiceFormValues, value: string | number | boolean) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const updatePrice = (index: number, field: 'vehicle_type_es' | 'vehicle_type_en' | 'price', value: string) => {
    setDraft((current) => ({
      ...current,
      prices: current.prices.map((price, priceIndex) => priceIndex === index ? { ...price, [field]: value } : price),
    }))
  }

  const uploadImage = async (field: 'image' | 'image_before', file: File | null) => {
    if (!file) return
    setUploadError(null)
    setUploading((current) => ({ ...current, [field]: true }))

    try {
      const form = new FormData()
      form.set('file', file)
      const response = await fetch('/admin/api/files', { method: 'POST', body: form })
      const result = await response.json() as { id?: string; error?: string }
      if (!response.ok || !result.id) throw new Error(result.error ?? 'No fue posible subir la imagen.')

      const previewUrl = URL.createObjectURL(file)
      previewUrls.current.push(previewUrl)
      setDraft((current) => ({ ...current, [field]: result.id! }))
      setPreview((current) => ({ ...current, [field]: previewUrl }))
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'No fue posible subir la imagen.')
    } finally {
      setUploading((current) => ({ ...current, [field]: false }))
    }
  }

  const previewTitle = previewLocale === 'es' ? draft.title_es : draft.title_en
  const previewDescription = previewLocale === 'es' ? draft.short_description_es : draft.short_description_en
  const previewFeatures = (previewLocale === 'es' ? draft.features_es : draft.features_en)
    .split(/\r?\n/)
    .map((feature) => feature.trim())
    .filter(Boolean)

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:px-8 lg:py-10">
      <section className="min-w-0">
        <Link className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary" href="/admin/servicios">
          <ArrowLeft aria-hidden="true" size={16} />
          Volver a servicios
        </Link>
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {draft.id ? `Servicio #${draft.id}` : 'Nuevo contenido'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {draft.id ? 'Editar servicio' : 'Crear servicio'}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">Los cambios se reflejan en español e inglés en el sitio.</p>
        </div>

        <form action={action} className="space-y-6">
          {draft.id && <input name="id" type="hidden" value={draft.id} />}
          <input name="image" type="hidden" value={draft.image} />
          <input name="image_before" type="hidden" value={draft.image_before} />
          <input name="prices" type="hidden" value={JSON.stringify(draft.prices)} />

          <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-ambient sm:p-6">
            <h2 className="font-display text-lg font-semibold">Publicación</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextField id="service-slug" label="Slug" name="slug" onChange={(value) => updateField('slug', value)} required value={draft.slug} />
              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="service-status">Estado</label>
                <select className="w-full rounded-xl border border-outline-variant/70 bg-surface px-3.5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-primary" id="service-status" name="status" onChange={(event) => updateField('status', event.target.value)} value={draft.status}>
                  <option value={ADMIN_SERVICE_STATUS.DRAFT}>Borrador</option>
                  <option value={ADMIN_SERVICE_STATUS.PUBLISHED}>Publicado</option>
                  <option value={ADMIN_SERVICE_STATUS.ARCHIVED}>Archivado</option>
                </select>
              </div>
              <TextField id="service-sort" label="Orden" name="sort" onChange={(value) => updateField('sort', Number(value) || 0)} value={String(draft.sort)} />
              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="service-icon">Icono</label>
                <select className="w-full rounded-xl border border-outline-variant/70 bg-surface px-3.5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-primary" id="service-icon" name="icon" onChange={(event) => updateField('icon', event.target.value)} value={draft.icon}>
                  {ADMIN_ICON_NAMES.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>
              <TextField id="service-duration" label="Duración" name="duration" onChange={(value) => updateField('duration', value)} required value={draft.duration} />
              <label className="flex min-h-12 items-center gap-3 rounded-xl bg-surface-container-low px-4 text-sm font-medium">
                <input checked={draft.is_featured} className="size-4 accent-primary" name="is_featured" onChange={(event) => updateField('is_featured', event.target.checked)} type="checkbox" value="true" />
                Mostrar como destacado
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-ambient sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">Contenido bilingüe</h2>
                <p className="mt-1 text-xs text-on-surface-variant">Mantén ambos idiomas actualizados.</p>
              </div>
              <div aria-label="Idioma de la vista previa" className="inline-flex rounded-lg bg-surface-container-low p-1">
                <button aria-pressed={previewLocale === 'es'} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${previewLocale === 'es' ? 'bg-surface-container-lowest text-primary shadow-ambient' : 'text-on-surface-variant'}`} onClick={() => setPreviewLocale('es')} type="button">Español</button>
                <button aria-pressed={previewLocale === 'en'} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${previewLocale === 'en' ? 'bg-surface-container-lowest text-primary shadow-ambient' : 'text-on-surface-variant'}`} onClick={() => setPreviewLocale('en')} type="button">English</button>
              </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              <fieldset className="space-y-4">
                <legend className="mb-3 text-sm font-semibold text-primary">Español</legend>
                <TextField id="title-es" label="Título" name="title_es" onChange={(value) => updateField('title_es', value)} required value={draft.title_es} />
                <TextField id="short-es" label="Descripción breve" name="short_description_es" multiline onChange={(value) => updateField('short_description_es', value)} value={draft.short_description_es} />
                <TextField id="full-es" label="Descripción completa" name="full_description_es" multiline onChange={(value) => updateField('full_description_es', value)} rows={5} value={draft.full_description_es} />
                <TextField id="features-es" label="Características (una por línea)" name="features_es" multiline onChange={(value) => updateField('features_es', value)} rows={4} value={draft.features_es} />
                <TextField id="price-label-es" label="Etiqueta de precio" name="price_label_es" onChange={(value) => updateField('price_label_es', value)} value={draft.price_label_es} />
              </fieldset>
              <fieldset className="space-y-4">
                <legend className="mb-3 text-sm font-semibold text-primary">English</legend>
                <TextField id="title-en" label="Title" name="title_en" onChange={(value) => updateField('title_en', value)} required value={draft.title_en} />
                <TextField id="short-en" label="Short description" name="short_description_en" multiline onChange={(value) => updateField('short_description_en', value)} value={draft.short_description_en} />
                <TextField id="full-en" label="Full description" name="full_description_en" multiline onChange={(value) => updateField('full_description_en', value)} rows={5} value={draft.full_description_en} />
                <TextField id="features-en" label="Features (one per line)" name="features_en" multiline onChange={(value) => updateField('features_en', value)} rows={4} value={draft.features_en} />
                <TextField id="price-label-en" label="Price label" name="price_label_en" onChange={(value) => updateField('price_label_en', value)} value={draft.price_label_en} />
              </fieldset>
            </div>
          </section>

          <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-ambient sm:p-6">
            <h2 className="font-display text-lg font-semibold">Imágenes</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <ImageUploadField
                label="Imagen principal"
                onRemove={() => { setDraft((current) => ({ ...current, image: '' })); setPreview((current) => ({ ...current, image: null })) }}
                onUpload={(file) => void uploadImage('image', file)}
                preview={preview.image}
                uploading={uploading.image}
              />
              <ImageUploadField
                label="Imagen antes del servicio (opcional)"
                onRemove={() => { setDraft((current) => ({ ...current, image_before: '' })); setPreview((current) => ({ ...current, image_before: null })) }}
                onUpload={(file) => void uploadImage('image_before', file)}
                preview={preview.image_before}
                uploading={uploading.image_before}
              />
            </div>
            {uploadError && <p aria-live="polite" className="mt-4 text-sm text-error" role="alert">{uploadError}</p>}
          </section>

          <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-ambient sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold">Precios por vehículo</h2>
                <p className="mt-1 text-xs text-on-surface-variant">Agrega, cambia o quita filas de precio.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/60 px-3 py-2 text-sm font-medium hover:bg-surface-container-low" onClick={() => setDraft((current) => ({ ...current, prices: [...current.prices, { vehicle_type_es: '', vehicle_type_en: '', price: '' }] }))} type="button">
                <Plus aria-hidden="true" size={16} />
                Agregar fila
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {draft.prices.length === 0 && <p className="rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">Sin precios por vehículo.</p>}
              {draft.prices.map((price, index) => (
                <div className="grid gap-3 rounded-xl bg-surface-container-low p-3 sm:grid-cols-[1fr_1fr_0.7fr_auto]" key={price.id ?? `new-${index}`}>
                  <input aria-label={`Tipo de vehículo en español ${index + 1}`} className="min-w-0 rounded-lg border border-outline-variant/70 bg-surface-container-lowest px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-primary" onChange={(event) => updatePrice(index, 'vehicle_type_es', event.target.value)} placeholder="Automóvil urbano" value={price.vehicle_type_es} />
                  <input aria-label={`Vehicle type in English ${index + 1}`} className="min-w-0 rounded-lg border border-outline-variant/70 bg-surface-container-lowest px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-primary" onChange={(event) => updatePrice(index, 'vehicle_type_en', event.target.value)} placeholder="City car" value={price.vehicle_type_en} />
                  <input aria-label={`Precio ${index + 1}`} className="min-w-0 rounded-lg border border-outline-variant/70 bg-surface-container-lowest px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-primary" onChange={(event) => updatePrice(index, 'price', event.target.value)} placeholder="$89.990" value={price.price} />
                  <button aria-label={`Quitar precio ${index + 1}`} className="inline-flex size-10 items-center justify-center rounded-lg text-error hover:bg-error-container" onClick={() => setDraft((current) => ({ ...current, prices: current.prices.filter((_, priceIndex) => priceIndex !== index) }))} type="button">
                    <Trash2 aria-hidden="true" size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {state.error && <p aria-live="polite" className="rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">{state.error}</p>}
          <button className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-on-primary shadow-float transition-colors hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70 sm:w-auto" disabled={pending || uploading.image || uploading.image_before} type="submit">
            {pending ? 'Guardando…' : draft.id ? 'Guardar cambios' : 'Crear servicio'}
          </button>
        </form>

        {draft.id && (
          <form action={deleteAdminService} className="mt-8 border-t border-outline-variant/30 pt-6" onSubmit={(event) => { if (!window.confirm('¿Eliminar este servicio y sus precios? Esta acción no se puede deshacer.')) event.preventDefault() }}>
            <input name="id" type="hidden" value={draft.id} />
            <button className="rounded-lg px-3 py-2 text-sm font-medium text-error hover:bg-error-container" type="submit">Eliminar servicio</button>
          </form>
        )}
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Vista previa</p>
            <h2 className="mt-1 font-display text-xl font-semibold">Así se verá en el sitio</h2>
          </div>
          <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold uppercase text-on-surface-variant">{previewLocale}</span>
        </div>
        <article className="overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-lowest shadow-ambient">
          <div className="relative aspect-[4/3] bg-surface-container-low">
            {preview.image ? (
              <Image alt="" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 40vw" src={preview.image} unoptimized />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-on-surface-variant">Selecciona una imagen principal</div>
            )}
            {draft.is_featured && <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary">Destacado</span>}
          </div>
          <div className="space-y-5 p-6 sm:p-7">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary-fixed text-primary">
              <Icon name={draft.icon} size={21} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{previewTitle || 'Título del servicio'}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{previewDescription || 'La descripción breve aparecerá aquí.'}</p>
            </div>
            {previewFeatures.length > 0 && (
              <ul className="space-y-2 border-t border-outline-variant/25 pt-4">
                {previewFeatures.slice(0, 4).map((feature, index) => <li className="flex gap-2 text-sm text-on-surface-variant" key={`${index}-${feature}`}><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{feature}</li>)}
              </ul>
            )}
            <div className="flex items-center justify-between gap-3 border-t border-outline-variant/25 pt-4 text-xs text-on-surface-variant">
              <span>{draft.duration || 'Duración'}</span>
              <span className="font-semibold text-primary">{previewLocale === 'es' ? draft.price_label_es : draft.price_label_en}</span>
            </div>
            {draft.prices.length > 0 && (
              <div className="space-y-2 border-t border-outline-variant/25 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                  {previewLocale === 'es' ? 'Precios por vehículo' : 'Vehicle pricing'}
                </p>
                {draft.prices.map((price, index) => (
                  <div className="flex justify-between gap-4 text-sm" key={price.id ?? `preview-${index}`}>
                    <span>{previewLocale === 'es' ? price.vehicle_type_es : price.vehicle_type_en}</span>
                    <span className="font-semibold">{price.price}</span>
                  </div>
                ))}
              </div>
            )}
            {preview.image_before && (
              <div className="overflow-hidden rounded-xl border border-outline-variant/25">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">Antes</p>
                <Image alt="Imagen antes del servicio" className="h-36 w-full object-cover" height={360} sizes="(max-width: 1024px) 100vw, 40vw" src={preview.image_before} unoptimized width={640} />
              </div>
            )}
          </div>
        </article>
        <p className="mt-3 text-xs leading-5 text-on-surface-variant">La vista previa refleja la tarjeta del catálogo; el detalle público usa los mismos campos.</p>
      </aside>
    </div>
  )
}
