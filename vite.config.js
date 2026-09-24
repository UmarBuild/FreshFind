import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    fs: {
      // Allow serving files from project root; explicitly exclude skills/upload from scanning
      allow: ['..'],
    },
    watch: {
      ignored: ['**/skills/**', '**/upload/**', '**/node_modules/**'],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  optimizeDeps: {
    exclude: [],
  },
  // Don't try to scan skills/ or upload/ for imports
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
})
