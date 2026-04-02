'use client'

// ============================================================
// Navbar — Glassmorphic con dark mode toggle + language selector
// Sticky con efecto al scroll, mobile hamburger menu
// ============================================================

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { navHrefs, WA_MESSAGE } from '@/lib/services'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/components/layout/ThemeProvider'
import { LanguageSelector } from '@/components/layout/LanguageSelector'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56954451422'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const t = useTranslations('nav')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on navigation — handled via Link onClick instead of effect

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-[background-color,box-shadow,border-color] duration-300 ease-out',
        'border-b',
        isScrolled
          ? 'glass shadow-ambient border-outline-variant/20'
          : 'bg-surface/80 backdrop-blur-md border-outline-variant/10',
      ]
        .filter(Boolean)
        .join(' ')}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-22">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={t('logoAria')}
          >
            <Image
              src="/icon/logo-removebg.png"
              alt="Nadia Marin Detailing"
              width={72}
              height={72}
              style={{ height: 'auto' }}
              className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
              priority
            />
            <span className="font-display font-bold text-xl text-(--color-on-surface) tracking-tight group-hover:text-primary transition-colors">
              Detailing Marin
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navHrefs.map((link) => {
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
                  {t(link.labelKey)}
                </Link>
              )
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language selector */}
            <LanguageSelector />

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-md text-(--color-on-surface) hover:bg-surface-container transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
              title={theme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {theme === 'dark'
                ? <Sun size={20} aria-hidden="true" className="text-primary-fixed" />
                : <Moon size={20} aria-hidden="true" />}
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open(WA_URL, '_blank')}
              aria-label={t('ctaAria')}
            >
              {t('cta')}
            </Button>
          </div>

          {/* Mobile: language + dark mode + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageSelector />
            <button
              onClick={toggle}
              className="p-2 rounded-md text-(--color-on-surface) hover:bg-surface-container transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {theme === 'dark'
                ? <Sun size={20} aria-hidden="true" className="text-primary-fixed" />
                : <Moon size={20} aria-hidden="true" />}
            </button>
            <button
              className="p-2 rounded-md text-(--color-on-surface) hover:bg-surface-container-high transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
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
          {navHrefs.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
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
                {t(link.labelKey)}
              </Link>
            )
          })}
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => window.open(WA_URL, '_blank')}
            aria-label={t('ctaAria')}
          >
            {t('cta')}
          </Button>
        </nav>
      </div>
    </header>
  )
}
