# Herramientas SEO — Guía de referencia

Documento de referencia para las herramientas usadas en el SEO de Detailing Marin.
Última actualización: 2026-04-06

---

## 1. Google Search Console

**URL:** [search.google.com/search-console](https://search.google.com/search-console)
**Cuenta:** la cuenta Google del cliente

### Para qué sirve

Permite saber cómo Google ve el sitio: qué páginas indexó, qué keywords generan impresiones, si hay errores de rastreo, y enviar el sitemap.

### Verificación del sitio

El sitio ya está verificado. La verificación está implementada vía meta tag en el código:

- **Variable de entorno:** `GOOGLE_SITE_VERIFICATION`
- **Dónde se usa:** `app/[locale]/layout.tsx` → `metadata.verification.google`
- **Cómo obtener el token:**
  1. Entrar a Search Console → Agregar propiedad
  2. Elegir método: **Etiqueta HTML**
  3. Copiar el valor del `content="..."` (no el tag completo, solo el valor)
  4. En Vercel: Project Settings → Environment Variables → agregar `GOOGLE_SITE_VERIFICATION`
  5. Redeploy de producción

### Enviar el sitemap

Hacerlo una vez al inicio y cada vez que se agreguen páginas nuevas:

1. Panel izquierdo → **Sitemaps**
2. En el campo, pegar: `https://www.detailingmarin.cl/sitemap.xml`
3. Click **Enviar**
4. Verificar que el estado diga ✅ (puede tardar unas horas)

El sitemap incluye automáticamente:
- Home (ES + EN)
- Servicios (ES + EN)
- Contacto (ES + EN)
- Cada landing de servicio × 2 locales = 10 URLs

### Cosas a revisar mensualmente

| Sección | Qué revisar |
|---------|-------------|
| **Rendimiento** | Clics, impresiones, CTR y posición promedio por keyword |
| **Cobertura** | Páginas indexadas vs. páginas con error |
| **Mejoras** | Rich results (FAQ, BreadcrumbList) — errores de JSON-LD |
| **Sitemaps** | Estado del sitemap (sin errores) |

### Keywords a monitorear

- `lavado de autos a domicilio Santiago`
- `aspirado de autos a domicilio Santiago`
- `detailing automotriz Santiago`
- `lavado ecológico autos Santiago`
- `car detailing Santiago`
- `pulido de autos a domicilio`
- `lavado de autos a domicilio [comuna]` (ej: Las Condes, La Florida, Providencia)

---

## 2. Sitemap

**URL pública:** `https://www.detailingmarin.cl/sitemap.xml`
**Archivo en código:** `app/sitemap.ts`

### Cómo funciona

Next.js genera el sitemap automáticamente en tiempo de build. Incluye:
- `lastmod`: fecha del deploy (se actualiza sola en cada deploy)
- `alternates.languages`: hreflang ES/EN por cada URL
- `images`: imagen OG por página

### Cuándo reenviar en Search Console

- Después de agregar páginas nuevas (nuevos servicios, blog, etc.)
- Después de cambiar URLs o slugs
- Si Google reporta errores en el sitemap

---

## 3. Google PageSpeed Insights

**URL:** [pagespeed.web.dev](https://pagespeed.web.dev)
**No requiere cuenta**

### Para qué sirve

Mide el rendimiento real del sitio con datos de campo (usuarios reales) y datos de laboratorio (Lighthouse simulado). Google usa estas métricas como señal de ranking.

### Cómo usarlo

1. Ir a [pagespeed.web.dev](https://pagespeed.web.dev)
2. Pegar la URL: `https://www.detailingmarin.cl`
3. Click **Analyze**
4. Ver resultados en **Mobile** y **Desktop** por separado

> ⚠️ Siempre revisar Mobile primero — Google usa mobile-first indexing.

### Scores actuales (2026-04-06)

| Métrica | Desktop | Mobile |
|---------|---------|--------|
| Performance | 99 🟢 | 89→90+ 🟢 |
| Accessibility | 96 🟢 | 96 🟢 |
| Best Practices | 100 🟢 | 100 🟢 |
| SEO | 100 🟢 | 100 🟢 |

### Umbral de Google (Core Web Vitals)

| Métrica | Bueno | Mejorable | Malo |
|---------|-------|-----------|------|
| LCP (carga del elemento más grande) | < 2.5 s | 2.5–4 s | > 4 s |
| CLS (saltos de contenido) | < 0.1 | 0.1–0.25 | > 0.25 |
| INP (respuesta a interacciones) | < 200 ms | 200–500 ms | > 500 ms |

### Cuándo correrlo

- Después de cada deploy con cambios de imágenes, componentes, o fuentes
- Si Google Search Console reporta caída en Core Web Vitals
- Al agregar nuevas secciones o páginas

---

## 4. Lighthouse (Chrome DevTools)

**Cómo abrir:** Chrome → `F12` → pestaña **Lighthouse**
**No requiere cuenta ni instalar nada**

### Para qué sirve

Versión local de PageSpeed Insights. Más útil para desarrollo porque se puede correr en `localhost` antes de publicar.

### Cómo usarlo

1. Abrir el sitio en Chrome (producción o `localhost:3000`)
2. `F12` → pestaña **Lighthouse**
3. Configurar:
   - **Mode:** Navigation
   - **Device:** Mobile ← siempre empezar por mobile
   - **Categories:** marcar Performance + SEO
4. Click **Analyze page load**
5. Esperar ~30 segundos

### Cuándo usar Lighthouse vs PageSpeed

| Situación | Usar |
|-----------|------|
| Verificar antes de publicar | Lighthouse local en `localhost` |
| Ver datos reales de usuarios | PageSpeed Insights (datos de campo) |
| Diagnosticar problemas específicos | Lighthouse (detalla oportunidades) |
| Reportar estado al cliente | PageSpeed Insights (URL compartible) |

### Oportunidades comunes a revisar

- **Largest Contentful Paint (LCP):** imagen hero sin `priority` prop
- **Cumulative Layout Shift (CLS):** imágenes sin dimensiones explícitas
- **Unused JavaScript:** bundles grandes no usados en esa página
- **Render-blocking resources:** CSS o scripts que bloquean el render

---

## 5. Rich Results Test

**URL:** [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
**No requiere cuenta**

### Para qué sirve

Valida que el JSON-LD (Schema.org) esté correctamente implementado y sea elegible para rich results en Google (FAQ desplegables, breadcrumbs, estrellas de rating, etc.).

### Cómo usarlo

1. Ir a la herramienta
2. Pegar la URL de la página a validar
3. Click **Probar URL**
4. Revisar los schemas detectados y si hay errores

### Páginas a validar

| URL | Schemas esperados |
|-----|-------------------|
| `https://www.detailingmarin.cl/` | FAQPage, AutomotiveBusiness |
| `https://www.detailingmarin.cl/servicios` | FAQPage, ItemList, BreadcrumbList |
| `https://www.detailingmarin.cl/servicios/lavado-ecologico` | Service, FAQPage, BreadcrumbList |
| `https://www.detailingmarin.cl/contacto` | ContactPage, BreadcrumbList |

---

## 6. Google Business Profile

**URL:** [business.google.com](https://business.google.com)
**Estado actual:** ⏳ Pendiente — debe crearlo el cliente

### Para qué sirve

Es el perfil del negocio que aparece en Google Maps y en el **Local Pack** (los 3 resultados con mapa que aparecen antes de los resultados orgánicos). Sin esto, el sitio no aparece en búsquedas locales con mapa.

### Pasos para crearlo

1. Ir a [business.google.com](https://business.google.com)
2. Sign in con cuenta Google del cliente
3. Nombre del negocio: `Detailing Marin`
4. Categoría: `Servicio de lavado de autos`
5. Tipo: **negocio a domicilio** → área de servicio: `Región Metropolitana de Santiago`
6. Agregar teléfono: `+56 9 5445 1422`
7. Agregar sitio web: `https://www.detailingmarin.cl`
8. **Verificar** el negocio (llamada telefónica o código SMS)

### Después de verificarlo

Agregar la URL de Google Maps al array `sameAs` en `lib/seo.ts`:

```ts
sameAs: [
  'https://www.instagram.com/detailing_marin',
  'https://www.facebook.com/profile.php?id=61586193856361',
  'https://maps.google.com/?cid=XXXXXXXXX', // ← agregar esta
],
```

---

## Flujo recomendado después de un deploy

```
1. Deploy en Vercel
       ↓
2. PageSpeed Insights → revisar mobile performance
       ↓
3. Rich Results Test → validar JSON-LD sin errores
       ↓
4. Search Console → revisar cobertura e indexación
       ↓
5. Si hay páginas nuevas → reenviar sitemap
```
