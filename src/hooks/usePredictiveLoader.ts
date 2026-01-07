import { useEffect, useRef, useCallback } from 'react';
import { preloadResponsiveImage } from './useImagePreloader';

interface PredictiveLoaderOptions {
  /**
   * Distance ahead to start preloading (in pixels or viewport height multiplier)
   * Default: 1.5 (1.5 viewport heights ahead)
   */
  lookahead?: number;
  
  /**
   * Enable predictive loading based on scroll velocity
   * Default: true
   */
  enableVelocityPrediction?: boolean;
  
  /**
   * Minimum scroll velocity to trigger predictive loading (px/ms)
   * Default: 0.5
   */
  minVelocity?: number;
  
  /**
   * Priority for predictively loaded images
   * Default: 'low'
   */
  priority?: 'critical' | 'high' | 'low';
}

interface ScrollMetrics {
  position: number;
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  timestamp: number;
}

/**
 * Hook for predictive lazy loading of images based on scroll behavior
 * Preloads images that are likely to be viewed in the next 1-2 seconds
 */
export function usePredictiveLoader(
  imagePaths: string[],
  options: PredictiveLoaderOptions = {}
) {
  const {
    lookahead = 1.5,
    enableVelocityPrediction = true,
    minVelocity = 0.5,
    priority = 'low'
  } = options;

  const scrollMetrics = useRef<ScrollMetrics>({
    position: 0,
    velocity: 0,
    direction: 'idle',
    timestamp: Date.now()
  });

  const preloadedImages = useRef<Set<string>>(new Set());
  const imageElements = useRef<Map<string, HTMLElement>>(new Map());
  const rafId = useRef<number>();
  const concurrentLoads = useRef<number>(0);
  const maxConcurrent = 2;
  const queue = useRef<string[]>([]);

  // Ensure a preload hint is attached to <head> for critical images
  const addPreloadHint = useCallback((path: string) => {
    try {
      const id = `preload:${path}`;
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      document.head.appendChild(link);
    } catch { /* noop */ }
  }, []);

  // Register image elements for tracking
  const registerImage = useCallback((path: string, element: HTMLElement | null) => {
    if (element) {
      imageElements.current.set(path, element);
    } else {
      imageElements.current.delete(path);
    }
  }, []);

  // Calculate if an element should be preloaded based on position and velocity
  // Optimized: batch DOM reads to avoid forced reflows
  const shouldPreloadElement = useCallback((element: HTMLElement, precomputedViewportHeight: number): boolean => {
    const rect = element.getBoundingClientRect();
    const { velocity, direction } = scrollMetrics.current;

    // Distance from bottom of viewport to top of element
    const distanceFromViewport = rect.top - precomputedViewportHeight;

    // Base lookahead distance
    const baseLookahead = precomputedViewportHeight * lookahead;

    // Dynamic lookahead based on velocity (scroll faster = load further ahead)
    let dynamicLookahead = baseLookahead;
    if (enableVelocityPrediction && direction === 'down' && velocity > minVelocity) {
      // Estimate how far user will scroll in next 2 seconds
      const velocityFactor = Math.min(velocity * 2000, precomputedViewportHeight * 2);
      dynamicLookahead = baseLookahead + velocityFactor;
    }

    // Preload if element is within lookahead distance
    return distanceFromViewport < dynamicLookahead && distanceFromViewport > -precomputedViewportHeight;
  }, [lookahead, enableVelocityPrediction, minVelocity]);

  // Check and preload images that meet criteria
  const processQueue = useCallback(() => {
    while (concurrentLoads.current < maxConcurrent && queue.current.length > 0) {
      const next = queue.current.shift()!;
      concurrentLoads.current++;
      addPreloadHint(next);
      preloadResponsiveImage(next, { priority, timeout: 15000 })
        .catch(() => { /* silent fail */ })
        .finally(() => {
          concurrentLoads.current = Math.max(0, concurrentLoads.current - 1);
          // Safari-safe: requestIdleCallback siempre existe (polyfill en index.html)
          if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(() => processQueue());
          } else {
            setTimeout(processQueue, 0);
          }
        });
    }
  }, [priority, addPreloadHint]);

  const checkAndPreload = useCallback(() => {
    // Batch viewport read once per check
    const vh = window.innerHeight;
    imageElements.current.forEach((element, path) => {
      if (preloadedImages.current.has(path)) return;
      if (shouldPreloadElement(element, vh)) {
        preloadedImages.current.add(path);
        queue.current.push(path);
      }
    });
    processQueue();
  }, [shouldPreloadElement, processQueue]);

  // Update scroll metrics and trigger preload check
  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const now = Date.now();
      const currentPosition = window.scrollY;
      const { position: lastPosition, timestamp: lastTimestamp } = scrollMetrics.current;

      // Calculate velocity (px per ms)
      const timeDelta = now - lastTimestamp;
      const positionDelta = currentPosition - lastPosition;
      const velocity = timeDelta > 0 ? Math.abs(positionDelta / timeDelta) : 0;

      // Determine direction
      let direction: 'up' | 'down' | 'idle' = 'idle';
      if (Math.abs(positionDelta) > 5) {
        direction = positionDelta > 0 ? 'down' : 'up';
      }

      scrollMetrics.current = {
        position: currentPosition,
        velocity,
        direction,
        timestamp: now
      };

      checkAndPreload();
    });
  }, [checkAndPreload]);

  // Throttled scroll handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return { registerImage };
}

/**
 * Simple hook for preloading images in elements that are about to enter viewport
 * Uses IntersectionObserver with extended rootMargin for predictive loading
 */
export function useViewportPreloader(
  imagePaths: string[],
  options: { rootMargin?: string; priority?: 'critical' | 'high' | 'low' } = {}
) {
  const { rootMargin = '200% 0px', priority = 'low' } = options;
  const preloadedImages = useRef<Set<string>>(new Set());

  const observe = useCallback((element: HTMLElement | null, path: string) => {
    if (!element || preloadedImages.current.has(path)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !preloadedImages.current.has(path)) {
            preloadedImages.current.add(path);
            preloadResponsiveImage(path, { priority, timeout: 15000 }).catch(() => {
              // Silent fail
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, priority]);

  return { observe };
}
