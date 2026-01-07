import { useEffect, useCallback } from 'react';

/**
 * usePrefetch - Hook para cargar componentes dinámicos en segundo plano
 * Ideado para mejorar UX cuando hay hover en links
 * 
 * Uso:
 *   const { prefetch } = usePrefetch();
 *   <a onMouseEnter={() => prefetch(() => import('./HeavyComponent'))} />
 */
export const usePrefetch = () => {
  const prefetch = useCallback(
    (componentImporter: () => Promise<unknown>) => {
      // Crear un script tag temporalmente para cargar en background
      // o usar dynamic import que está soportado nativamente
      try {
        // Simplemente llamar el import() carga el módulo en el bundler
        componentImporter().catch(() => {
          // Silenciosamente fallar si hay error (no es crítico)
        });
      } catch (error) {
        console.warn('Prefetch failed:', error);
      }
    },
    []
  );

  return { prefetch };
};

export default usePrefetch;
