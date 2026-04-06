# Google Search Console operativo (implementación técnica)

## Implementado en código

- Meta de verificación de Google configurable por entorno:
  - Variable: `GOOGLE_SITE_VERIFICATION`
  - Archivo: `app/[locale]/layout.tsx` (`metadata.verification.google`)

## Qué hacer en Vercel

1. Ir a **Project Settings → Environment Variables**
2. Crear `GOOGLE_SITE_VERIFICATION` con el token de Search Console
3. Redeploy de producción

## Verificación rápida

- Abrir HTML de la home y confirmar:
  - `<meta name="google-site-verification" content="...">`

## Operación semanal mínima

- Revisar en GSC:
  - Indexación de páginas de servicios (`/servicios/[slug]` + `/en/...`)
  - Errores de cobertura
  - Rendimiento por consulta (CTR + posición)
- Reenviar sitemap tras cambios estructurales:
  - `https://www.detailingmarin.cl/sitemap.xml`
