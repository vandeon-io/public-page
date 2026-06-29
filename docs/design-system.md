# PortRun — Design System & Brand Guide

A portable spec for applying the **marketing-site aesthetic** to the actual PortRun
app frontend. Stack-agnostic: the tokens and recipes below are plain CSS custom
properties + rules you can drop into any framework (React, Vue, Svelte, Tailwind,
plain CSS).

> **One-line brief:** monochrome, terminal-leaning, confident. Off-white paper,
> near-black ink, a single "healthy" green accent. Lots of whitespace, hairline
> borders, lowercase monospace micro-labels, and restrained motion.

> **🔑 Single source of truth:** all design *values* live in one file —
> **`src/styles/tokens.css`**. The website imports it; the app **vendors a copy** of
> it (§12). Everything else in this doc — the §2 color table, the §13 JSON, the §10
> Tailwind map — is documentation/mirrors derived from that file. **Change a value in
> `tokens.css` only**, then re-copy to the app. The sections below explain *how* to
> use the tokens; `tokens.css` defines *what* they are.

---

## 1. Brand essence

| | |
|---|---|
| **Feel** | Calm, precise, engineered. A control plane, not a toy. |
| **Metaphor** | Terminal / console. Things are "healthy", "live", "converging". |
| **Voice** | Lowercase mono micro-labels (`§ how it works`, `01 landing`). Sentence-case headlines. Keywords emphasized with a green highlighter swipe. |
| **Restraint** | One accent color only. No gradients except the highlighter + subtle panel shadows. No drop shadows on flat UI — separation comes from **1px hairlines**. |
| **Density** | Generous outer whitespace; tight, monospaced metadata. |

**Do:** hairline borders, dashed section dividers, dotted backdrop, mono labels,
single green accent for "good/active/healthy".
**Don't:** multiple accent colors, heavy shadows on content, rounded-bubbly UI,
ALL-CAPS body, emoji in chrome, reintroduce gradients beyond what's specified.

---

## 2. Color tokens

Copy these into the app's global stylesheet `:root`. Names match the website.

```css
:root {
  /* Ink (near-black) on paper (off-white) */
  --fg:        #0a0a0a;                    /* primary text / ink            */
  --fg-dim:    rgba(10, 10, 10, 0.62);     /* secondary text                */
  --fg-dimmer: rgba(10, 10, 10, 0.40);     /* tertiary text / mono captions */
  --bg:        #fafaf7;                    /* page background (warm off-white) */
  --bg-card:   #ffffff;                    /* raised card surface           */

  /* Hairlines — separation is done with these, not shadows */
  --line:      rgba(10, 10, 10, 0.12);     /* default border / divider      */
  --line-soft: rgba(10, 10, 10, 0.06);     /* faint divider                 */

  /* The one accent — "terminal green", reads as healthy/active/live */
  --accent:     #43c07d;
  --accent-ink: #0a0a0a;                   /* text/icon color ON the accent */

  /* Dark surface (for console-style panels, e.g. an embedded terminal/log view) */
  --panel: #0a0a0a;
}
```

### Accent usage rules
- Accent is **semantic**: it means *good / active / healthy / primary action*. Don't
  use it decoratively.
- **Text on accent is always `--accent-ink` (near-black), never white.** White on
  `#43c07d` fails contrast; near-black passes and is the brand look.
- Status colors used in illustrations: ready/healthy = `--accent`; in-progress =
  warm amber `#e0a04a`; idle = a dim grey (`rgba(10,10,10,0.22)`).

### Dark / console surfaces
When you need a dark panel (terminal, log stream, the embedded "control plane"
view), invert text over `--panel` (`#0a0a0a`):

```css
--on-dark:        rgba(255, 255, 255, 0.90);
--on-dark-dim:    rgba(255, 255, 255, 0.50);
--on-dark-dimmer: rgba(255, 255, 255, 0.32);
--on-dark-line:   rgba(255, 255, 255, 0.12);
```

> **Note on app dark mode:** the marketing site is light-only. If the app needs a
> full dark theme, treat the above as the seed and keep `--accent` identical in
> both themes — the green is the constant that ties the two products together.

---

## 3. Typography

Two families, loaded from Google Fonts (or self-hosted for the app):

- **Inter** — UI and body. Weights 400 / 500 / 600. Note headlines use **500**, not
  700 — the look is confident, not heavy.
- **JetBrains Mono** — labels, chrome, buttons, metadata, micro-copy. Weights 400 / 500 / 600.

```css
:root {
  --sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
}
body {
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: 'ss01', 'ss02';   /* Inter stylistic sets */
}
```

Font link (same as the site's `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

### Type scale & treatments
| Role | Family | Size | Weight | Tracking | Notes |
|------|--------|------|--------|----------|-------|
| Display / hero | sans | `clamp(42px, 5.4vw, 76px)` | 500 | `-0.03em` | `line-height: 0.98`, `text-wrap: balance` |
| Section head | sans | `clamp(28px, 3.4vw, 46px)` | 500 | `-0.02em` | |
| Card / item title | sans | 20px | 500 | `-0.015em` | |
| Body | sans | 15–19px | 400 | — | color `--fg-dim`; `text-wrap: pretty` |
| Micro-label | **mono** | 11–13px | 400–600 | `0.06–0.18em` | often UPPERCASE or lowercase, color `--fg-dim/dimmer` |
| Button | **mono** | 13–14px | 600 | `0.01em` | |

### The signature: highlighter emphasis
Keywords in headlines switch to **mono** and get a green swipe across the lower
third — the brand's most recognizable text treatment.

```css
.hl {
  font-style: normal;
  font-family: var(--mono);
  font-weight: 400;
  font-size: 0.78em;            /* mono runs larger; scale it down to match */
  padding: 0 0.12em;
  position: relative; top: -0.04em;
  background: linear-gradient(to top,
    color-mix(in oklch, var(--accent) 32%, transparent) 0%,
    color-mix(in oklch, var(--accent) 32%, transparent) 36%,
    transparent 36%);          /* fill only the bottom 36% = highlighter */
}
```
Usage: `<h1>Your servers, <span class="hl">set up</span> for you.</h1>`

---

## 4. Spacing, layout & shape

```css
:root {
  --maxw: 1200px;              /* content container */
  --radius-sm: 2px;           /* tags, kbd-tag — nearly square        */
  --radius:    3px;           /* buttons                               */
  --radius-md: 8px;           /* panels / illustration frame           */
  --radius-lg: 14px;          /* large feature tiles                   */
}
.container { max-width: var(--maxw); margin: 0 auto; padding: 0 32px; }
```

- **Outer gutter:** 32px desktop → 20px ≤720px → 16px ≤360px.
- **Section rhythm:** ~96px vertical padding desktop, 72px ≤960px, 56px ≤720px.
- **Radii are small and deliberate.** This is a square-ish, technical UI — keep
  corners tight. Big pills/rounded cards break the feel.

### The "1px-gap grid" pattern (important)
Multi-cell groups (steps, capabilities, social cards) are drawn as a grid whose
**gap is a single hairline**, by coloring the grid background `--line` and giving
each cell a `--bg` fill. This yields crisp dividers with no double borders:

```css
.grid-hairline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);     /* shows through the 1px gaps as dividers */
  border: 1px solid var(--line);
}
.grid-hairline > * { background: var(--bg); }   /* or --bg-card */
```

---

## 5. Borders, dividers, shadows

- **Borders:** `1px solid var(--line)` everywhere. This is the primary separation tool.
- **Section dividers:** `1px dashed var(--line)` (the dashed line is a recurring motif).
- **Shadows:** avoid on flat content. Only the illustration/console panels carry a
  soft lift:
  ```css
  /* light panel */
  box-shadow: 0 22px 50px -28px rgba(10,10,10,0.25);
  /* dark/console panel */
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset,
              0 30px 70px -24px rgba(0,0,0,0.34),
              0 10px 28px -10px rgba(0,0,0,0.22);
  ```

### Background motifs (optional, reinforces the feel)
```css
/* Dotted "paper" backdrop, faded toward the bottom — global ambiance */
body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: radial-gradient(var(--line) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse at 50% -10%, black 30%, transparent 72%);
}
/* 22px grid pattern is used inside illustration SVGs for the "blueprint" look */
```

---

## 6. Motion

Subtle, fast, purposeful. Honor `prefers-reduced-motion` everywhere.

```css
:root {
  --t-fast:   0.12s;   /* hover color shifts          */
  --t-base:   0.16s;   /* background / transform      */
  --t-reveal: 0.6s;    /* scroll/load reveal          */
}
```
- **Buttons:** `transition: transform .06s, filter .14s, border-color .14s, background .14s, color .14s;` press = `translateY(1px)`. Primary button arrow nudges `translateX(3px)` on hover.
- **Reveal-on-scroll:** start `opacity:0; translateY(10px)` → `.in` adds
  `opacity:1; transform:none` over `0.6s`. Use an IntersectionObserver to add `.in`.
- **Live pulse:** the status dot pulses opacity on a `2.4s` ease-in-out loop, with a
  soft accent halo (`box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 25%, transparent)`).
- **Reduced motion:** disable reveal + smooth scroll; show everything settled.
  ```css
  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal.in { opacity: 1; transform: none; transition: none; }
    html { scroll-behavior: auto; }
  }
  ```

---

## 7. Component recipes

These are the building blocks. Class names mirror the site so you can lift CSS directly.

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: var(--mono); font-size: 13px; font-weight: 600;
  padding: 11px 18px; border: 1px solid transparent; border-radius: var(--radius);
  letter-spacing: 0.01em; cursor: pointer; white-space: nowrap;
  transition: transform .06s, filter .14s, border-color .14s, background .14s, color .14s;
}
.btn:active { transform: translateY(1px); }
.btn-primary { background: var(--accent); color: var(--accent-ink); }
.btn-primary:hover { filter: brightness(0.93); }
.btn-ghost { background: transparent; border-color: var(--line); color: var(--fg-dim); }
.btn-ghost:hover { color: var(--fg); border-color: var(--fg-dimmer); }
.btn-lg { font-size: 14px; padding: 14px 24px; }
```
Primary buttons read like `launch app →`. The `→` arrow nudges right on hover.

### `kbd-tag` — the pill micro-label (great for app status/context chips)
```css
.kbd-tag {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 12px; border: 1px solid var(--line); border-radius: var(--radius-sm);
  font-family: var(--mono); font-size: 12px; color: var(--fg-dim);
  background: color-mix(in oklch, var(--bg) 55%, white);
}
.kbd-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
```

### `live-pill` — "● live" status
```css
.live-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 25%, transparent);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse { 50% { opacity: 0.35; } }
```

### Mono section tag
`§ how it works`, `01 landing` — uppercase or lowercase mono, `--fg-dim`,
letter-spacing `0.08em`. Use these to label app regions/panels.

### Card / list cell
Background `--bg` or `--bg-card`, `1px` hairline (or the hairline-grid pattern),
padding ~`28–34px`, a mono kicker in `--accent`, a 500-weight sans title, dim body.
Hover (if interactive): lighten background slightly + shift a mono "open ↗" affordance
to `--accent` and `translateX(2px)`.

### Console / terminal panel (`viz` chrome)
For embedded log/terminal/control-plane views — a window with a faux tab bar:
- Dark variant: `background: var(--panel)`, top chrome border
  `1px solid rgba(255,255,255,0.07)`, tabs in mono 11px, active tab underlined.
- A right-aligned meta cluster like `3/3 nodes  ● live`.
- This is the strongest brand carrier for an app dashboard — reuse it for real status.

---

## 8. Iconography & illustration

- Icons are **thin-stroke, monochrome** SVGs (`stroke-width` ~1–1.6 at small sizes),
  using `currentColor` or `--fg-dim`; accent only for the "good" element.
- Status LEDs: small filled circles colored by state (accent / amber / dim).
- The hero illustration is data-driven SVG (`you → web app → servers`, nodes turning
  "healthy"). In the app, prefer **real** versions of these motifs (actual node
  health, real progress bars) rather than decorative ones — same visual language,
  live data.
- Favicon / logo mark: a green **P** on near-black rounded square (`public/favicon.svg`).

---

## 9. Accessibility & responsive

- **Contrast:** ink-on-paper passes comfortably. Keep button text as `--accent-ink`
  (near-black on green) — verified; never white-on-green.
- **Touch targets:** on phones, primary buttons get `min-height: 44–48px`.
- **Reduced motion:** fully supported (section 6). Always include it.
- **Breakpoints used by the site:** `960px` (collapse multi-col grids to 1–2 cols),
  `720px` (single column, tighter gutters, hide secondary nav links via a `hide-sm`
  class), `480px`, `360px`. Mirror these or map to the app's own system.

---

## 10. Tailwind mapping (if the app uses Tailwind)

Drop into `tailwind.config.{js,ts}` → `theme.extend` so utilities match the tokens:

```js
extend: {
  colors: {
    ink:    { DEFAULT: '#0a0a0a', dim: 'rgba(10,10,10,0.62)', dimmer: 'rgba(10,10,10,0.40)' },
    paper:  '#fafaf7',
    card:   '#ffffff',
    accent: { DEFAULT: '#43c07d', ink: '#0a0a0a' },
    line:   { DEFAULT: 'rgba(10,10,10,0.12)', soft: 'rgba(10,10,10,0.06)' },
    panel:  '#0a0a0a',
  },
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
  },
  borderRadius: { sm: '2px', DEFAULT: '3px', md: '8px', lg: '14px' },
  maxWidth: { content: '1200px' },
}
```
Then `bg-paper text-ink`, `bg-accent text-accent-ink`, `border-line`,
`font-mono text-ink-dim`, etc. Keep headlines at `font-medium` (500), not bold.

---

## 11. Porting checklist

- [ ] Add the **color tokens** (§2) and **font tokens** (§3) to the app's global CSS / theme config.
- [ ] Load **Inter + JetBrains Mono** (same weights), or self-host.
- [ ] Set base `body`: `--bg` background, `--fg` text, 16px/1.5, Inter, `ss01/ss02` features.
- [ ] Headlines weight **500** with negative tracking; mono for all labels/buttons/metadata.
- [ ] Use the **highlighter** treatment (§3) for emphasized keywords.
- [ ] Replace shadows-for-separation with **1px hairlines**; use the **hairline-grid** for groups.
- [ ] Buttons: mono, `--radius` corners, primary = accent + near-black ink, ghost = hairline.
- [ ] Accent is **semantic only** (good/active/primary). Status: accent / amber `#e0a04a` / dim.
- [ ] Add the **live-pill** + **kbd-tag** patterns for status/context chips.
- [ ] Reuse the **console panel** chrome for dashboards/log views.
- [ ] Wire **reduced-motion**; keep transitions fast (`.12–.16s`) and subtle.
- [ ] Keep one accent. No extra colors, no gradients beyond highlighter + panel lift.

---

## 12. The canonical token file — vendor it

**The single source of truth is `src/styles/tokens.css` in the website repo.** It
contains every token as CSS custom properties. Don't retype the values into the app —
**copy that file in** and import it once at the app's root. Everything else (the
website, this doc, the JSON in §13) derives from it.

```bash
# From the app repo — pull the canonical file in (adjust the source path):
cp ../public-page/src/styles/tokens.css ./src/styles/tokens.css
```
```css
/* app entry CSS / root layout */
@import './styles/tokens.css';
```

> **Staying in sync:** `tokens.css` is intentionally tiny and dependency-free, so
> re-vendoring is a one-line copy whenever it changes. Treat the website's
> `tokens.css` as authoritative; never edit the app's copy by hand — re-copy instead.
> (If you'd rather not copy manually, see §14 for the shared-package upgrade path.)

### The file's contents (for reference)

This is exactly what `tokens.css` holds — shown here so the doc reads standalone.
**Copy the file, don't paste this block** (one source, no drift):

```css
:root {
  /* — color — */
  --fg: #0a0a0a;
  --fg-dim: rgba(10, 10, 10, 0.62);
  --fg-dimmer: rgba(10, 10, 10, 0.40);
  --bg: #fafaf7;
  --bg-card: #ffffff;
  --line: rgba(10, 10, 10, 0.12);
  --line-soft: rgba(10, 10, 10, 0.06);
  --accent: #43c07d;
  --accent-ink: #0a0a0a;
  --warn: #e0a04a;                 /* in-progress / amber status */
  --panel: #0a0a0a;                /* dark console surface */
  /* ink-on-dark (for --panel surfaces) */
  --on-dark: rgba(255, 255, 255, 0.90);
  --on-dark-dim: rgba(255, 255, 255, 0.50);
  --on-dark-dimmer: rgba(255, 255, 255, 0.32);
  --on-dark-line: rgba(255, 255, 255, 0.12);
  /* — type — */
  --sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  /* — shape — */
  --radius-sm: 2px; --radius: 3px; --radius-md: 8px; --radius-lg: 14px;
  --maxw: 1200px;
  /* — motion — */
  --t-fast: 0.12s; --t-base: 0.16s; --t-reveal: 0.6s;
}
```

### Optional primitives (recipes — copy what you need)

These are **not tokens** — ready-made component CSS that only *references* the tokens
above (no literal values, so they can't drift from `tokens.css`). Lift whatever the
app needs; skip the rest:

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; background: var(--bg); color: var(--fg);
  font-family: var(--sans); font-size: 16px; line-height: 1.5;
  -webkit-font-smoothing: antialiased; font-feature-settings: 'ss01', 'ss02';
}
a { color: inherit; text-decoration: none; }

/* container */
.container { max-width: var(--maxw); margin: 0 auto; padding: 0 32px; }

/* headlines — note weight 500, not bold */
.h-display { font-family: var(--sans); font-weight: 500; letter-spacing: -0.03em;
  line-height: 0.98; font-size: clamp(42px, 5.4vw, 76px); text-wrap: balance; }
.h-section { font-family: var(--sans); font-weight: 500; letter-spacing: -0.02em;
  line-height: 1.06; font-size: clamp(28px, 3.4vw, 46px); text-wrap: balance; }

/* highlighter keyword */
.hl {
  font-style: normal; font-family: var(--mono); font-weight: 400;
  font-size: 0.78em; padding: 0 0.12em; position: relative; top: -0.04em;
  background: linear-gradient(to top,
    color-mix(in oklch, var(--accent) 32%, transparent) 0%,
    color-mix(in oklch, var(--accent) 32%, transparent) 36%, transparent 36%);
}

/* mono helpers */
.mono { font-family: var(--mono); }
.mono-label { font-family: var(--mono); font-size: 12px; color: var(--fg-dim); letter-spacing: 0.02em; }
.mono-dim { font-family: var(--mono); font-size: 12px; color: var(--fg-dimmer); }

/* buttons */
.btn { display: inline-flex; align-items: center; gap: 9px; cursor: pointer;
  font-family: var(--mono); font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
  padding: 11px 18px; border: 1px solid transparent; border-radius: var(--radius);
  white-space: nowrap;
  transition: transform .06s, filter .14s, border-color .14s, background .14s, color .14s; }
.btn:active { transform: translateY(1px); }
.btn-primary { background: var(--accent); color: var(--accent-ink); }
.btn-primary:hover { filter: brightness(0.93); }
.btn-ghost { background: transparent; border-color: var(--line); color: var(--fg-dim); }
.btn-ghost:hover { color: var(--fg); border-color: var(--fg-dimmer); }
.btn-lg { font-size: 14px; padding: 14px 24px; }

/* status chips */
.kbd-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px;
  border: 1px solid var(--line); border-radius: var(--radius-sm);
  font-family: var(--mono); font-size: 12px; color: var(--fg-dim);
  background: color-mix(in oklch, var(--bg) 55%, white); }
.kbd-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.live-pill { display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 12px; color: var(--fg-dim); }
.live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 25%, transparent);
  animation: pulse 2.4s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: 0.35; } }

/* hairline grid (groups of cells separated by 1px dividers) */
.grid-hairline { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.grid-hairline > * { background: var(--bg); }

/* card */
.card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-md);
  padding: 28px; }
.card-kicker { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.06em; }
.card-title { font-size: 20px; font-weight: 500; letter-spacing: -0.015em; margin: 10px 0 6px; }
.card-body { font-size: 15px; color: var(--fg-dim); margin: 0; text-wrap: pretty; }

/* dark console panel */
.panel { background: var(--panel); color: var(--on-dark); border: 1px solid var(--on-dark-line);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset,
              0 30px 70px -24px rgba(0,0,0,0.34), 0 10px 28px -10px rgba(0,0,0,0.22); }

/* reveal-on-scroll (add .in via IntersectionObserver) */
.reveal { opacity: 0; transform: translateY(10px); }
.reveal.in { opacity: 1; transform: none; transition: opacity .6s ease, transform .6s ease; }

/* dotted backdrop (optional ambiance) */
body::before { content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: radial-gradient(var(--line) 1px, transparent 1px); background-size: 26px 26px;
  mask-image: radial-gradient(ellipse at 50% -10%, black 30%, transparent 72%); }

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.in { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}
```

JS to activate `.reveal` (drop in once; framework-agnostic):
```js
const els = document.querySelectorAll('.reveal');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  els.forEach((e) => e.classList.add('in'));
} else {
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}
```

---

## 13. Machine-readable tokens (JSON)

For tooling — Style Dictionary, a Tailwind generator, a theme builder, or an AI agent
that prefers structured input. **This is a mirror of `tokens.css` (§12) — `tokens.css`
is authoritative.** If a token changes there, update this block too (or generate it).

```json
{
  "$meta": { "name": "PortRun", "version": "1.0", "scheme": "light", "accent": "#43c07d" },
  "color": {
    "fg":        { "value": "#0a0a0a", "role": "text/primary (ink)" },
    "fgDim":     { "value": "rgba(10,10,10,0.62)", "role": "text/secondary" },
    "fgDimmer":  { "value": "rgba(10,10,10,0.40)", "role": "text/tertiary, mono captions" },
    "bg":        { "value": "#fafaf7", "role": "surface/page (warm off-white)" },
    "bgCard":    { "value": "#ffffff", "role": "surface/raised" },
    "line":      { "value": "rgba(10,10,10,0.12)", "role": "border/divider (primary separator)" },
    "lineSoft":  { "value": "rgba(10,10,10,0.06)", "role": "border/faint" },
    "accent":    { "value": "#43c07d", "role": "semantic: good/active/healthy/primary action" },
    "accentInk": { "value": "#0a0a0a", "role": "text/icon ON accent (never use white)" },
    "warn":      { "value": "#e0a04a", "role": "status/in-progress (amber)" },
    "panel":     { "value": "#0a0a0a", "role": "surface/dark console" },
    "onDark":       { "value": "rgba(255,255,255,0.90)", "role": "text on panel" },
    "onDarkDim":    { "value": "rgba(255,255,255,0.50)", "role": "text dim on panel" },
    "onDarkDimmer": { "value": "rgba(255,255,255,0.32)", "role": "text dimmer on panel" },
    "onDarkLine":   { "value": "rgba(255,255,255,0.12)", "role": "border on panel" }
  },
  "font": {
    "sans": { "value": "Inter", "stack": "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif", "weights": [400, 500, 600], "use": "UI/body; headlines at 500" },
    "mono": { "value": "JetBrains Mono", "stack": "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace", "weights": [400, 500, 600], "use": "labels, chrome, buttons, metadata" }
  },
  "fontSize": {
    "display": "clamp(42px, 5.4vw, 76px)", "sectionHead": "clamp(28px, 3.4vw, 46px)",
    "title": "20px", "bodyLg": "19px", "body": "16px", "bodySm": "15px",
    "label": "12px", "labelSm": "11px", "button": "13px", "buttonLg": "14px"
  },
  "fontWeight": { "headline": 500, "label": 600, "body": 400 },
  "letterSpacing": { "display": "-0.03em", "section": "-0.02em", "title": "-0.015em", "label": "0.06em", "labelWide": "0.18em" },
  "radius": { "sm": "2px", "base": "3px", "md": "8px", "lg": "14px" },
  "space": { "gutter": "32px", "gutterSm": "20px", "section": "96px", "container": "1200px" },
  "motion": { "fast": "0.12s", "base": "0.16s", "reveal": "0.6s", "pulse": "2.4s", "easing": "ease" },
  "breakpoint": { "lg": "960px", "md": "720px", "sm": "480px", "xs": "360px" },
  "rules": {
    "accentIsSemantic": true,
    "textOnAccent": "#0a0a0a",
    "headlineWeight": 500,
    "separation": "1px hairline borders, not shadows",
    "shadowsOnlyOn": ["console panel", "illustration panel"],
    "maxAccentColors": 1,
    "gradientsAllowed": ["highlighter keyword", "panel lift"]
  }
}
```

---

## 14. How to apply this in another project (instructions for a dev or AI agent)

If you're handing this file to **Claude Code (or any agent) in the app repo**, paste
the prompt below. It turns this document into concrete, verifiable work.

> **Prompt to use in the app repo:**
>
> "Read `design-system.md`. Apply the PortRun design system to this app's frontend.
> Specifically:
> 1. **Vendor `tokens.css`** (§12) into the app and `@import` it once at the root —
>    this is the single source of truth; don't retype values. Then reference the
>    `--…` variables from components. Never hardcode hex. (If the app uses Tailwind,
>    also point `theme.extend` at these variables per §10.)
> 2. Load **Inter** (400/500/600) and **JetBrains Mono** (400/500/600).
> 3. Set the base `body` per §12 (off-white bg, ink text, Inter, `ss01/ss02`).
> 4. Restyle existing primitives to match §7/§12: **buttons** (mono, accent w/
>    near-black ink for primary, hairline ghost), **inputs/cards** (hairline borders,
>    small radii, `--bg-card`), **status chips** (`kbd-tag` / `live-pill`).
> 5. Apply the **rules** in §13 `rules`: one accent (semantic only), near-black on
>    accent never white, separation via 1px hairlines not shadows, headlines weight 500.
> 6. Wire `prefers-reduced-motion` and keep transitions at `.12–.16s`.
> 7. Reuse the **console `.panel`** chrome (§7/§12) for any dashboard, log, or status view.
> Don't restyle product logic or copy — only the visual layer. Show me a short list of
> what you changed and any components that need design decisions."

**Acceptance criteria (how to know it matches):**
- [ ] No raw hex in components — everything reads from tokens.
- [ ] Background is `#fafaf7`, text `#0a0a0a`; the page reads as off-white paper, not pure white.
- [ ] Exactly one accent (`#43c07d`); it appears only on good/active/primary elements.
- [ ] All buttons/labels/metadata are **JetBrains Mono**; headlines are **Inter 500** with tight tracking.
- [ ] Element separation is 1px hairlines; shadows appear only on console/illustration panels.
- [ ] Primary buttons are accent with **near-black** text (not white).
- [ ] `prefers-reduced-motion` disables reveal/scroll-smoothing; nothing janky.
- [ ] Side-by-side, an app screen and the marketing site look like the **same product**.

**Common mistakes to avoid (call these out in review):**
- White-on-green buttons (must be near-black ink).
- Bold (700) headlines — they should be 500.
- Pure-white page background — it's warm off-white `#fafaf7`.
- Bubbly/large radii — keep corners tight (2–14px by role).
- Introducing a second accent or gradients beyond the two allowed.

---

*Generated from the PortRun marketing site (`src/styles/global.css`, `src/consts.js`).
If the website's `--accent` changes, update it here and in the app to keep the two
products visually in sync. This file is self-contained — the app repo needs only
this `.md`, not the website source.*
