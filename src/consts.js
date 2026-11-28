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

// ── Pricing (beta) ──────────────────────────────────────────────────────────
// Source: "Vandeon Pricing: Beta Release (v1)" doc. ALL PRICES ARE PLACEHOLDERS.
// Plain-language mapping used on the page:
//   system → "app" · deployment → "part" · environment → "copy"
//   production → "live copy" · non-production → "test copy"
export const ANNUAL_DISCOUNT = 0.2; // 20% off when billed yearly

export const PLANS = [
  {
    id: 'startups',
    name: 'Startups',
    monthly: 79,
    who: 'For early-stage teams running their first products.',
    limits: ['1 app, with a live copy and a test copy', 'Up to 5 parts per app'],
    lead: 'Includes',
    features: [
      'Connects to GitHub and your hosting accounts',
      'Updates with zero downtime',
      'Undo a bad update',
      'Automatic scaling on your live copy, up to 1 extra server per part',
      'Automatic health checks and restarts',
      'Uptime alerts by email',
      'Your own domain, secured',
      'Safe storage for passwords and keys',
      'Basic monitoring',
      'Daily backup (latest one kept)',
      'Logs kept for 14 days, last 20 updates in history',
    ],
    cta: 'launch app', href: 'app', featured: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: 299,
    who: 'For larger teams running bigger, more complex systems.',
    limits: ['1 app, with a live copy and a test copy', 'Up to 20 parts per app'],
    lead: 'Everything in Startups, plus',
    features: [
      'More automatic scaling, up to 5 extra servers per part',
      'Daily backups, kept for 30 days',
      'Logs kept for 90 days',
      'Update history kept for 1 year',
    ],
    cta: 'launch app', href: 'app', featured: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    monthly: null, // negotiated per company
    who: 'For companies that need any limit raised.',
    limits: ['Apps, parts and copies set to fit', 'Log and backup retention set to fit'],
    lead: 'Everything in Enterprise, plus',
    features: ['Limits negotiated per company', 'Billing terms confirmed per deal'],
    cta: null, href: null, featured: false, // no contact route during the beta
  },
];

export const FAQS = [
  { q: 'Do I pay for servers separately?', a: 'Yes. Your app runs on your own hosting account, and you pay your provider for the servers directly. Your Vandeon plan covers setting them up and running them properly. You can connect as many hosting accounts as you like.' },
  { q: 'What counts as an app?', a: 'One product you run, such as your customer website, with all its parts: what people see, the logic behind it, and where data is kept. Each part counts toward your plan. Updating a part does not.' },
  { q: 'What is a test copy?', a: 'A separate copy of your app for trying changes before they reach customers. Every plan includes one per app.' },
  { q: 'How does automatic scaling work?', a: 'When your live app gets busy, Vandeon adds servers to the parts under load, up to your plan’s limit: 1 extra server per part on Startups, 5 on Enterprise. The extra servers run in your hosting account, so your provider bills them. During the beta these limits are fixed.' },
  { q: 'What happens when I outgrow my plan?', a: 'Move up a plan. If you need more than Enterprise allows, such as more apps, Custom raises any limit. Add-ons are not available during the beta.' },
  { q: 'How do I pay?', a: 'By card, monthly or yearly. Paying yearly saves 20%.' },
];

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
