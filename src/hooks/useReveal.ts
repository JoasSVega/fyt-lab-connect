import { useEffect, useRef } from 'react';

type Options = {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerBaseMs?: number;
};

const observerCache = new Map<string, IntersectionObserver>();

export function useReveal(options: Options = {}) {
  const {
    threshold = 0.12,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
    staggerBaseMs = 80,
  } = options;

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');

    // Determine index among siblings for deterministic stagger
    const parent = el.parentElement;
    let index = 0;
    if (parent) {
      const children = Array.from(parent.children);
      index = Math.max(0, children.indexOf(el));
    }
    const delay = Math.min(320, index * staggerBaseMs);
    el.style.setProperty('--reveal-delay-ms', `${delay}ms`);

    const key = JSON.stringify({ t: threshold, m: rootMargin });
    let io = observerCache.get(key);
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement & { __revealOnce?: boolean };
          if (entry.isIntersecting) {
            target.classList.add('reveal--visible');
            if (target.__revealOnce) {
              io!.unobserve(target);
            }
          } else if (!target.__revealOnce) {
            target.classList.remove('reveal--visible');
          }
        });
      }, { threshold, root, rootMargin });
      observerCache.set(key, io);
    }

    (el as any).__revealOnce = triggerOnce;
    io.observe(el);
    return () => {
      try { io!.unobserve(el); } catch (e: any) {
        // Ignore
      }
    };
  }, [threshold, root, rootMargin, triggerOnce, staggerBaseMs]);

  return { ref } as const;
}
