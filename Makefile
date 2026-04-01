.PHONY: install dev build start lint favicon icons icons-clean icons-rebuild assets

# ── Desarrollo ────────────────────────────────────────────────
install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

lint:
	pnpm lint

# ── Assets ────────────────────────────────────────────────────
favicon:
	pnpm favicon:generate

icons:
	pnpm icons:generate

icons-clean:
	pnpm icons:clean

icons-rebuild:
	pnpm icons:rebuild

## Genera favicon + todos los iconos PWA en un solo paso
assets: favicon icons
