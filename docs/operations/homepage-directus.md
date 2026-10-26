# Administración de Inicio con Directus

La página de Inicio mantiene sus componentes y orden en el código. Sus textos y textos alternativos se administran desde `/admin/inicio`, en español e inglés, junto con las fotos de portada, pilares, sección industrial y comparativas de resultados. El catálogo de Servicios y las fotos de Galería continúan gestionándose desde sus secciones existentes.

## Colección

La colección `detailing_homepage` contiene un registro de contenido y:

| Campo | Tipo | Contenido |
| --- | --- | --- |
| `content_es` | JSON | Secciones en español y el objeto reservado `_media` con los IDs compartidos de imágenes |
| `content_en` | JSON | Las mismas secciones y estructura en inglés |

Los valores de texto deben conservar la estructura de `messages/es.json` y `messages/en.json`. `_media` contiene `hero` (ID de archivo), `features` (tres IDs en el orden ecológico, domicilio y acabado premium), `industrial` y `results` (IDs `before`/`after` para `motor`, `tapiz`, `focos` y `exterior`). Un valor `null` conserva la foto local original. Los IDs de imagen se comparten entre idiomas; los textos alternativos siguen siendo localizados.

El editor valida tanto el esquema de los textos e imágenes como que cada archivo seleccionado pertenezca a la carpeta configurada en `DIRECTUS_MEDIA_FOLDER_ID`. No necesita agregar columnas ni migrar la colección existente. La subida usa `/admin/api/files`, que requiere una sesión admin, valida el origen, los formatos permitidos y el máximo de 8 MB. Los archivos no se borran al reemplazar una imagen.

Las imágenes de Servicios y Galería no se editan desde Inicio: siguen teniendo un único dueño en sus respectivos administradores. El endpoint público de assets solo entrega archivos que estén referenciados por Servicios, Galería o `_media` de Inicio.

El sitio y el editor usan el primer registro ordenado por `id`; mantén un único registro para esta colección.

## Permisos

- Política `Detailing Marin API Read Only`: lectura de `detailing_homepage` para el token público usado por el sitio.
- Política `Detailing Marin CMS Write Access`: crear, leer y actualizar `detailing_homepage`; no requiere permisos para borrar o compartir.
- La escritura del sitio se realiza en el servidor mediante `DIRECTUS_ADMIN_TOKEN`. No se expone en el navegador.

El contenido CMS se almacena en caché por una hora y la acción autenticada del admin invalida `directus-homepage` al guardar. Si Directus no está disponible, Inicio usa los textos locales como respaldo; el editor muestra los errores en vez de fingir que el guardado tuvo éxito.
