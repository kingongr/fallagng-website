import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerChildren: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const revealMask: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const parallaxConfig = {
  start: "top bottom",
  end: "bottom top",
  scrub: true,
};

// Jitter animation variants - subtle movement for enhanced interactivity
export const jitter: Variants = {
  hover: {
    x: [0, -1, 1, -1, 1, 0],
    y: [0, 1, -1, 1, -1, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const subtleJitter: Variants = {
  hover: {
    x: [0, 0.5, -0.5, 0],
    y: [0, 0.5, -0.5, 0],
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Continuous jitter animation for elements that should jitter while in view
// Note: Should be used with useReducedMotion() hook to disable when needed
export const continuousJitter = {
  x: [0, 0.5, -0.5, 0.5, -0.5, 0],
  y: [0, 0.5, -0.5, 0.5, -0.5, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

