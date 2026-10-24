import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Images, Plus } from 'lucide-react'
import { adminAssetUrl } from '@/lib/directus-admin'
import { listAdminGalleryComparisons, listAdminGalleryPhotos } from '@/lib/gallery-admin'

const STATUS_LABELS = { draft: 'Borrador', published: 'Publicado', archived: 'Archivado' } as const
const CATEGORY_LABELS = {
  exterior: 'Exteriores',
  interiores: 'Interiores',
  focos: 'Focos',
  maquinaria: 'Maquinaria',
} as const

function SectionHeading({ id, title, description, href, action }: { id: string; title: string; description: string; href: string; action: string }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="font-display text-xl font-semibold sm:text-2xl" id={id}>{title}</h2>
        <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
      </div>
      <Link className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={href}>
        <Plus aria-hidden="true" size={17} />
        {action}
      </Link>
    </div>
  )
}

export default async function AdminGalleryPage() {
  let photos
  let comparisons
  try {
    [photos, comparisons] = await Promise.all([listAdminGalleryPhotos(), listAdminGalleryComparisons()])
  } catch {
    return (
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display text-3xl font-semibold">Galería</h1>
        <p className="mt-4 max-w-2xl rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">
          No fue posible cargar el contenido. Revisa la conexión y los permisos de galería en Directus.
        </p>
      </main>
    )
  }

  const publishedCount = [...photos, ...comparisons].filter((item) => item.status === 'published').length
  const draftCount = [...photos, ...comparisons].filter((item) => item.status === 'draft').length

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Galería</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Administra las fotos y los pares de antes y después que se muestran en el sitio.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-surface-container-low px-4 py-2 text-on-surface-variant">{publishedCount} publicados</span>
          <span className="rounded-full bg-surface-container-low px-4 py-2 text-on-surface-variant">{draftCount} borradores</span>
        </div>
      </header>

      <section className="mb-12" aria-labelledby="comparisons-heading">
        <SectionHeading
          action="Nueva comparativa"
          description="Cada trabajo conserva su foto de antes y su resultado final como pareja."
          href="/admin/galeria/comparativas/nueva"
          id="comparisons-heading"
          title="Antes y después"
        />
        {comparisons.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {comparisons.map((item) => (
              <Link aria-label={`Editar comparativa: ${item.title_es}`} className="group flex min-w-0 overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-lowest transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={`/admin/galeria/comparativas/${item.id}`} key={item.id}>
                <div className="grid w-2/5 shrink-0 grid-cols-2 gap-px bg-surface-container-low">
                  {[item.before_image, item.after_image].map((id, index) => {
                    const src = adminAssetUrl(id)
                    return src ? (
                      <div className="relative aspect-square" key={`${id}-${index}`}>
                        <Image alt="" className="object-cover" fill sizes="20vw" src={src} unoptimized />
                      </div>
                    ) : <div className="aspect-square" key={`empty-${index}`} />
                  })}
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0">
                    <span className="text-xs text-on-surface-variant">{STATUS_LABELS[item.status]} · Orden {item.sort}</span>
                    <h3 className="mt-1 truncate font-semibold">{item.title_es}</h3>
                    <p className="mt-1 truncate text-xs text-on-surface-variant">{item.slug}</p>
                  </div>
                  <ArrowRight aria-hidden="true" className="shrink-0 text-primary transition-transform group-hover:translate-x-1" size={18} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
            <Images aria-hidden="true" className="mx-auto text-on-surface-variant" size={24} />
            <h3 className="mt-3 font-semibold">Aún no hay comparativas</h3>
            <p className="mt-1 text-sm text-on-surface-variant">Agrega un par de imágenes para mostrar un resultado completo.</p>
          </div>
        )}
      </section>

      <section aria-labelledby="photos-heading">
        <SectionHeading
          action="Nueva foto"
          description="Las fotos publicadas aparecen en la cuadrícula y se pueden filtrar por categoría."
          href="/admin/galeria/fotos/nueva"
          id="photos-heading"
          title="Fotos"
        />
        {photos.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {photos.map((photo) => {
              const src = adminAssetUrl(photo.image)
              return (
                <Link aria-label={`Editar foto: ${photo.caption_es}`} className="group overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-lowest transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={`/admin/galeria/fotos/${photo.id}`} key={photo.id}>
                  <div className="relative aspect-[4/3] bg-surface-container-low">
                    {src ? <Image alt="" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" src={src} unoptimized /> : <div className="absolute inset-0 grid place-items-center text-sm text-on-surface-variant">Sin imagen</div>}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-on-surface-variant">{CATEGORY_LABELS[photo.category]} · {STATUS_LABELS[photo.status]} · Orden {photo.sort}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <h3 className="line-clamp-2 text-sm font-semibold">{photo.caption_es}</h3>
                      <ArrowRight aria-hidden="true" className="shrink-0 text-primary transition-transform group-hover:translate-x-1" size={17} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
            <Images aria-hidden="true" className="mx-auto text-on-surface-variant" size={24} />
            <h3 className="mt-3 font-semibold">Aún no hay fotos</h3>
            <p className="mt-1 text-sm text-on-surface-variant">Agrega una foto, escribe sus textos y elige dónde clasificarla.</p>
          </div>
        )}
      </section>
    </main>
  )
}
