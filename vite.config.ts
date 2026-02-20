import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// Visualizer for bundle analysis (activated with ANALYZE=true)
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, isSsrBuild }) => ({
  // Configuración para GitHub Pages con dominio propio
  // Usar '/' para dominio personalizado, evita problemas con rutas absolutas
  base: '/',
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
      // En SSR usar shim para react-helmet-async (no se usa en prerender; head estático)
      ...(process.env.SSR === 'true' && {
        'react-helmet-async': path.resolve(__dirname, './src/shims/react-helmet-async.tsx'),
      }),
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
  // Build settings optimized for performance
  build: {
    emptyOutDir: true,
    manifest: true,
    ssrManifest: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 3, // Aumentado de 2 a 3 para mejor compresión
      },
      format: {
        comments: false,
      },
      mangle: {
        safari10: false, // Faster on modern browsers
      },
    },
    cssMinify: true,
    // Rollup configuration
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false, // Better tree-shaking
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks: (id) => {
          // Chunk heavy dependencies separately for better caching and tree-shaking
          if (id.includes('node_modules')) {
            // Core React libraries - loaded first, cached long-term
            if (id.includes('react') && !id.includes('@')) {
              return 'react-core';
            }
            if (id.includes('react-dom')) {
              return 'react-core';
            }
            // Router library - needed for all routes
            if (id.includes('react-router-dom')) {
              return 'react-router';
            }
            // Animation library - loaded on-demand for interactive components
            if (id.includes('framer-motion')) return 'motion';
            // Math rendering - large but only needed on specific pages with KaTeX
            if (id.includes('katex')) return 'katex';
            // Charts libraries - only for data visualization pages
            if (id.includes('recharts') || id.includes('victory')) return 'charts';
            // Query library - used across the app
            if (id.includes('@tanstack/react-query')) return 'query';
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('zod')) return 'forms';
            // Individual Radix UI libs to enable tree-shaking
            if (id.includes('@radix-ui/react-dialog')) return 'radix-dialog';
            if (id.includes('@radix-ui/react-select')) return 'radix-select';
            if (id.includes('@radix-ui/react-tooltip')) return 'radix-tooltip';
            if (id.includes('@radix-ui')) return 'radix-ui';
            // Carousel/image libraries - lazy loaded on tool pages
            if (id.includes('embla')) return 'carousel';
            // Icons library - shared across all pages
            if (id.includes('lucide-react')) return 'icons';
            // Utilities that might not be fully tree-shaken
            if (id.includes('class-variance-authority') || id.includes('clsx')) return 'class-utils';
            // Toast/notification library
            if (id.includes('sonner')) return 'sonner';
            // Everything else goes to vendor
            return 'vendor';
          }
        },
        // Optimize chunk naming for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimize chunk size warnings - mobile-first target
    chunkSizeWarningLimit: 500, // Target 500 KiB max for better mobile experience
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
    globals: true,
  },
}));
