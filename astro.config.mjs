import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production URL — drives canonical links, absolute OG image URLs, and the
  // generated sitemap. Update if the domain changes.
  site: 'https://portrun.io',
  integrations: [react(), sitemap()],
  // Static site — outputs plain HTML/CSS/JS to ./dist
  output: 'static',
});
