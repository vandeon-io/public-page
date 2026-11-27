# Vandeon — UI implementation guide (website + app)

How to build Vandeon UI in code. Stack-agnostic: plain CSS custom properties and
rules you can drop into any framework (React, Vue, Svelte, Tailwind, plain CSS).

**Each fact has one home:**

| What | Where |
|------|-------|
| Brand identity: essence, voice, what each color means, the logo mark, deck styling | **Vandeon design system** (Claude artifact): https://claude.ai/artifact/5En8uUaGWqSTtHSTiWxPnx |
| Token *values* (every color, font, radius, duration) | **`src/styles/tokens.css`** |
| How to *use* the tokens in UI (this file) | `docs/design-system.md` |

This guide names tokens and never repeats their values. To change a value, edit
`tokens.css` only (then re-vendor it to the app, §11).

---

## 1. Rules (also the review checklist)

1. **Tokens only.** No raw hex in components; everything reads a `--…` variable.
2. **One brand accent.** `--accent` means good / active / healthy / primary action,
   never decoration. `--warn` and `--danger` are status-only.
3. **Text on accent is `--accent-ink`** (near-black), never white.
4. **Separation is 1px hairlines** (`--line`), not shadows. Shadows only on console /
   illustration panels and floating overlays (§10).
5. **Headlines are Inter 500** with negative tracking, never 700.
   **All labels, buttons, and metadata are JetBrains Mono.**
6. **Page background is `--bg`** (warm off-white), not pure white.
7. **Small radii** (`--radius-sm` … `--radius-lg`). No pills or bubbly cards.
8. **Gradients:** only the highlighter (§3) and the panel lift (§5).
9. **Never signal state by color alone.** Pair it with text, an icon, weight, or
   position (critical for green vs red).
10. **Motion is fast and subtle**, and `prefers-reduced-motion` is always honored (§6).

---

## 2. Tokens: what each is for

Values live in `tokens.css`; the meaning of each color is in the artifact.

| Token | Use |
|-------|-----|
| `--fg` / `--fg-dim` / `--fg-dimmer` | Primary / secondary / tertiary text (mono captions use dimmer) |
| `--bg` / `--bg-card` | Page background / raised card surface |
| `--line` / `--line-soft` | Default border and divider / faint divider |
| `--accent` / `--accent-ink` | The accent / text and icons placed on it |
| `--warn` | In-progress status (amber) |
| `--danger` / `--danger-ink` | Destructive actions and errors / text on it (dark enough for white) |
| `--panel` | Dark console surface (terminal, log, control-plane views) |
| `--on-dark` / `--on-dark-dim` / `--on-dark-dimmer` / `--on-dark-line` | Text and borders on `--panel` |
| `--sans` / `--mono` | Inter / JetBrains Mono stacks |
| `--radius-sm` / `--radius` / `--radius-md` / `--radius-lg` | Tags and chips / buttons / panels and cards / large feature tiles |
| `--maxw` | Content container width |
| `--t-fast` / `--t-base` / `--t-reveal` | Hover color shifts / background and transform / scroll reveal |

**Status colors:** ready/healthy = `--accent`; in progress = `--warn`;
idle = a dim grey (`rgba(10,10,10,0.22)`); failed = `--danger`. Keep red rare: if
half the screen is red, it stops meaning danger.

**App dark mode:** the site is light-only. For a full dark theme, seed it from
`--panel` + the `--on-dark-*` tokens and keep `--accent` identical in both themes.

---

## 3. Typography

Load both families (weights 400 / 500 / 600), from Google Fonts or self-hosted:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

| Role | Family | Size | Weight | Tracking | Notes |
|------|--------|------|--------|----------|-------|
| Display / hero | sans | `clamp(42px, 5.4vw, 76px)` | 500 | `-0.03em` | `line-height: 0.98`, `text-wrap: balance` |
| Page head | sans | `clamp(40px, 5vw, 68px)` | 500 | `-0.03em` | `line-height: 0.99` |
| Section head | sans | `clamp(28px, 3.4vw, 46px)` | 500 | `-0.02em` | `line-height: 1.06` |
| Card / item title | sans | 20px | 500 | `-0.015em` | |
| Body | sans | 15–19px | 400 | — | `--fg-dim`; `text-wrap: pretty` |
| Micro-label | mono | 11–13px | 400–600 | `0.06–0.18em` | upper- or lowercase, `--fg-dim` / `--fg-dimmer` |
| Button | mono | 13px (14px large) | 600 | `0.01em` | |

### Highlighter emphasis
Keywords in headlines switch to mono with a green swipe across the lower third:

```css
.hl {
  font-style: normal; font-family: var(--mono); font-weight: 400;
  font-size: 0.78em;            /* mono runs larger; scale it down to match */
  padding: 0 0.12em; position: relative; top: -0.04em;
  background: linear-gradient(to top,
    color-mix(in oklch, var(--accent) 32%, transparent) 0%,
    color-mix(in oklch, var(--accent) 32%, transparent) 36%,
    transparent 36%);           /* fill only the bottom 36% */
}
```
Usage: `<h1>Your servers, <span class="hl">set up</span> for you.</h1>`

---

## 4. Layout

- **Container:** `max-width: var(--maxw)`, centered.
- **Outer gutter:** 32px desktop → 20px ≤720px → 16px ≤360px.
- **Section rhythm:** 96px vertical padding desktop → 72px ≤960px → 56px ≤720px.
- **Breakpoints:** `960px` (multi-column grids collapse to 1–2 columns), `720px`
  (single column, tighter gutters, secondary nav links hidden via `.hide-sm`),
  `480px`, `360px`.

### Hairline grid
Groups of cells (sizing cards, capabilities, plans, social cards) are a grid whose gap is a
single hairline: the grid background is `--line` and each cell is filled, so there
are no double borders.

```css
.grid-hairline { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.grid-hairline > * { background: var(--bg); }   /* or --bg-card */
```

---

## 5. Borders, shadows, backdrop

- **Borders:** `1px solid var(--line)` everywhere.
- **Section dividers:** `1px dashed var(--line)`.
- **Panel lift** (the only content shadows):
  ```css
  /* light panel */
  box-shadow: 0 22px 50px -28px rgba(10,10,10,0.25);
  /* dark / console panel */
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset,
              0 30px 70px -24px rgba(0,0,0,0.34),
              0 10px 28px -10px rgba(0,0,0,0.22);
  ```
- **Dotted backdrop** (optional ambiance), faded toward the bottom:
  ```css
  body::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(var(--line) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: radial-gradient(ellipse at 50% -10%, black 30%, transparent 72%);
  }
  ```
- Illustration SVGs use a 22px grid pattern for the "blueprint" look.

---

## 6. Motion

- **Buttons:** `transition: transform .06s, filter .14s, border-color .14s, background .14s, color .14s;`
  pressed = `translateY(1px)`; the primary button's `→` nudges `translateX(3px)` on hover.
- **Reveal on scroll:** `.reveal` starts at `opacity: 0; translateY(10px)`; adding `.in`
  settles it over `--t-reveal`.
- **Live pulse:** status dot pulses opacity on a 2.4s ease-in-out loop, with an accent halo.

```css
.reveal { opacity: 0; transform: translateY(10px); }
.reveal.in { opacity: 1; transform: none; transition: opacity var(--t-reveal) ease, transform var(--t-reveal) ease; }
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.in { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}
```

```js
// Adds .in to .reveal elements as they enter view (framework-agnostic).
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

## 7. Components

Class names match the website, so CSS can be lifted directly. Everything references
tokens only.

```css
/* base */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; background: var(--bg); color: var(--fg);
  font-family: var(--sans); font-size: 16px; line-height: 1.5;
  -webkit-font-smoothing: antialiased; font-feature-settings: 'ss01', 'ss02';
}
a { color: inherit; text-decoration: none; }
.container { max-width: var(--maxw); margin: 0 auto; padding: 0 32px; }

/* headlines (§3 scale) */
.h-display { font-family: var(--sans); font-weight: 500; letter-spacing: -0.03em;
  line-height: 0.98; font-size: clamp(42px, 5.4vw, 76px); text-wrap: balance; }
.h-section { font-family: var(--sans); font-weight: 500; letter-spacing: -0.02em;
  line-height: 1.06; font-size: clamp(28px, 3.4vw, 46px); text-wrap: balance; }

/* mono helpers */
.mono { font-family: var(--mono); }
.mono-label { font-family: var(--mono); font-size: 12px; color: var(--fg-dim); letter-spacing: 0.02em; }
.mono-dim { font-family: var(--mono); font-size: 12px; color: var(--fg-dimmer); }
.sect-tag { font-family: var(--mono); font-size: 12px; color: var(--fg-dim);
  letter-spacing: 0.08em; text-transform: uppercase; }   /* "§ how it works" */

/* buttons — read like "launch app →" */
.btn { display: inline-flex; align-items: center; gap: 9px; cursor: pointer;
  font-family: var(--mono); font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
  padding: 11px 18px; border: 1px solid transparent; border-radius: var(--radius);
  white-space: nowrap;
  transition: transform .06s, filter .14s, border-color .14s, background .14s, color .14s; }
.btn:active { transform: translateY(1px); }
.btn-primary { background: var(--accent); color: var(--accent-ink); }
.btn-primary:hover { filter: brightness(0.93); }
.btn-primary .btn-arrow { transition: transform var(--t-base); }
.btn-primary:hover .btn-arrow { transform: translateX(3px); }
.btn-ghost { background: transparent; border-color: var(--line); color: var(--fg-dim); }
.btn-ghost:hover { color: var(--fg); border-color: var(--fg-dimmer); }
.btn-lg { font-size: 14px; padding: 14px 24px; }

/* status / context chips */
.kbd-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px;
  border: 1px solid var(--line); border-radius: var(--radius-sm);
  font-family: var(--mono); font-size: 12px; color: var(--fg-dim);
  background: color-mix(in oklch, var(--bg) 55%, white); }
.kbd-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.live-pill { display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 12px; color: var(--fg-dim); }   /* "● live" */
.live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 25%, transparent);
  animation: pulse 2.4s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: 0.35; } }

/* card */
.card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 28px; }
.card-kicker { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.06em; }
.card-title { font-size: 20px; font-weight: 500; letter-spacing: -0.015em; margin: 10px 0 6px; }
.card-body { font-size: 15px; color: var(--fg-dim); margin: 0; text-wrap: pretty; }

/* dark console panel */
.panel { background: var(--panel); color: var(--on-dark); border: 1px solid var(--on-dark-line);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset,
              0 30px 70px -24px rgba(0,0,0,0.34), 0 10px 28px -10px rgba(0,0,0,0.22); }
```

- **Interactive cards:** on hover, lighten the background slightly and shift a mono
  "open ↗" affordance to `--accent` with `translateX(2px)`.
- **Console panel chrome:** a faux tab bar (mono 11px tabs, active tab underlined,
  top border `1px solid rgba(255,255,255,0.07)`) and a right-aligned meta cluster
  like `3/3 nodes  ● live`. This is the strongest brand carrier for an app dashboard;
  use it for real status, log, and deployment views.

---

## 8. Forms & focus *(app; the site has none)*

Fields are paper-on-paper with a hairline; mono is for labels and "data" values; the
accent shows focus.

```css
.field { display: flex; flex-direction: column; gap: 6px; }
.label { font-family: var(--mono); font-size: 12px; color: var(--fg-dim); letter-spacing: 0.02em; }

.input, .select, .textarea {
  font-family: var(--sans); font-size: 14px; color: var(--fg);
  background: var(--bg-card);
  border: 1px solid var(--line); border-radius: var(--radius);
  padding: 10px 12px;
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}
.input::placeholder { color: var(--fg-dimmer); }
.input:hover { border-color: var(--fg-dimmer); }

/* focus — accent hairline + soft ring (same halo as .live-dot) */
.input:focus-visible, .select:focus-visible, .textarea:focus-visible,
.btn:focus-visible, a:focus-visible {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 25%, transparent);
}

.input--mono { font-family: var(--mono); font-size: 13px; }   /* IDs, IPs, ports, tokens */
.input:disabled { color: var(--fg-dimmer); background: var(--bg); cursor: not-allowed; }

/* error */
.input--error { border-color: var(--danger); }
.input--error:focus-visible { box-shadow: 0 0 0 3px color-mix(in oklch, var(--danger) 22%, transparent); }
.error-text { font-family: var(--mono); font-size: 11px; color: var(--danger); }
.help-text  { font-family: var(--mono); font-size: 11px; color: var(--fg-dimmer); }

/* confirmed destructive actions only */
.btn-danger { background: var(--danger); color: var(--danger-ink); }
.btn-danger:hover { filter: brightness(0.94); }
```

- Use `:focus-visible`, not `:focus`, so mouse clicks don't draw the ring. Never remove
  an outline without replacing it.
- **Checkboxes / radios / toggles:** small and square-ish; checked = `--accent` fill
  with an `--accent-ink` mark. Toggles read like a tiny terminal switch.
- Prefer a ghost button + an explicit confirm step over a one-click red button.

---

## 9. Tables, numerals, states *(app)*

```css
.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table th {
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em; color: var(--fg-dim);
  text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--line);
}
.table td { padding: 12px 14px; border-bottom: 1px solid var(--line-soft); color: var(--fg); }
.table tbody tr:hover { background: color-mix(in oklch, var(--bg) 40%, white); }
.num { font-family: var(--mono); font-variant-numeric: tabular-nums; text-align: right; }
```

- Always `tabular-nums` on number columns (metrics, counts, money, durations).
- Header rule is `--line`; row separators are `--line-soft`. Dense/log variant: cell
  padding `8px 12px`.
- Status cells reuse the LED dot + mono label (`● healthy`, `● converging`, `● failed`).

| State | Treatment |
|-------|-----------|
| **Hover** | text `--fg-dim → --fg`; border `--line → --fg-dimmer`; surface lightens (`color-mix(… white)`); primary button `brightness(0.93)` |
| **Pressed** | `translateY(1px)` |
| **Focus (keyboard)** | `:focus-visible` accent border + 3px accent halo (§8) |
| **Selected / current** | text → `--fg` + a 1–2px `--accent` marker (left border, underline, or dot) |
| **Disabled** | `--fg-dimmer` text, `--bg` surface, `cursor: not-allowed`, no hover |
| **Loading** | skeleton blocks in `--line` (shimmer optional) or a pulsing `--accent` dot; disable the trigger |
| **Error** | `--danger` border + `--danger` mono message |
| **Empty** | mono caption in `--fg-dimmer` + one primary action; never a blank panel |

---

## 10. Elevation & z-index *(app)*

Surfaces stay flat; only things that genuinely float get a shadow.

```css
/* add to the app's tokens if you want a shared layering scale */
:root {
  --z-sticky: 100;     /* sticky headers / toolbars */
  --z-dropdown: 200;   /* menus, selects, popovers  */
  --z-modal: 300;      /* dialogs + backdrop        */
  --z-toast: 400;      /* transient notifications   */
  --z-tooltip: 500;    /* always on top             */
}
.overlay {
  background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-md);
  box-shadow: 0 22px 50px -28px rgba(10,10,10,0.25), 0 8px 20px -12px rgba(10,10,10,0.18);
}
.backdrop { background: color-mix(in oklch, var(--fg) 38%, transparent); }  /* dim, not black */
```

Toasts reuse the `live-pill` / `kbd-tag` language: success = `--accent`, error = `--danger`.

---

## 11. Icons, illustration, accessibility

- **Logo:** see the artifact for the mark and its rules. Files here: inline SVG in
  `src/components/Nav.astro` (styled by `.nav-brand-mark` / `.nav-brand-node`),
  `public/favicon.svg`, and PNG icons generated by `scripts/gen-og.mjs`.
- **Icons:** thin-stroke monochrome SVGs (`stroke-width` ~1–1.6 at small sizes) in
  `currentColor` or `--fg-dim`; accent only on the "good" element.
- **Status LEDs:** small filled circles colored by state (§2).
- **Illustration:** the hero is data-driven SVG (`you → web app → servers`, nodes
  turning healthy). In the app, prefer real versions of these motifs (actual node
  health, real progress) over decorative ones.
- **Contrast:** ink on paper passes comfortably; near-black on green is verified,
  white on green is not.
- **Touch targets:** on phones, primary buttons get `min-height: 44–48px`.

---

## 12. Using this in the app

**Vendor `tokens.css`, don't retype it.** Copy the website's file into the app and
import it once at the root. Never edit the app's copy by hand; re-copy when it changes.

```bash
cp ../public-page/src/styles/tokens.css ./src/styles/tokens.css
```
```css
@import './styles/tokens.css';
```

**Tailwind:** point the theme at the variables so values stay in `tokens.css`:

```js
extend: {
  colors: {
    ink:    { DEFAULT: 'var(--fg)', dim: 'var(--fg-dim)', dimmer: 'var(--fg-dimmer)' },
    paper:  'var(--bg)',
    card:   'var(--bg-card)',
    accent: { DEFAULT: 'var(--accent)', ink: 'var(--accent-ink)' },
    warn:   'var(--warn)',
    danger: { DEFAULT: 'var(--danger)', ink: 'var(--danger-ink)' },
    line:   { DEFAULT: 'var(--line)', soft: 'var(--line-soft)' },
    panel:  'var(--panel)',
  },
  fontFamily: { sans: ['var(--sans)'], mono: ['var(--mono)'] },
  borderRadius: { sm: 'var(--radius-sm)', DEFAULT: 'var(--radius)', md: 'var(--radius-md)', lg: 'var(--radius-lg)' },
  maxWidth: { content: 'var(--maxw)' },
}
```
Then `bg-paper text-ink`, `bg-accent text-accent-ink`, `border-line`,
`font-mono text-ink-dim`. Keep headlines at `font-medium` (500).

**Prompt for Claude Code (or any agent) in the app repo:**

> "Read `docs/design-system.md` from the public-page repo and apply it to this app's
> frontend. Vendor `tokens.css` and import it once (§12); load the fonts (§3); set the
> base styles and restyle existing primitives per §7–§10. Follow the rules in §1 —
> they are the acceptance criteria. Change only the visual layer, not product logic or
> copy. Then list what you changed and any components that need design decisions."

**Done when:** every rule in §1 holds, and an app screen next to the marketing site
looks like the same product.
