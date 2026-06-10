"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EVENTS = [
  { time: "17:00", title: "Guest Arrival",        desc: "Welcome to our celebration — find your seat and soak in the atmosphere." },
  { time: "17:30", title: "Welcome Drinks",        desc: "Champagne, cocktails & light refreshments in the garden."               },
  { time: "18:00", title: "Wedding Ceremony",      desc: "The sacred moment — our vows, our rings, our forever."                  },
  { time: "20:00", title: "Wedding Dinner",        desc: "A feast prepared with love, shared with the people we cherish most."    },
  { time: "22:00", title: "Celebration & Dancing", desc: "Music fills the room — dance with us all night long."                   },
  { time: "00:00", title: "Special Moments",       desc: "A night written in stars, a memory carried forever."                    },
];

function r4(n: number) { return parseFloat(n.toFixed(4)); }

// Single-color rose dot — alternates rose / white per event
function BloomDot({ delay, index }: { delay: number; index: number }) {
  const size = 56;
  const cx = size / 2;
  const color       = index % 2 === 0 ? "#C4607A" : "#F5EAEC";
  const centerColor = index % 2 === 0 ? "#FAF0F2" : "#C4607A";
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, amount: 0.2 });

  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 360;
    const rad = (angle * Math.PI) / 180;
    return { angle, px: r4(cx + Math.cos(rad) * size * 0.28), py: r4(cx + Math.sin(rad) * size * 0.28), d: delay + i * 0.06 };
  });

  return (
    <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden>
      {petals.map((p, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.45, delay: p.d, type: "spring", stiffness: 220, damping: 12 }}
          style={{ transformOrigin: `${cx}px ${cx}px` }}
        >
          <ellipse cx={p.px} cy={p.py} rx={r4(size * 0.1)} ry={r4(size * 0.21)}
            transform={`rotate(${p.angle + 90}, ${p.px}, ${p.py})`} fill={color} />
        </motion.g>
      ))}
      <motion.circle cx={cx} cy={cx} r={r4(size * 0.098)} fill={centerColor}
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: delay + 0.55, type: "spring", stiffness: 280, damping: 14 }}
        style={{ transformOrigin: `${cx}px ${cx}px` }}
      />
    </svg>
  );
}

export default function EventDetails() {
  return (
    <section id="timeline" className="py-20 sm:py-32 relative overflow-hidden"
      style={{ background: "#140F0B" }}>

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0" style={{ width: 300, height: 300,
          background: "radial-gradient(circle, rgba(196,112,122,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0" style={{ width: 320, height: 320,
          background: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)" }} />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="font-body tracking-[0.55em] uppercase mb-3"
            style={{ fontSize: "clamp(8px, 2vw, 10px)", color: "rgba(201,169,110,0.55)" }}>
            August 25, 2026
          </p>
          <h2 className="font-display select-none"
            style={{ fontSize: "clamp(3rem, 11vw, 7.5rem)", color: "#FFFFFF" }}>
            The Day
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(201,169,110,0.5)" }} />
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to left, transparent, rgba(201,169,110,0.3))" }} />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(196,112,122,0.5), rgba(201,169,110,0.4), rgba(139,48,64,0.3))" }}
          />
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px origin-top md:hidden"
            style={{ background: "linear-gradient(to bottom, rgba(196,112,122,0.5), rgba(201,169,110,0.3))" }}
          />

          <div className="space-y-0">
            {EVENTS.map((ev, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div key={ev.title}
                  initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center pb-10 sm:pb-12 pl-16 sm:pl-20 md:pl-0 ${
                    isRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block w-1/2" />

                  {/* Desktop: blooming flower dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:block z-10">
                    <BloomDot delay={i * 0.12} index={i} />
                  </div>

                  {/* Mobile dot */}
                  <div className="absolute left-6 sm:left-8 -translate-x-1/2 top-0 md:hidden z-10">
                    <BloomDot delay={i * 0.12} index={i} />
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] p-5 sm:p-8 ${isRight ? "md:ml-10" : "md:mr-10"}`}
                    style={{
                      background: "rgba(255,255,255,0.026)",
                      border: "1px solid rgba(196,112,122,0.12)",
                      borderRadius: "14px",
                    }}
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-heading tabular-nums"
                        style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", color: "#C9A96E" }}>
                        {ev.time}
                      </span>
                      <div className="h-px flex-1"
                        style={{ background: "linear-gradient(to right, rgba(196,112,122,0.35), transparent)" }} />
                    </div>
                    <h3 className="font-heading mb-2"
                      style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "rgba(245,237,232,0.88)" }}>
                      {ev.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(245,237,232,0.38)", fontSize: "clamp(12px, 2vw, 13px)" }}>
                      {ev.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dress code */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="font-body tracking-[0.35em] uppercase"
            style={{ fontSize: "clamp(8px, 2vw, 10px)", color: "rgba(245,237,232,0.22)" }}>
            Dress Code —{" "}
            <span style={{ color: "rgba(201,169,110,0.55)" }}>Black Tie Optional</span>
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.18), transparent)" }} />
    </section>
  );
}
