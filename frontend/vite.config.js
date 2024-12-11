import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/characters': 'http://localhost:3000',
      '/powers': 'http://localhost:3000',
    },
  },
});
