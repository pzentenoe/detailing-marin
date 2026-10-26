import Link from 'next/link'
import { logout } from '@/app/admin/actions'
import { AdminNavLinks } from '@/components/admin/AdminNavLinks'

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-8">
        <Link className="flex items-center gap-3" href="/admin/inicio">
          <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-primary font-display text-lg font-bold text-on-primary">D</span>
          <span><span className="block text-sm font-semibold text-on-surface">Detailing Marin</span><span className="block text-xs text-on-surface-variant">Panel de administración</span></span>
          </Link>
          <nav aria-label="Administración" className="flex w-full flex-wrap items-center justify-end gap-1 sm:w-auto sm:gap-3">
            <AdminNavLinks />
          <form action={logout}><button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-outline-variant/60 px-3 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm" type="submit">Cerrar sesión</button></form>
        </nav>
      </div>
    </header>
  )
}
