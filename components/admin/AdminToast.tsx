'use client'

import { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

export function AdminToast({ message, toastId }: { message: string; toastId: string | null }) {
  const [visible, setVisible] = useState(Boolean(toastId))

  const dismiss = () => {
    setVisible(false)
    if (toastId) clearDeletedMarker(toastId)
  }

  if (!visible) return null

  return (
    <div aria-live="polite" className="fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-xl border border-primary/20 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface shadow-float" role="status">
      <CheckCircle aria-hidden="true" className="shrink-0 text-primary" size={19} />
      <span className="min-w-0 flex-1">{message}</span>
      <button aria-label="Cerrar notificación" className="shrink-0 rounded-lg p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-primary" onClick={dismiss} type="button">
        <X aria-hidden="true" size={17} />
      </button>
    </div>
  )
}

function clearDeletedMarker(toastId: string) {
  const url = new URL(window.location.href)
  if (url.searchParams.get('deleted') !== toastId) return

  url.searchParams.delete('deleted')
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}
