// ============================================================
// Footer — Links, copyright, eco branding
// ============================================================

import Image from 'next/image'
import Link from 'next/link'
import { navLinks, contactInfo } from '@/lib/services'
import { EcoChip } from '@/components/ui/EcoChip'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/detailing_marin',
    color: '#E1306C',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61586193856361',
    color: '#1877F2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

const legalLinks = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-surface-container-low border-t border-outline-variant/20"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Branding */}
          <div className="flex flex-col gap-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 w-fit" aria-label="Detailing Marin">
              <Image
                src="/icon/logo-removebg.png"
                alt="Nadia Marin Detailing"
                width={56}
                height={56}
                className="object-contain drop-shadow-md"
              />
              <span className="font-display font-bold text-lg text-(--color-on-surface) tracking-tight">
                Detailing Marin
              </span>
            </Link>
            <p className="text-body-lg text-on-surface-variant text-sm max-w-xs">
              Servicio de detallado automotriz premium a domicilio. Cuidamos tu vehículo y el planeta.
            </p>
            <div>
              <EcoChip stat="90%" label="Ahorro de agua" />
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">Explora</h2>
            <nav aria-label="Links del footer">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-on-surface-variant hover:text-primary transition-colors text-sm"
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
            <h2 className="text-label-md text-(--color-on-surface)">Contacto</h2>
            <address className="not-italic flex flex-col gap-3">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm"
              >
                📞 {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm"
              >
                ✉️ {contactInfo.email}
              </a>
              <p className="text-on-surface-variant text-sm">
                📍 {contactInfo.zone}
              </p>
              <p className="text-on-surface-variant text-sm">
                🕐 {contactInfo.hours}
              </p>
            </address>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">Síguenos</h2>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-on-surface-variant hover:text-primary transition-colors duration-200"
                  style={{ ['--hover-color' as string]: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + Copyright + Redes */}
        <div className="mt-12 pt-6 border-t border-outline-variant/20 grid grid-cols-3 items-center">
          {/* Izquierda — vacío para balancear */}
          <div />

          {/* Centro — copyright */}
          <p className="text-on-surface-variant text-xs text-center">
            © {year} Detailing Marin. Eco-Luxe Automotive Care.
          </p>

          {/* Derecha — links legales */}
          <nav aria-label="Links legales" className="flex justify-end">
            <ul className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant hover:text-primary transition-colors text-xs"
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
