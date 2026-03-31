// ============================================================
// Footer — Links, copyright, eco branding
// ============================================================

import Link from 'next/link'
import { navLinks, contactInfo } from '@/lib/services'
import { EcoChip } from '@/components/ui/EcoChip'

const legalLinks = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
  { label: 'Soporte', href: '/contacto' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-[var(--color-surface-container-low)] border-t border-[var(--color-outline-variant)]/20"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Branding */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit" aria-label="Detailing Marin">
              <span className="w-8 h-8 rounded-[var(--radius-md)] gradient-primary flex items-center justify-center text-white font-bold text-sm">
                DM
              </span>
              <span className="font-display font-bold text-lg text-[var(--color-on-surface)] tracking-tight">
                Detailing Marin
              </span>
            </Link>
            <p className="text-body-lg text-[var(--color-on-surface-variant)] text-sm max-w-xs">
              Servicio de detallado automotriz premium a domicilio. Cuidamos tu vehículo y el planeta.
            </p>
            <div className="mt-2">
              <EcoChip stat="90%" label="Ahorro de agua" />
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-[var(--color-on-surface)]">Explora</h2>
            <nav aria-label="Links del footer">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-[var(--color-on-surface)]">Contacto</h2>
            <address className="not-italic flex flex-col gap-3">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors text-sm"
              >
                📞 {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors text-sm"
              >
                ✉️ {contactInfo.email}
              </a>
              <p className="text-[var(--color-on-surface-variant)] text-sm">
                📍 {contactInfo.zone}
              </p>
              <p className="text-[var(--color-on-surface-variant)] text-sm">
                🕐 {contactInfo.hours}
              </p>
            </address>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-on-surface-variant)] text-xs text-center sm:text-left">
            © {year} Detailing Marin. Eco-Luxe Automotive Care.
          </p>
          <nav aria-label="Links legales">
            <ul className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
