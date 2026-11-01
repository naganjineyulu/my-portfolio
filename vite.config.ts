import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const modulePath = id.replace(/\\/g, '/');

          if (modulePath.includes('/node_modules/three/')) return 'three';
          if (modulePath.includes('/node_modules/@react-three/fiber/')) return 'react-three-fiber';
          if (modulePath.includes('/node_modules/@react-three/drei/')) return 'react-three-drei';
        },
      },
    },
  },
});
