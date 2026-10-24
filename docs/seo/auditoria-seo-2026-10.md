# Auditoría técnica SEO — Detailing Marin

**Fecha:** 2026-10-24
**Alcance:** `https://www.detailingmarin.cl` (producción) + código del repositorio
**Stack verificado:** Next.js **16.3.6**, React **19.3.0**, next-intl (`localePrefix: 'as-needed'`, default `es`), Tailwind 4, Vercel
**Herramientas:** Lighthouse CLI 12 (mobile, cold cache, simulated throttling), Chrome DevTools PerformanceObserver (navegador real), crawler propio sobre `sitemap.xml`, inspección de HTML servido.

> Nota de método: Lighthouse es un diagnóstico de laboratorio y **no** establece el INP de campo. Las cifras de campo reales (LCP 332 ms sin throttling, 820 ms con Slow 4G + CPU 4×) provienen de PerformanceObserver en Chrome real.

---

## 1. Diagnóstico general

La base técnica de SEO es **sólida**: Metadata API nativa, `metadataBase` correcto, canonicals absolutos, hreflang recíproco, `robots`/`googlebot` por ruta, JSON-LD por tipo de contenido real, sitemap multi-locale con `xhtml:link`, OG/Twitter completos, OG image 1200×630 válido, `google-site-verification` presente, **0 imágenes sin `alt`** en las 22 rutas auditadas.

Lighthouse de producción (mobile, cold cache): **SEO 100 · Accesibilidad 99 · Best Practices 100 · Performance 80**.

Los hallazgos siguientes son reales y verificables, ordenados por impacto/esfuerzo.

---

## 2. Hallazgos por impacto y esfuerzo

### 🔴 Críticos / Alto impacto

| # | Hallazgo | Evidencia | Impacto | Esfuerzo |
|---|----------|-----------|---------|----------|
| **H1** | **Marca duplicada en el `<title>` de las 8 páginas `/comunas/[slug]`** | `<title>Lavado de autos a domicilio en Las Condes — Detailing Marin \| Detailing Marin</title>` (77 chars). La variable `title` ya incluye `— Detailing Marin` y el template raíz `'%s \| Detailing Marin'` la vuelve a añadir | Título inflado, marca repetida 2 veces, ~17 caracteres desperdiciados en un SERP móvil que corta a ~600 px | **Bajo** |
| **H2** | **`/galeria` y `/en/galeria` sin `<h1>`** | `h1` count = **0** (todas las demás rutas indexables: 1). `GallerySection` renderiza solo `<h2>` | Sin encabezado topical en 2 páginas indexables; hueco de semántica y a11y | **Bajo** |
| **H3** | **`<lastmod>` falso y estático en las 30 URLs del sitemap** | `app/sitemap.ts:6` → `new Date('2026-09-25T00:00:00.000Z')`; el XML servido repite esa fecha en las 30 entradas. El contenido de servicios se revalida **cada 60 s** (`lib/service-catalog.ts:102`) | Google usa `lastmod` como señal de re-crawl. Una fecha constante e incorrecta en todo el sitemap degrada la señal y oculta actualizaciones reales | **Bajo** |
| **H4** | **Google Analytics carga 181 KB en el critical path** | Lighthouse `unused-javascript`: `googletagmanager.com/gtag/js?id=G-MBN6B0XV7M` → 181 061 B, **46 % sin usar**, 83 887 B desperdiciados; long task de 66 ms; origen de 65 ms de forced reflow y parte del "Unattributable" de 204 ms | Penaliza las métricas de laboratorio y puede afectar LCP/INP de campo; el efecto de retrasar el script debe verificarse en datos posteriores al despliegue | **Bajo** |

### 🟡 Medio impacto

| # | Hallazgo | Evidencia | Impacto | Esfuerzo |
|---|----------|-----------|---------|----------|
| **M1** | **`<loc>` del homepage no coincide con su canonical** | sitemap: `<loc>https://www.detailingmarin.cl/</loc>` (con barra) vs. head: `<link rel="canonical" href="https://www.detailingmarin.cl">` (sin barra). Next.js normaliza a `origin` cuando `pathname === '/'` (`next/dist/esm/lib/metadata/resolvers/resolve-url.js:78`) | Dos formas de la misma URL; Google debe elegir una | **Bajo** |
| **M2** | **hreflang del sitemap sin `x-default`** (rutas core y de servicios) | El `<head>` sí emite `x-default` (`buildAlternates`), el sitemap no. Conjuntos hreflang inconsistentes entre página y sitemap | Google pide reciprocidad; el sitemap debe reflejar el mismo conjunto | **Bajo** |
| **M3** | **Image sitemap anuncia imágenes que no están en la página** | `/servicios` y `/galeria` declaran `bmw-x3-perfil-lateral-despues.webp` (imagen del hero de `/`). Verificado: esa imagen **no** existe en el HTML de `/servicios` ni de `/galeria` | Directrices de Google: la imagen debe estar en la página | **Bajo** |
| **M4** | **`robots.txt` bloquea `/api/`, que sirve imágenes públicas** | `app/api/directus-assets/[id]/route.ts` sirve imágenes de Directus; `robots.txt` → `Disallow: /api/`. `sitemap.xml` contiene URLs `/api/directus-assets/<id>` para fotos de galería | Imágenes CMS quedarían incrawlables pese a anunciarlas en el sitemap | **Bajo** |
| **M5** | **Meta descriptions de servicio truncadas al primer punto** | `serviceDescription.split('. ')[0]` → 56–104 chars (p. ej. "Pack Eco Diamond en Santiago. Nuestro servicio más completo."). Google reescribe snippets de ~155 chars | Snippets propon shorts, a veces repetitivos ("Pulido Abrillantador… pulido abrillantador…") | **Bajo** |
| **M6** | **`openGraph.url` del layout raíz se hereda a las páginas hijas** | `app/[locale]/layout.tsx:52` → `url: SITE_URL`. Hoy todas las páginas lo sobrescriben, pero cualquier página nueva que no lo haga publicará la URL del homepage como `og:url` | Trampa latente; `og:url` incorrecto = previews que apuntan a otra página | **Bajo** |

### 🔵 Bajo impacto / informativo

| # | Hallazgo | Detalle |
|---|----------|---------|
| **L1** | `FAQPage` ya no genera rich result en Google | Los rich results de FAQ se retiraron para **todos** los sitios desde el **2026-05-07**. Se conserva el contenido visible, pero el JSON-LD de FAQ se puede retirar si deja de ser útil para otros consumidores; no debe justificar contenido nuevo. |
| **L2** | Asimetría de enlazado interno ES/EN | Las páginas EN de servicio reciben 1–2 in-links frente a 8–10 de las ES. Correcto para un negocio Chile-first; relevante solo si se prioriza el mercado anglófono. |
| **L3** | `changefreq` / `priority` no influyen en Google | Google los ignora; se conservan como pistas relativas para otros crawlers. No son un defecto. |
| **L4** | Sin política explícita de crawlers de IA | `robots.txt` aplica `Allow: /` a todos los agentes. Es el default. **Decisión del dueño, no técnica** (ver §5). |
| **L5** | `llms.txt` ausente | Convención opcional de descubrimiento para agentes, **no** requisito de Google ni de AEO. No se añade: sin consumidor verificado, sería contenido artificial. |
| **L6** | `app/manifest.webmanifest` presente | Correcto; no es un requisito SEO genérico. |
| **L7** | `x-powered-by: Next.js` expuesto | Sin impacto SEO. No se modifica (evita cambios de configuración con impacto en caché/CDN). |

### ✅ Verificado y correcto (sin acción)

- `metadataBase = new URL(SITE_URL)` con `SITE_URL` público y estable; todas las URLs de metadata se emiten absolutas.
- Canonical + hreflang recíproco (`es`, `en`, `x-default`) con `buildAlternates()` en las 8 rutas localizadas.
- `robots`/`googlebot` con `max-image-preview:large` y `max-snippet:-1` heredados del layout raíz; `noindex` en `/terminos`, `/privacidad` y `/admin`.
- JSON-LD: `AutomotiveBusiness`, `Service`+`OfferCatalog`, `BreadcrumbList`, `ContactPage`, `ItemList` — describen contenido visible real.
- OG image 1200×630, 161 905 B, `image/jpeg` — dimensiones correctas.
- 0 `<img>` sin `alt` en las rutas revisadas. Lighthouse encontró un `alt` de logo redundante y varios enlaces cuyo `aria-label` sustituía el texto visible; se corrigieron para usar `alt=""` solo en el logo redundante y dejar que los enlaces deriven su nombre del texto contenido.
- `404` correcto en rutas inexistentes y en `/en/comunas/*` (no existen).
- `/en/` → 308 → `/en`: un solo salto, sin cadena de redirecciones.
- Todo el contenido público crítico está en el HTML servido (verificado en `<head>` y en el cuerpo renderizado por el servidor).

---

## 3. Métricas de Core Web Vitals (mediciones reales)

| Escenario | FCP | LCP | TBT | CLS | LCP element |
|---|---|---|---|---|---|
| Lighthouse CLI — mobile, cold cache, throttling simulado | 3.0 s | **4.2 s** | 50 ms | 0 | `<p class="text-body-lg">` del hero |
| Chrome DevTools — mobile 412×823, Slow 4G + CPU 4× | 820 ms | **820 ms** | — | — | `<p class="text-body-lg">` del hero |
| Chrome DevTools — desktop, sin throttling | 332 ms | **332 ms** | — | — | `<h1>` |

**Lectura correcta:** el 4.2 s de Lighthouse es un artefacto del modelo de throttling simulado + caché fría. En navegador real, con red y CPU degradadas, LCP es **820 ms** (muy por debajo del umbral de 2.5 s) y **332 ms** sin throttling. **No hay un bug de renderizado**: el hero está renderizado por el servidor y presente en el HTML inicial.

El coste real que sí queda en el critical path es el de terceros: **181 KB de gtag.js** (46 % sin usar) + 65 ms de forced reflow + 30 KB de ahorro en entrega de imágenes. Esa es la palanca de LCP/INP accionable.

---

## 4. Plan de corrección aplicado

| Hallazgo | Archivo | Cambio |
|---|---|---|
| H1 | `app/[locale]/(marketing)/comunas/[slug]/page.tsx` | Título sin la marca embebida (la aporta el template); `og:title` conserva la forma con marca. Descripción ajustada a ~144 chars |
| H2 | `components/sections/GallerySection.tsx` | El encabezado de sección pasa a `<h1>` cuando la galería no es *preview* (home) y sigue siendo `<h2>` en el home. Sin cambio de diseño |
| H3 | `app/sitemap.ts` | Se elimina `lastModified` constante. No hay señal real de modificación (Directus no expone `date_updated` en `detailing_services`: verificado por API → 403) y una fecha inventada es peor que su ausencia |
| H4 | `components/layout/GoogleAnalytics.tsx`, `app/[locale]/layout.tsx` | `gtag.js` pasa a `lazyOnload`; el shim `dataLayer` queda en el root layout con `beforeInteractive`, conforme a Next 16. Los pageviews y eventos se encolan antes de que cargue el script |
| M1 | `lib/seo.ts` | `absoluteUrl()` normaliza la raíz a `origin`, replicando exactamente la normalización de Next.js → `<loc>` y `canonical` quedan byte-idénticos |
| M2 | `lib/seo.ts` + `app/sitemap.ts` | Nuevo helper único `buildLanguageAlternates()` usado por la metadata de página y por el sitemap: ya no pueden divergir. El sitemap incluye `x-default` |
| M3 | `app/sitemap.ts` | Cada URL declara solo imágenes que están realmente en esa página; las que no, ninguna |
| M4 | `app/robots.ts` | `Allow: /api/directus-assets/` (imágenes públicas) + `Disallow: /admin/` |
| M5 | `lib/seo.ts` + `app/[locale]/(marketing)/servicios/[slug]/page.tsx` | `buildServiceDescription()` compone la descripción con datos reales del servicio (título, resumen, precio, duración) en vez de truncar el texto largo |
| M6 | `app/[locale]/layout.tsx` | Se quita `openGraph.url` del layout raíz para que ninguna página pueda heredar la URL del homepage |
| A1 | `components/ui/JsonLd.tsx` | JSON-LD serializado escapa `<` antes de insertarse en `<script>`, para impedir que contenido CMS con `</script>` cierre anticipadamente el bloque |
| A2 | `components/layout/FooterView.tsx`, `components/sections/ServicesPreview.tsx`, `components/sections/GallerySection.tsx`, `components/sections/IndustrialSection.tsx` | Se evita alt redundante en el logo y nombres accesibles de enlaces que excluían o reemplazaban su texto visible |

---

## 5. Decisiones que pertenecen al dueño (no aplicadas)

1. **Política de crawlers de IA.** Los bots de entrenamiento (GPTBot, ClaudeBot, Google-Extended) y los de búsqueda/AI (OAI-SearchBot, Claude-SearchBot, PerplexityBot) son agentes independientes con políticas propias. El default actual (`Allow: /` para todos) permite entrenamiento de IA. Bloquear el entrenamiento y permitir la búsqueda en AI es una política válida y habitual, pero es una **decisión comercial**, no una corrección técnica. No se modificó `robots.txt` al respecto.
2. **Copy del `<h1>` de la galería.** El encabezado visible promoted es "Mira el cambio. El trabajo es real." — truthful pero de marca, no topical. La página conserva `title`/`description` con la señal topical ("Galería de trabajos — Detailing a domicilio en Santiago"). Cambiar el copy visible es una decisión de contenido/marca.
3. **`aggregateRating` en el JSON-LD.** No se inventa. Se activa cuando existan reseñas reales de Google (mínimo 10 para el rich result) y se verifiquen desde la fuente.
4. **Mercado EN.** Priorizar el enlazado interno EN→EN de los servicios requiere decisión de producto.

---

## 6. Verificaciones posteriores a los cambios

- `pnpm build` — **PASS** (Next.js 16.3.6; 49/49 páginas estáticas generadas; sitemap/robots compilados).
- `pnpm exec tsc --noEmit` — **PASS**.
- `pnpm exec tsx --test lib/seo.test.ts lib/gallery.test.ts` — **PASS**, 6 tests.
- ESLint de los archivos fuente editados — **PASS**, 0 errores / 0 warnings.
- `pnpm lint` del repositorio completo — **BLOCKED** por 318 errores y 8 718 warnings en 26 archivos generados/vendor/storybook (`globals-runtime.js`, `iframe-*.js`, `runtime.js`, etc.). No se atribuyen a estos cambios; ESLint enfocado en los archivos del cambio pasa.
- `package.json` no define script de test; se ejecutó el runner nativo `node:test` ya usado en el repositorio mediante `tsx`.
- Inspección del artefacto local servido tras `next build`: homepage, galerías ES/EN, `/comunas/las-condes` y detalles de servicio ES/EN devuelven **200**, cada una con 1 `<h1>`, canonical absoluto correcto, alternates correctos y descripciones presentes. La URL raíz del sitemap ahora coincide con el canonical.
- `/sitemap.xml` — **200**, 30 URLs, 30 `x-default`, sin `lastmod` inventado. `/robots.txt` — **200**, permite `/api/directus-assets/` y excluye `/admin` y `/api/`.
- `JSON-LD` se compila y se sirve en el HTML; el escape de `<` está implementado en el serializador centralizado.
- Lighthouse CLI 12 sobre el build local (móvil) en `/`, `/galeria`, `/servicios/pack-eco-diamond` y `/comunas/las-condes`: **SEO 100, Accesibilidad 100, Best Practices 100** en las cuatro rutas. En la pasada final de homepage no quedaron auditorías fallidas.
- Lighthouse de producción **pre-cambio**: SEO 100, Accesibilidad 99, Best Practices 100, Performance 80. El efecto post-cambio no está medido en producción y no se presenta como resultado.
- No se tuvo acceso a Search Console, CrUX ni datos de campo: indexación/canonicals elegidos, consultas, INP p75, LCP p75 y CTR quedan **sin verificar**.
- El build local no incluyó Google Analytics (no había `NEXT_PUBLIC_GA_MEASUREMENT_ID` en ese entorno); el comportamiento `lazyOnload` debe confirmarse con la variable presente en el despliegue.

### Riesgos residuales

- El efecto en campo de retrasar Google Analytics debe medirse tras desplegarlo; las mediciones de laboratorio, tanto anteriores como posteriores, no demuestran mejora en INP p75.
- Las 8 páginas de comuna repiten la marca en la metadata social (`og:title`/Twitter) de forma intencional, pero el `<title>` HTML ya no la duplica. No se cambió el copy visible de la galería.
- El repositorio completo no tiene un gate de lint limpio por la configuración que incluye artefactos compilados; requiere una limpieza/configuración separada y queda fuera de esta auditoría SEO.
