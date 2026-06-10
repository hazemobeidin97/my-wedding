"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// wedding.jpg removed (white dress photo)
const SLIDES = [
  { id: 0, src: "/photos/couple.jpg",   label: "Together",    caption: "Where it all began",     objectPos: "center top" },
  { id: 1, src: "/photos/proposal.jpg", label: "She Said Yes", caption: "The happiest moment",   objectPos: "center 22%" },
  { id: 2, src: "/photos/rings.jpg",    label: "Bound",       caption: "A promise made in gold", objectPos: "center 45%" },
];

const INTERVAL = 5500;

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="gallery" style={{ background: "#0E0B08" }} className="overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-14 sm:py-20 text-center relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)" }} />
        <p className="font-body text-[10px] tracking-[0.55em] uppercase mb-4"
          style={{ color: "rgba(201,169,110,0.52)" }}>
          Moments We Cherish
        </p>
        <h2 className="font-display select-none"
          style={{ fontSize: "clamp(3rem, 11vw, 7.5rem)", color: "#FFFFFF" }}>
          Our Gallery
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-14"
            style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.28))" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(201,169,110,0.45)" }} />
          <div className="h-px w-14"
            style={{ background: "linear-gradient(to left, transparent, rgba(201,169,110,0.35))" }} />
        </div>
      </motion.div>

      {/* Slideshow */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(320px, 70vh, 78vh)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].label}
              fill
              className="object-cover"
              style={{ objectPosition: SLIDES[current].objectPos }}
              priority={current === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/38" />
            <div className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, transparent 28%, rgba(7,5,3,0.65) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(7,5,3,0.88) 0%, transparent 100%)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 pb-16 sm:pb-20 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div key={`cap-${current}`}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <h3 className="font-display select-none"
                style={{ fontSize: "clamp(2.2rem, 8vw, 5.5rem)", color: "#FFFFFF" }}>
                {SLIDES[current].label}
              </h3>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-8" style={{ background: "rgba(201,169,110,0.35)" }} />
                <p className="font-heading italic text-base" style={{ color: "rgba(245,237,232,0.5)" }}>
                  {SLIDES[current].caption}
                </p>
                <div className="h-px w-8" style={{ background: "rgba(196,112,122,0.45)" }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next */}
        {[
          { dir: "prev", pos: "left-5 md:left-8",   action: prev, path: "M10 3L4 8L10 13" },
          { dir: "next", pos: "right-5 md:right-8",  action: next, path: "M4 3L10 8L4 13"  },
        ].map(btn => (
          <motion.button key={btn.dir} onClick={btn.action}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className={`absolute ${btn.pos} top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10`}
            style={{
              border: "1px solid rgba(245,237,232,0.12)",
              color: "rgba(245,237,232,0.45)",
              borderRadius: "50%",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(196,112,122,0.55)";
              el.style.color = "rgba(200,180,215,0.78)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(245,237,232,0.12)";
              el.style.color = "rgba(245,237,232,0.45)";
            }}
            aria-label={btn.dir}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d={btn.path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        ))}

        {/* Counter */}
        <div className="absolute top-6 right-6 md:right-10 font-body text-[10px] tracking-[0.25em] select-none"
          style={{ color: "rgba(245,237,232,0.28)" }}>
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} className="p-2 -m-2">
              <motion.div
                animate={{ width: i === current ? 28 : 6, background: i === current ? "#C4707A" : "rgba(245,237,232,0.22)" }}
                transition={{ duration: 0.35 }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <AnimatePresence>
          {!paused && (
            <motion.div key={`prog-${current}`}
              initial={{ width: "0%", opacity: 1 }} animate={{ width: "100%" }} exit={{ opacity: 0 }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-px"
              style={{ background: "rgba(201,169,110,0.5)" }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="py-14" />
    </section>
  );
}
