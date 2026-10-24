'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag === 'undefined') return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      {/*
        `gtag.js` pesa ~181 KB. Con `afterInteractive` competía por el
        critical path (46 % sin usar, long task de 66 ms y forced reflow).
        `lazyOnload` lo retrasa hasta después de `load`; el shim `dataLayer`
        está en el root layout, así que no se pierde ningún evento.
      */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  )
}
