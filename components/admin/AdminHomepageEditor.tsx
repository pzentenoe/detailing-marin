'use client'

import { useActionState, useState } from 'react'
import { saveAdminHomepage, type HomepageActionState } from '@/app/admin/inicio/actions'

const SECTIONS = [
  ['hero', 'Portada'], ['features', 'Por qué elegirnos'], ['servicesPreview', 'Vista previa de servicios'],
  ['industrial', 'Empresas y maquinaria'], ['results', 'Resultados'], ['cta', 'Llamado a la acción'], ['coverageTeaser', 'Cobertura'],
] as const

type Locale = 'es' | 'en'
type Content = Record<string, unknown>
type LocalizedContent = Record<Locale, Content>

function labelFor(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ').replace(/^./, (letter) => letter.toLocaleUpperCase())
}

function setPath(value: unknown, path: (string | number)[], nextValue: string): unknown {
  if (!path.length) return nextValue
  const [head, ...tail] = path
  if (Array.isArray(value) && typeof head === 'number') return value.map((item, index) => index === head ? setPath(item, tail, nextValue) : item)
  if (value && typeof value === 'object' && typeof head === 'string') return { ...value, [head]: setPath((value as Record<string, unknown>)[head], tail, nextValue) }
  return value
}

function ContentFields({ value, path = [], onChange }: {
  value: unknown
  path?: (string | number)[]
  onChange: (path: (string | number)[], value: string) => void
}) {
  if (typeof value === 'string') {
    const text = path.map((part) => typeof part === 'number' ? `Elemento ${part + 1}` : labelFor(part)).join(' · ')
    const long = value.length > 100
    const className = 'mt-1 w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    return <label className="block text-sm font-medium text-on-surface-variant" key={path.join('.')}>{text}
      {long
        ? <textarea className={`${className} min-h-24`} value={value} onChange={(event) => onChange(path, event.currentTarget.value)} />
        : <input className={className} value={value} onChange={(event) => onChange(path, event.currentTarget.value)} />}
    </label>
  }
  if (Array.isArray(value)) return <div className="grid gap-4 sm:grid-cols-2">{value.map((child, index) => <ContentFields key={index} value={child} path={[...path, index]} onChange={onChange} />)}</div>
  if (value && typeof value === 'object') return <div className="grid gap-4 sm:grid-cols-2">{Object.entries(value).map(([key, child]) => <ContentFields key={key} value={child} path={[...path, key]} onChange={onChange} />)}</div>
  return null
}

export function AdminHomepageEditor({ initialContent }: { initialContent: LocalizedContent }) {
  const [content, setContent] = useState(initialContent)
  const [locale, setLocale] = useState<Locale>('es')
  const [state, formAction, pending] = useActionState<HomepageActionState, FormData>(saveAdminHomepage, {})
  const [savedRevision, setSavedRevision] = useState<number | null>(null)
  const [revision, setRevision] = useState(0)
  const resultIsCurrent = savedRevision === revision

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
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-4">
          <div><h2 className="font-display text-lg font-semibold text-on-surface">Idioma en edición</h2><p className="text-sm text-on-surface-variant">Los cambios se guardan para ambos idiomas.</p></div>
          <label className="text-sm font-medium text-on-surface-variant">Idioma
            <select className="ml-2 rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-on-surface" value={locale} onChange={(event) => setLocale(event.currentTarget.value as Locale)}>
              <option value="es">Español</option><option value="en">English</option>
            </select>
          </label>
        </div>
        {SECTIONS.map(([key, title]) => <fieldset className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-sm sm:p-6" key={key}>
          <legend className="px-2 font-display text-lg font-semibold text-on-surface">{title}</legend>
          <ContentFields value={content[locale][key]} path={[title]} onChange={(path, value) => {
            setContent((current) => ({ ...current, [locale]: { ...current[locale], [key]: setPath(current[locale][key], path.slice(1), value) } }))
            setRevision((current) => current + 1)
          }} />
        </fieldset>)}
        {resultIsCurrent && state.error && <p className="rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">{state.error}</p>}
        {resultIsCurrent && state.success && <p className="rounded-xl bg-tertiary-container px-4 py-3 text-sm text-on-tertiary-container" role="status">Cambios guardados correctamente.</p>}
        <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">{pending ? 'Guardando…' : 'Guardar cambios'}</button>
      </form>
    </main>
  )
}
