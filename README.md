# PortRun website — Astro

The marketing site rebuilt on [Astro](https://astro.build). Static output, zero
JS shipped except the animated hero illustration (a small React island).

## Run locally

```bash
cd astro
npm install
npm run dev        # http://localhost:4321
```

## Build for production

```bash
npm run build      # outputs static site to ./dist
npm run preview    # preview the built site
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub
Pages, S3, …). No server required.

## Where things live

| Path | What |
|------|------|
| `src/consts.js` | **Edit your links here** (app / LinkedIn / Telegram), the brand accent, and the social-platform copy. |
| `src/styles/global.css` | All styling (design tokens + components). |
| `src/layouts/Base.astro` | `<head>`, fonts, and the reveal-on-scroll script. |
| `src/pages/index.astro` | Landing page. |
| `src/pages/follow.astro` | Follow page. |
| `src/components/` | Nav, Footer, SocialCard, StepGlyph (static), HeroViz (React island). |

## Changing the hero illustration

In `src/pages/index.astro`:

```astro
<HeroViz client:load variant="flow" accent={ACCENT} />
```

`variant` can be `"flow"` (default), `"console"` (dark), or `"blueprint"` (light line-art).

## Changing the accent color

Two spots, keep them in sync:
- `src/consts.js` → `ACCENT` (drives the illustration)
- `src/styles/global.css` → `:root { --accent: … }` (drives everything else)
