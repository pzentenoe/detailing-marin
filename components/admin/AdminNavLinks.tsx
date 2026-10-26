'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/admin/inicio', label: 'Inicio' },
  { href: '/admin/servicios', label: 'Servicios' },
  { href: '/admin/galeria', label: 'Galería' },
  { href: '/admin/footer', label: 'Pie de página' },
] as const

export function AdminNavLinks() {
  const pathname = usePathname()

  return (
    <>
      {ITEMS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`)

        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${active ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
            href={href}
            key={href}
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}
