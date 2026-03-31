'use client'

// ============================================================
// Navbar — Glassmorphic con dark mode toggle
// Sticky con efecto al scroll, mobile hamburger menu
// ============================================================

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks } from '@/lib/services'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/components/layout/ThemeProvider'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menu al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-out',
        isScrolled
          ? 'glass shadow-ambient border-b border-outline-variant/20'
          : 'bg-transparent',
      ]
        .filter(Boolean)
        .join(' ')}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Detailing Marin — Ir al inicio"
          >
            <span
              className="w-8 h-8 rounded-md gradient-primary flex items-center justify-center text-white font-bold text-sm"
              aria-hidden="true"
            >
              DM
            </span>
            <span className="font-display font-bold text-lg text-(--color-on-surface) tracking-tight group-hover:text-primary transition-colors">
              Detailing Marin
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'text-sm font-medium transition-colors duration-200',
                    'hover:text-primary',
                    'relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-opacity after:duration-200',
                    isActive
                      ? 'text-primary after:bg-primary after:opacity-100'
                      : 'text-on-surface-variant after:bg-primary after:opacity-0 hover:after:opacity-100',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-md text-(--color-on-surface) hover:bg-surface-container transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark'
                ? <Sun size={20} aria-hidden="true" className="text-primary-fixed" />
                : <Moon size={20} aria-hidden="true" />}
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                window.open(
                  'https://wa.me/56912345678?text=Hola%2C%20quiero%20agendar%20un%20servicio',
                  '_blank',
                )
              }}
              aria-label="Agendar servicio por WhatsApp"
            >
              Agendar Servicio
            </Button>
          </div>

          {/* Dark mode toggle (mobile) + Hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggle}
              className="p-2 rounded-md text-(--color-on-surface) hover:bg-surface-container transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark'
                ? <Sun size={20} aria-hidden="true" className="text-primary-fixed" />
                : <Moon size={20} aria-hidden="true" />}
            </button>
            <button
              className="p-2 rounded-md text-(--color-on-surface) hover:bg-surface-container-high transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden glass border-t border-outline-variant/20',
          'transition-all duration-300 ease-out overflow-hidden',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isOpen}
      >
        <nav
          className="px-4 py-4 flex flex-col gap-4"
          aria-label="Navegación móvil"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'text-base font-medium py-2 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() =>
              window.open(
                'https://wa.me/56912345678?text=Hola%2C%20quiero%20agendar%20un%20servicio',
                '_blank',
              )
            }
            aria-label="Agendar servicio por WhatsApp"
          >
            Agendar Servicio
          </Button>
        </nav>
      </div>
    </header>
  )
}
