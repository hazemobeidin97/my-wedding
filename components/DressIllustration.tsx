"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const OUTLINE =
  "M40,8 C30,8 27,20 29,35 C31,50 37,62 41,75 C29,90 17,112 10,148 Q50,159 90,148 C83,112 71,90 59,75 C63,62 69,50 71,35 C73,20 70,8 60,8 Q50,2 40,8 Z";
const SASH = "M41,76 Q50,82 59,76";

export default function DressIllustration({ size = 84 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <svg ref={ref} width={size} height={size * 1.6} viewBox="0 0 100 160"
      fill="none" aria-hidden className="mx-auto">

      {/* Bridal white fill, washes in once the outline completes */}
      <motion.path
        d={OUTLINE}
        fill="#F5EDE8" stroke="none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.92 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
      />

      {/* Outline — draws itself like a tailor's sketch, stays as gold trim */}
      <motion.path
        d={OUTLINE}
        stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.8, ease }}
      />

      {/* Waist sash */}
      <motion.path
        d={SASH}
        stroke="#C4707A" strokeWidth="1.4" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: 1.3, ease }}
      />

      {/* Sash button */}
      <motion.circle
        cx="50" cy="79" r="2.4" fill="#C4707A"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 2.0, type: "spring", stiffness: 280, damping: 14 }}
        style={{ transformOrigin: "50px 79px" }}
      />
    </svg>
  );
}
