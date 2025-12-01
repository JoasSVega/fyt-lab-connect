# Loader / Route Transitions Audit

Date: 2025-12-01

## Pre-fix state
- `src/App.tsx`
  - Initial loader: min 1450ms + window 'load' sync; directly toggled body overflow.
  - Route transitions (AnimatedRoutes): used timers/raf and direct body overflow; race conditions could leave body locked/unlocked inconsistently and mount new route before loader finished.
- `src/components/Loader.tsx`
  - Visual animation (1.45s) with fade-in/out and glow; correct.

## Post-fix state
- `src/utils/scrollManager.ts`
  - Central lock/unlock with restoration of previous overflow and ref-count.
- `src/App.tsx` AnimatedRoutes
  - On pathname change: set `pendingLocation`, show loader, set `window.__routeTransitionActive = true`, `lockBodyScroll()`.
  - Render old location until loader completes.
  - On loader `onComplete`: swap to `pendingLocation`, `scrollTo(0,0)`, `unlockBodyScroll()`, set transition flag false.
  - Suspense fallback remains but content swap is gated by loader end.
- `src/components/ScrollToTop.tsx`
  - Skips scrolling while `__routeTransitionActive` is true to avoid conflicts; otherwise smooth to top.

## Z-Index policy
- Loader has `z-50` (via fixed overlay) covering content; Navbar rendered below during transitions. Adjust easily if policy changes.

## Known entry points
- Initial loader (App): still uses 1.45s min + ready state; locking handled by scrollManager.
- Route transitions: always animated; no white flashes; single scroll surface.
