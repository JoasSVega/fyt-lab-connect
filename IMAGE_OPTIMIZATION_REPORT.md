# Image Optimization Report

Date: 2025-10-28

This report documents the responsive image pipeline added to the project and a size snapshot from the current repository.

## What changed

- Added a conversion script that generates responsive variants for all images under `public/` (and `src/assets/` if present):
  - Formats: AVIF and WebP
  - Widths: 128, 256, 400, 800, 1200, 1600, 1920 (only up to original width)
  - Originals are preserved; no paths moved.
- Updated UI to use responsive sources (srcset + sizes):
  - Navbar logo (`src/components/Navbar.tsx`): responsive AVIF/WebP 128/256
  - Hero LCP image (`src/components/Hero.tsx`): responsive AVIF/WebP 400/800/1200 (+ fetchpriority via ref)
  - Carousel images (`src/components/ui/Carrusel.tsx`): responsive AVIF/WebP 400/800/1200 with sizes based on breakpoints, lazy + async decode
- Caching: `public/_headers` and `public/sw.js` (runtime cache) were already added earlier to improve effective cache lifetimes.

## Current size snapshot

Generated via:

```bash
node scripts/report-images.js
```

Summary (on disk):

- TOTAL originals: 30,253.8 KB
- Smallest-variant total: 78.1 KB (approx best-case)
- Estimated maximum saving: 30,175.7 KB (99.7%)

Notes:
- The “smallest-variant” sum is a best‑case reference (choosing the smallest variant for each image). Actual savings depend on viewport and selected `sizes` at runtime.
- Large PNG sources remain as original masters for compatibility; the UI prefers AVIF/WebP variants automatically.

## How to regenerate variants

```bash
# Convert and (re)generate variants for new/updated images
npm run convert:images

# Optional: get a fresh size report
node scripts/report-images.js
```

## Compatibility and deployment

- All paths and directories were kept intact. Lovable will continue reading from `public/`.
- Originals were preserved to avoid regressions in old browsers.
- The responsive `<picture>` strategy is progressively enhanced and safe.

