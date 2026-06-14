"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PETALS = [
  { id: 0, left: "7%",  delay: 0,    dur: 20, pd:  50, ps:  200, size: 14 },
  { id: 1, left: "22%", delay: 3.2,  dur: 24, pd: -44, ps: -240, size: 11 },
  { id: 2, left: "38%", delay: 6.5,  dur: 21, pd:  56, ps:  310, size: 16 },
  { id: 3, left: "54%", delay: 1.6,  dur: 23, pd: -50, ps: -190, size: 13 },
  { id: 4, left: "68%", delay: 8.8,  dur: 19, pd:  38, ps:  265, size: 15 },
  { id: 5, left: "81%", delay: 4.5,  dur: 22, pd: -60, ps: -300, size: 12 },
  { id: 6, left: "93%", delay: 11.2, dur: 25, pd:  46, ps:  175, size: 14 },
];

const PETAL_FILL = [
  "rgba(215,90,112,0.55)",
  "rgba(248,240,244,0.62)",
  "rgba(200,72,92,0.46)",
  "rgba(252,248,250,0.58)",
];

// Per-petal keyframes with hardcoded values — fixes Safari/iOS CSS variable bug in @keyframes
const petalCSS = PETALS.map(p => `
  @keyframes petal-${p.id} {
    0%   { transform: translateY(-40px) translateX(0) rotate(0deg); opacity: 0; }
    7%   { opacity: 0.82; }
    48%  { transform: translateY(50vh) translateX(${Math.round(p.pd * 0.52)}px) rotate(${Math.round(p.ps * 0.48)}deg); }
    91%  { opacity: 0.28; }
    100% { transform: translateY(112vh) translateX(${p.pd}px) rotate(${p.ps}deg); opacity: 0; }
  }
`).join("");

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section ref={sectionRef} id="home" className="relative h-screen overflow-hidden">

      {/* Per-petal keyframes — Safari-safe (no CSS vars inside @keyframes) */}
      <style dangerouslySetInnerHTML={{ __html: petalCSS }} />

      {/* Photo with parallax */}
      <motion.div className="absolute inset-0" style={{ y: photoY }}>
        <Image
          src="/photos/proposal.jpg"
          alt="Layla & Hazem"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "rgba(7,3,2,0.20)" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 28%, rgba(7,5,3,0.48) 100%)" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(14,11,8,0.92) 0%, rgba(14,11,8,0.10) 42%, transparent 100%)" }} />

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <div key={p.id} aria-hidden className="absolute pointer-events-none"
          style={{
            left: p.left, top: "-50px",
            width: p.size, height: p.size * 1.55,
            opacity: 0,
            animation: `petal-${p.id} ${p.dur}s ease-in infinite ${p.delay}s`,
          }}
        >
          <svg viewBox="0 0 20 31" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden>
            <path
              d="M10 0 C15 4, 20 12, 18 20 C16 26, 13 31, 10 31 C7 31, 4 26, 2 20 C0 12, 5 4, 10 0Z"
              fill={PETAL_FILL[i % 4]}
            />
          </svg>
        </div>
      ))}

      {/* Content — lower third */}
      <div className="absolute inset-x-0 bottom-0 pb-16 sm:pb-24 px-6 text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display select-none"
          style={{
            fontSize: "clamp(4rem, 14vw, 11rem)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,0.55)",
          }}
        >
          <span style={{ display: "block" }}>{t.hero.names.bride}</span>
          <span style={{ display: "block", fontStyle: "italic", fontWeight: 400, letterSpacing: "0.1em", lineHeight: 1.1, fontSize: "0.42em" }}>{t.hero.names.and}</span>
          <span style={{ display: "block" }}>{t.hero.names.groom}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="font-body tracking-[0.5em] uppercase mt-3"
          style={{ fontSize: "clamp(9px, 2vw, 11px)", color: "rgba(125,103,71,1)", fontWeight: 700 }}
        >
          {t.hero.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-body tracking-[0.3em] uppercase mt-2"
          style={{ fontSize: "clamp(9px, 2vw, 11px)", color: "rgba(125,103,71,1)", fontWeight: 700 }}
        >
          {t.hero.date}
        </motion.p>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,100,118,0.18), transparent)" }} />
    </section>
  );
}
