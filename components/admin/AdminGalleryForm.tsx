'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { Archive, ArrowLeft, Check, Save, Upload } from 'lucide-react'
import { archiveGalleryEntry, saveGalleryEntry } from '@/app/admin/galeria/actions'
import { galleryCategories } from '@/lib/gallery'
import type { AdminGalleryComparison, AdminGalleryPhoto, GalleryFormState } from '@/lib/gallery-types'

type GalleryKind = 'photo' | 'comparison'
type InitialGalleryEntry = AdminGalleryPhoto | AdminGalleryComparison

const EMPTY_STATE: GalleryFormState = {}
const CATEGORY_LABELS = {
  exterior: 'Exteriores',
  interiores: 'Interiores',
  focos: 'Focos',
  maquinaria: 'Maquinaria',
} as const

function Field({
  id,
  label,
  name,
  defaultValue,
  required = true,
  maxLength,
  readOnly = false,
}: {
  id: string
  label: string
  name: string
  defaultValue: string | number
  required?: boolean
  maxLength?: number
  readOnly?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-on-surface" htmlFor={id}>{label}</label>
      <input
        className="min-h-12 w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-3.5 py-3 text-sm text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        defaultValue={defaultValue}
        id={id}
        maxLength={maxLength}
        name={name}
        readOnly={readOnly}
        required={required}
      />
    </div>
  )
}

function UploadField({
  label,
  name,
  initialId,
  initialWidth,
  initialHeight,
  onUploadingChange,
}: {
  label: string
  name: 'image' | 'before_image' | 'after_image'
  initialId: string
  initialWidth?: number
  initialHeight?: number
  onUploadingChange: (uploading: boolean) => void
}) {
  const [fileId, setFileId] = useState(initialId)
  const [preview, setPreview] = useState(initialId ? `/admin/assets/${initialId}` : '')
  const [width, setWidth] = useState(initialWidth ?? 1280)
  const [height, setHeight] = useState(initialHeight ?? 960)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => () => {
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])

  async function upload(file: File | undefined) {
    if (!file) return
    setUploading(true)
    onUploadingChange(true)
    setError('')
    try {
      const form = new FormData()
      form.set('file', file)
      const response = await fetch('/admin/api/files', { method: 'POST', body: form })
      const result = await response.json() as { id?: string; width?: number; height?: number; error?: string }
      if (!response.ok || !result.id) throw new Error(result.error ?? 'No fue posible subir la imagen.')
      if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
      setFileId(result.id)
      setPreview(URL.createObjectURL(file))
      setWidth(result.width ?? 1280)
      setHeight(result.height ?? 960)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No fue posible subir la imagen.')
    } finally {
      setUploading(false)
      onUploadingChange(false)
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-on-surface">{label}</p>
      <div className="overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-low">
        {preview ? (
          <div className="relative aspect-[4/3]">
            <Image alt={`Vista previa: ${label}`} className="object-cover" fill sizes="(max-width: 768px) 100vw, 40vw" src={preview} unoptimized />
          </div>
        ) : (
          <div className="grid aspect-[4/3] place-items-center text-sm text-on-surface-variant">Selecciona una imagen para ver la vista previa.</div>
        )}
      </div>
      <input name={name} type="hidden" value={fileId} />
      {name === 'image' && <input name="width" type="hidden" value={width} />}
      {name === 'image' && <input name="height" type="hidden" value={height} />}
      <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-outline-variant/60 px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
        <Upload aria-hidden="true" size={16} />
        {uploading ? 'Subiendo imagen…' : fileId ? 'Cambiar imagen' : 'Elegir imagen'}
        <input
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          disabled={uploading}
          onChange={(event) => { void upload(event.target.files?.[0]) }}
          type="file"
        />
      </label>
      {error && <p className="text-sm text-error" role="alert">{error}</p>}
    </div>
  )
}

function LocaleFields({
  fields,
}: {
  fields: Array<{ id: string; label: string; name: string; value: string; maxLength?: number }>
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((field) => (
        <Field key={field.name} {...field} defaultValue={field.value} />
      ))}
    </div>
  )
}

export function AdminGalleryForm({
  kind,
  initialValues,
}: {
  kind: GalleryKind
  initialValues: InitialGalleryEntry
}) {
  const [state, action, pending] = useActionState(saveGalleryEntry, EMPTY_STATE)
  const [activeUploads, setActiveUploads] = useState(0)
  const router = useRouter()
  const isPhoto = kind === 'photo'
  const photo = isPhoto ? initialValues as AdminGalleryPhoto : null
  const comparison = isPhoto ? null : initialValues as AdminGalleryComparison
  const isExisting = initialValues.id !== null
  const updateUploadCount = (uploading: boolean) => {
    setActiveUploads((current) => Math.max(0, current + (uploading ? 1 : -1)))
  }

  useEffect(() => {
    if (!state.success || !state.id) return
    if (!isExisting) {
      const route = kind === 'photo' ? 'fotos' : 'comparativas'
      router.replace(`/admin/galeria/${route}/${state.id}`)
    }
  }, [isExisting, kind, router, state])

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <Link className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="/admin/galeria">
        <ArrowLeft aria-hidden="true" size={16} />
        Volver a galería
      </Link>
      <header className="mb-7">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {isExisting ? 'Editar' : 'Agregar'} {isPhoto ? 'foto' : 'comparativa'}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
          {isPhoto
            ? 'Completa el contenido en ambos idiomas y elige la categoría. La foto aparecerá en la galería cuando esté publicada.'
            : 'Asocia una imagen de antes y otra de después para mostrar el resultado como un solo trabajo.'}
        </p>
      </header>

      <form action={action} className="space-y-6">
        <input name="kind" type="hidden" value={kind} />
        <input name="id" type="hidden" value={initialValues.id ?? ''} />
        <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 sm:p-7">
          <h2 className="font-display text-lg font-semibold">Publicación</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field defaultValue={initialValues.slug} id="gallery-slug" label="Identificador" maxLength={120} name="slug" readOnly={isExisting} />
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="gallery-status">Estado</label>
              <select className="min-h-12 w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-3.5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" defaultValue={initialValues.status} id="gallery-status" name="status">
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </div>
            <Field defaultValue={initialValues.sort} id="gallery-sort" label="Orden de aparición" name="sort" />
            {photo && (
              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="gallery-category">Categoría</label>
                <select className="min-h-12 w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-3.5 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" defaultValue={photo.category} id="gallery-category" name="category">
                  {galleryCategories.map((category) => <option key={category} value={category}>{CATEGORY_LABELS[category]}</option>)}
                </select>
              </div>
            )}
          </div>
        </section>

        {photo ? (
          <>
            <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 sm:p-7">
              <h2 className="mb-5 font-display text-lg font-semibold">Foto y categoría</h2>
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)]">
                <UploadField initialHeight={photo.height} initialId={photo.image} initialWidth={photo.width} label="Imagen de galería" name="image" onUploadingChange={updateUploadCount} />
                <div className="space-y-4">
                  <LocaleFields fields={[
                    { id: 'photo-caption-es', label: 'Epígrafe · Español', name: 'caption_es', value: photo.caption_es, maxLength: 240 },
                    { id: 'photo-caption-en', label: 'Caption · English', name: 'caption_en', value: photo.caption_en, maxLength: 240 },
                    { id: 'photo-alt-es', label: 'Texto alternativo · Español', name: 'alt_es', value: photo.alt_es, maxLength: 240 },
                    { id: 'photo-alt-en', label: 'Alt text · English', name: 'alt_en', value: photo.alt_en, maxLength: 240 },
                  ]} />
                </div>
              </div>
            </section>
          </>
        ) : comparison ? (
          <>
            <section className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 sm:p-7">
              <h2 className="mb-5 font-display text-lg font-semibold">Título de la comparativa</h2>
              <LocaleFields fields={[
                { id: 'comparison-title-es', label: 'Título · Español', name: 'title_es', value: comparison.title_es, maxLength: 120 },
                { id: 'comparison-title-en', label: 'Title · English', name: 'title_en', value: comparison.title_en, maxLength: 120 },
              ]} />
            </section>
            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 sm:p-7">
                <h2 className="mb-5 font-display text-lg font-semibold">Antes</h2>
                <UploadField initialId={comparison.before_image} label="Imagen de antes" name="before_image" onUploadingChange={updateUploadCount} />
                <div className="mt-5 space-y-4">
                  <LocaleFields fields={[
                    { id: 'before-alt-es', label: 'Texto alternativo · Español', name: 'before_alt_es', value: comparison.before_alt_es, maxLength: 240 },
                    { id: 'before-alt-en', label: 'Alt text · English', name: 'before_alt_en', value: comparison.before_alt_en, maxLength: 240 },
                  ]} />
                </div>
              </div>
              <div className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 sm:p-7">
                <h2 className="mb-5 font-display text-lg font-semibold">Después</h2>
                <UploadField initialId={comparison.after_image} label="Imagen de después" name="after_image" onUploadingChange={updateUploadCount} />
                <div className="mt-5 space-y-4">
                  <LocaleFields fields={[
                    { id: 'after-alt-es', label: 'Texto alternativo · Español', name: 'after_alt_es', value: comparison.after_alt_es, maxLength: 240 },
                    { id: 'after-alt-en', label: 'Alt text · English', name: 'after_alt_en', value: comparison.after_alt_en, maxLength: 240 },
                  ]} />
                </div>
              </div>
            </section>
          </>
        ) : null}

        {state.error && <p className="rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">{state.error}</p>}
        {state.success && <p className="flex items-center gap-2 rounded-xl bg-primary-container px-4 py-3 text-sm text-on-primary-container" role="status"><Check aria-hidden="true" size={16} /> Cambios guardados.</p>}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {isExisting && (
            <button className="inline-flex min-h-11 items-center gap-2 rounded-full border border-outline-variant/60 px-5 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" formAction={archiveGalleryEntry} formNoValidate type="submit">
              <Archive aria-hidden="true" size={16} />
              Archivar
            </button>
          )}
          <button className="ml-auto inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={pending || activeUploads > 0} type="submit">
            <Save aria-hidden="true" size={17} />
            {pending ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </main>
  )
}
