# Vandeon website (Astro) — guide for Claude Code

Production marketing site for **Vandeon**, a SaaS platform to provision, deploy,
and auto-configure servers. Built with Astro 4 + a single React island. Static
output — deploy `dist/` anywhere.

## Commands
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview
```

## Architecture
- **Static-first.** Almost everything is plain `.astro` and ships zero JS.
- **One React island:** `src/components/HeroViz.jsx` (the animated hero
  illustration) — uses `requestAnimationFrame`, mounted with `client:load`.
- **No router / no CMS.** Two pages, file-based routing.

## Where things live
| Path | Purpose |
|------|---------|
| `src/consts.js` | **Single source of truth** for links (app/LinkedIn/Telegram) and social-platform copy. Edit here. |
| `src/styles/tokens.css` | **Single source of truth for design tokens** (color, type, radii, motion). Imported by `global.css`; the app vendors a copy of this file. Edit values here only. |
| `src/styles/global.css` | Component styles (imports `tokens.css`). |
| `docs/design-system.md` | UI implementation guide (rules, component CSS, forms, tables, states, Tailwind) for the site and the app. |
| `src/layouts/Base.astro` | `<head>`, Google Fonts, and the reveal-on-scroll script. |
| `src/pages/index.astro` | Landing page (hero, right-sized, capabilities, CTA). |
| `src/pages/follow.astro` | Follow page (social cards). |
| `src/components/` | `Nav`, `Footer`, `SocialCard`, `FitMeter` (static) + `HeroViz.jsx` (island). |

## Brand / design system — each fact has one home, don't duplicate
- **Brand identity** (essence, voice, color meaning, logo mark, decks): the Vandeon
  design system Claude artifact, https://claude.ai/artifact/5En8uUaGWqSTtHSTiWxPnx
- **Token values:** `src/styles/tokens.css`.
- **How to build UI with them:** `docs/design-system.md` (names tokens, never repeats values).

## Conventions — please follow
- **Design tokens have ONE home:** `src/styles/tokens.css`. Change a color/font/radius there and the whole site follows. The hero illustration reads `var(--accent)` directly (passed as `accent="var(--accent)"` in `index.astro`), so there is no JS copy to keep in sync. The OG generator (`scripts/gen-og.mjs`) mirrors a few colors with a comment — update it if tokens change.
- The hero illustration has three `variant`s — `flow` (current), `console` (dark), `blueprint` (light line-art). Set via the `<HeroViz variant=… />` prop in `index.astro`.
- **Do NOT reintroduce the "tweaks panel"** — it was a design-exploration tool from the prototype, intentionally omitted from production.
- Keep components static `.astro` unless they genuinely need client interactivity; only add `client:*` directives when necessary.
- Add new design values as CSS custom properties in `tokens.css`, not inline.

## Outstanding content (not design)
Placeholders to replace in `src/consts.js`:
- Real URLs: `LINKS.app`, `LINKS.linkedin`, `LINKS.telegram` (all `#`).
- Real handles (currently `/company/vandeon`, `@vandeon`).
- Logo: the converging-nodes mark (inline SVG in `Nav.astro`; `public/favicon.svg`; app icons from `scripts/gen-og.mjs`).

## Note on origin
These files were generated from an HTML design prototype. They are real,
runnable Astro code — build on them directly. The matching HTML prototype
(if referenced) is the design's visual source of truth; this Astro app mirrors it.
