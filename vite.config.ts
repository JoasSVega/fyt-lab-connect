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
}));
