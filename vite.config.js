// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/shared-wishlist-app/',
  build: {
    outDir: 'docs'
  },
  plugins: [react()],
});