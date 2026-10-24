"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-accent"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-accent/50"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          opacity: hovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
    </>
  );
}
