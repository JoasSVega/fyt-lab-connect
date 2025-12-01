# Scroll Reveal Sources Audit

Date: 2025-12-01

## Pre-fix state
- `src/hooks/useScrollReveal.tsx`
  - Creates a new `IntersectionObserver` per hook use; cleans up on unmount. Could lead to many observers.
- `src/components/animations/ScrollReveal.tsx`
  - Used Framer Motion per-element animation + the hook above.

## Post-fix state
- New hook: `src/hooks/useReveal.ts`
  - Singleton `IntersectionObserver` per options (threshold/rootMargin) via `observerCache`.
  - Adds `.reveal` and toggles `.reveal--visible` class; deterministic stagger via CSS var `--reveal-delay-ms` based on DOM index.
  - Trigger once by default, idempotent observe, no layout-affecting styles.
- Updated: `src/components/animations/ScrollReveal.tsx`
  - Now uses `useReveal` and CSS transitions (opacity/transform-only) for layout-safe reveal.
- CSS added: `src/index.css`
  - `.reveal` and `.reveal.reveal--visible` with timing function and delay composition.

## Options (defaults)
- threshold: 0.12
- root: null
- rootMargin: 0px (component passes `0px 0px -50px 0px`)
- triggerOnce: true

## Cleanups
- No wrappers created; no overflow styles added by reveal.
- Framer Motion remains for route transitions/loader, not for per-element scroll.
