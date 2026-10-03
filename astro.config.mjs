// @ts-check

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/lib/config.ts';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url + '/',
  
  // Performance optimizations
  compressHTML: true,
  scopedStyleStrategy: 'attribute',
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },

  // Allow MDX to compile HTML nodes emitted by integrations like astro-mermaid.
  markdown: {
    processor: satteri({
      features: { rawHtml: true },
    }),
  },
  
  // Vite configuration
  vite: {
    plugins: [
      tailwindcss()
    ],
    build: {
      cssMinify: true,
    },
  },

  // prefetch
  prefetch: {
    prefetchAll: true
  },

  integrations: [react(), mdx(), mermaid()],
});