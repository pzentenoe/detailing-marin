'use client'

// ============================================================
// TrackEvent — Dispara un evento GA4 al montar el componente.
// Uso en server components que no pueden llamar analytics directamente.
// ============================================================

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  name: string
  params?: Record<string, unknown>
}

export function TrackEvent({ name, params }: Props) {
  useEffect(() => {
    trackEvent(name, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
