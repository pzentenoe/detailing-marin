import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { AdminToast } from '@/components/admin/AdminToast'
import { getAdminSession } from '@/lib/admin-auth'
import { adminAssetUrl, listAdminServices } from '@/lib/directus-admin'
import { redirect } from 'next/navigation'

export const metadata: Metadata = { title: 'Servicios | Administración' }

type PageProps = { searchParams: Promise<{ deleted?: string | string[] }> }

const STATUS_LABELS: Record<string, string> = {
  published: 'Publicado',
  draft: 'Borrador',
  archived: 'Archivado',
}

export default async function AdminServicesPage({ searchParams }: PageProps) {
  const session = await getAdminSession()
  if (!session) redirect('/admin')
  const rawDeletedId = (await searchParams).deleted
  const parsedDeletedId = typeof rawDeletedId === 'string' ? Number(rawDeletedId) : NaN
  const deletedId = Number.isSafeInteger(parsedDeletedId) && parsedDeletedId > 0 ? String(parsedDeletedId) : null

  let services
  try {
    services = await listAdminServices()
  } catch {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-semibold">Servicios</h1>
        <p className="mt-4 rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">
          No fue posible cargar el catálogo. Revisa la configuración de Directus e inténtalo de nuevo.
        </p>
      </main>
    )
  }

  const publishedCount = services.filter((service) => service.status === 'published').length
  const draftCount = services.filter((service) => service.status === 'draft').length

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <AdminToast message="El servicio se eliminó correctamente." toastId={deletedId} />
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contenido del sitio</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Servicios</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Edita el catálogo que aparece en las páginas públicas.</p>
        </div>
        <Link className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-float transition-colors hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="/admin/servicios/nuevo">
          <Plus aria-hidden="true" size={18} />
          Nuevo servicio
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-ambient">
          <p className="text-xs text-on-surface-variant">Servicios publicados</p>
          <p className="mt-1 font-display text-2xl font-semibold">{publishedCount}</p>
        </div>
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-ambient">
          <p className="text-xs text-on-surface-variant">Borradores</p>
          <p className="mt-1 font-display text-2xl font-semibold">{draftCount}</p>
        </div>
      </div>

      {services.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-outline-variant bg-surface-container-low p-10 text-center">
          <h2 className="font-display text-xl font-semibold">El catálogo está vacío</h2>
          <p className="mt-2 text-sm text-on-surface-variant">Crea el primer servicio para comenzar.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const image = adminAssetUrl(service.image)
            return (
              <Link
                aria-label={`Editar ${service.title_es || service.slug || `servicio ${service.id}`}`}
                className="group overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-lowest shadow-ambient transition-all hover:-translate-y-0.5 hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href={`/admin/servicios/${service.id}`}
                key={service.id}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-container-low">
                  {image ? (
                    <Image alt="" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" src={image} unoptimized />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-sm text-on-surface-variant">Sin imagen principal</div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-surface-container-lowest/95 px-3 py-1 text-xs font-semibold text-on-surface shadow-ambient">
                    {STATUS_LABELS[service.status] ?? service.status}
                  </span>
                  {service.is_featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-lg font-semibold">{service.title_es || 'Servicio sin título'}</h2>
                      <p className="mt-1 text-xs text-on-surface-variant">/{service.slug || 'sin-slug'} · Orden {service.sort ?? service.id}</p>
                    </div>
                    <ArrowRight aria-hidden="true" className="mt-1 shrink-0 text-primary transition-transform group-hover:translate-x-1" size={18} />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-on-surface-variant">
                    {service.short_description_es || 'Agrega una descripción breve.'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
