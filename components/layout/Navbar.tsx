'use client'

// ============================================================
// Navbar — Glassmorphic con dark mode toggle + language selector
// Sticky con efecto al scroll, mobile hamburger menu
// ============================================================

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { navHrefs } from '@/lib/services'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/components/layout/ThemeProvider'
import { LanguageSelector } from '@/components/layout/LanguageSelector'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const t = useTranslations('nav')
  const tShared = useTranslations('shared')
  const WA_URL = buildWhatsAppUrl(tShared('whatsappMessage'))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-[background-color,box-shadow,border-color] duration-300 ease-out',
        'border-b',
        isScrolled
          ? 'bg-surface/95 backdrop-blur-xl shadow-ambient border-outline-variant/20'
          : 'bg-surface/90 backdrop-blur-md border-outline-variant/10',
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
            className="flex min-w-0 items-center gap-2 sm:gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm"
            aria-label={t('logoAria')}
          >
            <Image
              src="/icon/logo-removebg.png"
              alt="Nadia Marin Detailing"
              width={72}
              height={52}
              sizes="72px"
              style={{ height: 'auto' }}
              className="w-14 min-[400px]:w-[72px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              priority
            />
            <span className="hidden min-[360px]:inline font-display font-bold text-base lg:text-xl whitespace-nowrap text-(--color-on-surface) tracking-tight group-hover:text-primary transition-colors">
              Detailing Marin
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8" aria-label="Navegación principal">
            {navHrefs.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'text-sm font-medium transition-colors duration-200 py-3',
                    'hover:text-primary',
                    'relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-opacity after:duration-200',
                    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm',
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
          <div className="hidden lg:flex items-center gap-2">
            {/* Language selector */}
            <LanguageSelector />

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="grid size-11 place-items-center rounded-(--radius-md) text-(--color-on-surface) hover:bg-surface-container transition-[background-color,transform] duration-200 active:scale-95 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
          <div className="lg:hidden flex items-center gap-1">
            <LanguageSelector />
            <button
              onClick={toggle}
              className="grid size-11 place-items-center rounded-(--radius-md) text-(--color-on-surface) hover:bg-surface-container transition-[background-color,transform] duration-200 active:scale-95 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {theme === 'dark'
                ? <Sun size={20} aria-hidden="true" className="text-primary-fixed" />
                : <Moon size={20} aria-hidden="true" />}
            </button>
            <button
              ref={menuButtonRef}
              className="grid size-11 place-items-center rounded-(--radius-md) text-(--color-on-surface) hover:bg-surface-container-high transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20">
          <nav className="px-4 py-4 flex flex-col gap-4" aria-label="Navegación móvil">
            {navHrefs.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    'text-base font-medium py-3 transition-colors',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm',
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
              onClick={() => { setIsOpen(false); window.open(WA_URL, '_blank') }}
              aria-label={t('ctaAria')}
            >
              {t('cta')}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
