import { useEffect } from 'react';
import { useTransition } from '../providers/TransitionProvider';

interface UsePageReadyOptions {
  criticalImages?: string[];
  onReady?: () => void;
}

export const usePageReady = (options: UsePageReadyOptions = {}) => {
  const { signalPageReady, preloadImages } = useTransition();
  const { criticalImages = [], onReady } = options;

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Preload critical images
      if (criticalImages.length > 0) {
        await preloadImages(criticalImages);
      }

      // Wait for DOM to be fully rendered
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(undefined);
        } else {
          window.addEventListener('load', () => resolve(undefined), { once: true });
        }
      });

      // Additional frame wait to ensure render
      await new Promise(resolve => requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve(undefined));
      }));

      if (mounted) {
        onReady?.();
        signalPageReady();
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [criticalImages, onReady, signalPageReady, preloadImages]);
};
