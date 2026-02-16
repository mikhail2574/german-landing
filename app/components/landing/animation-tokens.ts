import type { Transition, Variants } from "framer-motion";

export const motionTokens = {
  duration: {
    quick: 0.18,
    base: 0.32,
    medium: 0.48,
    slow: 0.72,
    stamp: 0.62,
    scan: 0.95
  },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    smooth: [0.4, 0, 0.2, 1],
    soft: [0.16, 1, 0.3, 1]
  }
} as const;

export const sectionReveal = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.medium,
      ease: motionTokens.ease.soft,
      delay
    }
  }
});

export const staggerChildren: Transition = {
  staggerChildren: 0.08,
  delayChildren: 0.06
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.ease.soft
    }
  }
};
