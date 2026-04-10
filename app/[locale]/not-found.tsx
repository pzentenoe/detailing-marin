import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--color-surface)">
      <div className="glass border border-outline-variant/20 rounded-(--radius-xl) p-12 max-w-lg w-full text-center flex flex-col items-center gap-6 shadow-ambient">

        <div className="w-20 h-20 rounded-(--radius-xl) bg-secondary-container flex items-center justify-center text-4xl" aria-hidden="true">
          🔍
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold tracking-widest uppercase text-primary">Error 404</p>
          <h1 className="text-display-md text-(--color-on-surface)">Página no encontrada</h1>
          <p className="text-body-lg text-on-surface-variant">
            La página que buscás no existe o fue movida. Podés volver al inicio o contactarnos por WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className={[
              'flex-1 py-3 px-6 rounded-(--radius-lg)',
              'gradient-primary text-white font-bold text-sm text-center',
              'shadow-float hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
            ].join(' ')}
          >
            Volver al inicio
          </Link>
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
            WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}
