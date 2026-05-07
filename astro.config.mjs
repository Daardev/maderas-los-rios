import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://maderas-los-rios.vercel.app',
  integrations: [tailwind(), react()],
  vite: {
    // Alias assets for easier imports
    resolve: {
      alias: {
        '@assets': '/src/assets',
        '@components': '/src/components',
        '@styles': '/src/styles',
      },
    },
  },
});
