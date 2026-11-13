import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'three'],
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: false
  },
  // Exclude large asset archives from file watching to prevent Vite EBUSY errors
  watch: {
    ignored: ['**/*.zip']
  },
  build: {
    // Three.js ships as one module (~666 kB min / 172 kB gzip) and cannot be
    // split internally, so warn only above the size of that vendor chunk.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split heavy vendor libraries into cacheable chunks so the 3D stack
        // does not ship inside the main entry bundle.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Check @react-three first: its path also contains the substring "three".
          if (id.includes('@react-three')) return 'r3f';
          if (id.includes('three')) return 'three-core';
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'react';
          return 'vendor';
        }
      }
    }
  }
});
