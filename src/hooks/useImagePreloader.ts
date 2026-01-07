import { useEffect, useState, useCallback } from 'react';

interface PreloadOptions {
  priority?: 'critical' | 'high' | 'low';
  timeout?: number;
}

interface PreloadResult {
  loaded: boolean;
  error: boolean;
}

const preloadCache = new Map<string, Promise<void>>();
const loadedImages = new Set<string>();

/**
 * Preload a single image with caching
 */
function preloadImage(src: string, options: PreloadOptions = {}): Promise<void> {
  const { timeout = 10000 } = options;

  if (loadedImages.has(src)) {
    return Promise.resolve();
  }

  if (preloadCache.has(src)) {
    return preloadCache.get(src)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      cleanup();
      loadedImages.add(src);
      resolve();
    };

    img.onerror = () => {
      cleanup();
      reject(new Error(`Failed to load image: ${src}`));
    };

    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error(`Image load timeout: ${src}`));
      }, timeout);
    }

    // Set fetchpriority for critical images
    if (options.priority === 'critical' || options.priority === 'high') {
      img.fetchPriority = 'high';
    }

    img.src = src;

    // If image is already cached/loaded synchronously
    if (img.complete && img.naturalWidth > 0) {
      cleanup();
      loadedImages.add(src);
      resolve();
    }
  });

  preloadCache.set(src, promise);
  return promise;
}

/**
 * Hook to preload multiple images with priority support
 */
export function useImagePreloader(
  images: string[],
  options: PreloadOptions = {}
): PreloadResult {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Destructure to avoid options object in deps
  const { priority, timeout } = options;

  useEffect(() => {
    if (!images || images.length === 0) {
      setLoaded(true);
      return;
    }

    let cancelled = false;

    const loadImages = async () => {
      try {
        // Filter out empty/invalid URLs
        const validImages = images.filter(img => img && typeof img === 'string');
        
        if (validImages.length === 0) {
          if (!cancelled) setLoaded(true);
          return;
        }

        // Preload all images in parallel
        await Promise.all(
          validImages.map(img => 
            preloadImage(img, { priority, timeout }).catch(err => {
              console.warn('Image preload failed:', img, err);
              // Don't fail the whole batch if one image fails
              return Promise.resolve();
            })
          )
        );

        if (!cancelled) {
          setLoaded(true);
          setError(false);
        }
      } catch (err) {
        console.error('Batch image preload error:', err);
        if (!cancelled) {
          setError(true);
          setLoaded(true); // Still set loaded to true to unblock UI
        }
      }
    };

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [images, priority, timeout]);

  return { loaded, error };
}

/**
 * Hook to preload images from carousel items
 */
export function useCarouselPreloader(
  items: Array<{ image?: string; [key: string]: unknown }>,
  options: PreloadOptions = {}
): PreloadResult {
  const images = items
    .map(item => item.image)
    .filter((img): img is string => Boolean(img));

  return useImagePreloader(images, options);
}

/**
 * Preload responsive image set (small, medium, large)
 */
export function preloadResponsiveImage(basePath: string, options: PreloadOptions = {}): Promise<void> {
  // Mobile-first: no incluir '-large.webp' en preloads por defecto
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
  const wantMedium = !isMobile && ((typeof window !== 'undefined' && window.devicePixelRatio > 1) || (typeof window !== 'undefined' && window.innerWidth >= 768));
  const variants = [
    `${basePath}-small.webp`,
    ...(wantMedium ? [`${basePath}-medium.webp`] : []),
  ];

  return Promise.all(
    variants.map(src => preloadImage(src, options).catch(() => Promise.resolve()))
  ).then(() => undefined);
}

/**
 * Clear preload cache (useful for testing or memory management)
 */
export function clearPreloadCache(): void {
  preloadCache.clear();
  loadedImages.clear();
}

/**
 * Check if image is already loaded
 */
export function isImageLoaded(src: string): boolean {
  return loadedImages.has(src);
}
