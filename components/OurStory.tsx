"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function r4(n: number) { return parseFloat(n.toFixed(4)); }

function Rose({ delay = 0, size = 80, color = "#C4607A" }: { delay?: number; size?: number; color?: string }) {
  const cx = size / 2;
  const centerColor = color === "#C4607A" ? "#FAF0F2" : "#C4607A";
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, amount: 0.2 });

  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 360;
    const rad = (angle * Math.PI) / 180;
    return { angle, px: r4(cx + Math.cos(rad) * size * 0.29), py: r4(cx + Math.sin(rad) * size * 0.29), d: delay + i * 0.065 };
  });

  return (
    <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
      {petals.map((p, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.55, delay: p.d, type: "spring", stiffness: 190, damping: 12 }}
          style={{ transformOrigin: `${cx}px ${cx}px` }}
        >
          <ellipse cx={p.px} cy={p.py} rx={r4(size * 0.1)} ry={r4(size * 0.215)}
            transform={`rotate(${p.angle + 90}, ${p.px}, ${p.py})`} fill={color} />
        </motion.g>
      ))}
      <motion.circle cx={cx} cy={cx} r={r4(size * 0.1)} fill={centerColor}
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: delay + 0.6, type: "spring", stiffness: 280, damping: 14 }}
        style={{ transformOrigin: `${cx}px ${cx}px` }}
      />
    </svg>
  );
}

const STORY_COLORS = ["#C4607A", "#F5EAEC", "#C4607A"];

export default function OurStory() {
  const { t } = useLanguage();
  return (
    <section id="story" className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#0E0B08" }}>

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0" style={{ width: 300, height: 300,
          background: "radial-gradient(circle, rgba(196,96,122,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="font-body tracking-[0.55em] uppercase mb-3"
            style={{ fontSize: "clamp(8px, 2vw, 10px)", color: "rgba(196,96,122,0.55)" }}>
            {t.story.eyebrow}
          </p>
          <h2 className="font-display select-none"
            style={{ fontSize: "clamp(2.8rem, 10vw, 6.5rem)", color: "#FFFFFF" }}>
            {t.story.heading}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to right, transparent, rgba(196,96,122,0.3))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(196,96,122,0.5)" }} />
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to left, transparent, rgba(196,96,122,0.3))" }} />
          </div>
        </motion.div>

        <div className="space-y-8 sm:space-y-10">
          {t.story.entries.map((entry, i) => (
            <motion.div key={entry.label}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="flex items-start gap-5 sm:gap-7"
            >
              <div className="flex-shrink-0 mt-1">
                <Rose delay={i * 0.15} size={52} color={STORY_COLORS[i]} />
              </div>
              <div className="flex-1 p-5 sm:p-6"
                style={{
                  background: "rgba(255,255,255,0.022)",
                  border: "1px solid rgba(196,96,122,0.12)",
                  borderRadius: "14px",
                }}
              >
                <p className="font-body tracking-[0.3em] uppercase mb-2"
                  style={{ fontSize: "clamp(7px, 2vw, 9px)", color: "rgba(196,96,122,0.65)" }}>
                  {entry.label}
                </p>
                <p className="font-heading"
                  style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", color: "rgba(245,237,232,0.75)", lineHeight: 1.7 }}>
                  {entry.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
