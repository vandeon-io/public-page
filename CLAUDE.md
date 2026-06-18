# PortRun website (Astro) — guide for Claude Code

Production marketing site for **PortRun**, a SaaS platform to provision, deploy,
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
| `src/consts.js` | **Single source of truth** for links (app/LinkedIn/Telegram), `ACCENT`, and social-platform copy. Edit here. |
| `src/styles/global.css` | All design tokens + component styles. |
| `src/layouts/Base.astro` | `<head>`, Google Fonts, and the reveal-on-scroll script. |
| `src/pages/index.astro` | Landing page (hero, how-it-works, capabilities, CTA). |
| `src/pages/follow.astro` | Follow page (social cards). |
| `src/components/` | `Nav`, `Footer`, `SocialCard`, `StepGlyph` (static) + `HeroViz.jsx` (island). |

## Brand / design system
- **Type:** Inter (UI/body) + JetBrains Mono (labels, chrome). Loaded via Google Fonts in `Base.astro`.
- **Color:** off-white `#fafaf7`, near-black `#0a0a0a`, accent green `#43c07d`.
- **Voice:** lowercase mono micro-labels, em-highlighted keywords, terminal/console motifs.
- Everything is driven by CSS custom properties in `:root` (`global.css`). Prefer tokens over hardcoded values.

## Conventions — please follow
- **Accent lives in two synced spots:** `--accent` in `global.css` AND `ACCENT` in `consts.js` (the latter feeds the illustration's SVG fills). Change both together.
- The hero illustration has three `variant`s — `flow` (current), `console` (dark), `blueprint` (light line-art). Set via the `<HeroViz variant=… />` prop in `index.astro`.
- **Do NOT reintroduce the "tweaks panel"** — it was a design-exploration tool from the prototype, intentionally omitted from production.
- Keep components static `.astro` unless they genuinely need client interactivity; only add `client:*` directives when necessary.
- Add new design values as CSS custom properties in `global.css`, not inline.

## Outstanding content (not design)
Placeholders to replace in `src/consts.js`:
- Real URLs: `LINKS.app`, `LINKS.linkedin`, `LINKS.telegram` (all `#`).
- Real handles (currently `/company/portrun`, `@portrun`).
- Optional logo (currently a "P" wordmark in `Nav.astro`).

## Note on origin
These files were generated from an HTML design prototype. They are real,
runnable Astro code — build on them directly. The matching HTML prototype
(if referenced) is the design's visual source of truth; this Astro app mirrors it.
