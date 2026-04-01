import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Detailing Marin',
    short_name: 'Detailing Marin',
    description: 'Servicio de detallado automotriz premium a domicilio. Cuidamos tu vehículo y el planeta.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f0a',
    theme_color: '#2d5a27',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: '/icons/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
