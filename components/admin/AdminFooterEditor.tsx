'use client'

import { useActionState, useState } from 'react'
import { saveAdminFooter, type FooterActionState } from '@/app/admin/footer/actions'
import { FooterView } from '@/components/layout/FooterView'
import { FOOTER_NAV_TARGETS, FOOTER_SOCIAL_PLATFORMS, projectFooterContent, type FooterContent } from '@/lib/footer-content'
import type { Locale } from '@/i18n/routing'

type ScalarKey = Exclude<keyof FooterContent, 'navigation_links' | 'social_links'>

const FIELD_GROUPS: { title: string; fields: { key: ScalarKey; label: string; type?: string }[] }[] = [
  { title: 'Marca y ecología', fields: [
    { key: 'brand_name', label: 'Nombre de marca' }, { key: 'eco_stat', label: 'Dato ecológico' },
    { key: 'tagline_es', label: 'Descripción · Español' }, { key: 'tagline_en', label: 'Descripción · English' },
    { key: 'eco_label_es', label: 'Etiqueta ecológica · Español' }, { key: 'eco_label_en', label: 'Eco badge label · English' },
  ] },
  { title: 'Navegación', fields: [
    { key: 'navigation_title_es', label: 'Título · Español' }, { key: 'navigation_title_en', label: 'Title · English' },
  ] },
  { title: 'Contacto', fields: [
    { key: 'contact_title_es', label: 'Título · Español' }, { key: 'contact_title_en', label: 'Title · English' },
    { key: 'phone_display', label: 'Teléfono visible', type: 'tel' }, { key: 'phone_href', label: 'Teléfono de enlace', type: 'tel' },
    { key: 'email', label: 'Correo electrónico', type: 'email' },
    { key: 'zone_es', label: 'Zona · Español' }, { key: 'zone_en', label: 'Zone · English' },
    { key: 'hours_es', label: 'Horario · Español' }, { key: 'hours_en', label: 'Hours · English' },
  ] },
  { title: 'Redes sociales', fields: [
    { key: 'social_title_es', label: 'Título · Español' }, { key: 'social_title_en', label: 'Title · English' },
  ] },
  { title: 'Enlaces legales y copyright', fields: [
    { key: 'privacy_label_es', label: 'Privacidad · Español' }, { key: 'privacy_label_en', label: 'Privacy · English' },
    { key: 'terms_label_es', label: 'Términos · Español' }, { key: 'terms_label_en', label: 'Terms · English' },
    { key: 'copyright_es', label: 'Copyright · Español' }, { key: 'copyright_en', label: 'Copyright · English' },
  ] },
]

const TARGET_LABELS = {
  home: 'Inicio', services: 'Servicios', coverage: 'Cobertura', contact: 'Contacto',
} as const

const PLATFORM_LABELS = {
  instagram: 'Instagram', facebook: 'Facebook', link: 'Enlace',
} as const

export function AdminFooterEditor({ initialContent }: { initialContent: FooterContent }) {
  const [content, setContent] = useState(initialContent)
  const [previewLocale, setPreviewLocale] = useState<Locale>('es')
  const [state, formAction, pending] = useActionState<FooterActionState, FormData>(saveAdminFooter, {})
  const [draftRevision, setDraftRevision] = useState(0)
  const [submittedRevision, setSubmittedRevision] = useState<number | null>(null)
  const updateContent = (updater: (current: FooterContent) => FooterContent) => {
    setDraftRevision((revision) => revision + 1)
    setContent(updater)
  }
  const resultIsCurrent = draftRevision === submittedRevision
  const update = <K extends ScalarKey>(key: K, value: FooterContent[K]) => updateContent((current) => ({ ...current, [key]: value }))
  const updateNavigation = (index: number, field: 'target' | 'label_es' | 'label_en', value: string) => updateContent((current) => ({
    ...current,
    navigation_links: current.navigation_links.map((row, rowIndex) => rowIndex === index ? {
      ...row,
      [field]: field === 'target' ? value as FooterContent['navigation_links'][number]['target'] : value,
    } : row),
  }))
  const updateSocial = (index: number, field: 'platform' | 'label_es' | 'label_en' | 'url', value: string) => updateContent((current) => ({
    ...current,
    social_links: current.social_links.map((row, rowIndex) => rowIndex === index ? {
      ...row,
      [field]: field === 'platform' ? value as FooterContent['social_links'][number]['platform'] : value,
    } : row),
  }))
  const inputClass = 'mt-1 w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Contenido del sitio</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-on-surface">Editar pie de página</h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">Edita el contenido en ambos idiomas. La vista previa refleja los cambios antes de guardarlos.</p>
      </div>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <form action={formAction} className="space-y-6" onSubmit={() => setSubmittedRevision(draftRevision)}>
          <input type="hidden" name="content" value={JSON.stringify(content)} />
          {FIELD_GROUPS.map((group) => <fieldset key={group.title} className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm sm:p-6">
            <legend className="px-2 font-display text-lg font-semibold text-on-surface">{group.title}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map(({ key, label, type = 'text' }) => <label key={key} className="block text-sm font-medium text-on-surface-variant">
                {label}<input className={inputClass} type={type} value={content[key]} onChange={(event) => update(key, event.currentTarget.value)} />
              </label>)}
            </div>
          </fieldset>)}

          <fieldset className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm sm:p-6">
            <legend className="px-2 font-display text-lg font-semibold text-on-surface">Enlaces de navegación</legend>
            <div className="space-y-4">
                {content.navigation_links.map((row, index) => <div className="grid gap-3 rounded-xl bg-surface-container-low p-4 sm:grid-cols-[1fr_1fr_1fr_auto]" key={`navigation-${index}`}>
                <label className="text-xs font-medium text-on-surface-variant">Destino<select className={inputClass} value={row.target} onChange={(event) => updateNavigation(index, 'target', event.currentTarget.value)}>{Object.entries(TARGET_LABELS).map(([value, label]) => <option key={value} value={value}>{label} · {value === 'home' ? '/' : `/${value === 'services' ? 'servicios' : value === 'coverage' ? 'cobertura' : 'contacto'}`}</option>)}</select></label>
                <label className="text-xs font-medium text-on-surface-variant">Etiqueta · Español<input className={inputClass} value={row.label_es} onChange={(event) => updateNavigation(index, 'label_es', event.currentTarget.value)} /></label>
                <label className="text-xs font-medium text-on-surface-variant">Label · English<input className={inputClass} value={row.label_en} onChange={(event) => updateNavigation(index, 'label_en', event.currentTarget.value)} /></label>
                  <button className="self-end rounded-lg px-3 py-2 text-sm font-medium text-error hover:bg-error-container" type="button" aria-label={`Eliminar enlace ${index + 1}`} onClick={() => updateContent((current) => ({ ...current, navigation_links: current.navigation_links.filter((_, rowIndex) => rowIndex !== index) }))}>Eliminar</button>
                </div>)}
                <button className="rounded-lg border border-outline-variant/60 px-4 py-2 text-sm font-medium text-primary hover:bg-surface-container-low" type="button" onClick={() => updateContent((current) => ({ ...current, navigation_links: [...current.navigation_links, { target: FOOTER_NAV_TARGETS.HOME, label_es: '', label_en: '' }] }))}>Añadir enlace</button>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm sm:p-6">
            <legend className="px-2 font-display text-lg font-semibold text-on-surface">Redes sociales</legend>
            <div className="space-y-4">
              {content.social_links.map((row, index) => <div className="grid gap-3 rounded-xl bg-surface-container-low p-4 sm:grid-cols-2" key={`social-${index}`}>
                <label className="text-xs font-medium text-on-surface-variant">Plataforma<select className={inputClass} value={row.platform} onChange={(event) => updateSocial(index, 'platform', event.currentTarget.value)}>{Object.entries(PLATFORM_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label className="text-xs font-medium text-on-surface-variant">URL HTTP(S)<input className={inputClass} type="url" value={row.url} onChange={(event) => updateSocial(index, 'url', event.currentTarget.value)} /></label>
                <label className="text-xs font-medium text-on-surface-variant">Etiqueta · Español<input className={inputClass} value={row.label_es} onChange={(event) => updateSocial(index, 'label_es', event.currentTarget.value)} /></label>
                <label className="text-xs font-medium text-on-surface-variant">Label · English<input className={inputClass} value={row.label_en} onChange={(event) => updateSocial(index, 'label_en', event.currentTarget.value)} /></label>
                  <button className="justify-self-start rounded-lg px-3 py-2 text-sm font-medium text-error hover:bg-error-container" type="button" aria-label={`Eliminar red social ${index + 1}`} onClick={() => updateContent((current) => ({ ...current, social_links: current.social_links.filter((_, rowIndex) => rowIndex !== index) }))}>Eliminar</button>
                </div>)}
                <button className="rounded-lg border border-outline-variant/60 px-4 py-2 text-sm font-medium text-primary hover:bg-surface-container-low" type="button" onClick={() => updateContent((current) => ({ ...current, social_links: [...current.social_links, { platform: FOOTER_SOCIAL_PLATFORMS.LINK, label_es: '', label_en: '', url: '' }] }))}>Añadir red social</button>
            </div>
          </fieldset>

            {resultIsCurrent && state.error && <p className="rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">{state.error}</p>}
            {resultIsCurrent && state.success && <p className="rounded-xl bg-tertiary-container px-4 py-3 text-sm text-on-tertiary-container" role="status">Cambios guardados correctamente.</p>}
          <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={pending}>{pending ? 'Guardando…' : 'Guardar cambios'}</button>
        </form>

        <section aria-labelledby="footer-preview-heading" className="overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-sm xl:sticky xl:top-24">
          <div className="flex items-center justify-between gap-4 border-b border-outline-variant/30 px-5 py-4">
            <div><h2 id="footer-preview-heading" className="font-display text-lg font-semibold text-on-surface">Vista previa</h2><p className="text-xs text-on-surface-variant">Se actualiza mientras editas.</p></div>
            <label className="text-xs font-medium text-on-surface-variant">Idioma de vista previa<select className="ml-2 rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-2 py-2 text-sm" value={previewLocale} onChange={(event) => setPreviewLocale(event.currentTarget.value as Locale)}><option value="es">Español</option><option value="en">English</option></select></label>
          </div>
          <FooterView content={projectFooterContent(content, previewLocale)} locale={previewLocale} />
        </section>
      </div>
    </main>
  )
}
