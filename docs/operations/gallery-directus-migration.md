# Migración de galería a Directus

La galería usa dos colecciones para mantener juntas las unidades que se administran y publican:

- `detailing_gallery_photos`: una imagen, categoría, epígrafe/texto alternativo en español e inglés, orden y estado.
- `detailing_gallery_comparisons`: una imagen de antes y otra de después, título/textos alternativos bilingües, orden y estado.

Los estados válidos son `draft`, `published` y `archived`. La web pública consulta solo `published`; archivar oculta el elemento sin borrar su registro ni sus archivos. Las imágenes subidas por el admin se mantienen en la carpeta de medios configurada para el sitio.

## Requisitos

Configura en `.env.local`:

- `DIRECTUS_URL`, `DIRECTUS_TOKEN`, `DIRECTUS_ADMIN_TOKEN` y `DIRECTUS_MEDIA_FOLDER_ID` existentes.
- `DIRECTUS_SCHEMA_TOKEN`: solo se necesita si faltan las colecciones; debe poder consultar el esquema, crearlas y establecer sus relaciones con `directus_files`.
- Permiso de lectura para `DIRECTUS_TOKEN` en ambas colecciones, con filtro `status = published`.
- Permisos de lectura, creación y actualización para `DIRECTUS_ADMIN_TOKEN` en ambas colecciones; este token también se usa para administrar borradores y archivados.
- Permiso de lectura de metadatos de `directus_files` para ambos tokens y permiso de creación de archivos en la carpeta configurada para el token administrador.

La migración comprueba las colecciones existentes con el token administrador. Si falta alguna, requiere `DIRECTUS_SCHEMA_TOKEN` antes de crearla. También valida que los tokens público y administrador puedan leer las colecciones antes de subir archivos. No elimina ni reemplaza registros existentes: una ejecución repetida reutiliza archivos coincidentes por nombre y tamaño e inserta solo los slugs ausentes.

## Ejecutar

```sh
pnpm cms:gallery:migrate
```

Sube las imágenes locales utilizadas por las 29 fotos actuales y las cuatro comparativas, reutiliza una misma subida cuando una imagen participa en ambas secciones y crea los elementos iniciales con los textos bilingües actuales. La web mantiene el contenido local como respaldo hasta que ambas colecciones estén disponibles.

Los tokens de Directus son solo para el servidor y no deben tener prefijo `NEXT_PUBLIC_` ni guardarse en el repositorio.
