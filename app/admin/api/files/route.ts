import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { writeDirectus } from '@/lib/directus-admin'

const MAX_IMAGE_SIZE = 8 * 1024 * 1024
const ALLOWED_IMAGES: Record<string, string[]> = {
  'image/avif': ['.avif'],
  'image/gif': ['.gif'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false

  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!await getAdminSession()) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Origen no permitido.' }, { status: 403 })
  }

  const folder = process.env.DIRECTUS_MEDIA_FOLDER_ID
  if (!folder) {
    return NextResponse.json({ error: 'Falta configurar la carpeta de imágenes.' }, { status: 503 })
  }

  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File) || file.size < 1 || file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: 'La imagen debe pesar menos de 8 MB.' }, { status: 400 })
    }

    const extension = `.${file.name.toLowerCase().split('.').pop() ?? ''}`
    if (!ALLOWED_IMAGES[file.type]?.includes(extension)) {
      return NextResponse.json({ error: 'Formato de imagen no compatible.' }, { status: 400 })
    }

    const upload = new FormData()
    upload.set('file', file, file.name)
    upload.set('folder', folder)
    upload.set('title', file.name.slice(0, 180))

    const response = await writeDirectus('/files', { method: 'POST', body: upload })
    if (!response.ok) {
      return NextResponse.json({ error: 'Directus no pudo guardar la imagen.' }, { status: 502 })
    }

    const payload = await response.json() as { data?: { id?: string } }
    if (!payload.data?.id) {
      return NextResponse.json({ error: 'Directus devolvió una respuesta inválida.' }, { status: 502 })
    }

    return NextResponse.json({ id: payload.data.id })
  } catch {
    return NextResponse.json({ error: 'No fue posible subir la imagen.' }, { status: 502 })
  }
}
