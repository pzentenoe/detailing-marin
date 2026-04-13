'use client'

// ============================================================
// WhatsAppFAB — Botón flotante de WhatsApp
// Posición fija: borde inferior izquierdo
// Número configurable via NEXT_PUBLIC_WHATSAPP_NUMBER
// ============================================================

import { useTranslations } from 'next-intl'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { analytics } from '@/lib/analytics'

export function WhatsAppFAB() {
  const t = useTranslations('shared')
  const url = buildWhatsAppUrl(t('whatsappMessage'))

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.whatsappClick({ source: 'fab' })}
      className={[
        'fixed bottom-6 left-6 z-40',
        'w-14 h-14 rounded-full',
        'bg-[#25D366] hover:bg-[#20BD5C] active:bg-[#1DA851]',
        'flex items-center justify-center',
        'shadow-float hover:shadow-ambient',
        'transition-[transform,box-shadow] duration-200',
        'hover:scale-110 active:scale-95',
      ].join(' ')}
      aria-label={t('contactViaWhatsApp')}
    >
      {/* WhatsApp SVG oficial */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.004 2C8.274 2 2 8.272 2 15.999c0 2.467.644 4.883 1.869 7.01L2 30l7.236-1.896A14.01 14.01 0 0 0 16.004 30C23.732 30 30 23.727 30 16c0-3.738-1.458-7.252-4.104-9.896A13.952 13.952 0 0 0 16.004 2zm0 2.162c3.202 0 6.21 1.249 8.47 3.515A11.874 11.874 0 0 1 27.84 16c0 6.542-5.294 11.838-11.836 11.838a11.79 11.79 0 0 1-5.99-1.632l-.43-.256-4.447 1.164 1.185-4.33-.28-.445A11.782 11.782 0 0 1 4.162 16C4.162 9.459 9.46 4.162 16.004 4.162zm-3.26 6.8c-.208 0-.545.079-.83.39-.285.312-1.088 1.064-1.088 2.594s1.114 3.009 1.268 3.217c.156.208 2.17 3.424 5.315 4.66 2.625 1.036 3.155.829 3.726.777.57-.052 1.839-.752 2.098-1.478.26-.727.26-1.35.182-1.478-.078-.13-.286-.208-.598-.364-.312-.156-1.84-.908-2.125-1.013-.286-.104-.494-.156-.701.156-.208.312-.804 1.013-.986 1.22-.182.208-.364.234-.676.078-.312-.156-1.317-.486-2.51-1.549-.927-.828-1.553-1.85-1.735-2.163-.182-.312-.02-.48.136-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.697-1.69-.963-2.313-.254-.604-.512-.52-.701-.53a12.5 12.5 0 0 0-.598-.013z" />
      </svg>
    </a>
  )
}
