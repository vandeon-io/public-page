// One-off asset generator: rasterizes the OG share card and PWA/Apple icons
// into ./public. Re-run with `node scripts/gen-og.mjs` after editing the art.
// Uses the `sharp` that ships with Astro's image pipeline.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Brand colors are mirrored from src/styles/tokens.css (this is a Node build
// script and can't read CSS variables). If you change tokens.css, update these
// three and re-run `node scripts/gen-og.mjs`.
const BG = '#fafaf7';     // --bg
const FG = '#0a0a0a';     // --fg
const ACCENT = '#43c07d'; // --accent

// ── 1200×630 Open Graph card ────────────────────────────────────────────────
const node = (y, label, ready) => `
  <rect x="760" y="${y}" width="360" height="56" rx="8" fill="#ffffff" stroke="${ready ? ACCENT : 'rgba(10,10,10,0.18)'}" stroke-width="1.5"/>
  <circle cx="788" cy="${y + 28}" r="6" fill="${ready ? ACCENT : '#e0a04a'}"/>
  <text x="808" y="${y + 33}" font-family="Consolas, monospace" font-size="18" fill="rgba(10,10,10,0.6)">${label}</text>
  ${ready ? `<text x="1096" y="${y + 33}" text-anchor="end" font-family="Consolas, monospace" font-size="15" fill="${FG}">ready</text>` : ''}
`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="rgba(10,10,10,0.10)"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <g transform="translate(80,86)">
    <rect width="13" height="13" rx="3" fill="${ACCENT}"/>
    <text x="26" y="11" font-family="Consolas, monospace" font-size="16" letter-spacing="2" fill="rgba(10,10,10,0.5)">VANDEON</text>
  </g>

  <text x="80" y="250" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="80" fill="${FG}">Your app, live.</text>
  <!-- highlighter swipe behind the mono keyword, as in the site hero -->
  <rect x="74" y="300" width="558" height="30" fill="${ACCENT}" fill-opacity="0.32"/>
  <text x="80" y="326" font-family="Consolas, monospace" font-size="72" fill="${FG}">Automatically.</text>

  <text x="82" y="408" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="rgba(10,10,10,0.62)">Set it up once. Vandeon runs your app</text>
  <text x="82" y="448" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="rgba(10,10,10,0.62)">the right way, sized to what it needs.</text>

  <text x="80" y="560" font-family="Consolas, monospace" font-size="22" fill="${FG}">vandeon.io</text>

  ${node(170, 'screens', true)}
  ${node(246, 'logic', true)}
  ${node(322, 'data', false)}
</svg>`;

await sharp(Buffer.from(og)).png().toFile(join(pub, 'og.png'));
console.log('wrote og.png (1200×630)');

// ── App icons from the favicon mark ─────────────────────────────────────────
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${FG}"/>
  <path d="M20 20 L32 43 M44 20 L32 43" fill="none" stroke="${BG}" stroke-width="3.6" stroke-linecap="round"/>
  <circle cx="20" cy="20" r="4.2" fill="${BG}"/>
  <circle cx="44" cy="20" r="4.2" fill="${BG}"/>
  <circle cx="32" cy="43.5" r="6.2" fill="${ACCENT}"/>
</svg>`;

for (const size of [180, 192, 512]) {
  const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(join(pub, name));
  console.log(`wrote ${name}`);
}
