// Centralized animation factories (hybrid architecture)
// Durations in ms for readability; converted to seconds for Framer Motion.
import type { Variants, Transition } from 'framer-motion';

export const durations = {
  fast: 120,
  normal: 250,
  slow: 400,
} as const;

export const easings = {
  easeInOut: 'easeInOut' as Transition['ease'],
};

const ms = (v: number) => v / 1000;

export const makeFade = (delayMs = 0, d: number = durations.normal): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: ms(d), ease: easings.easeInOut, delay: ms(delayMs) } },
});

export const makeFadeScale = (delayMs = 0, d: number = durations.normal, from = 0.96): Variants => ({
  hidden: { opacity: 0, scale: from },
  visible: { opacity: 1, scale: 1, transition: { duration: ms(d), ease: easings.easeInOut, delay: ms(delayMs) } },
  exit: { opacity: 0, scale: from, transition: { duration: ms(d * 0.7), ease: easings.easeInOut } },
});

export const makeSlideY = (offset = 24, delayMs = 0, d: number = durations.fast): Variants => ({
  hidden: { opacity: 0, y: offset },
  visible: { opacity: 1, y: 0, transition: { duration: ms(d), ease: easings.easeInOut, delay: ms(delayMs) } },
  exit: { opacity: 0, y: offset * 0.6, transition: { duration: ms(d * 0.7), ease: easings.easeInOut } },
});

export const makeStaggerContainer = (stagger = 0.08, delayChildrenMs = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: ms(delayChildrenMs) } },
});

// Flip rotation (front/back) for Y-axis card / modal flips.
// States: front (0deg) / back (180deg)
export const makeFlip = (d: number = durations.slow): Variants => ({
  front: { rotateY: 0, transition: { duration: ms(d), ease: easings.easeInOut } },
  back: { rotateY: 180, transition: { duration: ms(d), ease: easings.easeInOut } },
});

export const makeFlipOpacity = (d: number = durations.normal): Variants => ({
  hidden: { opacity: 0, rotateY: -10 },
  visible: { opacity: 1, rotateY: 0, transition: { duration: ms(d), ease: easings.easeInOut } },
});

export const fadeStatic: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: ms(durations.fast), ease: easings.easeInOut } },
};

// Guidance:
// - Use makeFlip for 3D card rotations; ensure parent has perspective.
// - Use makeStaggerContainer for list wrappers and combine with makeFade for children.
// - Keep interactions (hover/focus) in CSS; presence/state transitions here.
