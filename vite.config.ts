import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// Visualizer for bundle analysis (activated with ANALYZE=true)
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Usar rutas relativas en producción para evitar 404 de assets en previews o subrutas (Lovable)
  // En dev mantenemos '/'
  base: mode === 'production' ? './' : '/',
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
  // Build settings. Avoid custom manualChunks to prevent circular chunk execution
  // that can cause React to be undefined in some hosts. Let Rollup handle chunking.
  build: {
    emptyOutDir: true,
    manifest: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
    globals: true,
  },
}));
