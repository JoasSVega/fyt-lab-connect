import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useTopLoader - Hook para controlar TopLoader durante cambios de ruta
 * Detecta cambios en location y controla el estado de loading
 */
export const useTopLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Iniciar loading cuando cambia la ruta
    setIsLoading(true);

    // Crear un timer para simular carga (por si la página carga muy rápido)
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    // Detener cuando el DOM está listo
    const handlePageLoad = () => {
      setIsLoading(false);
      clearTimeout(minLoadTime);
    };

    // Escuchar cuando la página termina de cargar
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handlePageLoad, { once: true });
    }

    return () => {
      clearTimeout(minLoadTime);
      window.removeEventListener('load', handlePageLoad);
    };
  }, [location.pathname]);

  return { isLoading };
};

export default useTopLoader;
