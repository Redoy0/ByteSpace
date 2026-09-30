"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees at the edges. */
  max?: number;
  /** Scale while hovered. */
  hoverScale?: number;
}

const spring = { stiffness: 150, damping: 18, mass: 0.6 };

/**
 * Tilts its content towards the mouse in 3D and lifts it slightly, easing
 * back when the pointer leaves. Mouse only (touch scrolls as usual); renders
 * static when the user prefers reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 6,
  hoverScale = 1.02,
}: TiltProps) {
  const reduceMotion = useReducedMotion();
  // Pointer position across the element, 0–1 on each axis
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const scale = useSpring(1, spring);

  if (reduceMotion) return <div className={className}>{children}</div>;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") scale.set(hoverScale);
  };

  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, scale, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
