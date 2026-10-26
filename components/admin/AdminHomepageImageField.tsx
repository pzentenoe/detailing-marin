'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { RotateCcw, Upload } from 'lucide-react'

type Props = {
  label: string
  fileId: string | null
  fallbackSrc: string
  aspectClassName: string
  onChange: (id: string | null) => void
  onUploadingChange: (uploading: boolean) => void
}

export function AdminHomepageImageField({ label, fileId, fallbackSrc, aspectClassName, onChange, onUploadingChange }: Props) {
  const [preview, setPreview] = useState(fileId ? `/admin/assets/${fileId}` : fallbackSrc)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => () => {
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])

  async function upload(file: File | undefined) {
    if (!file) return
    setUploading(true)
    onUploadingChange(true)
    setError('')

    try {
      const form = new FormData()
      form.set('file', file)
      const response = await fetch('/admin/api/files', { method: 'POST', body: form })
      const result = await response.json() as { id?: string; error?: string }
      if (!response.ok || !result.id) throw new Error(result.error ?? 'No fue posible subir la imagen.')

      setPreview(URL.createObjectURL(file))
      onChange(result.id)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No fue posible subir la imagen.')
    } finally {
      setUploading(false)
      onUploadingChange(false)
    }
  }

  function restoreOriginal() {
    setError('')
    setPreview(fallbackSrc)
    onChange(null)
  }

  return (
    <div className="min-w-0 space-y-3">
      <div className={`relative overflow-hidden rounded-xl bg-surface-container-low ${aspectClassName}`}>
        <Image alt={`Vista previa: ${label}`} className="object-cover" fill sizes="(max-width: 768px) 50vw, 22rem" src={preview} unoptimized />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
          <Upload aria-hidden="true" size={16} />
          <span>{uploading ? 'Subiendo…' : fileId ? 'Cambiar imagen' : 'Subir imagen'}</span>
          <input
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={uploading}
            onChange={(event) => {
              const file = event.currentTarget.files?.[0]
              event.currentTarget.value = ''
              void upload(file)
            }}
            type="file"
          />
        </label>
        {fileId && <button className="inline-flex min-h-11 items-center gap-2 rounded-full border border-outline-variant/60 px-4 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60" disabled={uploading} onClick={restoreOriginal} type="button">
          <RotateCcw aria-hidden="true" size={15} />
          Restaurar original
        </button>}
      </div>
      <p className="text-xs leading-5 text-on-surface-variant">JPG, PNG, WebP, AVIF o GIF · máximo 8 MB</p>
      {error && <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-error" role="alert">{error}</p>}
    </div>
  )
}
