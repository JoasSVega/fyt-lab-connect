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
    // Deduplicate React to avoid multiple instances across chunks/dep graphs (prevents dispatcher=null)
    dedupe: ["react", "react-dom"],
  },
  // Fuerza a que React y dependencias lean el modo correcto durante el prebundle de Vite.
  // En algunos hosts de preview el proceso puede tener NODE_ENV=production incluso en dev,
  // lo que hace que Vite pre-empaquete la versión de producción de React en desarrollo y
  // provoca errores como "dispatcher is null" al ejecutar hooks.
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
  optimizeDeps: {
    // Asegura que React y Radix usen una sola instancia de React en el grafo de dependencias
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-primitive',
      '@radix-ui/react-context',
    ],
    esbuildOptions: {
      define: {
        "process.env.NODE_ENV": mode === 'production' ? '"production"' : '"development"',
      },
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
