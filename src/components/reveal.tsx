'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Reveal — fade + rise on scroll into view.
 *
 * Hydration-safe via `suppressHydrationWarning`: framer-motion renders the
 * `initial` style as an inline style during SSR, which can differ from the
 * client's first render (e.g. when the OS reduced-motion preference changes
 * the transform). suppressHydrationWarning silences that one-off mismatch on
 * the motion.div's style attribute; framer-motion reconciles it immediately
 * after hydration. Reduced-motion is handled globally by <MotionConfig> in
 * the shell, so we don't branch on useReducedMotion here (which would itself
 * cause a server/client split).
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

/**
 * PageTransition — fade between router views.
 */
export function PageTransition({ children, pageKey }: { children: ReactNode; pageKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        suppressHydrationWarning
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
