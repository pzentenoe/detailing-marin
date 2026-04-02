'use client'

// ============================================================
// LanguageSelector — Dropdown con banderas para ES / EN
// Usa next-intl navigation para cambios de locale con URL
// ============================================================

import { useState, useRef, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { ChevronDown } from 'lucide-react'

const locales = [
  { code: 'es', label: 'Español', flag: '🇨🇱' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
] as const

type LocaleCode = (typeof locales)[number]['code']

export function LanguageSelector() {
  const locale = useLocale() as LocaleCode
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = locales.find((l) => l.code === locale) ?? locales[0]

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleSelect = (code: LocaleCode) => {
    router.replace(pathname, { locale: code })
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('selectLanguage')}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={[
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium',
          'text-(--color-on-surface) hover:bg-surface-container',
          'transition-colors duration-200',
        ].join(' ')}
      >
        <span aria-hidden="true" className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('selectLanguage')}
          className={[
            'absolute right-0 top-full mt-1 z-50 min-w-[140px]',
            'glass border border-outline-variant/20 rounded-(--radius-md)',
            'shadow-float overflow-hidden',
          ].join(' ')}
        >
          {locales.map((item) => {
            const isSelected = item.code === locale
            return (
              <li key={item.code} role="option" aria-selected={isSelected}>
                <button
                  onClick={() => handleSelect(item.code)}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left',
                    'transition-colors duration-150',
                    isSelected
                      ? 'bg-surface-container text-primary font-semibold'
                      : 'text-(--color-on-surface) hover:bg-surface-container-high',
                  ].join(' ')}
                >
                  <span aria-hidden="true">{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
