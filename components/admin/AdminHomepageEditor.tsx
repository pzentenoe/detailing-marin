'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { saveAdminHomepage, type HomepageActionState } from '@/app/admin/inicio/actions'
import { AdminHomepageImageField } from '@/components/admin/AdminHomepageImageField'
import { DEFAULT_HOMEPAGE_IMAGE_SOURCES, DEFAULT_HOMEPAGE_MEDIA, HOMEPAGE_RESULT_KEYS, type HomepageMedia } from '@/lib/homepage-media'

const SECTIONS = [
  ['hero', 'Portada'], ['features', 'Por qué elegirnos'], ['servicesPreview', 'Vista previa de servicios'],
  ['industrial', 'Empresas y maquinaria'], ['coverageTeaser', 'Cobertura'], ['results', 'Resultados'], ['cta', 'Llamado a la acción'],
] as const

const SECTION_PREVIEWS: Partial<Record<(typeof SECTIONS)[number][0], string[]>> = {
  servicesPreview: ['/images/lavado_ecologico/lavado_ecologico.webp'],
}

type ImageSlot = { path: (string | number)[]; label: string; fallbackSrc: string; aspect: string }

const SECTION_IMAGES: Partial<Record<(typeof SECTIONS)[number][0], ImageSlot[]>> = {
  hero: [{ path: ['hero'], label: 'Portada', fallbackSrc: DEFAULT_HOMEPAGE_IMAGE_SOURCES.hero, aspect: 'aspect-[16/11]' }],
  features: [
    { path: ['features', 0], label: 'Pilar ecológico', fallbackSrc: DEFAULT_HOMEPAGE_IMAGE_SOURCES.features[0], aspect: 'aspect-[4/3]' },
    { path: ['features', 1], label: 'Servicio a domicilio', fallbackSrc: DEFAULT_HOMEPAGE_IMAGE_SOURCES.features[1], aspect: 'aspect-[4/3]' },
    { path: ['features', 2], label: 'Acabado premium', fallbackSrc: DEFAULT_HOMEPAGE_IMAGE_SOURCES.features[2], aspect: 'aspect-[4/3]' },
  ],
  industrial: [{ path: ['industrial'], label: 'Empresas y maquinaria', fallbackSrc: DEFAULT_HOMEPAGE_IMAGE_SOURCES.industrial, aspect: 'aspect-[16/11]' }],
  results: HOMEPAGE_RESULT_KEYS.flatMap((key) => {
    const fallback = DEFAULT_HOMEPAGE_IMAGE_SOURCES.results[key]
    const label = { motor: 'Motor', tapiz: 'Tapiz', focos: 'Focos', exterior: 'Exterior' }[key]
    return [
      { path: ['results', key, 'before'], label: `${label} · Antes`, fallbackSrc: fallback.before, aspect: 'aspect-[4/3]' },
      { path: ['results', key, 'after'], label: `${label} · Después`, fallbackSrc: fallback.after, aspect: 'aspect-[4/3]' },
    ]
  }),
}

type Locale = 'es' | 'en'
type Content = Record<string, unknown>
type LocalizedContent = Record<Locale, Content>

function labelFor(value: string) {
  const labels: Record<string, string> = {
    label: 'Etiqueta', heading: 'Título', description: 'Descripción', title: 'Título',
    imageAlt: 'Texto alternativo', imageAltBefore: 'Texto alternativo · Antes', imageAltAfter: 'Texto alternativo · Después',
    before: 'Antes', after: 'Después', cta: 'Texto del botón', cta1: 'Botón principal', cta2: 'Botón secundario',
    cta1Aria: 'Descripción accesible · Botón principal', cta2Aria: 'Descripción accesible · Botón secundario',
    ctaAria: 'Descripción accesible del botón', galleryCta: 'Enlace a la galería', bullets: 'Puntos clave',
    badge1Stat: 'Dato destacado · 1', badge1Label: 'Etiqueta del dato · 1', badge2Stat: 'Dato destacado · 2', badge2Label: 'Etiqueta del dato · 2',
    headline1: 'Titular · línea 1', headline2: 'Titular · línea 2', overlayTitle: 'Título sobre la foto', overlaySubtitle: 'Texto sobre la foto',
    stat1Value: 'Dato · valor 1', stat1Label: 'Dato · etiqueta 1', stat2Value: 'Dato · valor 2', stat2Label: 'Dato · etiqueta 2',
    stat3Value: 'Dato · valor 3', stat3Label: 'Dato · etiqueta 3', items: 'Contenido por elemento', eco: 'Pilar ecológico',
    domicilio: 'Servicio a domicilio', premium: 'Acabado premium', motor: 'Motor', tapiz: 'Tapiz', focos: 'Focos', exterior: 'Exterior',
    beforeLabel: 'Etiqueta · antes', afterLabel: 'Etiqueta · después',
    sectionAria: 'Descripción accesible de la sección', serviceImageAlt: 'Texto alternativo de la imagen del servicio',
    viewAll: 'Enlace para ver todos', viewAllAria: 'Descripción accesible · Ver todos', viewServiceAria: 'Descripción accesible · Ver servicio',
    featuredBadge: 'Etiqueta del servicio destacado', motorLabel: 'Título · resultado de motor', motorBeforeAlt: 'Texto alternativo · motor antes',
    motorAfterAlt: 'Texto alternativo · motor después', tapizLabel: 'Título · resultado de tapiz', asientosBeforeAlt: 'Texto alternativo · asientos antes',
    asientosAfterAlt: 'Texto alternativo · asientos después', focosLabel: 'Título · resultado de focos', focosBeforeAlt: 'Texto alternativo · focos antes',
    focosAfterAlt: 'Texto alternativo · focos después', exteriorLabel: 'Título · resultado exterior', exteriorBeforeAlt: 'Texto alternativo · exterior antes',
    exteriorAfterAlt: 'Texto alternativo · exterior después',
  }
  return labels[value] ?? value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ').replace(/^./, (letter) => letter.toLocaleUpperCase())
}

function setPath(value: unknown, path: (string | number)[], nextValue: unknown): unknown {
  if (!path.length) return nextValue
  const [head, ...tail] = path
  if (Array.isArray(value) && typeof head === 'number') return value.map((item, index) => index === head ? setPath(item, tail, nextValue) : item)
  if (value && typeof value === 'object' && typeof head === 'string') return { ...value, [head]: setPath((value as Record<string, unknown>)[head], tail, nextValue) }
  return value
}

function getPath(value: unknown, path: (string | number)[]): string | null {
  let current = value
  for (const part of path) {
    if (Array.isArray(current) && typeof part === 'number') current = current[part]
    else if (current && typeof current === 'object' && typeof part === 'string') current = (current as Record<string, unknown>)[part]
    else return null
  }
  return typeof current === 'string' ? current : null
}

function ContentFields({ value, path = [], onChange }: {
  value: unknown
  path?: (string | number)[]
  onChange: (path: (string | number)[], value: string) => void
}) {
  if (typeof value === 'string') {
    const lastPart = path.at(-1)
    const text = typeof lastPart === 'number' ? `Elemento ${lastPart + 1}` : labelFor(lastPart ?? 'Contenido')
    const long = value.length > 72 || (typeof lastPart === 'string' && /description|alt|aria/i.test(lastPart))
    const className = 'mt-1 min-h-11 w-full min-w-0 rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-3 py-2 text-sm leading-5 text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    return <label className="block min-w-0 text-sm font-medium leading-5 text-on-surface-variant" key={path.join('.')}>{text}
      {long
        ? <textarea className={`${className} min-h-28 resize-y`} value={value} onChange={(event) => onChange(path, event.currentTarget.value)} />
        : <input className={className} value={value} onChange={(event) => onChange(path, event.currentTarget.value)} />}
    </label>
  }
  if (Array.isArray(value)) {
    if (value.every((child) => typeof child === 'string')) {
      return <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">{value.map((child, index) => <ContentFields key={index} value={child} path={[...path, index]} onChange={onChange} />)}</div>
    }
    return <div className="min-w-0">{value.map((child, index) => <fieldset className="mt-4 min-w-0 border-t border-outline-variant/35 pt-4 first:mt-0 first:border-t-0 first:pt-0" key={index}>
      <legend className="mb-3 block text-sm font-semibold text-on-surface">Elemento {index + 1}</legend>
      <ContentFields value={child} path={[...path, index]} onChange={onChange} />
    </fieldset>)}</div>
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
    const fields = entries.filter(([, child]) => typeof child === 'string')
    const groups = entries.filter(([, child]) => child !== null && typeof child === 'object')
    return <div className="min-w-0 space-y-4">
      {fields.length > 0 && <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">{fields.map(([key, child]) => <ContentFields key={key} value={child} path={[...path, key]} onChange={onChange} />)}</div>}
      {groups.map(([key, child]) => <fieldset className="mt-4 min-w-0 border-t border-outline-variant/35 pt-4 first:mt-0 first:border-t-0 first:pt-0" key={key}>
        <legend className="mb-3 block max-w-full text-sm font-semibold text-on-surface">{labelFor(key)}</legend>
        <ContentFields value={child} path={[...path, key]} onChange={onChange} />
      </fieldset>)}
    </div>
  }
  return null
}

export function AdminHomepageEditor({ initialContent, initialMedia = DEFAULT_HOMEPAGE_MEDIA }: { initialContent: LocalizedContent; initialMedia?: HomepageMedia }) {
  const [content, setContent] = useState(initialContent)
  const [media, setMedia] = useState(initialMedia)
  const [locale, setLocale] = useState<Locale>('es')
  const [state, formAction, pending] = useActionState<HomepageActionState, FormData>(saveAdminHomepage, {})
  const [savedRevision, setSavedRevision] = useState<number | null>(null)
  const [revision, setRevision] = useState(0)
  const [uploadingFields, setUploadingFields] = useState<Set<string>>(new Set())
  const resultIsCurrent = savedRevision === revision
  const uploading = uploadingFields.size > 0

  function setUploadStatus(key: string, isUploading: boolean) {
    setUploadingFields((current) => {
      const next = new Set(current)
      if (isUploading) next.add(key)
      else next.delete(key)
      return next
    })
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-primary">Contenido del sitio</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-on-surface">Inicio</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">Edita el contenido sin cambiar el diseño ni el orden de las secciones. Servicios y galería se administran en sus propias secciones.</p>
      </header>
      <form action={formAction} className="space-y-6" onSubmit={() => setSavedRevision(revision)}>
        <input type="hidden" name="content_es" value={JSON.stringify(content.es)} />
        <input type="hidden" name="content_en" value={JSON.stringify(content.en)} />
        <input type="hidden" name="media" value={JSON.stringify(media)} />
        <div className="flex flex-col gap-4 rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div><h2 className="font-display text-lg font-semibold text-on-surface">Idioma en edición</h2><p className="mt-1 text-sm leading-5 text-on-surface-variant">Los cambios se guardan para ambos idiomas.</p></div>
          <label className="flex min-h-11 items-center gap-3 text-sm font-medium text-on-surface-variant">Idioma
            <select className="min-h-11 min-w-36 rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-3 text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" value={locale} onChange={(event) => setLocale(event.currentTarget.value as Locale)}>
              <option value="es">Español</option><option value="en">English</option>
            </select>
          </label>
        </div>
        {SECTIONS.map(([key, title]) => {
          const slots = SECTION_IMAGES[key] ?? []
          const previewImages = SECTION_PREVIEWS[key] ?? []
          return <div className="space-y-6" key={key}><fieldset className="min-w-0 overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-lowest shadow-sm">
            <legend className="sr-only">{title}</legend>
            <div className="grid min-w-0 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.5fr)] lg:items-start">
              <div className="min-w-0 border-b border-outline-variant/30 bg-surface-container-low/50 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                <h3 className="font-display text-base font-semibold text-on-surface">Imágenes de la sección</h3>
                <p className="mt-1 text-sm leading-5 text-on-surface-variant">Las fotos seleccionadas se guardan en Directus.</p>
                {slots.length > 0 ? <div className={`mt-4 grid min-w-0 gap-5 ${slots.length > 1 ? 'grid-cols-1 min-[420px]:grid-cols-2' : 'grid-cols-1'}`}>
                  {slots.map((slot) => <div className="min-w-0" key={slot.path.join('.') }>
                    <p className="mb-2 text-sm font-medium leading-5 text-on-surface-variant">{slot.label}</p>
                    <AdminHomepageImageField
                      aspectClassName={slot.aspect}
                      fallbackSrc={slot.fallbackSrc}
                      fileId={getPath(media, slot.path)}
                      label={slot.label}
                      onChange={(id) => {
                        setMedia((current) => setPath(current, slot.path, id) as HomepageMedia)
                        setRevision((current) => current + 1)
                      }}
                      onUploadingChange={(busy) => setUploadStatus(slot.path.join('.'), busy)}
                    />
                  </div>)}
                </div> : previewImages.length > 0 ? <div className="mt-4 grid grid-cols-2 gap-2">
                  {previewImages.map((src) => <div className="relative aspect-[4/3] overflow-hidden rounded-xl" key={src}><Image alt="" className="object-cover" fill sizes="(max-width: 768px) 50vw, 18rem" src={src} /></div>)}
                </div> : <p className="mt-4 rounded-xl border border-dashed border-outline-variant/50 px-4 py-5 text-sm leading-5 text-on-surface-variant">Esta sección no usa fotografías.</p>}
              </div>
              <div className="min-w-0 p-4 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-on-surface">{title}</h2>
                <div className="mt-4 min-w-0"><ContentFields value={content[locale][key]} path={[title]} onChange={(path, value) => {
                  setContent((current) => ({ ...current, [locale]: { ...current[locale], [key]: setPath(current[locale][key], path.slice(1), value) } }))
                  setRevision((current) => current + 1)
                }} /></div>
                {key === 'servicesPreview' && <Link className="mt-4 inline-flex min-h-11 items-center rounded-full border border-outline-variant/50 px-4 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="/admin/servicios">Administrar servicios</Link>}
              </div>
            </div>
          </fieldset>{key === 'servicesPreview' && <section aria-labelledby="homepage-gallery-preview" className="grid min-w-0 overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-lowest shadow-sm lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.5fr)] lg:items-center">
            <div className="grid grid-cols-2 gap-px bg-surface-container-low">
              {['/images/trabajos/exterior/peugeot-landtrek-frontal-despues.webp', '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp'].map((src) => <div className="relative aspect-[4/3]" key={src}><Image alt="" className="object-cover" fill sizes="(max-width: 768px) 50vw, 18rem" src={src} /></div>)}
            </div>
            <div className="min-w-0 p-4 sm:p-6"><h2 className="font-display text-lg font-semibold text-on-surface" id="homepage-gallery-preview">Galería de trabajos</h2><p className="mt-2 text-sm leading-6 text-on-surface-variant">La portada muestra una selección de fotos administrada desde Galería.</p><Link className="mt-4 inline-flex min-h-11 items-center rounded-full border border-outline-variant/50 px-4 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="/admin/galeria">Administrar galería</Link></div>
          </section>}</div>
        })}
        {resultIsCurrent && state.error && <p className="rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">{state.error}</p>}
        {resultIsCurrent && state.success && <p className="rounded-xl bg-tertiary-container px-4 py-3 text-sm text-on-tertiary-container" role="status">Cambios guardados correctamente.</p>}
        {uploading && <p className="text-sm text-on-surface-variant" role="status">Espera a que terminen de subir las imágenes antes de guardar.</p>}
        <button className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60" disabled={pending || uploading} type="submit">{uploading ? 'Subiendo imágenes…' : pending ? 'Guardando…' : 'Guardar cambios'}</button>
      </form>
    </main>
  )
}
