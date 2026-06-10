"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  phase: number;
  speed: number;
};

type Edge = { a: number; b: number; dist: number };

const NUM_STARS = 220;
const MAX_CONN_DIST = 120;
const MAX_EDGES_PER_STAR = 1;

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let edges: Edge[] = [];

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      stars = Array.from({ length: NUM_STARS }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * 1.2,
        baseOpacity: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.65,
      }));

      const candidates: Edge[] = [];
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_CONN_DIST) candidates.push({ a: i, b: j, dist });
        }
      }
      candidates.sort((a, b) => a.dist - b.dist);

      const degree = new Array(stars.length).fill(0);
      edges = [];
      for (const e of candidates) {
        if (degree[e.a] < MAX_EDGES_PER_STAR && degree[e.b] < MAX_EDGES_PER_STAR) {
          edges.push(e);
          degree[e.a]++;
          degree[e.b]++;
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const e of edges) {
        const sa = stars[e.a];
        const sb = stars[e.b];
        const fade = 1 - e.dist / MAX_CONN_DIST;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = `rgba(190,170,230,${fade * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed * 0.001 + s.phase);
        const op = s.baseOpacity * (0.5 + 0.5 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225,215,255,${op})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
