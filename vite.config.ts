import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// Visualizer for bundle analysis (activated with ANALYZE=true)
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Añadir visualizer sólo cuando ANALYZE=true (evita incluirlo en builds normales)
    process.env.ANALYZE === 'true' && visualizer({ open: true, filename: 'dist/bundle-analysis.html' }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Conservative manualChunks to separate very large third-party libraries
  // This reduces the size of the main chunk and makes heavy libs cacheable.
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id || !id.includes('node_modules')) return undefined;

          // Group framer-motion and its internals (motion-dom) together
          if (id.includes('framer-motion') || id.includes('motion-dom')) {
            return 'vendor-framer-motion';
          }

          // Charts (recharts) are large and not needed on first paint for many pages
          if (id.includes('recharts')) {
            return 'vendor-recharts';
          }

          // Carousel / embla
          if (id.includes('embla-carousel')) {
            return 'vendor-embla';
          }

          // Icon libraries
          if (id.includes('lucide-react') || id.includes('@heroicons') || id.includes('react-icons')) {
            return 'vendor-icons';
          }

          // React & react-dom (small split to enable long-term caching)
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor-react';
          }

          // Fallback: group remaining node_modules into a vendors chunk
          return 'vendor';
        }
      }
    }
  },
}));
