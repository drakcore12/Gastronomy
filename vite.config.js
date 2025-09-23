import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones para SEO y rendimiento
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Chunking strategy para mejor caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Límites de tamaño para warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimizaciones de desarrollo
  server: {
    port: 3000,
    open: true,
    allowedHosts: [
      'reducing-expense-beginning-exhaust.trycloudflare.com', // ✅ Host de Cloudflare Tunnel
    ],
  },
  // Pre-bundling para dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  // CSS code splitting
  css: {
    devSourcemap: true,
  },
})

