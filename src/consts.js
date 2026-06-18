// Single source of truth for site-wide constants.
// ────────────────────────────────────────────────────────────────────────────
// EDIT THESE LINKS once they exist. Until then they point at "#".
export const LINKS = {
  app:      '#',   // the actual PortRun web app
  linkedin: '#',   // LinkedIn company page
  telegram: '#',   // Telegram channel
};

// Brand accent. Change once here and the whole site follows (it's wired to the
// --accent CSS variable in global.css, and passed to the hero illustration).
export const ACCENT = '#43c07d';

// Site-wide SEO defaults. SITE must match `site` in astro.config.mjs.
// SOCIAL is used for Organization structured data (JSON-LD).
export const SEO = {
  name: 'PortRun',
  // Default share image (1200×630) — lives in public/, served from the root.
  ogImage: '/og.png',
  twitter: '@portrun', // X/Twitter handle for the card byline (update if it changes)
};

export const PLATFORMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '/company/portrun',
    purpose: 'The official record. Product milestones, the story behind what we are building, hiring, and the occasional deep-dive on how we run infrastructure for thousands of servers.',
    tags: ['company updates', 'milestones', 'hiring'],
    href: 'linkedin',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: '@portrun',
    purpose: 'The fast lane. Release notes the moment they ship, early-access invites, live status during rollouts, and a direct line to the team — no algorithm in between.',
    tags: ['release notes', 'early access', 'status'],
    href: 'telegram',
  },
];
