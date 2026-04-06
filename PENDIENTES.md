# Pendientes — Detailing Marin

Tareas pendientes organizadas por responsable y prioridad.
Última actualización: 2026-04-06

---

## Cliente (requiere acción del dueño del negocio)

### Crítico

- [ ] **Google Business Profile** — Crear y verificar perfil en [business.google.com](https://business.google.com). Sin esto no aparece en el Local Pack (mapa de Google). Pasos:
  1. Ir a business.google.com con cuenta Google
  2. Nombre: `Detailing Marin`
  3. Categoría: `Servicio de lavado de autos`
  4. Tipo: negocio a domicilio → área de servicio: `Región Metropolitana`
  5. Verificar vía llamada telefónica o código SMS
  6. Una vez verificado, agregar la URL de Google Maps al campo `sameAs` en `lib/seo.ts`

- [ ] **Sitemap en Search Console** — Ya está agregado a Search Console, falta enviar el sitemap:
  1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
  2. Panel izquierdo → **Sitemaps**
  3. Pegar: `https://www.detailingmarin.cl/sitemap.xml`
  4. Click **Enviar**

### Alto impacto

- [ ] **Reseñas en Google** — Pedirle activamente a cada cliente una reseña de 5 estrellas en Google Maps. Con 10+ reseñas se compite diferente en búsquedas locales. Una vez que haya reseñas, agregar `aggregateRating` al JSON-LD en `lib/seo.ts`.

- [ ] **Directorios locales** — Registrar el negocio en:
  - Yelp Chile
  - Páginas Amarillas Chile
  - MercadoLibre Servicios
  - Yapo.cl (categoría servicios)
  - Cada registro es un backlink que sube la autoridad del dominio

### Mediano plazo

- [ ] **Redes sociales activas** — Publicar contenido regularmente en Instagram (`@detailing_marin`) y Facebook. Las interacciones sociales son señal indirecta de autoridad para Google. Antes/después de cada trabajo = contenido ideal.

---

## Desarrollador (requiere código)

### Mediano plazo

- [ ] **`aggregateRating` en JSON-LD** — Implementar cuando el cliente tenga reseñas de Google. Requiere: rating promedio, cantidad de reseñas y URL de Google Maps. Agregar a `buildLocalBusinessJsonLd()` en `lib/seo.ts`.

- [ ] **`hasMap` en LocalBusiness JSON-LD** — Agregar URL de Google Maps al JSON-LD una vez que el cliente cree el perfil. Campo: `hasMap: 'https://maps.google.com/?cid=...'` en `lib/seo.ts`.

- [ ] **`sameAs` con Google Maps** — Una vez verificado Google Business Profile, agregar la URL al array `sameAs` en `lib/seo.ts` junto a Instagram y Facebook.

- [ ] **Lighthouse en producción** — Correr auditoría completa en `https://www.detailingmarin.cl` cuando esté desplegado para medir LCP, CLS e INP reales. Ver instrucciones más abajo.

### Largo plazo

- [ ] **Blog / artículos de contenido** — Crear landing pages o artículos para keywords informacionales de alto volumen:
  - "¿Cuánto cuesta lavar un auto en Santiago?"
  - "Diferencia entre detailing y lavado de auto"
  - "¿Cada cuánto tiempo lavar el auto?"
  - "Ventajas del lavado ecológico"

---

## Lighthouse — Paso a paso

### Opción A: Chrome DevTools (recomendada, gratis)

1. Abrir `https://www.detailingmarin.cl` en Chrome
2. Click derecho → **Inspeccionar** (o `F12`)
3. Ir a la pestaña **Lighthouse**
4. Seleccionar:
   - Mode: **Navigation**
   - Device: **Mobile** (Google indexa mobile-first)
   - Categories: marcar **Performance** y **SEO**
5. Click **Analyze page load**
6. Esperar ~30 segundos
7. Revisar los scores y expandir las oportunidades marcadas en naranja/rojo

### Opción B: PageSpeed Insights (sin instalar nada)

1. Ir a [pagespeed.web.dev](https://pagespeed.web.dev)
2. Pegar `https://www.detailingmarin.cl`
3. Click **Analyze**
4. Ver resultados de Mobile y Desktop por separado

### Métricas clave a revisar

| Métrica | Qué mide | Objetivo |
|---------|----------|---------|
| **LCP** (Largest Contentful Paint) | Cuánto tarda en cargar el elemento más grande | < 2.5 s |
| **CLS** (Cumulative Layout Shift) | Cuánto se mueve el contenido al cargar | < 0.1 |
| **INP** (Interaction to Next Paint) | Qué tan rápido responde a clicks/taps | < 200 ms |
| **SEO score** | Checklist técnico de indexación | > 95 |

### Cómo interpretar

- 🟢 **90-100**: Bien
- 🟡 **50-89**: Mejorable
- 🔴 **0-49**: Problema real, afecta ranking

### Si el LCP es alto (> 2.5 s)

Causas comunes y dónde mirar:
- Imagen hero sin `priority` → ya corregido en slug pages
- Servidor lento → Vercel Edge Network debería manejarlo
- Imagen demasiado pesada → revisar tamaño real del `.webp` en `public/images/`

---

*Generado automáticamente. Actualizar este archivo cuando se completen los ítems.*
