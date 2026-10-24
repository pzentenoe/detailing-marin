---
name: Detailing Marin
description: Detailing automotriz a domicilio con productos biodegradables y detalle de oficio.
colors:
  verde-abeto: "#154212"
  verde-abeto-tenue: "#2D5A27"
  verde-abeto-claro: "#bcf0ae"
  verde-abeto-inverso: "#a1d494"
  verde-abeto-noche: "#002201"
  verde-musgo: "#1e4029"
  verde-musgo-contenedor: "#35573f"
  verde-musgo-claro: "#a5cbad"
  verde-lino: "#c6e9e8"
  verde-lino-inverso: "#2d4c4c"
  lino: "#f8fafb"
  lino-capa: "#eceeef"
  lino-capa-alta: "#e6e8e9"
  lino-capa-baja: "#f2f4f5"
  lino-hueso: "#ffffff"
  carbon: "#191c1d"
  carbon-suave: "#42493e"
  ceniza: "#72796e"
  ceniza-tenue: "#c2c9bb"
  error: "#ba1a1a"
  error-caja: "#ffdad6"
  blanco-inverso: "#ffffff"
  verde-whatsapp: "#25d366"
  verde-abeto-noche: "#1e5c1a"
  verde-abeto-medio: "#2d7a25"
  verde-abeto-vivo: "#3a8f30"
  hidro-noche: "rgba(12, 15, 12, 0.6)"
  scrim-fuerte: "rgba(0, 0, 0, 0.88)"
  scrim-medio: "rgba(0, 0, 0, 0.55)"
  scrim-suave: "rgba(0, 0, 0, 0.72)"
  scrim-lateral: "rgba(0, 0, 0, 0.80)"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.5rem, 1.55rem + 4vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.9rem, 1.35rem + 2.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.7vw, 1.6rem)"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "0.375rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  section: "clamp(4rem, 3rem + 3vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.verde-abeto}"
    textColor: "{colors.blanco-inverso}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.verde-abeto-tenue}"
    textColor: "{colors.blanco-inverso}"
  button-secondary:
    backgroundColor: "{colors.verde-lino}"
    textColor: "{colors.verde-lino-inverso}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.verde-abeto}"
    typography: "500 1rem/1.6 Inter"
  button-inverse:
    backgroundColor: "{colors.lino-hueso}"
    textColor: "{colors.verde-abeto}"
    rounded: "{rounded.full}"
    padding: "1rem 2rem"
  chip-eco:
    backgroundColor: "{colors.verde-musgo-contenedor}"
    textColor: "{colors.verde-musgo-claro}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem"
  card-surface:
    backgroundColor: "{colors.lino-capa-baja}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.xl}"
    padding: "2rem"
  card-photo:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.blanco-inverso}"
    rounded: "{rounded.xl}"
    height: "18rem"
  input-field:
    backgroundColor: "{colors.lino-capa-baja}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
    height: "3rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.carbon-suave}"
    typography: "500 0.875rem/1.4 Inter"
---

# Design System: Detailing Marin

## Overview

**Creative North Star: "El Verde que Viene a Casa"**

Detailing Marin no tiene un local al que ir. El servicio viaja completo hasta la casa u oficina del cliente, y ese hecho define el sistema: nada de este diseño puede parecer la señal de un lavadero esperando turno. El verde no decora ni disimula — es el método (productos 100% biodegradables, hasta 90% de ahorro de agua) y por lo tanto el color de marca, de la misma forma en que el azul de una clínica sería su método y no su gusto.

La voz es de servicio a domicilio con oficio: cercana, tranquila y directa. Se explica el detalle del trabajo —micro-rayas, amarillamiento, agua que no se waste— porque el cliente que nos elige es el que desconfía del lavado común y quiere saber en qué manos deja el auto. No hay urgencia, no hay oferta, no hay emoji: hay método, precio claro y una cita.

La densidad es editorial-media: bloques con aire, tipografía con contraste marcado entre el titular y el cuerpo, y fotografía real siempre que existe. Cuando la fotografía falta, el sistema tiene un marcador de posición diseñado (superficie tonal con marca de agua del icono del servicio) en lugar de un rectángulo vacío: la ausencia de foto es una señal de que falta contenido, no un error de maquetación.

**Key Characteristics:**

- **El verde es el método**: verde Abeto como color de marca, usado con avaricia y siempre con significado de proceso, no de decoración.
- **Contraste de marcado**: display de 64px a 800 contra cuerpo de 16px a 400; la jerarquía se gana con tamaño y peso, nunca con degradado sobre texto.
- **Fotografía como prueba**: antes/después y fotos reales de trabajo; la foto no es ilustración, es evidencia.
- **Superficies en capas**: Lino (hueso → capas) en lugar de tarjetas blancas sobre gris; la profundidad la dan las capas tonales más una sombra con dirección.
- **Todo lleva a una cita**: cada superficie resuelve en un WhatsApp agendado, con respuesta en menos de 24 horas.

## Colors

Paleta de un acento y neutros cálidos: el verde de marca contrastado contra superficies de lino y texto de carbón.

### Primary

- **Verde Abeto** (`#154212`): el verde de marca. Color de los botones primarios, del texto de emphasis y del borde activo de navegación. En dark mode invierte a `#a1d494` (Verde Abeto Inverso) para conservar el contraste sobre carbón.
- **Verde Abeto Tenue** (`#2D5A27`): extremo del degradado de marca y fondo de botón en hover.
- **Verde Abeto Claro** (`#bcf0ae`): la versión de alta luminosidad; se usa como fondo sólido con texto oscuro encima, nunca como texto sobre fondo claro.
- **Verde Musgo** (`#1e4029`) y **Verde Musgo Contenedor** (`#35573f`): la familia secundaria que sostiene los chips de impacto ecológico y los fondos oscuros de las tarjetas destacadas.

### Secondary

- **Verde Lino** (`#c6e9e8`): apoyo frío y limpio para botones secundarios, chips y tablas de precio. Es el único color que acompaña al verde Abeto en superficies grandes.

### Neutral

- **Lino** (`#f8fafb`) y sus capas (`#f2f4f5`, `#eceeef`, `#e6e8e9`, `#e1e3e4`): el fondo y sus elevaciones. La progresión de capas es la herramienta de profundidad principal del sistema.
- **Lino Hueso** (`#ffffff`): superficie más alta (tarjetas, diálogos, campos de formulario).
- **Carbón** (`#191c1d`): texto principal. **Carbón Suave** (`#42493e`): texto secundario y descripciones.
- **Ceniza** (`#72796e`) y **Ceniza Tenue** (`#c2c9bb`): bordes y separadores.

### Named Rules

**The One Green Rule.** El Verde Abeto aparece en menos del 10% de cualquier pantalla, y siempre con significado: acción principal, emphasis tipográfico o señal de método. Su escasez es el punto.

**The No Gradient on Words Rule.** El énfasis tipográfico se gana con color sólido y peso. Ninguna palabra lleva degradado ni recorte de fondo.

**The Lino Rule.** Ninguna superficie del sitio es gris neutro puro: todo neutro viene de la familia Lino, incluidos sus capas y sus bordes.

## Typography

**Display Font:** Manrope (con fallback `sans-serif`)
**Body Font:** Inter (con fallback `sans-serif`)
**Label Font:** Inter

**Character:** Manrope es geométrica y abierta en los titulares; Inter es neutra y compacta en el cuerpo. El contraste no está en las familias sino en el salto de escala (64px/800 contra 16px/400), y en el tracking negativo que acompanha a los titulares grandes.

### Hierarchy

- **Display** (800, `clamp(2.5rem, 1.55rem + 4vw, 4rem)`, 1.08): sólo el titular de portada. Un solo display por pantalla.
- **Headline** (700, `clamp(1.9rem, 1.35rem + 2.4vw, 2.75rem)`, 1.12): titulares de sección. Con `text-wrap: balance` para que la composición no se desbalancee.
- **Title** (600, `clamp(1.25rem, 1.12rem + 0.7vw, 1.6rem)`, 1.22): nombres de servicio, de pilar y de tarjeta.
- **Body** (400, 1rem, 1.6): descripción y párrafos. Medida máxima 65–75ch; nunca columna de texto completo.
- **Label** (500, 0.75rem, tracking 0.05em, mayúsculas): antetítulos de sección, encabezados de tabla y metadatos.

### Named Rules

**The One Display Rule.** Un solo display por pantalla, y siempre en sólido. Si algo más compite por el mismo peso visual, es un headline, no un display.

**The Balanced Heading Rule.** Todo titular o subtítulo usa `text-wrap: balance` y `letter-spacing` negativo entre -0.01em y -0.025em: el interlineado de un titular grande nunca es un múltiplo exacto del tamaño de fuente.

**The Label Rule.** El label en mayúsculas es siempre un antetítulo corto y de un solo color —verde Abeto—; no se usa como subtítulo ni dentro de párrafos.

## Layout

Contenedor único de `max-w-7xl` (80rem) con margen lateral `1rem / 1.5rem / 2rem` según breakpoint. Las secciones respiran con `padding-block` de `clamp(4rem, 3rem + 3vw, 6rem)`; el ritmo vertical lo fija `SectionWrapper`, nunca cada componente. Los breakpoints activos son `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`.

La retícula de servicios es un bento de 12 columnas con anchos fijos por servicio (`md:col-span-12`, `md:col-span-7`, `md:col-span-5`), de modo que cada fila se completa: 12 | 12 | 5+7 | 7+5. La composición varía deliberadamente y cada tarjeta tiene asignado su propio ancho y su propio tratamiento, no un reparto por posición en el array.

En móvil todo es una columna, y las fotos conservan su relación de aspecto con un mínimo de altura legible (`h-56`).

## Elevation & Depth

Sistema híbrido: **capas tonales** para el reposo y **sombra estructural con dirección** para separar un plano que flota. La sombra nunca es un halo sin dirección; siempre lleva desplazamiento vertical y desenfoque amplio, con un tinte verde-teal en claro y negro en dark.

### Shadow Vocabulary

- **Ambient** (`0 12px 28px -14px rgba(0, 32, 32, 0.24)`): estado de reposo de una tarjeta que se despega del fondo. En dark: `0 12px 28px -12px rgba(0, 0, 0, 0.55)`.
- **Float** (`0 22px 42px -16px rgba(0, 32, 32, 0.32)`): hover de botón, tarjeta elevada o FAB. En dark: `0 24px 46px -14px rgba(0, 0, 0, 0.65)`.

### Named Rules

**The Directional Shadow Rule.** Toda sombra lleva desplazamiento vertical visible y blur amplio. Un halo sin dirección (offset cero) no cuenta como profundidad.

**The Shadow Means Lift Rule.** La sombra aparece cuando un elemento se despega (hover, elemento fijo, panel flotante). En reposo, la profundidad la dan las capas Lino, no una sombra tenue.

## Shapes

El sistema es redondeado y blando: radios de `0.375rem` (chips y etiquetas), `0.75rem` (controles), `1rem` (tarjetas), `1.5rem` (tarjetas editoriales y paneles de imagen) y `full` (píldoras de botón, avatares de icono y contenedores circulares de icono). No hay radios de 0 ni esquinas vivas.

Los iconos viven en contenedores cuadrados de `2.25rem`–`3rem` con radio `0.75rem`–`1rem` y fondo sólido (verde Abeto o Verde Abeto Claro), nunca en contorno ni flotando sobre el texto. Las fotografías se recortan con el mismo radio del panel que las contiene.

## Components

### Buttons

- **Shape:** píldora completa (`9999px`).
- **Primary:** fondo Verde Abeto, texto blanco, padding `1rem 2rem` (md) / `2rem 2.5rem` (lg), peso 600.
- **Hover / Focus:** en hover el fondo pasa a degradado Abeto→Abeto Tenue y aparece sombra Float; el foco usa anillo de 2px en Abeto Claro con desplazamiento de 2px. Toda escala de hover se anula con `motion-reduce`.
- **Secondary:** fondo Verde Lino con texto Verde Lino Inverso.
- **Ghost:** texto Verde Abeto sin fondo, subrayado con `underline-offset-4`.
- **Inverse:** fondo Lino Hueso con texto Verde Abeto — el único patrón permitido sobre verde o fotografía, y nunca con `text-primary` en dark (el verde claro sobre blanco es ilegible).

### Chips

- **Style:** píldora, fondo Verde Musgo Contenedor, texto Verde Musgo Claro, borde del mismo tono al 15%.
- **Estado:** estático. No es una región viva (`role="status"` está prohibido: comunica una cifra, no un cambio).

### Cards / Containers

- **Corner Style:** `1.5rem` en tarjetas editoriales, `1rem` en tarjetas de servicio.
- **Background:** capas Lino (`surface-container-low`, `surface-container-high`) o `surface-container-lowest` para la superficie más alta.
- **Shadow Strategy:** Ambient en reposo, Float en hover, más un desplazamiento de -1px que acompaña al hover.
- **Border:** `outline-variant` al 20–25% cuando la tarjeta necesita separarse sin sombra.
- **Internal Padding:** `2rem`–`3rem`.

### Cards de fotografía

- Cuando un servicio tiene foto, la imagen es un panel real con `object-cover` y proporción fija, nunca una imagen de fondo al 5% de opacidad detrás del texto.
- El servicio insignia usa un retrato a la derecha (`lg:w-[38%]`, relación 3/4) que se convierte en banda ancha 16/10 por debajo de `lg`; los servicios de media columna usan una banda de foto al pie de la tarjeta.
- Sin foto en el CMS, el marcador de posición es una superficie tonal con radial de marca y la marca de agua del icono del servicio; el texto pasa a `on-surface`, nunca blanco.

### Inputs / Fields

- **Style:** superficie Lino Capa Baja, borde `outline-variant` al 30%, radio `0.75rem`, altura mínima 3rem.
- **Focus:** anillo de marca de 2px con desplazamiento de 2px.
- **Error / Disabled:** borde de error al 40% más mensaje en `error` con `aria-live="polite"`; los campos con error nunca se marcan sólo por color.

### Navigation

- Barra fija, `max-w-7xl`, altura `4.5rem` (móvil) / `5.5rem` (desktop). Fondo translúcido con desenfoque y opacidad que sube al hacer scroll para que el contenido nunca se lea a través.
- Enlaces: `text-sm` peso 500, con subrayado de 2px que aparece en hover y permanece en la ruta activa (`aria-current="page"`).
- Controles: interruptor de tema y selector de idioma con objetivo táctil mínimo de 44×44px.
- En móvil el wordmark se oculta bajo 360px y el logotipo reduce a 56px, para que la barra nunca se comprima ni solape.

## Do's and Don'ts

### Do:

- **Do** dar a cada servicio su propio tratamiento de tarjeta anclado a su slug, con el ancho y el fondo definidos para ese servicio.
- **Do** usar fotos reales con `object-cover` en un panel con radio coherente, y `alt` que describa el resultado.
- **Do** mantener el texto de precio sobre superficies blancas con un verde fijo oscuro (`on-inverse`), nunca con el verde de marca en dark.
- **Do** limitar el Verde Abeto a la acción principal, al emphasis tipográfico y a las señales de método.
- **Do** ofrecer el mismo contenido en español e inglés, con español neutro.

### Don't:

- **Don't** poner texto blanco sobre una superficie clara, ni dejar imágenes de fondo al 5% de opacidad detrás del texto: la foto es contenido, no textura.
- **Don't** usar degradado sobre texto, emoji ni flechas de texto como sistema de iconos.
- **Don't** repetir el mismo patrón de tarjeta (icono + titular + texto) como estructura de página: se resuelve con bandas editoriales y separadores.
- **Don't** inventar fotografía: sin foto en el CMS, placeholder diseñado; jamás un bloque de color plano.
- **Don't** numerar secciones con 01 / 02 / 03 ni usar kickers decorativos salvo que la secuencia aporte información.
- **Don't** dejar objetivos táctiles bajo 44×44px ni eliminar el indicador de foco visible.
