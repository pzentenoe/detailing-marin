# Detailing Marin

Sitio web público de **Nadia Marin Detailing** — Next.js 16 + Tailwind CSS 4.

## Requisitos

- Node.js 20+
- pnpm
- ImageMagick (`brew install imagemagick`) — solo para generación de iconos y favicon

## Inicio rápido

```bash
pnpm install
pnpm dev
```

O con Make:

```bash
make install
make dev
```

## Arquitectura

- **Next.js 16** con App Router organiza las rutas; las páginas localizadas viven en `app/[locale]`.
- **next-intl** gestiona `es` (predeterminado, sin prefijo) y `en` (con prefijo `/en`); **Tailwind CSS 4** define los estilos de la interfaz.
- El formulario de contacto envía la solicitud a `app/api/contact/route.ts`, donde Nodemailer la entrega por SMTP. Las credenciales `SMTP_*` y `CONTACT_EMAIL` se leen solo en el servidor y no deben exponerse al cliente.

## Comandos disponibles

### Desarrollo

| Comando | Make | Descripción |
|---|---|---|
| `pnpm dev` | `make dev` | Servidor de desarrollo con Turbopack |
| `pnpm build` | `make build` | Build de producción |
| `pnpm start` | `make start` | Servidor de producción |
| `pnpm lint` | `make lint` | Linter (ESLint) |
| `pnpm skilld:prepare` | — | Restaura referencias y sincroniza las skills distribuidas; ejecútalo tras instalar o actualizar `skilld` o esas skills |

### Assets

| Comando | Make | Descripción |
|---|---|---|
| `pnpm favicon:generate` | `make favicon` | Genera `app/favicon.ico` multi-resolución (16, 32, 48px) |
| `pnpm icons:generate` | `make icons` | Genera todos los iconos PWA en `public/icons/` |
| `pnpm icons:clean` | `make icons-clean` | Elimina los iconos generados |
| `pnpm icons:rebuild` | `make icons-rebuild` | Limpia y regenera todos los iconos PWA |
| — | `make assets` | Genera favicon + todos los iconos PWA en un solo paso |

## Storybook

Las historias viven junto a sus secciones en `components/sections/**/*.stories.ts` y `components/sections/**/*.stories.tsx`.

```bash
pnpm storybook       # inicia Storybook en http://localhost:6006
pnpm build-storybook # genera la versión estática en storybook-static/
```

Para revisar la salida sin añadir dependencias al proyecto, sirve el directorio con el módulo HTTP estándar de Python y abre `http://localhost:6006`:

```bash
python3 -m http.server 6006 --directory storybook-static
```

Para actualizar Storybook de forma segura, primero revisa las versiones disponibles y actualiza sus paquetes juntos:

```bash
pnpm outdated storybook @storybook/nextjs-vite
pnpm update storybook @storybook/nextjs-vite
pnpm build-storybook
```

Valida siempre el build estático con `pnpm build-storybook` después de cualquier actualización de Storybook o sus dependencias.

## Favicon

Generado desde `public/nadia-marin-logo.png` con ImageMagick. Produce un `.ico` multi-resolución con capas de 16×16, 32×32 y 48×48px — el browser elige la capa según el contexto (tab, bookmark, taskbar).

```bash
make favicon
# → app/favicon.ico
```

## Iconos PWA

Generados desde `public/nadia-marin-logo.png` con ImageMagick.

**Iconos generados en `public/icons/`:**

- Favicons PNG: 16×16, 32×32
- Android Chrome: 72, 96, 128, 144, 152, 192, 384, 512px
- Apple Touch Icon: 120, 152, 180px
- Windows tiles: 144, 150, 310px
- Maskable (safe zone 80%): 192, 384, 512px
- `manifest-icons.json` — configuración lista para usar en `manifest.json`

```bash
make assets        # favicon + todos los iconos en un paso
make icons-rebuild # solo regenerar iconos PWA
```

## Variables de entorno

Crear `.env.local` en la raíz:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu@gmail.com
SMTP_PASS=tu_app_password
CONTACT_EMAIL=destino@gmail.com
```
