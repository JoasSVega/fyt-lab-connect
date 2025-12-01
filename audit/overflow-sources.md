# Overflow Sources Audit

Scope: repo scan for overflow usage, body locking, 100vh/dvh, and wrappers that may create double scroll.

Date: 2025-12-01

---

## Matches (key excerpts)

- src/App.tsx
  - L79, L232, L234, L238 (pre-fix): `document.body.style.overflow = 'hidden' | ''`
  - Fixed: replaced by `scrollManager` lock/unlock; route transitions managed to avoid double scroll.

- src/index.css
  - L128: `overflow-x: hidden;` (OK) — prevents horizontal scroll only.
  - L151, L266: `overflow: visible;` in sections (OK).
  - Added: `body.scroll-locked { overflow: hidden !important; width:100vw; }`.

- src/components/Contact.tsx
  - L84: `overflow-hidden` on map wrapper (scoped, not page-wide) — OK.

- src/components/Navbar.tsx
  - L166: `overflow-hidden` in mobile menu container (panel only) — OK.

- src/components/animations/ImageReveal.tsx
  - Inline `overflow: hidden` on reveal container (clip-only, OK).

- src/components/ui/table.tsx
  - `overflow-auto` on table wrapper (scoped) — OK.

- Calculators modal
  - `overflow-y-auto` on modal body; `max-h-[90vh]` — scoped to modal, OK.

- Pages using `min-h-screen`
  - `Index.tsx`, `Contactos.tsx`, `NotFound.tsx`, `Contact.tsx` — intended for section sizing, not scrolling wrappers.

## Potential double-scroll patterns searched

- height: 100vh/100dvh wrappers + overflow:auto — none controlling the entire app shell.
- app-level wrappers with `overflow:auto` — none.

## Actions Taken

- Introduced `scrollManager` (`lockBodyScroll`/`unlockBodyScroll` with ref-count + restore prev overflow) and replaced direct body style edits in `App.tsx`.
- Route transitions now hold content swap until loader completes; scroll lock unified.

## Conclusion

- No app-wide overflow wrappers remain; only document scroll is active.
- All scroll-locking is centralized; duplicate locks prevented.
