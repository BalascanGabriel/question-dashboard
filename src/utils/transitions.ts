
import { AnimatePresenceProps } from 'framer-motion';

// Animation presets for framer-motion
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 }
};

export const slideUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 15 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const slideDown = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const slideLeft = {
  initial: { opacity: 0, x: 15 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 15 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const slideRight = {
  initial: { opacity: 0, x: -15 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -15 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

// Animation config for AnimatePresence
export const animatePresenceProps: AnimatePresenceProps = {
  initial: false,
  mode: 'wait'
};

// Animation delays for staggered animations
export const staggerChildren = {
  transition: {
    staggerChildren: 0.07
  }
};

export const staggerDelayChildren = (delay: number = 0.3) => ({
  transition: {
    delayChildren: delay,
    staggerChildren: 0.07
  }
});
