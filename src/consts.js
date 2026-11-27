// Single source of truth for site-wide constants.
// ────────────────────────────────────────────────────────────────────────────
// EDIT THESE LINKS once they exist. Until then they point at "#".
// Flip to true when app.vandeon.io launches: every "coming soon" becomes "launch app".
export const APP_LIVE = false;

export const LINKS = {
  app:      'https://app.vandeon.io',   // the actual Vandeon web app
  linkedin: '#',   // LinkedIn company page
  telegram: '#',   // Telegram channel
};

// NOTE: design tokens (accent, colors, fonts) live in src/styles/tokens.css —
// the single source of truth. The hero illustration reads var(--accent) directly,
// so there is no JS copy of the accent to keep in sync.

// Site-wide SEO defaults. SITE must match `site` in astro.config.mjs.
// SOCIAL is used for Organization structured data (JSON-LD).
export const SEO = {
  name: 'Vandeon',
  // Default share image (1200×630) — lives in public/, served from the root.
  ogImage: '/og.png',
  twitter: '@vandeon', // X/Twitter handle for the card byline (update if it changes)
};

export const PLATFORMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '/company/vandeon',
    purpose: 'The official record. Product milestones, the story behind what we are building, hiring, and the occasional deep-dive on how we run infrastructure for thousands of servers.',
    tags: ['company updates', 'milestones', 'hiring'],
    href: 'linkedin',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: '@vandeon',
    purpose: 'The fast lane. Release notes the moment they ship, early-access invites, live status during rollouts, and a direct line to the team — no algorithm in between.',
    tags: ['release notes', 'early access', 'status'],
    href: 'telegram',
  },
];
