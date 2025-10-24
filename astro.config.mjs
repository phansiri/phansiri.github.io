// @ts-check

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';
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