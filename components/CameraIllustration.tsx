"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BODY = "M20,30 H110 A10,10 0 0 1 120,40 V80 A10,10 0 0 1 110,90 H20 A10,10 0 0 1 10,80 V40 A10,10 0 0 1 20,30 Z";
const VIEWFINDER = "M55,30 V16 H85 V30";

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * 45 * Math.PI) / 180;
  return {
    x1: 65 + Math.cos(a) * 26, y1: 60 + Math.sin(a) * 26,
    x2: 65 + Math.cos(a) * 35, y2: 60 + Math.sin(a) * 35,
  };
});

export default function CameraIllustration({ size = 100 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <svg ref={ref} width={size} height={size * (110 / 140)} viewBox="0 0 140 110"
      fill="none" aria-hidden className="mx-auto">

      {/* Flash glow burst, loops after the camera is drawn */}
      <motion.circle cx="65" cy="60" r="40" fill="#F5EDE8"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: [0, 0.35, 0], scale: [0.7, 1.15, 0.7] } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.7, delay: 2.0, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
        style={{ transformOrigin: "65px 60px" }}
      />

      {/* Body */}
      <motion.path d={BODY}
        stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.3, ease }}
      />

      {/* Viewfinder */}
      <motion.path d={VIEWFINDER}
        stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
      />

      {/* Shutter button */}
      <motion.circle cx="103" cy="22" r="3.5" stroke="#C4707A" strokeWidth="1.6" fill="none"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 280, damping: 14 }}
        style={{ transformOrigin: "103px 22px" }}
      />

      {/* Lens outer ring */}
      <motion.circle cx="65" cy="60" r="22" stroke="#C9A96E" strokeWidth="1.8" fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
      />

      {/* Lens inner ring */}
      <motion.circle cx="65" cy="60" r="13" stroke="#C4707A" strokeWidth="1.6" fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease }}
      />

      {/* Lens glass */}
      <motion.circle cx="65" cy="60" r="3" fill="#C4707A"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 280, damping: 14 }}
        style={{ transformOrigin: "65px 60px" }}
      />

      {/* Flash rays, loop with the glow */}
      {RAYS.map((r, i) => (
        <motion.line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke="#F5EDE8" strokeWidth="2" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 2.0 + i * 0.02, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
