# Google Search Console — Checklist operativo

## 1) Propiedades y dominio canónico

- [ ] Verificar propiedad de dominio: `detailingmarin.cl`
- [ ] Confirmar que `https://detailingmarin.cl/*` redirige por `301` o `308` a `https://www.detailingmarin.cl/*`
- [ ] Confirmar que `http://` redirige a `https://`

## 2) Sitemap

- [ ] Enviar sitemap: `https://www.detailingmarin.cl/sitemap.xml`
- [ ] Revisar que no haya URLs con `noindex` dentro del sitemap
- [ ] Revisar estado de lectura del sitemap (sin errores)

## 3) Inspección de URLs clave

- [ ] `https://www.detailingmarin.cl/`
- [ ] `https://www.detailingmarin.cl/servicios`
- [ ] `https://www.detailingmarin.cl/contacto`
- [ ] `https://www.detailingmarin.cl/en`
- [ ] `https://www.detailingmarin.cl/en/servicios`
- [ ] `https://www.detailingmarin.cl/en/contacto`

Acciones por URL:
- [ ] Solicitar indexación si corresponde
- [ ] Verificar canonical declarada vs canonical seleccionada por Google
- [ ] Verificar hreflang alternates

## 4) Cobertura e indexación

- [ ] Revisar reporte de páginas no indexadas
- [ ] Corregir páginas “Rastreada, actualmente sin indexar” con mejoras de contenido/enlazado
- [ ] Corregir páginas “Duplicada, Google eligió canonical distinta”

## 5) Rich results y schema

- [ ] Validar Home en Rich Results Test
- [ ] Validar Servicios en Rich Results Test
- [ ] Validar Contacto en Rich Results Test
- [ ] Corregir warnings críticos de JSON-LD

## 6) Monitoreo semanal (30 días)

- [ ] Clics orgánicos
- [ ] Impresiones orgánicas
- [ ] CTR promedio
- [ ] Posición promedio de keywords objetivo
- [ ] Leads orgánicos (form + WhatsApp)

## Keywords locales a monitorear

**Transaccionales (alta conversión):**
- lavado de autos a domicilio Santiago
- aspirado de autos a domicilio Santiago
- detailing automotriz Santiago
- lavado ecológico autos Santiago
- car detailing Santiago
- pulido de autos a domicilio Santiago

**Long tail por servicio:**
- lavado ecológico con aspirado Santiago
- pulido de focos a domicilio Santiago
- limpieza de motor a domicilio Santiago
- lavado de tapiz auto Santiago

**Long tail por comuna (ejemplos):**
- lavado de autos a domicilio Las Condes
- lavado de autos a domicilio La Florida
- detailing a domicilio Providencia
- lavado ecológico Ñuñoa

> Ver referencia completa en `docs/seo/herramientas-seo.md`
