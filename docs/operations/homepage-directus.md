# Administración de Inicio con Directus

La página de Inicio mantiene sus componentes y orden en el código. Sus textos y textos alternativos se administran desde `/admin/inicio`, en español e inglés; el catálogo de Servicios y el contenido de Galería continúan gestionándose desde sus secciones existentes.

## Colección

La colección `detailing_homepage` contiene un registro de contenido y:

| Campo | Tipo | Contenido |
| --- | --- | --- |
| `content_es` | JSON | Secciones `hero`, `features`, `servicesPreview`, `industrial`, `results`, `cta` y `coverageTeaser` en español |
| `content_en` | JSON | Las mismas secciones y estructura en inglés |

Los valores y las claves deben conservar la estructura de `messages/es.json` y `messages/en.json` para esas secciones. El editor ofrece controles de texto agrupados por sección y valida la estructura antes de escribir. Las imágenes, iconos, enlaces y datos de servicios/galería no se convierten en valores editables mediante estos campos.

El sitio y el editor usan el primer registro ordenado por `id`; mantén un único registro para esta colección.

## Permisos

- Política `Detailing Marin API Read Only`: lectura de `detailing_homepage` para el token público usado por el sitio.
- Política `Detailing Marin CMS Write Access`: crear, leer y actualizar `detailing_homepage`; no requiere permisos para borrar o compartir.
- La escritura del sitio se realiza en el servidor mediante `DIRECTUS_ADMIN_TOKEN`. No se expone en el navegador.

El contenido CMS se almacena en caché por una hora y la acción autenticada del admin invalida `directus-homepage` al guardar. Si Directus no está disponible, Inicio usa los textos locales como respaldo; el editor muestra los errores en vez de fingir que el guardado tuvo éxito.
