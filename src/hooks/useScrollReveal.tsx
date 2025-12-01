import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Singleton IntersectionObserver por firma de opciones para evitar múltiples instancias.
const observers = new Map<string, IntersectionObserver>();

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const key = JSON.stringify({ threshold, rootMargin });
    let observer = observers.get(key);
    if (!observer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const target = entry.target as HTMLElement & { __revealCb?: (visible: boolean) => void };
          if (target && typeof target.__revealCb === 'function') {
            if (entry.isIntersecting) target.__revealCb(true);
            else target.__revealCb(false);
          }
        },
        { threshold, rootMargin }
      );
      observers.set(key, observer);
    }

    // Registrar callback por elemento sin crear wrappers ni estilos extra.
    (element as any).__revealCb = (visible: boolean) => {
      if (visible) {
        setIsVisible(true);
        if (triggerOnce) observer!.unobserve(element);
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    observer.observe(element);

    return () => {
      try {
        observer!.unobserve(element);
      } catch {}
      delete (element as any).__revealCb;
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
