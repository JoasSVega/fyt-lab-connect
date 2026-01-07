import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollManager';

interface TransitionContextValue {
  isTransitioning: boolean;
  signalPageReady: () => void;
  preloadImages: (urls: string[]) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTransition = (): TransitionContextValue => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used within TransitionProvider');
  return ctx;
};

// Helper: Detectar si una ruta es una página principal
const isMainPage = (path: string): boolean => {
  const mainPages = [
    '/',
    '/noticias',
    '/herramientas',
    '/sobre-nosotros',
    '/contactos',
    '/equipo',
    '/investigacion',
    '/politica-privacidad',
    '/terminos-uso',
    '/codigo-etica',
  ];
  return mainPages.includes(path);
};

// Helper: Detectar si debe mostrarse el loader
const shouldShowLoader = (fromPath: string, toPath: string): boolean => {
  const fromIsMain = isMainPage(fromPath);
  const toIsMain = isMainPage(toPath);
  
  // Mostrar loader si:
  // 1. De página principal a página principal
  // 2. De subpágina a página principal
  // 3. De página principal a subpágina
  // NO mostrar si: De subpágina a subpágina
  
  if (!fromIsMain && !toIsMain) {
    // Ambas son subpáginas, verificar si son del mismo grupo
    const fromGroup = fromPath.split('/')[1] || '';
    const toGroup = toPath.split('/')[1] || '';
    // No mostrar loader entre subpáginas del mismo grupo
    if (fromGroup === toGroup) return false;
  }
  
  return true;
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
  const watchdogTimer = useRef<number | null>(null);
  const startedAt = useRef<number>(0);
  const previousPath = useRef<string>(location.pathname);

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
    const currentPath = location.pathname;
    const prevPath = previousPath.current;
    
    // Verificar si debe mostrarse el loader
    const showLoader = shouldShowLoader(prevPath, currentPath);
    
    if (showLoader) {
      setIsTransitioning(true);
      setPageReadySignaled(false);
      setMinTimeElapsed(false);
      setImagesPreloaded(true);
      lockBodyScroll();
      const win = window as Window & { __routeTransitionActive?: boolean };
      win.__routeTransitionActive = true;
      try {
        window.dispatchEvent(new CustomEvent('route-transition-start'));
      } catch { /* noop */ }

      const timer = setTimeout(() => {
        setMinTimeElapsed(true);
      }, minLoaderDuration);

      // Watchdog: never allow the loader to hang indefinitely
      startedAt.current = Date.now();
      if (watchdogTimer.current) {
        clearTimeout(watchdogTimer.current);
      }
      watchdogTimer.current = window.setTimeout(() => {
        setIsTransitioning(false);
        try {
          unlockBodyScroll();
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          document.body.classList.remove('scroll-locked');
        } catch {/* noop */}
        const win2 = window as Window & { __routeTransitionActive?: boolean };
        win2.__routeTransitionActive = false;
        try {
          window.dispatchEvent(new CustomEvent('route-transition-end'));
        } catch { /* noop */ }
      }, Math.max(8000, minLoaderDuration + 5000));

      // Actualizar previousPath
      previousPath.current = currentPath;

      return () => {
        clearTimeout(timer);
        if (watchdogTimer.current) {
          clearTimeout(watchdogTimer.current);
          watchdogTimer.current = null;
        }
      };
    } else {
      // No mostrar loader, solo actualizar la ruta anterior
      previousPath.current = currentPath;
      // Asegurar que no hay transición activa
      setIsTransitioning(false);
      setPageReadySignaled(true);
      setMinTimeElapsed(true);
      setImagesPreloaded(true);
    }
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
        } catch (error: unknown) {
          // Ignore cleanup errors
        }
        const win2 = window as Window & { __routeTransitionActive?: boolean };
        win2.__routeTransitionActive = false;
        try {
          window.dispatchEvent(new CustomEvent('route-transition-end'));
        } catch { /* noop */ }
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
