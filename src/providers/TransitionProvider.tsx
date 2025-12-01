import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollManager';

interface TransitionContextValue {
  isTransitioning: boolean;
  signalPageReady: () => void;
  preloadImages: (urls: string[]) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used within TransitionProvider');
  return ctx;
};

interface TransitionProviderProps {
  children: ReactNode;
  minLoaderDuration?: number;
}

export const TransitionProvider = ({ 
  children, 
  minLoaderDuration = 1450 
}: TransitionProviderProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageReadySignaled, setPageReadySignaled] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Preload de imágenes
  const preloadImages = useCallback((urls: string[]): Promise<void> => {
    if (!urls || urls.length === 0) {
      setImagesPreloaded(true);
      return Promise.resolve();
    }

    const promises = urls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // No bloqueamos si falla una imagen
        img.src = url;
      });
    });

    return Promise.all(promises).then(() => {
      setImagesPreloaded(true);
    });
  }, []);

  // Signal que la página está lista
  const signalPageReady = useCallback(() => {
    setPageReadySignaled(true);
  }, []);

  // Iniciar transición en cada cambio de ruta
  useEffect(() => {
    setIsTransitioning(true);
    setPageReadySignaled(false);
    setMinTimeElapsed(false);
    // Por defecto asumimos que no hay imágenes críticas; las páginas que
    // sí tengan imágenes llamarán a preloadImages y actualizarán este estado.
    setImagesPreloaded(true);
    lockBodyScroll();
    (window as any).__routeTransitionActive = true;

    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minLoaderDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, minLoaderDuration]);

  // Finalizar transición cuando TODO esté listo
  useEffect(() => {
    if (isTransitioning && minTimeElapsed && pageReadySignaled && imagesPreloaded) {
      // Pequeño delay para suavidad
      const finishTimer = setTimeout(() => {
        setIsTransitioning(false);
        try {
          unlockBodyScroll();
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          document.body.classList.remove('scroll-locked');
        } catch {}
        (window as any).__routeTransitionActive = false;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 50);

      return () => clearTimeout(finishTimer);
    }
  }, [isTransitioning, minTimeElapsed, pageReadySignaled, imagesPreloaded]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, signalPageReady, preloadImages }}>
      {children}
    </TransitionContext.Provider>
  );
};
