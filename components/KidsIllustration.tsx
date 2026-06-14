"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GIRL_DRESS = "M28,34 Q22,70 17,106 Q40,116 63,106 Q58,70 52,34 Q40,28 28,34 Z";
const GIRL_ARM_L = "M22,40 Q12,55 10,70";
const GIRL_ARM_R = "M58,40 Q70,55 72,70";
const GIRL_LEG_L = "M30,106 L27,146";
const GIRL_LEG_R = "M50,106 L53,146";

const BOY_BODY  = "M110,34 L106,98 Q122,106 138,98 L134,34 Q122,28 110,34 Z";
const BOY_ARM_L = "M108,40 Q96,55 94,70";
const BOY_ARM_R = "M136,40 Q148,55 150,70";
const BOY_LEG_L = "M114,98 L111,146";
const BOY_LEG_R = "M130,98 L133,146";

const HANDS = "M72,70 L94,70";
const HEART = "M83,70 C80,66 76,63 76,59 C76,56 79,55 81,57 C82,58 83,60 83,61 C83,60 84,58 85,57 C87,55 90,56 90,59 C90,63 86,66 83,70 Z";

const LIMBS = [GIRL_ARM_L, GIRL_ARM_R, GIRL_LEG_L, GIRL_LEG_R, BOY_ARM_L, BOY_ARM_R, BOY_LEG_L, BOY_LEG_R];

export default function KidsIllustration({ size = 96 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const draw = (delay: number, duration = 0.7) => ({
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : { pathLength: 0 },
    transition: { duration, delay, ease },
  });

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 160 160"
      fill="none" aria-hidden className="mx-auto">

      {/* Heads */}
      <motion.circle cx={40} cy={22} r={12} stroke="#C9A96E" strokeWidth="1.6" {...draw(0)} />
      <motion.circle cx={122} cy={22} r={12} stroke="#C9A96E" strokeWidth="1.6" {...draw(0.15)} />

      {/* Bodies */}
      <motion.path d={GIRL_DRESS} stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...draw(0.3, 1)} />
      <motion.path d={BOY_BODY} stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...draw(0.45, 1)} />

      {/* Arms & legs */}
      {LIMBS.map((d, i) => (
        <motion.path key={i} d={d} stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" {...draw(0.9 + i * 0.05, 0.6)} />
      ))}

      {/* Fill wash */}
      <motion.circle cx={40} cy={22} r={12} fill="#C9A96E" stroke="none"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.05 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 1.7 }} />
      <motion.circle cx={122} cy={22} r={12} fill="#C9A96E" stroke="none"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.05 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 1.7 }} />
      <motion.path d={GIRL_DRESS} fill="#C9A96E" stroke="none"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.05 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 1.7 }} />
      <motion.path d={BOY_BODY} fill="#C9A96E" stroke="none"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.05 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 1.7 }} />

      {/* Holding hands */}
      <motion.path d={HANDS} stroke="#C4707A" strokeWidth="1.4" strokeLinecap="round" {...draw(1.6, 0.5)} />

      {/* Heart */}
      <motion.path d={HEART} stroke="#C4707A" strokeWidth="1.2" fill="#C4707A"
        initial={{ pathLength: 0, opacity: 0, scale: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1, scale: 1 } : { pathLength: 0, opacity: 0, scale: 0 }}
        transition={{ pathLength: { duration: 0.6, delay: 2.1, ease }, opacity: { duration: 0.3, delay: 2.1 }, scale: { delay: 2.1, type: "spring", stiffness: 280, damping: 14 } }}
        style={{ transformOrigin: "83px 63px" }}
      />
    </svg>
  );
}
