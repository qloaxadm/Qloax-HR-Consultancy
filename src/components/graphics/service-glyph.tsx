"use client";

import { motion } from "motion/react";
import type { ServiceGlyph as Glyph } from "@/lib/types";
import { EASE_OUT } from "@/lib/motion";

const MUTED = "var(--color-text-secondary)";
const INK = "var(--color-text-primary)";
const ACCENT = "var(--color-accent)";

const draw = (delay = 0, duration = 1.1) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration, ease: EASE_OUT, delay },
    opacity: { duration: 0.2, delay },
  },
});

function Target() {
  return (
    <>
      <motion.circle cx="60" cy="60" r="50" stroke={MUTED} strokeOpacity="0.5" strokeDasharray="1 5" {...draw(0)} />
      <motion.circle cx="60" cy="60" r="34" stroke={MUTED} strokeOpacity="0.8" {...draw(0.1)} />
      <motion.circle cx="60" cy="60" r="18" stroke={INK} {...draw(0.2)} />
      {["M60 4V30", "M60 90V116", "M4 60H30", "M90 60H116"].map((d, i) => (
        <motion.path key={d} d={d} stroke={INK} {...draw(0.35 + i * 0.06, 0.6)} />
      ))}
      <motion.circle
        cx="60"
        cy="60"
        r="4"
        fill={ACCENT}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 }}
      />
    </>
  );
}

function Radar() {
  const dots = [];
  for (let x = 20; x <= 100; x += 20) for (let y = 20; y <= 100; y += 20) dots.push([x, y]);
  return (
    <>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={MUTED} fillOpacity="0.45" />
      ))}
      <motion.circle cx="60" cy="60" r="50" stroke={MUTED} strokeOpacity="0.7" {...draw(0)} />
      <motion.circle cx="60" cy="60" r="26" stroke={MUTED} strokeOpacity="0.35" {...draw(0.1)} />
      <motion.g
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 270, opacity: 1 }}
        transition={{ rotate: { duration: 7, ease: "linear", repeat: Infinity }, opacity: { duration: 0.4 } }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <rect width="120" height="120" fill="none" />
        <path d="M60 60L60 10A50 50 0 0 1 95.4 24.6Z" fill={ACCENT} fillOpacity="0.08" />
        <path d="M60 60V10" stroke={INK} />
      </motion.g>
      <motion.circle
        cx="86"
        cy="38"
        r="4"
        fill={ACCENT}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
      />
      <motion.circle
        cx="86"
        cy="38"
        r="9"
        stroke={ACCENT}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.6, 1.9] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.9, ease: "easeOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </>
  );
}

function Layers() {
  const plane = "M60 40L100 60L60 80L20 60Z";
  return (
    <>
      {[
        { y: 22, stroke: MUTED, delay: 0.2 },
        { y: 0, stroke: INK, delay: 0.1 },
        { y: -22, stroke: ACCENT, delay: 0 },
      ].map(({ y, stroke, delay }) => (
        <motion.path
          key={y}
          d={plane}
          stroke={stroke}
          fill={y === -22 ? ACCENT : "none"}
          fillOpacity={y === -22 ? 0.08 : 0}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y, opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT, delay }}
        />
      ))}
      <motion.path d="M20 60V82M100 60V82M60 80V102" stroke={MUTED} strokeOpacity="0.5" strokeDasharray="2 4" {...draw(0.6, 0.8)} />
    </>
  );
}

function Compass() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * Math.PI) / 6;
    const inner = i % 3 === 0 ? 40 : 44;
    return `M${60 + Math.sin(angle) * inner} ${60 - Math.cos(angle) * inner}L${60 + Math.sin(angle) * 50} ${60 - Math.cos(angle) * 50}`;
  });
  return (
    <>
      <motion.circle cx="60" cy="60" r="50" stroke={MUTED} strokeOpacity="0.7" {...draw(0)} />
      {ticks.map((d, i) => (
        <motion.path key={d} d={d} stroke={i % 3 === 0 ? INK : MUTED} {...draw(0.1 + i * 0.03, 0.4)} />
      ))}
      <motion.g
        initial={{ rotate: -80 }}
        animate={{ rotate: 32 }}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.2 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <path d="M60 22L66 60H54Z" fill={ACCENT} />
        <path d="M60 98L66 60H54Z" stroke={INK} />
      </motion.g>
      <circle cx="60" cy="60" r="2.5" fill={INK} />
    </>
  );
}

export function ServiceGlyph({ glyph, className }: { glyph: Glyph; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" strokeWidth="1.25" className={className} aria-hidden="true">
      {glyph === "target" && <Target />}
      {glyph === "radar" && <Radar />}
      {glyph === "layers" && <Layers />}
      {glyph === "compass" && <Compass />}
    </svg>
  );
}
