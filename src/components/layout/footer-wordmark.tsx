"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export function FooterWordmark({ name }: { name: string }) {
  return (
    <div aria-hidden="true" className="overflow-hidden">
      <motion.svg
        viewBox="0 0 1000 132"
        className="block w-full"
        initial={{ y: "45%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <defs>
          <linearGradient id="wordmark-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-border)" />
            <stop offset="100%" stopColor="var(--color-surface)" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="100"
          textLength="1000"
          lengthAdjust="spacing"
          fill="url(#wordmark-fade)"
          style={{ fontFamily: "var(--font-geist-sans)", fontSize: 128, fontWeight: 500, letterSpacing: "-0.04em" }}
        >
          {name}
        </text>
      </motion.svg>
    </div>
  );
}
