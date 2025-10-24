// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://phansiri.github.io/',
  
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
      tailwindcss({
        plugins: ['@tailwindcss/typography']
      })
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