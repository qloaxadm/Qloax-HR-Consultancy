"use client";

import { motion } from "motion/react";

const NODES = [
  { x: 560, y: 90, accent: false },
  { x: 700, y: 60, accent: true },
  { x: 830, y: 150, accent: false },
  { x: 870, y: 290, accent: false },
  { x: 760, y: 410, accent: true },
  { x: 610, y: 440, accent: false },
  { x: 520, y: 320, accent: false },
  { x: 660, y: 230, accent: true },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
  [6, 7],
  [7, 1],
  [7, 4],
];

export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#292929" strokeWidth="1">
        {EDGES.map(([a, b], index) => {
          const from = NODES[a];
          const to = NODES[b];
          return (
            <line key={index} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
          );
        })}
      </g>
      {NODES.map((node, index) => (
        <motion.circle
          key={index}
          cx={node.x}
          cy={node.y}
          r={node.accent ? 5 : 3}
          fill={node.accent ? "#c7f36b" : "#a4a19b"}
          initial={{ opacity: 0.35, scale: 0.9 }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          transition={{
            duration: 4 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      ))}
    </svg>
  );
}
