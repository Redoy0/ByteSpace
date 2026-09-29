"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the entrance starts. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Animate on mount (above the fold) instead of when scrolled into view. */
  onMount?: boolean;
}

/**
 * Subtle fade + rise entrance. Renders statically when the user prefers
 * reduced motion. Keep it off primary text (LCP) — use it for supporting
 * visuals such as floating cards.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  onMount = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(onMount
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, amount: 0.3 } })}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
