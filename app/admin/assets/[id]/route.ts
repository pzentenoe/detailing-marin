import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { isFileInAdminMediaFolder, isFileReferencedByService } from '@/lib/directus-admin'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const IMAGE_TYPES = new Set(['image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp'])

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const { id } = await params
  const baseUrl = process.env.DIRECTUS_URL?.replace(/\/+$/, '')
  const token = process.env.DIRECTUS_TOKEN
  if (!UUID.test(id) || !baseUrl || !token) {
    return NextResponse.json({ error: 'Imagen no encontrada.' }, { status: 404 })
  }

  try {
    const [referenced, inAdminFolder] = await Promise.all([
      isFileReferencedByService(id),
      isFileInAdminMediaFolder(id),
    ])
    if (!referenced && !inAdminFolder) {
      return NextResponse.json({ error: 'Imagen no encontrada.' }, { status: 404 })
    }

    const response = await fetch(new URL(`/assets/${id}`, baseUrl), {
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'error',
      cache: 'no-store',
    })
    const contentType = response.headers.get('content-type')
    if (!response.ok || !contentType || !IMAGE_TYPES.has(contentType.split(';')[0].trim().toLowerCase())) {
      return NextResponse.json({ error: 'Imagen no encontrada.' }, { status: 404 })
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=300',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return NextResponse.json({ error: 'No fue posible cargar la imagen.' }, { status: 502 })
  }
}
