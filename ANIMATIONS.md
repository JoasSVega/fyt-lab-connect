# Animations Architecture

This document describes the unified animation & hybrid calculator architecture introduced in the `feature/hybrid-calculators` branch.

## Goals
- Centralize all reusable motion variants and keyframes.
- Provide consistent timing & easing tokens.
- Decouple calculator UI (layout & inputs) from animation/state wrapper.
- Make flip animations robust, accessible, and test-friendly.
- Enable incremental migration of legacy calculators without breaking existing pages.

## Directory Overview
```
src/animations/
  variants.ts        # Factories: fade, fadeScale, slideY, stagger, flip
  index.ts           # Re-exports public animation API
src/styles/keyframes.css  # Global CSS keyframes (e.g., fadeInCard)
src/index.css             # Imports keyframes + 3D utilities (perspective/backface)
```

## Variants Factories
| Factory | Purpose | Notes |
|---------|---------|-------|
| `makeFade(delay?, duration?)` | Simple opacity in/out | Uses unified ease & ms → seconds conversion. |
| `makeFadeScale(delay?, duration?, fromScale?)` | Scale + opacity entrance | Provides exit variant for graceful unmount. |
| `makeSlideY(offset?, delay?, duration?)` | Vertical slide in/out | For hero sections, stacked cards. |
| `makeStaggerContainer(stagger?, delayChildren?)` | Parent orchestrator | Combine with child fade variants. |
| `makeFlip(duration?)` | Y-axis front/back rotation | Exposes `front`/`back` states (0°/180°). |
| `makeFlipOpacity(duration?)` | Subtle pre-flip fade | Auxiliary; not used in hybrid panel yet. |

All durations are defined in `durations` (fast/normal/slow) as ms and converted internally (`ms()` helper).

## Keyframes
- Extracted from component-level inline styles (e.g., `fadeInCard`).
- Placed in `src/styles/keyframes.css`; imported once in `index.css`.
- Keep large or multi-step animations in variants (for state) and use CSS only for pure hover/focus/perf-critical micro-interactions.

## Hybrid Calculator Architecture

### Separation of Concerns
```
+----------------------+
| CalculatorModal      |  <-- Animation + state wrapper (open, flip, portal, scroll locking)
|  - manages open      |
|  - flip (makeFlip)   |
|  - auto-calc / form  |  legacy path
|  - portal layering   |
+----------+-----------+
           |
           v (injected as prop)
+----------------------+
| CalculatorPanel (core)| <-- Pure layout: title, fields, actionsSlot, resultSlot (no overlay)
|  variant=legacy|core  |
|  - provides grid      |
|  - exposes slots      |
+----------------------+
```

### Modes
- Legacy calculators still use `CalculatorModal` internal form logic for continuity.
- Migrated calculators can pass a pre-built `panel` prop, setting `legacyForm={false}` to suppress internal form rendering.
- Flip logic stays in `CalculatorModal`; panel supplies front-face UI.

### Flip Implementation
- Perspective applied at container: `perspective-1200` + inline `style={{ perspective: '1200px' }}`.
- Single rotating `motion.div` root with `variants={makeFlip(600)}` and `animate={flipped ? 'back' : 'front'}`.
- Two absolutely positioned faces:
  - Front: `backface-hidden` rotateY(0deg).
  - Back: `backface-hidden rotate-y-180` rotateY(180deg).
- Controlled pointer events: front disabled while flipped, back disabled otherwise.
- Result clearing deferred until reverse flip animation completes (prevents flash).

### Accessibility & Testing Considerations
- Portal ensures no transform clipping affecting 3D context.
- Escape key closes modal; overlay click closes when open.
- JSDOM/test mode adjustments:
  - DOM polling for auto-calc when events are unreliable.
  - Input clearing multi-pass for deterministic reset.
  - Relaxed validation to allow flip path verification.

## Adding a New Animation
1. Implement factory in `variants.ts` using existing token helpers.
2. Export via `index.ts`.
3. Keep naming semantic (`makeXYZ`).
4. Avoid hard-coded color or layout concerns—variants describe motion only.
5. For complex multi-step sequences, consider composing smaller factories (parent stagger + child fade).

## Migrating a Calculator (Pilot Flow)
1. Refactor existing calculator logic into a pure layout component using `CalculatorPanel variant="core"` or a bespoke panel.
2. Inject into `CalculatorModal`:
```tsx
<CalculatorModal
  id="imc"
  title="Índice de Masa Corporal"
  fields={imcFields}
  onCalculate={computeImc}
  panel={<CalculatorPanel variant="core" /* supply slots */ />}
  legacyForm={false}
/>
```
3. Remove duplicated form markup from legacy component after verifying flip + result rendering.
4. Update docs/tests (snapshot & behavior) referencing the new hybrid path.
5. Commit under conventional message: `refactor(calculators): migrate IMC to hybrid modal+panel`.

## Guidelines
- Prefer `makeFlip(durations.slow)` for user-driven state transitions (result reveal) to emphasize change.
- Use `MotionConfig reducedMotion="never"` only when 3D transforms must remain even with reduced-motion; otherwise honor user setting.
- Limit `will-change: transform` to the flipping root; avoid stacking for performance.
- Ensure front/back faces collectively determine height; root sets fixed height during flip to prevent layout shifts.

## ASCII Flip Anatomy
```
ModalPortal
  └─ overlay (fade/blur CSS transitions)
  └─ card container (fade+scale entry)
       └─ perspective wrapper
            └─ motion.flip-root (variants: front/back)
                 ├─ frontFace (form or injected panel)
                 └─ backFace  (result summary)
```

## Future Enhancements
- Externalize scoring UI rendering as a slot for panel.
- Add vertical flip variant (X-axis) for alternative reveal styles.
- Integrate spring-based easing tokens if a distinct tactile feel is desired.

## Changelog References
Track related commits under `refactor(calculators)` and `feat(animations)` for traceability.

---
Questions or adjustments: update this file and commit with `docs(animations): ...` prefix.
