import type { Variants } from "motion/react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem = (y = 16): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
});

export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px -10% 0px" };
