# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Particulares que eligen el servicio a domicilio por comodidad y tiempo**: no quieren desplazarse, hacer fila ni entregar el auto en un taller.
- **Particulares que desconfían de los lugares que lavan autos**: confían en quien trabaja con detalle y cuida el vehículo; el lavadero común no les da esa confianza.
- **Empresas**: contratan el servicio para sus flotas o para el personal, con necesidades de coordinación y factura.

Los tres grupos comparten una misma escena de uso: el vehículo se atiende donde está, y el motivo principal para elegir este servicio por sobre otro es la confianza en el resultado.

## Product Purpose

Detailing automotriz a domicilio en Santiago y Región Metropolitana. El negocio no tiene ubicación física: el equipo llega con todo el equipamiento a la casa u oficina del cliente. El propósito es entregar un resultado de tipo showroom con protección que dura, sin que el cliente tenga que moverse ni ceder su tiempo.

El éxito del producto es que el cliente agenda, queda conforme y vuelve: se comunica por WhatsApp, se le responde en menos de 24 horas, y el precio es transparente antes de la visita.

## Positioning

Detallado completo **a domicilio**, con **productos 100% biodegradables** y **hasta 90% de ahorro de agua**, sin costo de traslado, sin esperas y con un nivel de acabado que los lavaderos comunes no alcanzan.

El mensaje principal combina tres ejes, en este orden de importancia para el cliente: el método ecológico, la comodidad de no moverse, y la resolutividad de agendar y que quede listo. El resultado y la protección de la pintura sostienen la promesa, pero no encabezan el mensaje.

## Operating Context

- **Cobertura**: 33 comunas de Santiago y Región Metropolitana, sin costo de desplazamiento. El sitio lista las comunas servidas y cada comuna tiene su propia página.
- **Horario**: lunes a sábado de 9:00 a 19:00; domingo cerrado.
- **Canales**: WhatsApp `+56 9 5445 1422` es el canal principal de agenda; email `marin.mac.lean@gmail.com`; Instagram y Facebook.
- **Compromiso de respuesta**: se responde en menos de 24 horas.
- **Precios**: "desde" por tipo de vehículo (automóvil urbano, sedán/hatchback, SUV, vehículo de tres filas) para Pack Eco Diamond ($89.990), Pack Eco Platinum ($28.990), Pack Eco Silver ($19.990), Pulido Abrillantador ($69.990), Pulido de Focos ($55.000 el par) y Limpieza de Tapiz e Interiores ($55.990).
- **Sin tienda física**: todo el servicio ocurre en el domicilio del cliente; el local es la operación, no un punto de venta.
- **Contenido y administración**: servicios, precios e imágenes se administran en Directus; el pie de página y algunos servicios se editan desde un panel administrativo propio (Next.js + Prisma).

## Capabilities and Constraints

- Sitio web App Router con Next.js 16, `next-intl` (español por defecto, inglés con prefijo `/en`), Tailwind CSS 4, Prisma y Directus como fuente de contenido.
- Bilingüe es un requisito, no una mejora futura: todo el copy público vive en `messages/es.json` y `messages/en.json`, en español neutro (nunca voseo ni regionalismos).
- El tema se conmuta con la clase `.dark` en `<html>` y no con `prefers-color-scheme`; la variante `dark:` de Tailwind está declarada a medida (`@custom-variant dark`).
- Los servicios, precios e imágenes vienen del CMS: el sitio no puede inventar ni completar datos que el CMS no entrega. Dos servicios (`pack-eco-silver` y `pulido-abrillantador`) no tienen fotografía en el CMS y el sitio los presenta con un marcador de posición diseñado, no con un bloque vacío.
- El set fotográfico es limitado: hoy hay material de motor, tapicería, focos y una sesión de producto reutilizada. La fotografía es un recurso escaso y de alto valor de conversión.
- Decisiones de producto aún no tomadas: tarifas y volumen para flotas de empresas, fecha de apertura del negocio (hoy es un dato pendiente en el perfil de Google Business) y eventual ampliación del área de cobertura.

## Brand Commitments

- **Nombre**: Detailing Marin. Categoría: lavado de autos / servicio de detallado de autos.
- **Identidad**: la señal verde del producto comunica el método ecológico; el color de marca sostiene el claim central y no es un adorno.
- **Activos de identidad**: logotipo en `public/icon/logo-removebg.png` y `public/nadia-marin-logo.png`; fotografías reales de trabajos en `public/images/`.
- **Voz**: profesional y cercana, en español neutro. Sin jerga técnica innecesaria y sin emojis como sistema de iconos.

## Evidence on Hand

Verificado por el negocio y publicable como hecho:

- Más de 500 autos atendidos.
- Calificación promedio 5★.
- Productos 100% biodegradables.
- Hasta 90% de ahorro de agua.

Material disponible en el repositorio:

- Fotografías de antes y después de trabajos reales: motor (`public/images/lavado_motor/`), tapicería (`public/images/asientos/`), focos (`public/images/focos/`) y una sesión de producto (`public/images/lavado_ecologico/`, `public/images/hero-detailing.webp`).
- Tabla de precios por tipo de vehículo para cada servicio.
- Perfiles de Instagram y Facebook.

Ausencias que el trabajo futuro no debe fabricar: no hay testimonios de clientes con nombre, ni casos de estudio de flotas de empresas, ni reseñas verificables ni fechas de apertura confirmadas.

## Product Principles

1. **La promesa es el resultado y la prueba es real**: cada afirmación del sitio se acompaña de un antes/después o de un precio concreto; lo que no se puede probar no se afirma.
2. **El cliente nunca se mueve**: el servicio llega con su equipamiento, y el sitio no ofrece nunca la alternativa de "venir al local".
3. **El método es el producto**: biodegradabilidad y ahorro de agua son la forma de trabajar, no un claim de pie de página.
4. **El detalle es la diferencia contra el lavadero común**: el sitio muestra el trabajo de cerca, sin abstraerlo.
5. **Un solo próximo paso**: cada superficie conduce a agendar por WhatsApp, y la promesa de respuesta en menos de 24 horas acompaña a la reserva.

## Accessibility & Inclusion

- **WCAG 2.2 AA** es la barra del sitio. Se auditó el sitio completo contra ese estándar y se corrigieron contraste de texto, tamaños de objetivo táctil, foco visible y soporte de movimiento reducido; ese estándar rige cualquier decisión de interfaz futura.
- **Español neutro** en toda la interfaz, incluidos textos de accesibilidad y mensajes de error, para que el sitio funcione igual para cualquier Talker de Chile.
- El sitio es bilingüe: nada de lo que un cliente puede leer en español debe quedar sin equivalente en inglés.
