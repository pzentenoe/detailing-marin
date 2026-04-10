'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Error Boundary]', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass border border-outline-variant/20 rounded-(--radius-xl) p-12 max-w-lg w-full text-center flex flex-col items-center gap-6 shadow-ambient">

        <div className="w-20 h-20 rounded-(--radius-xl) bg-error-container flex items-center justify-center text-4xl" aria-hidden="true">
          ⚠️
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold tracking-widest uppercase text-error">Algo salió mal</p>
          <h2 className="text-headline-md text-(--color-on-surface)">Error inesperado</h2>
          <p className="text-body-lg text-on-surface-variant">
            Ocurrió un problema al cargar esta página. Podés intentar de nuevo o contactarnos si el problema persiste.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={reset}
            className={[
              'flex-1 py-3 px-6 rounded-(--radius-lg)',
              'gradient-primary text-white font-bold text-sm',
              'shadow-float hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
            ].join(' ')}
          >
            Intentar de nuevo
          </button>
          <a
            href="https://wa.me/56954451422"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'flex-1 py-3 px-6 rounded-(--radius-lg)',
              'bg-[#25D366] text-white font-bold text-sm text-center',
              'hover:bg-[#20BD5C] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
            ].join(' ')}
            aria-label="Contactar por WhatsApp"
          >
            Contactar
          </a>
        </div>

      </div>
    </div>
  )
}
