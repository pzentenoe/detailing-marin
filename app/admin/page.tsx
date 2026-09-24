import { LockKeyhole } from 'lucide-react'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'
import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getAdminSession()
  if (session) redirect('/admin/servicios')

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 -top-32 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-36 -right-24 size-[28rem] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-float">
            <LockKeyhole aria-hidden="true" size={24} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Detailing Marin
          </p>
          <p className="mt-2 text-sm text-on-surface-variant">Administración privada</p>
        </header>

        <section className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest/95 p-7 shadow-ambient backdrop-blur-sm sm:p-9">
          <div className="mb-7">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Ingresa a tu cuenta
            </h1>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Acceso exclusivo para el equipo de Detailing Marin.
            </p>
          </div>
          <AdminLoginForm />
        </section>

        <p className="mt-6 text-center text-xs text-on-surface-variant">
          Acceso privado · Solo personal autorizado
        </p>
      </div>
    </main>
  )
}
