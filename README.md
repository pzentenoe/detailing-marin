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

## Comandos disponibles

### Desarrollo

| Comando | Make | Descripción |
|---|---|---|
| `pnpm dev` | `make dev` | Servidor de desarrollo con Turbopack |
| `pnpm build` | `make build` | Build de producción |
| `pnpm start` | `make start` | Servidor de producción |
| `pnpm lint` | `make lint` | Linter (ESLint) |

### Assets

| Comando | Make | Descripción |
|---|---|---|
| `pnpm favicon:generate` | `make favicon` | Genera `app/favicon.ico` multi-resolución (16, 32, 48px) |
| `pnpm icons:generate` | `make icons` | Genera todos los iconos PWA en `public/icons/` |
| `pnpm icons:clean` | `make icons-clean` | Elimina los iconos generados |
| `pnpm icons:rebuild` | `make icons-rebuild` | Limpia y regenera todos los iconos PWA |
| — | `make assets` | Genera favicon + todos los iconos PWA en un solo paso |

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
