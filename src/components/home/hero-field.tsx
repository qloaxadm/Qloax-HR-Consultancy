"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];

type Point = {
  bx: number;
  by: number;
  bz: number;
  phase: number;
  size: number;
  accent: boolean;
  weight: number;
};

type Pulse = { from: number; to: number; prev: number; t: number; speed: number };

type Tier = "small" | "medium" | "large";

const TIER_CONFIG: Record<Tier, { count: number; pulses: number; threads: number }> = {
  small: { count: 110, pulses: 7, threads: 6 },
  medium: { count: 170, pulses: 11, threads: 9 },
  large: { count: 250, pulses: 16, threads: 12 },
};

function hexToRgb(value: string, fallback: RGB): RGB {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeGlow(rgb: RGB) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const g = sprite.getContext("2d");
  if (!g) return sprite;
  const gradient = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, `rgba(${rgb.join(",")},1)`);
  gradient.addColorStop(0.25, `rgba(${rgb.join(",")},0.45)`);
  gradient.addColorStop(1, `rgba(${rgb.join(",")},0)`);
  g.fillStyle = gradient;
  g.fillRect(0, 0, 64, 64);
  return sprite;
}

const rgba = (rgb: RGB, a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const styles = getComputedStyle(document.documentElement);
    const ink = hexToRgb(styles.getPropertyValue("--color-text-primary"), [243, 241, 234]);
    const muted = hexToRgb(styles.getPropertyValue("--color-text-secondary"), [163, 167, 176]);
    const accent = hexToRgb(styles.getPropertyValue("--color-accent"), [199, 243, 107]);
    const accentGlow = makeGlow(accent);
    const softGlow = makeGlow(ink);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let tier: Tier | null = null;
    let points: Point[] = [];
    let edges: [number, number][] = [];
    let threads: [number, number][] = [];
    let neighbors: number[][] = [];
    let pulses: Pulse[] = [];
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pd = new Float32Array(0);
    let raf = 0;
    let running = false;
    let visible = true;
    let marked = false;
    let last = performance.now();
    let clock = 0;
    const introStart = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    function build(next: Tier) {
      tier = next;
      const config = TIER_CONFIG[next];
      const rand = seeded(20261024);
      points = [];
      for (let i = 0; i < config.count; i++) {
        const core = i < config.count * 0.46;
        const r = core ? 0.5 * Math.pow(rand(), 0.6) : 0.78 + rand() * 0.22;
        const theta = rand() * Math.PI * 2;
        const phi = Math.acos(2 * rand() - 1);
        points.push({
          bx: r * Math.sin(phi) * Math.cos(theta),
          by: r * Math.cos(phi) * 0.8,
          bz: r * Math.sin(phi) * Math.sin(theta),
          phase: rand() * Math.PI * 2,
          size: 0.7 + rand() * 1.1,
          accent: core && rand() < 0.17,
          weight: core ? 1 : 0.5,
        });
      }

      const keys = new Set<string>();
      edges = [];
      neighbors = points.map(() => []);
      for (let i = 0; i < points.length; i++) {
        const distances: [number, number][] = [];
        for (let j = 0; j < points.length; j++) {
          if (i === j) continue;
          const dx = points[i].bx - points[j].bx;
          const dy = points[i].by - points[j].by;
          const dz = points[i].bz - points[j].bz;
          distances.push([dx * dx + dy * dy + dz * dz, j]);
        }
        distances.sort((a, b) => a[0] - b[0]);
        for (let k = 0; k < 3; k++) {
          const j = distances[k][1];
          const key = i < j ? `${i}:${j}` : `${j}:${i}`;
          if (keys.has(key)) continue;
          keys.add(key);
          edges.push([i, j]);
          neighbors[i].push(j);
          neighbors[j].push(i);
        }
      }

      threads = [];
      let guard = 0;
      while (threads.length < config.threads && guard++ < 500) {
        const a = Math.floor(rand() * points.length);
        const b = Math.floor(rand() * points.length);
        const dx = points[a].bx - points[b].bx;
        const dy = points[a].by - points[b].by;
        const dz = points[a].bz - points[b].bz;
        if (dx * dx + dy * dy + dz * dz > 1.3) threads.push([a, b]);
      }

      pulses = Array.from({ length: config.pulses }, () => {
        const [from, to] = edges[Math.floor(rand() * edges.length)];
        return { from, to, prev: -1, t: rand(), speed: 0.22 + rand() * 0.3 };
      });

      px = new Float32Array(points.length);
      py = new Float32Array(points.length);
      pd = new Float32Array(points.length);
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      const nextTier: Tier = width < 640 ? "small" : width < 1024 ? "medium" : "large";
      dpr = Math.min(window.devicePixelRatio || 1, nextTier === "small" ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      if (nextTier !== tier) build(nextTier);
      if (!running) draw(0);
    }

    function layout() {
      if (tier === "large") return { cx: width * 0.7, cy: height * 0.45, radius: Math.min(width * 0.3, height * 0.56) };
      if (tier === "medium") return { cx: width * 0.66, cy: height * 0.36, radius: Math.min(width * 0.44, height * 0.36) };
      return { cx: width * 0.6, cy: height * 0.27, radius: width * 0.56 };
    }

    function draw(dt: number) {
      if (!ctx || width === 0) return;
      const { cx, cy, radius } = layout();
      const intro = reduced ? 1 : easeOutCubic(clamp01((performance.now() - introStart) / 2800));
      const spread = 1 + (1 - intro) * 0.6;
      const t = reduced ? 9 : clock;

      pointer.x += (pointer.tx - pointer.x) * 0.035;
      pointer.y += (pointer.ty - pointer.y) * 0.035;
      const rotY = t * 0.045 + pointer.x * 0.32;
      const rotX = -0.34 + pointer.y * 0.16 + Math.sin(t * 0.11) * 0.05;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const camera = 3;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const breathe = (1 + Math.sin(t * 0.7 + p.phase) * 0.02) * spread;
        const x = p.bx * breathe;
        const y = p.by * breathe;
        const z = p.bz * breathe;
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const scale = camera / (camera + z2);
        px[i] = cx + x1 * scale * radius;
        py[i] = cy + y2 * scale * radius;
        pd[i] = clamp01((1 - z2 / 1.25) / 2);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.lineWidth = 0.6;
      ctx.strokeStyle = rgba(muted, 0.06 * intro);
      ctx.beginPath();
      for (const [a, b] of threads) {
        const mx = (px[a] + px[b]) / 2;
        const my = (py[a] + py[b]) / 2;
        ctx.moveTo(px[a], py[a]);
        ctx.quadraticCurveTo(mx + (cx - mx) * 0.45, my + (cy - my) * 0.45, px[b], py[b]);
      }
      ctx.stroke();

      const BUCKETS = 6;
      const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const accentPath = new Path2D();
      for (const [a, b] of edges) {
        const depth = (pd[a] + pd[b]) / 2;
        const length = Math.hypot(px[a] - px[b], py[a] - py[b]);
        const fade = clamp01(1 - length / (radius * 0.85));
        const weight = (points[a].weight + points[b].weight) / 2;
        const alpha = (0.035 + depth * 0.3) * fade * weight * intro;
        if (alpha < 0.012) continue;
        if (points[a].accent && points[b].accent) {
          accentPath.moveTo(px[a], py[a]);
          accentPath.lineTo(px[b], py[b]);
          continue;
        }
        const bucket = Math.min(BUCKETS - 1, Math.floor((alpha / 0.34) * BUCKETS));
        paths[bucket].moveTo(px[a], py[a]);
        paths[bucket].lineTo(px[b], py[b]);
      }
      for (let b = 0; b < BUCKETS; b++) {
        ctx.strokeStyle = rgba(muted, ((b + 0.5) / BUCKETS) * 0.34);
        ctx.lineWidth = 0.55 + b * 0.07;
        ctx.stroke(paths[b]);
      }
      ctx.strokeStyle = rgba(accent, 0.42 * intro);
      ctx.lineWidth = 0.8;
      ctx.stroke(accentPath);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const depth = pd[i];
        const size = p.size * (0.4 + depth * 1.35);
        const alpha = (0.16 + depth * 0.78) * p.weight * intro;
        if (p.accent) {
          ctx.globalCompositeOperation = "lighter";
          const glow = size * 7;
          ctx.globalAlpha = 0.32 * depth * intro;
          ctx.drawImage(accentGlow, px[i] - glow, py[i] - glow, glow * 2, glow * 2);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = rgba(accent, alpha);
        } else {
          if (depth > 0.8) {
            const bokeh = size * 5.5;
            ctx.globalAlpha = 0.05 * intro;
            ctx.drawImage(softGlow, px[i] - bokeh, py[i] - bokeh, bokeh * 2, bokeh * 2);
            ctx.globalAlpha = 1;
          }
          ctx.fillStyle = rgba(ink, alpha * 0.85);
        }
        ctx.beginPath();
        ctx.arc(px[i], py[i], size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const pulse of pulses) {
        if (!reduced) {
          pulse.t += dt * pulse.speed;
          if (pulse.t >= 1) {
            const options = neighbors[pulse.to].filter((n) => n !== pulse.from);
            const next = options.length
              ? options[Math.floor(Math.random() * options.length)]
              : pulse.from;
            pulse.prev = pulse.from;
            pulse.from = pulse.to;
            pulse.to = next;
            pulse.t = 0;
          }
        }
        const k = pulse.t;
        const x = px[pulse.from] + (px[pulse.to] - px[pulse.from]) * k;
        const y = py[pulse.from] + (py[pulse.to] - py[pulse.from]) * k;
        const depth = (pd[pulse.from] + pd[pulse.to]) / 2;
        const tail = Math.max(0, k - 0.22);
        const tx = px[pulse.from] + (px[pulse.to] - px[pulse.from]) * tail;
        const ty = py[pulse.from] + (py[pulse.to] - py[pulse.from]) * tail;
        ctx.strokeStyle = rgba(accent, (0.25 + depth * 0.45) * intro);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        const glow = 6 + depth * 10;
        ctx.globalAlpha = (0.35 + depth * 0.5) * intro;
        ctx.drawImage(accentGlow, x - glow, y - glow, glow * 2, glow * 2);
        ctx.globalAlpha = 1;
      }
      ctx.globalCompositeOperation = "source-over";

      if (!marked && canvas) {
        marked = true;
        canvas.dataset.ready = "true";
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      draw(dt);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (event: PointerEvent) => {
      pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
