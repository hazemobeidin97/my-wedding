"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const BLOOMS = [
  { left: "10%", r: 22, color: "rgba(215,90,112,0.72)",  center: "rgba(250,215,225,0.9)", delay: 0.10 },
  { left: "28%", r: 17, color: "rgba(248,240,244,0.80)",  center: "rgba(196,96,122,0.65)", delay: 0.22 },
  { left: "50%", r: 26, color: "rgba(215,90,112,0.68)",   center: "rgba(250,215,225,0.9)", delay: 0.00 },
  { left: "70%", r: 19, color: "rgba(248,240,244,0.75)",  center: "rgba(196,96,122,0.65)", delay: 0.16 },
  { left: "88%", r: 21, color: "rgba(215,90,112,0.65)",   center: "rgba(250,215,225,0.9)", delay: 0.08 },
];

function BloomFlower({ b, inView }: { b: typeof BLOOMS[0]; inView: boolean }) {
  const s      = b.r / 31;          // scale so petal height = radius
  const d      = b.r * 2 + 8;       // SVG width
  const cx     = d / 2;
  const stemH  = b.r * 2.8;
  const totalH = b.r + stemH + 4;

  return (
    <div style={{ position: "absolute", bottom: 0, left: b.left, transform: "translateX(-50%)" }}>
      <svg width={d} height={totalH} viewBox={`0 0 ${d} ${totalH}`} overflow="visible">
        {/* Stem */}
        <motion.path
          d={`M ${cx} ${b.r + 2} L ${cx} ${totalH}`}
          stroke="rgba(90,138,90,0.55)" strokeWidth="1.4" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.45, delay: b.delay }}
        />
        {/* 6 petals — each blooms from its base at the flower center */}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} transform={`translate(${cx},${b.r + 2}) rotate(${i * 60}) scale(${s}) translate(-10,-31)`}>
            <motion.path
              d="M10 0 C15 4, 20 12, 18 20 C16 26, 13 31, 10 31 C7 31, 4 26, 2 20 C0 12, 5 4, 10 0Z"
              fill={b.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: b.delay + 0.18 + i * 0.07, type: "spring", stiffness: 190, damping: 12 }}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            />
          </g>
        ))}
        {/* Center */}
        <motion.circle cx={cx} cy={b.r + 2} r={b.r * 0.22} fill={b.center}
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: b.delay + 0.62, type: "spring", stiffness: 300, damping: 14 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}

function FlowerGarden() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative w-full" style={{ height: "clamp(100px, 14vw, 130px)", marginTop: "2.5rem" }}>
      {BLOOMS.map((b, i) => <BloomFlower key={i} b={b} inView={inView} />)}
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ background: "#0B0805" }} className="relative overflow-hidden pt-20 pb-8">

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,96,122,0.22), transparent)" }} />

      <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display select-none"
          style={{ fontSize: "clamp(2.8rem, 11vw, 6.5rem)", color: "#FFFFFF" }}
        >
          <span style={{ display: "block" }}>Layla</span>
          <span style={{ display: "block", fontStyle: "italic", fontWeight: 400, letterSpacing: "0.1em", opacity: 0.6, lineHeight: 1.1, fontSize: "0.4em" }}>&amp;</span>
          <span style={{ display: "block" }}>Hazem</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex items-center justify-center gap-4 my-5"
        >
          <div className="h-px w-16"
            style={{ background: "linear-gradient(to right, transparent, rgba(196,96,122,0.35))" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(196,96,122,0.55)" }} />
          <div className="h-px w-16"
            style={{ background: "linear-gradient(to left, transparent, rgba(196,96,122,0.35))" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading italic mb-5"
          style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", color: "rgba(245,237,232,0.4)" }}
        >
          {t.footer.dateLocation}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-body mb-10"
          style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: "rgba(245,237,232,0.25)", lineHeight: 1.85 }}
        >
          {t.footer.thanks[0]}<br />
          {t.footer.thanks[1]}
        </motion.p>

        <div className="flex items-center justify-center flex-wrap gap-5 mb-2">
          {t.nav.links.map(link => (
            <a key={link.href} href={link.href}
              className="font-body tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ fontSize: "clamp(9px, 1.5vw, 10px)", color: "rgba(245,237,232,0.22)" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(196,96,122,0.65)")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(245,237,232,0.22)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <FlowerGarden />

      <div className="text-center mt-4 relative z-10">
        <p className="font-body"
          style={{ fontSize: "10px", color: "rgba(245,237,232,0.14)", letterSpacing: "0.18em" }}>
          {t.footer.bottomDate}
        </p>
      </div>
    </footer>
  );
}
