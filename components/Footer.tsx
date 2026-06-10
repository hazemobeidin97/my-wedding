"use client";

import { motion } from "framer-motion";

function r4(n: number) { return parseFloat(n.toFixed(4)); }

// 12 plants — rose and white, alternating, varying heights
const GARDEN = [
  { x: "1%",  size: 30, color: "#C4607A", delay: 0.08, bend:  3 },
  { x: "10%", size: 40, color: "#F5EAEC", delay: 0.03, bend: -4 },
  { x: "19%", size: 22, color: "#C4607A", delay: 0.14, bend:  3 },
  { x: "28%", size: 42, color: "#F5EAEC", delay: 0.01, bend: -3 },
  { x: "37%", size: 26, color: "#C4607A", delay: 0.11, bend:  4 },
  { x: "46%", size: 42, color: "#F5EAEC", delay: 0.00, bend: -2 },
  { x: "55%", size: 20, color: "#C4607A", delay: 0.17, bend:  3 },
  { x: "63%", size: 38, color: "#F5EAEC", delay: 0.05, bend: -4 },
  { x: "72%", size: 28, color: "#C4607A", delay: 0.09, bend:  2 },
  { x: "81%", size: 36, color: "#F5EAEC", delay: 0.06, bend: -3 },
  { x: "89%", size: 22, color: "#C4607A", delay: 0.15, bend:  4 },
  { x: "94%", size: 34, color: "#F5EAEC", delay: 0.04, bend: -2 },
];

function Plant({ f, fi }: { f: typeof GARDEN[0]; fi: number }) {
  const cx          = r4(f.size / 2);
  const stemH       = r4(f.size * 1.9);
  const centerColor = f.color === "#C4607A" ? "#FAF0F2" : "#C4607A";
  const leafColor   = f.color;

  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 360;
    const rad   = (angle * Math.PI) / 180;
    return {
      angle,
      px: r4(cx + Math.cos(rad) * f.size * 0.28),
      py: r4(cx + Math.sin(rad) * f.size * 0.28),
      d:  f.delay + 0.45 + i * 0.048,
    };
  });

  // Leaf params
  const lx1 = r4(cx - 4); const ly1 = r4(stemH * 0.38);
  const lx2 = r4(cx + 4); const ly2 = r4(stemH * 0.60);
  const lrx  = r4(f.size * 0.16); const lry = r4(f.size * 0.072);

  return (
    <div style={{ position: "absolute", bottom: 0, left: f.x }}>
      {/* ── Flower head (top of plant) ── */}
      <svg width={f.size} height={f.size} viewBox={`0 0 ${f.size} ${f.size}`} fill="none"
        style={{ display: "block" }}>
        {petals.map((p, i) => (
          <motion.g key={i}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.38, delay: p.d, type: "spring", stiffness: 210, damping: 12 }}
            style={{ transformOrigin: `${cx}px ${cx}px` }}
          >
            <ellipse cx={p.px} cy={p.py}
              rx={r4(f.size * 0.1)} ry={r4(f.size * 0.215)}
              transform={`rotate(${p.angle + 90}, ${p.px}, ${p.py})`}
              fill={f.color}
            />
          </motion.g>
        ))}
        <motion.circle cx={cx} cy={cx} r={r4(f.size * 0.1)} fill={centerColor}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ delay: f.delay + 0.72, type: "spring", stiffness: 280, damping: 14 }}
          style={{ transformOrigin: `${cx}px ${cx}px` }}
        />
      </svg>

      {/* ── Stem + leaves (bottom of plant, touching ground) ── */}
      <svg width={f.size} height={stemH} viewBox={`0 0 ${f.size} ${stemH}`} fill="none"
        style={{ display: "block", marginTop: -2 }}>
        {/* Curved stem */}
        <motion.path
          d={`M ${cx} ${stemH} C ${r4(cx + f.bend)} ${r4(stemH * 0.65)} ${r4(cx - f.bend)} ${r4(stemH * 0.35)} ${cx} 0`}
          stroke={f.color}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.55"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: f.delay, ease: "easeOut" }}
        />
        {/* Left leaf */}
        <motion.ellipse
          cx={lx1} cy={ly1} rx={lrx} ry={lry}
          transform={`rotate(-38, ${lx1}, ${ly1})`}
          fill={leafColor} opacity="0.45"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: f.delay + 0.28, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: `${lx1}px ${ly1}px` }}
        />
        {/* Right leaf */}
        <motion.ellipse
          cx={lx2} cy={ly2} rx={r4(lrx * 0.85)} ry={r4(lry * 0.85)}
          transform={`rotate(38, ${lx2}, ${ly2})`}
          fill={leafColor} opacity="0.38"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.38 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: f.delay + 0.35, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: `${lx2}px ${ly2}px` }}
        />
      </svg>
    </div>
  );
}

function FlowerGarden() {
  return (
    <div className="relative w-full overflow-hidden"
      style={{ height: "clamp(110px, 17vw, 152px)", marginTop: "2rem" }}>
      {GARDEN.map((f, fi) => <Plant key={fi} f={f} fi={fi} />)}
    </div>
  );
}

const links = ["Our Story", "The Day", "Venue", "Gallery", "RSVP"];

export default function Footer() {
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
          August 25, 2026 &middot; Dortmund, Germany
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-body mb-10"
          style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: "rgba(245,237,232,0.25)", lineHeight: 1.85 }}
        >
          Thank you for being part of our love story.<br />
          We are so grateful to celebrate with those we love most.
        </motion.p>

        <div className="flex items-center justify-center flex-wrap gap-5 mb-2">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`}
              className="font-body tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ fontSize: "clamp(9px, 1.5vw, 10px)", color: "rgba(245,237,232,0.22)" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(196,96,122,0.65)")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(245,237,232,0.22)")}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <FlowerGarden />

      <div className="text-center mt-4 relative z-10">
        <p className="font-body"
          style={{ fontSize: "10px", color: "rgba(245,237,232,0.14)", letterSpacing: "0.18em" }}>
          08.25.2026
        </p>
      </div>
    </footer>
  );
}
