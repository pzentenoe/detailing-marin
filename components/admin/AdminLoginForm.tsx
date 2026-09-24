'use client'

import { useActionState } from 'react'
import { login, type AdminLoginState } from '@/app/admin/actions'

const initialState: AdminLoginState = {}

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(login, initialState)

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="admin-email">
          Correo electrónico
        </label>
        <input
          autoComplete="username"
          className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-on-surface-variant/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          id="admin-email"
          name="email"
          placeholder="nombre@dominio.com"
          required
          type="email"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="admin-password">
          Contraseña
        </label>
        <input
          autoComplete="current-password"
          className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-on-surface-variant/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          id="admin-password"
          name="password"
          required
          type="password"
        />
      </div>

      {state.error && (
        <p aria-live="polite" className="rounded-xl bg-error-container px-4 py-3 text-sm text-error" role="alert">
          {state.error}
        </p>
      )}

      <button
        className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-on-primary shadow-float transition-all hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Verificando acceso…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
