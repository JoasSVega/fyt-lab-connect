Image conversion workflow

What I changed in the codebase

- Components updated to prefer WebP with PNG/JPEG fallback using <picture>:
  - `src/components/Navbar.tsx` (logo)
  - `src/components/Footer.tsx` (logo)
  - `src/components/Team.tsx` (team portraits)
  - `src/components/ui/Carrusel.tsx` (carousel items)

- Large images (<img>) already have `loading="lazy"` where appropriate; the code ensures `loading="lazy"` remains on the fallback <img>.

Automation script (what to run locally)

1. Install `sharp` (native addon) in your environment:

   npm install --save-dev sharp

   Note: sharp is a native module and will compile on install. On Windows you'll need a supported Node version and build tools. See https://sharp.pixelplumbing.com/install for troubleshooting.

2. Run the image conversion script (script created at `scripts/convert-images.js`):

   npm run convert:images

   What it does:
   - Scans `public/` and `src/assets/` recursively for `.png` files.
   - Converts each `.png` to `.webp` with quality 80 (alpha preserved).
   - Writes the converted file next to the original file with the same filename but `.webp` extension.

Notes and important follow-ups

- I cannot convert binary image files in this environment; the script must be run locally where you have `sharp` installed and build tools available.

- After running the script you'll have `.webp` siblings for every `.png`. The code now prefers `.webp` via <picture> for components I updated. For other image references that only use strings (e.g. arrays of image paths in `About.tsx`) the carousel component already prefers WebP automatically (it will compute `.webp` from `.png`), so no manual edits are necessary for those items.

- If you want to replace all hard `.png` references with `.webp` strings instead of using <picture>, I can prepare an automatic code patch — but I prefer the <picture> approach because it provides a safe fallback.

- Commit/Push: after you run the conversion locally, commit the new `.webp` files and push. The code changes I made are safe to commit now.

- Fallbacks: Using <picture> adding a `source type="image/webp"` and an `<img>` fallback covers browsers without WebP support.

If you want, I can:

- Add automatic replacement for any remaining plain `.png` references in code to `.webp` strings instead of using <picture>.
- Run a quick grep to list all remaining image references that may still point to `.png` (I already listed many in this session).

Next step for me (if you want):
- Commit the code changes I made and push them to `main` when you approve.
- Or prepare a patch that changes remaining references to `.webp` strings (not recommended unless you plan to remove fallbacks).

