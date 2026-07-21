---
name: unlighthouse-skilld
description: "ALWAYS use when writing code importing \"unlighthouse\". Consult for debugging, best practices, or modifying unlighthouse."
metadata:
  version: 0.17.7
  generated_by: Anthropic · Sonnet 4.6
  generated_at: 2026-04-11
---

# harlan-zw/unlighthouse `unlighthouse@0.17.7`
**Tags:** latest: 0.17.7

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p unlighthouse` instead of grepping `.skilld/` directories. Run `skilld search --guide -p unlighthouse` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

- NEW: `defineUnlighthouseConfig()` — added in v0.16.0 as the new canonical config wrapper imported from `unlighthouse/config`. The old `defineConfig` export had broken TypeScript types and should be replaced. Always import from `'unlighthouse/config'`, not from `'unlighthouse'` or `'@unlighthouse/core'`. [source](./.skilld/releases/v0.16.0.md#features)

- BREAKING: `import { defineUnlighthouseConfig } from 'unlighthouse/config'` subpath export — the `/config` subpath was broken before v0.17.2. Any code importing from this path in v0.17.0–v0.17.1 will fail at runtime with a resolution error. After v0.17.2 this is the correct and only supported import. [source](./.skilld/releases/v0.17.2.md#bug-fixes)

- NEW: `userAgent` root config option — added in v0.14.0. Sets a custom user agent string for all Puppeteer and Axios requests. Also exposed as `--user-agent <string>` CLI flag. Previously there was no way to override the default user agent. [source](./.skilld/releases/v0.14.0.md#features)

- NEW: async config functions in `unlighthouse.config.ts` — added in v0.15.0. The config file can now export an async default function in addition to a plain object. Useful when config values (e.g. `urls`) must be resolved from an async source. [source](./.skilld/releases/v0.15.0.md#features)

- BREAKING: `scanner.ignoreI18nPages` behaviour change — in v0.17.0, this option is now automatically disabled when the cross-origin default is set for `/`. Previously it was always applied, which caused entire i18n sites served from a root cross-origin domain to be silently skipped. If you relied on `ignoreI18nPages: true` to deduplicate cross-origin i18n pages, verify the new behaviour matches your expectations. [source](./.skilld/releases/v0.17.0.md#bug-fixes)

- DEPRECATED: Integration-specific options for Nuxt, Vite, and webpack — the API reference explicitly notes these are deprecated and no longer documented. Use the CLI (`@unlighthouse/cli`) or CI (`unlighthouse-ci`) integrations instead. Framework-specific `@unlighthouse/nuxt`, `@unlighthouse/vite`, and `@unlighthouse/webpack` packages still exist but their configuration options are no longer maintained in the core config reference. [source](./.skilld/docs/3.api-doc/config.md:L16)

- DEPRECATED: `FID` (First Input Delay) metric in the client — the client now warns when FID is present in results, as it has been removed from Chrome's Core Web Vitals. LLMs generating Lighthouse budget configs that target `first-input-delay` or `fid` will produce warnings at scan time. Use `INP` (Interaction to Next Paint) instead. [source](./.skilld/releases/v0.13.5.md#bug-fixes)

- NEW: Modern CLI progress — v0.17.0 replaced the old terminal progress output with a new interactive progress renderer powered by `@clack/prompts`. The `@clack/prompts` peer dependency was missing in v0.17.0 and added in v0.17.1. If you pin to v0.17.0 exactly, install `@clack/prompts` manually. [source](./.skilld/releases/v0.17.1.md#bug-fixes)

**Also changed:** `scanner.maxRoutes` default is `200` (not unlimited) · `scanner.dynamicSampling` default is `5` (not disabled) · `scanner.skipJavascript` defaults `true` (disable for SPAs via `--enable-javascript`) · `ci.buildStatic` renamed to `--build-static` CLI flag · `outputPath` default changed to `./lighthouse/` · WSL2 and Docker support improved (v0.15.0) · corrupt cached reports now handled gracefully instead of crashing (v0.15.0) · `radix3` added as explicit dependency after missing dep error (v0.15.0)
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Use `defineUnlighthouseConfig()` from `unlighthouse/config` when creating the config file — it enables TypeScript type inference and auto-completion for all options without requiring build tooling [source](./.skilld/docs/1.guide/guides/0.config.md#the-config-file)

- Use the function form of `defineUnlighthouseConfig(() => { ... })` for environment-aware configs — it lets you switch site URLs, sample counts, and throttling dynamically based on `process.env.NODE_ENV` without separate config files [source](./.skilld/docs/1.guide/guides/0.config.md#environment-based-config)

- For reliable CI performance budgets, combine `samples: 3–5`, `throttle: true`, and `puppeteerClusterOptions.maxConcurrency: 1` — single-run Lighthouse scores vary 5–10 points due to CPU contention; these three options together give stable, reproducible numbers [source](./.skilld/docs/1.guide/recipes/improving-accuracy.md#recommended-production-config)

- When a site has over 50 URLs in its sitemap, Unlighthouse automatically disables the crawler — rely on the sitemap as the primary discovery source for large sites rather than expecting both to run simultaneously [source](./.skilld/docs/1.guide/guides/url-discovery.md#sitemapxml)

- Use `scanner.dynamicSampling` with a numeric value (not `false`) for large sites with templated pages — the default of 5 samples per URL group is a deliberate balance; increase to 10–20 for e-commerce or blogs where template variance is high [source](./.skilld/docs/1.guide/guides/dynamic-sampling.md#usage)

- Provide route definitions via `discovery.pagesDir` and `discovery.fileExtensions` when using the CLI on a framework project — without them, sampling groups pages by URL fragments (e.g. `/blog/post-slug-3` → `blog-slug`) which is less accurate than file-based grouping [source](./.skilld/docs/1.guide/guides/route-definitions.md#pages-directory)

- Use `scanner.customSampling` with regex keys to group non-standard URL patterns for sampling — URLs like `/q-search-query` won't be grouped automatically by path segments; map them to a named route definition so dynamic sampling works correctly [source](./.skilld/docs/1.guide/guides/route-definitions.md#custom-sampling)

```ts
// Non-obvious: regex key maps any /q-* URL to one sample group
scanner: {
  customSampling: {
    '/q-(.*?)': { name: 'search-query' },
  },
}
```

- For SPAs (React, Vue, Angular), set `scanner.skipJavascript: false` — the default skips JS execution, which means client-rendered content and internal links are invisible to the crawler and Core Web Vital scores are inaccurate [source](./.skilld/docs/1.guide/recipes/spa.md#enable-javascript-execution)

- When auth isn't persisting across scanned pages, add `lighthouseOptions.disableStorageReset: true` and `lighthouseOptions.skipAboutBlank: true` alongside `puppeteerOptions.userDataDir` — Lighthouse resets browser storage between audits by default, clearing session state [source](./.skilld/docs/1.guide/guides/authentication.md#auth-not-sticking)

- Use `hooks.authenticate` for login forms or OAuth flows instead of cookie injection — the hook runs once before scanning starts and the resulting session (cookies, localStorage, IndexedDB) is shared across all subsequent page audits [source](./.skilld/docs/1.guide/guides/authentication.md#programmatic-login-complex-flows)

- Use `hooks['puppeteer:before-goto']` with `page.evaluateOnNewDocument()` to inject localStorage tokens before each page load — `page.evaluate()` runs after navigation and is too late for tokens that need to exist during initial script execution [source](./.skilld/docs/1.guide/guides/puppeteer.md#before-page-load)

- In Docker or CI environments, always set `--no-sandbox`, `--disable-setuid-sandbox`, and `--disable-dev-shm-usage` in `puppeteerOptions.args` — without these, Chrome exits silently and Unlighthouse reports zero results with no clear error [source](./.skilld/docs/1.guide/guides/docker.md#unlighthouse-config)

- Use `lighthouseOptions.onlyCategories` to skip unused audit categories in development — running only `['performance']` instead of all four categories significantly reduces per-page scan time when you're iterating on Core Web Vitals only [source](./.skilld/docs/1.guide/guides/lighthouse.md#selecting-categories)

- In CI, use `unlighthouse-ci` (the `@unlighthouse/ci` binary) with per-category budgets in the config file rather than a single `--budget` flag — per-category thresholds let you enforce strict accessibility (95) while allowing lower performance scores (70) that reflect real network conditions [source](./.skilld/docs/2.integrations/1.ci.md#per-category-budgets)
<!-- /skilld:best-practices -->
