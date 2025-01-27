import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, './server'),
      '@routes': path.resolve(__dirname, './server/routes'),
      '@controllers': path.resolve(__dirname, './server/controllers'),
      '@models': path.resolve(__dirname, './server/models'),
      '@services': path.resolve(__dirname, './server/services'),
      '@middleware': path.resolve(__dirname, './server/middleware'),
      '@utils': path.resolve(__dirname, './server/utils'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: false,
    },
  },
  build: {
    outDir: './dist',
    sourcemap: true, // Generate source maps for easier debugging
  },
});
