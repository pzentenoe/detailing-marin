import { NextResponse } from 'next/server'
import { getServices } from '@/lib/service-catalog'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const IMAGE_TYPES = new Set(['image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp'])

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const baseUrl = process.env.DIRECTUS_URL?.replace(/\/+$/, '')
  const token = process.env.DIRECTUS_TOKEN
  if (!UUID.test(id) || !baseUrl || !token) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  try {
    const assetPath = `/api/directus-assets/${id}`
    const services = await getServices('es')
    if (!services.some((service) => service.image === assetPath || service.imageBefore === assetPath)) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    const response = await fetch(new URL(`/assets/${id}`, baseUrl), {
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'error',
      cache: 'force-cache',
    })
    const contentType = response.headers.get('content-type')
    if (!response.ok || !contentType || !IMAGE_TYPES.has(contentType.split(';')[0].trim().toLowerCase())) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Asset unavailable' }, { status: 502 })
  }
}
