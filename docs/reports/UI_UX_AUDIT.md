---
Estado: Completado
Idioma: EN
---
# UI/UX Premium Audit - Optimization Plan

## Typography & Visual Hierarchy Issues Found

### Problems Detected:
1. **Inconsistent font sizes** across pages (text-xs to text-6xl without clear hierarchy)
2. **Light font weights** in critical areas (navbar text-gray-700, some buttons)
3. **Mixed font families** without clear purpose (Poppins, Raleway, Inter, Merriweather)
4. **Line-height and tracking** not optimized for readability
5. **Text-stroke effects** in Hero making text harder to read

### Solutions:
- Establish clear typography scale (H1: 3rem/48px → H6: 1rem/16px, Body: 1rem/16px, Small: 0.875rem/14px)
- Increase font-weight in navbar, buttons, cards (minimum font-medium/500)
- Standardize font-family usage (Poppins: headings, Inter: body, Raleway: accents)
- Set line-height: 1.5 for body, 1.2 for headings
- Remove text-stroke, simplify text-shadow

## Spacing & Proportions Issues

### Problems:
1. **Hero too tall** on desktop (min-h-[85vh])
2. **Inconsistent padding** between sections
3. **Cards too large** in some carousels
4. **Gap inconsistencies** in grids

### Solutions:
- Hero height: min-h-[65vh] desktop, min-h-[55vh] mobile
- Section padding: py-16 desktop, py-12 mobile (consistent)
- Card max-width: 520px (already set)
- Grid gaps: gap-6 standard, gap-8 for sections

## Color Palette Issues

### Problems:
1. **Non-corporate colors** found: pink-400, teal, green variations
2. **Saturated hover effects** with aggressive inversions
3. **Inconsistent border colors** (blue, purple, red variations)
4. **Shadow colors** too dark/harsh

### Solutions:
- Use ONLY: fyt-blue, fyt-red, fyt-purple, fyt-dark, fyt-light
- Hover: brightness(1.10) instead of color inversion
- Borders: use fyt-color/30 for soft borders
- Shadows: rgba(0,0,0,0.08-0.15) max

## Button Issues

### Problems:
1. **Light text** in some buttons (font-semibold not enough)
2. **Aggressive hover** with filter + transform + shadow
3. **Inconsistent border-radius** (rounded-md vs rounded-full)
4. **Text-shadow too strong** on some buttons

### Solutions:
- Minimum font-weight: 600 (font-semibold) for all buttons
- Unified hover: brightness(1.08), translateY(-1px), soft shadow
- Standard radius: rounded-lg (0.5rem) for primary, rounded-full for CTA
- Text-shadow: 0 1px 2px rgba(0,0,0,0.1) subtle

## Navbar & Footer Issues

### Problems:
1. **Navbar text too light** (text-gray-700 hard to read)
2. **Mobile menu animation** abrupt (0.3s too fast)
3. **Footer text hierarchy** not clear
4. **Logo size** inconsistent

### Solutions:
- Navbar: text-gray-900 font-semibold
- Mobile animation: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Footer hierarchy: h4 (font-bold 1.125rem), links (font-medium 0.875rem)
- Logo: h-12 (48px) consistent

## Cards & Carousels

### Problems:
1. **Shadows too strong** (shadow-xl, shadow-2xl)
2. **Radius inconsistent** (rounded-xl vs rounded-2xl)
3. **Hover transform too aggressive** (scale-[1.03])
4. **Images stretching** in some cards

### Solutions:
- Shadow standard: shadow-soft (already defined)
- Radius: rounded-xl (0.75rem) consistent
- Hover: scale-[1.02] subtle
- Images: object-cover + aspect-ratio

## Responsive Issues

### Problems:
1. **Font sizes don't scale smoothly** (sudden jumps)
2. **Images not optimized** for mobile
3. **Buttons full-width** on very small screens
4. **Grid columns** don't adapt well

### Solutions:
- clamp() for all sizes: clamp(min, preferred, max)
- Picture + srcset already implemented ✓
- Buttons: max-w-sm on mobile
- Grid: auto-fit minmax(280px, 1fr)

## Animation Issues

### Problems:
1. **Transform causing layout shift**
2. **Multiple animations** overlapping
3. **Transition duration** inconsistent (0.15s to 0.4s)
4. **Easing functions** not optimized

### Solutions:
- will-change on hover elements only
- Single animation per element
- Standard duration: 0.25s (250ms)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

## Implementation Priority

1. **CRITICAL** - Typography (headings, body, weights)
2. **CRITICAL** - Colors (remove non-corporate, unify palette)
3. **HIGH** - Buttons (weights, hover, consistency)
4. **HIGH** - Navbar/Footer (readability, hierarchy)
5. **MEDIUM** - Spacing (hero, sections, cards)
6. **MEDIUM** - Shadows & Radius (soft, consistent)
7. **LOW** - Animations (smooth, subtle)

## Files to Modify

1. `src/index.css` - Base styles, utilities, variables
2. `src/components/Navbar.tsx` - Typography, colors, animation
3. `src/components/Footer.tsx` - Hierarchy, spacing
4. `src/components/Hero.tsx` - Height, text-shadow
5. `src/components/About.tsx` - Cards, spacing
6. `src/components/ui/button.tsx` - Unified button styles
7. `tailwind.config.ts` - Color palette validation
