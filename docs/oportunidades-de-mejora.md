# Oportunidades de Mejora — Detailing Marin

> Generado: 2026-04-10 · Actualizado: 2026-04-10
> Proyecto: Next.js 16 · React 19 · Tailwind CSS 4 · next-intl (ES/EN)

---

## Historial de cambios

| Fecha | Items | Descripción |
|-------|-------|-------------|
| 2026-04-10 | #1, #2, #3 | Validación Zod en ContactForm, imagen pack-eco-platinum, componente `<JsonLd>` |
| 2026-04-10 | #5, #11, #12 + banner contacto | Navbar móvil cierra con WhatsApp, `lib/whatsapp.ts`, `not-found.tsx`, `error.tsx`, fix gradiente banner contacto |

---

## Resumen Ejecutivo

El proyecto Detailing Marin presenta una base técnica sólida con Next.js 16 App Router, i18n completo (es/en), sistema de diseño con Material Design tonal, y buen manejo de SEO mediante JSON-LD. Las principales oportunidades se centran en **validación de formularios**, **accesibilidad**, **feedback visual**, **páginas de error**, y **polish de UX**.

---

## 🔴 Crítico — Atención inmediata requerida

### ~~1. Falta validación de formularios en el cliente~~ ✅ RESUELTO

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/sections/ContactForm.tsx` · `lib/validation.ts` |
| **Solución** | Validación con **Zod 4** (`lib/validation.ts`). Schema `contactFormSchema` valida: nombre ≥2 chars, teléfono regex `^\+?[0-9]{9,15}$`, dirección ≥5 chars, vehículo requerido, fecha ≥ hoy. Errores por campo con `aria-describedby`. El campo se limpia en cuanto el usuario corrige el error. Spinner `Loader2` de lucide-react agregado al botón de submit. |

### ~~2. Servicios sin imagen en `ServicesPreview`~~ ✅ RESUELTO

| Campo | Detalle |
|-------|---------|
| **Archivo** | `lib/services.ts` |
| **Solución** | Agregado `image: '/images/hero-detailing.webp'` a `pack-eco-platinum` en `servicesConfig`. Pack-eco-silver y pulido-abrillantador también carecen de imagen — pendiente assets del cliente. |

### ~~3. `dangerouslySetInnerHTML` con JSON-LD duplicado~~ ✅ RESUELTO

| Campo | Detalle |
|-------|---------|
| **Archivos** | `components/ui/JsonLd.tsx` (nuevo) · 7 páginas refactorizadas |
| **Solución** | Creado `<JsonLd data={...} />`. Reemplazadas 14 instancias en: `layout.tsx`, `page.tsx`, `contacto/page.tsx`, `servicios/page.tsx`, `servicios/[slug]/page.tsx`, `cobertura/page.tsx`, `comunas/[slug]/page.tsx`. |

---

## 🟡 Alto Impacto — Mejoras significativas de UX/UI

### 4. Falta página de "Gracias" post-envío

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/sections/ContactForm.tsx` |
| **Problema** | El éxito se muestra inline con un mensaje estático. No hay URL dedicada. |
| **Impacto** | No se pueden trackear conversiones (Google Analytics, Meta Pixel, Google Ads). El usuario no puede compartir/bookmark la página de confirmación. |
| **Recomendación** | Crear `app/[locale]/(marketing)/gracias/page.tsx` con mensaje de éxito, resumen del envío, y CTA para volver al home o a WhatsApp. Redirigir con `router.push()` tras envío exitoso. |
| **Esfuerzo** | Mediano |

### 5. Menú móvil no se cierra al abrir WhatsApp

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/layout/Navbar.tsx` |
| **Problema** | El botón de WhatsApp en el menú móvil abre una nueva ventana sin cerrar el menú. Al regresar, el menú queda abierto sobre el contenido. |
| **Impacto** | Experiencia de usuario rota en móvil. |
| **Recomendación** | Agregar `onClick={() => { setIsOpen(false); window.open(WA_URL, '_blank'); }}` |
| **Esfuerzo** | Bajo |

### 6. Falta feedback visual de carga en formulario

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/sections/ContactForm.tsx` |
| **Problema** | Durante `isPending`, el botón solo cambia texto a "Enviando..." sin indicador visual animado. |
| **Impacto** | El usuario no percibe progreso claro y puede hacer doble click o abandonar. |
| **Recomendación** | Agregar spinner SVG animado junto al texto del botón. Ejemplo: `<Loader2 className="animate-spin" size={20} />` de lucide-react. |
| **Esfuerzo** | Bajo |

### 7. Accesibilidad por teclado en tarjetas de servicios

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/sections/ServicesGrid.tsx` |
| **Problema** | Las tarjetas usan `<div>` contenedores con `<Link>` internos. El contenedor en sí no es navegable por teclado, lo que dificulta la interacción para usuarios de screen reader. |
| **Impacto** | WCAG 2.2: fallo en criterio 2.1.1 (Keyboard). |
| **Recomendación** | Opción A: Envolver toda la tarjeta en un `<Link>` (mejor semántica). Opción B: Agregar `role="link"`, `tabIndex={0}`, y `onKeyDown` con `Enter`/`Space` al `<div>` contenedor. |
| **Esfuerzo** | Mediano |

### 8. Imagen duplicada en HeroSection

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/sections/HeroSection.tsx` |
| **Problema** | `/images/lavado_ecologico/lavado_ecologico.webp` se usa **dos veces**: como background (opacity 0.12) y como imagen editorial principal. |
| **Impacto** | Redundancia visual — el usuario ve la misma imagen en dos contextos diferentes sin diferenciación. |
| **Recomendación** | Usar imagen diferente para el background hero (ej: textura abstracta, patrón geométrico, o foto del proceso de trabajo). Mantener la imagen principal para la columna derecha. |
| **Esfuerzo** | Bajo (depende de disponibilidad de assets) |

---

## 🟢 Mediano Impacto — Polish y calidad

### 9. Falta animación de entrada (scroll reveal)

| Campo | Detalle |
|-------|---------|
| **Archivos** | Todas las secciones |
| **Problema** | Las secciones aparecen instantáneamente al hacer scroll, sin transición de entrada. |
| **Impacto** | Sensación de producto menos pulido. Los sitios modernos usan fade-in + slide-up. |
| **Recomendación** | Crear hook `useInView` con `IntersectionObserver` + clase CSS `animate-in`. Alternativas:<br>• Ligero: hook custom con CSS transitions (sin dependencias)<br>• Completo: `framer-motion` con `whileInView` |
| **Esfuerzo** | Mediano |

### 10. Dark mode toggle podría persistir preferencia

| Campo | Detalle |
|-------|---------|
| **Archivo** | `components/layout/ThemeProvider.tsx` |
| **Problema** | Verificar que la preferencia de tema se guarde en `localStorage` y respete `prefers-color-scheme` del sistema como fallback. |
| **Impacto** | Si el usuario elige dark mode y refresca, pierde la preferencia. |
| **Recomendación** | Implementar patrón: `localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')` |
| **Esfuerzo** | Bajo |

### 11. Falta página de error 404 (`not-found.tsx`)

| Campo | Detalle |
|-------|---------|
| **Archivo** | `app/[locale]/(marketing)/not-found.tsx` (no existe) |
| **Problema** | Si el usuario llega a una ruta inexistente, ve el error por defecto de Next.js sin branding. |
| **Impacto** | Mala experiencia, pérdida de conversión, SEO negativo. |
| **Recomendación** | Crear página 404 con diseño branded: mensaje amigable, ilustración/ícono, link al home y botón de WhatsApp. |
| **Esfuerzo** | Bajo |

### 12. Falta `error.tsx` y `global-error.tsx`

| Campo | Detalle |
|-------|---------|
| **Archivos** | `app/[locale]/(marketing)/error.tsx`, `app/error.tsx` |
| **Problema** | Sin Error Boundary de React — si un componente falla, toda la página se rompe. |
| **Impacto** | Experiencia de usuario rota sin fallback. |
| **Recomendación** | Crear `error.tsx` (client component) con mensaje de error, botón de reintentar, y link de contacto. |
| **Esfuerzo** | Bajo |

### 13. Duplicación de lógica de WhatsApp en 5+ archivos

| Campo | Detalle |
|-------|---------|
| **Archivos** | `Navbar.tsx`, `HeroSection.tsx`, `CTASection.tsx`, `ContactForm.tsx`, `WhatsAppFAB.tsx` |
| **Problema** | El número de WhatsApp y la construcción de URL se repiten en múltiples lugares. |
| **Impacto** | Si cambia el número, hay que actualizar 5 archivos. Riesgo de inconsistencia. |
| **Recomendación** | Crear utilidad en `lib/whatsapp.ts`: ```ts export function buildWhatsAppUrl(message: string) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` } ``` |
| **Esfuerzo** | Bajo |

### 14. `servicesConfig` y `services` duplican datos

| Campo | Detalle |
|-------|---------|
| **Archivo** | `lib/services.ts` |
| **Problema** | Dos arrays de servicios con estructura similar pero no idéntica. `servicesConfig` tiene metadata estática, `services` tiene contenido traducido. |
| **Impacto** | Confusión para desarrolladores futuros. Si se agrega un servicio, hay que actualizar ambos arrays. |
| **Recomendación** | Unificar en un solo array con metadata estática + keys de traducción, o documentar claramente la separación de responsabilidades en un comentario JSDoc. |
| **Esfuerzo** | Bajo (documentación) / Mediano (unificación) |

### 15. Falta tests

| Campo | Detalle |
|-------|---------|
| **Archivos** | N/A — no existen tests |
| **Problema** | Sin tests unitarios ni de integración. Cambios futuros pueden romper funcionalidad sin detección. |
| **Impacto** | Riesgo de regresión en componentes críticos (formulario, navegación, i18n). |
| **Recomendación** | Agregar **Vitest** + **React Testing Library**. Tests prioritarios:<br>• `ContactForm`: validación, envío exitoso, error de red<br>• `ServiceCard`: renderizado con variantes<br>• `Navbar`: toggle de menú móvil, dark mode |
| **Esfuerzo** | Alto |

---

## 🔵 SEO y Performance

### 16. Verificar sitemap multi-locale

| Campo | Detalle |
|-------|---------|
| **Archivo** | `app/sitemap.ts` |
| **Problema** | El sitemap debería incluir URLs para ambos locales (`/es/*` y `/en/*`). |
| **Impacto** | Si solo genera URLs en español, las páginas en inglés no serán indexadas correctamente. |
| **Recomendación** | Revisar `sitemap.ts` y verificar que genere entries para ambos idiomas con `alternates` correctos. |
| **Esfuerzo** | Bajo |

### 17. Open Graph images — verificar dimensiones

| Campo | Detalle |
|-------|---------|
| **Archivo** | `lib/seo.ts` · `DEFAULT_OG_IMAGE` |
| **Problema** | `DEFAULT_OG_IMAGE = '/images/hero-detailing.webp'` — verificar que la imagen tenga dimensiones 1200×630px (recomendado por Open Graph). |
| **Impacto** | Si la imagen tiene dimensiones incorrectas, las previews en redes sociales se verán cortadas o pixeladas. |
| **Recomendación** | Generar imagen OG dedicada de 1200×630px con branding consistente. |
| **Esfuerzo** | Bajo |

### 18. Agregar `aggregateRating` al JSON-LD (cuando haya reseñas)

| Campo | Detalle |
|-------|---------|
| **Archivo** | `lib/seo.ts` — `buildLocalBusinessJsonLd()` |
| **Problema** | El JSON-LD no incluye `aggregateRating` porque aún no hay reseñas de Google. |
| **Impacto** | Cuando haya 10+ reseñas, agregar esto mejora significativamente el rich snippet en Google. |
| **Recomendación** | Agregar campos: `aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: 15 }` cuando el cliente tenga reseñas verificadas. |
| **Esfuerzo** | Bajo (pendiente del cliente) |

---

## 🟣 Arquitectura y Código

### 19. Estructura de archivos recomendada

```
lib/
  services.ts          # SSOT de servicios (unificar con config)
  comunas.ts           # Data de comunas
  seo.ts               # JSON-LD builders, metadata helpers
  whatsapp.ts          # [NUEVO] Utilidad de WhatsApp
  validation.ts        # [NUEVO] Schemas de Zod para formularios

components/
  ui/
    JsonLd.tsx         # [NUEVO] Componente seguro para JSON-LD
    Spinner.tsx        # [NUEVO] Indicador de carga reutilizable
  layout/
    ThemeProvider.tsx  # Verificar persistencia de dark mode
  errors/
    NotFound.tsx       # [NUEVO] Página 404 branded
    ErrorFallback.tsx  # [NUEVO] Error boundary UI

app/
  [locale]/
    (marketing)/
      gracias/
        page.tsx       # [NUEVO] Página post-envío
      not-found.tsx    # [NUEVO] 404
      error.tsx        # [NUEVO] Error boundary
```

### 20. Dependencias recomendadas

| Paquete | Propósito | Tamaño |
|---------|-----------|--------|
| `zod` | Validación de formularios | ~13 KB gzipped |
| `@hookform/resolvers` | Integrar Zod con React Hook Form (opcional) | ~2 KB |
| `react-hook-form` | Gestión de formularios más robusta (opcional) | ~11 KB |
| `lucide-react` | ✅ Ya instalado — usar `Loader2` para spinners | — |

---

## Tabla de Prioridades

| # | Acción | Impacto | Esfuerzo | Prioridad |
|---|--------|---------|----------|-----------|
| 1 | ~~Validación de formulario con Zod~~ | 🔴 Alto | Mediano | ✅ HECHO |
| 2 | ~~Agregar imágenes faltantes a servicios~~ | 🔴 Alto | Bajo | ✅ HECHO (parcial — pack-eco-platinum. Restan pack-eco-silver y pulido-abrillantador, pendiente assets del cliente) |
| 3 | ~~Crear componente `<JsonLd>` seguro~~ | 🟡 Medio | Bajo | ✅ HECHO |
| 4 | Página de "Gracias" post-envío | 🟡 Medio | Mediano | **P1** |
| 5 | ~~Cerrar menú móvil al abrir WhatsApp~~ | 🟡 Medio | Bajo | ✅ HECHO |
| 6 | Feedback visual de carga (spinner) | 🟡 Medio | Bajo | **P1** |
| 7 | Accesibilidad por teclado en tarjetas | 🟡 Medio | Mediano | **P1** |
| 8 | Variar imagen del hero background | 🟢 Bajo | Bajo | **P2** |
| 9 | Animaciones de scroll reveal | 🟢 Bajo | Mediano | **P2** |
| 10 | Persistencia de dark mode | 🟢 Bajo | Bajo | **P2** |
| 11 | ~~Crear `not-found.tsx` y `error.tsx`~~ | 🟡 Medio | Bajo | ✅ HECHO |
| 12 | ~~Unificar lógica de WhatsApp~~ | 🟢 Bajo | Bajo | ✅ HECHO — `lib/whatsapp.ts`, 5 archivos refactorizados |
| 13 | Verificar sitemap multi-locale | 🟡 Medio | Bajo | **P1** |
| 14 | Unificar `servicesConfig` + `services` | 🟢 Bajo | Mediano | **P2** |
| 15 | Agregar tests (Vitest + RTL) | 🟡 Medio | Alto | **P2** |
| 16 | Verificar dimensiones OG image | 🟡 Medio | Bajo | **P1** |
| 17 | `aggregateRating` JSON-LD | 🟡 Medio | Bajo | **P3** (pendiente del cliente) |

---

## Dependencias de Tareas

```
P0-1 (Validación Zod)
  └─ Requiere: Zod instalado
  └─ Desbloquea: Página de Gracias (P0-4)

P0-2 (Imágenes faltantes)
  └─ Requiere: Asset del cliente o placeholder

P1-3 (JsonLd component)
  └─ Refactor independiente, sin dependencias

P1-5 (Cerrar menú móvil)
  └─ Fix aislado, sin dependencias

P1-6 (Spinner loading)
  └─ Puede usar Loader2 de lucide-react (ya instalado)

P1-11 (not-found + error)
  └─ Páginas nuevas, sin dependencias

P2-12 (Unificar WhatsApp)
  └─ Refactor interno, sin impacto visual

P2-14 (Unificar services data)
  └─ Refactor grande, requiere test coverage

P3-17 (aggregateRating)
  └─ BLOQUEADO: requiere Google Business Profile del cliente
```

---

*Documento generado automáticamente a partir de la revisión del código. Actualizar conforme se completen las tareas.*
