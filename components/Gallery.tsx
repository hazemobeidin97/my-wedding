"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  {
    id: 0,
    src: "/photos/wedding.jpg",
    label: "Forever",
    caption: "The beginning of everything",
    objectPos: "center 42%",
  },
  {
    id: 1,
    src: "/photos/couple.jpg",
    label: "Together",
    caption: "Where it all began",
    objectPos: "center top",
  },
  {
    id: 2,
    src: "/photos/proposal.jpg",
    label: "She Said Yes",
    caption: "The happiest moment",
    objectPos: "center 22%",
  },
  {
    id: 3,
    src: "/photos/rings.jpg",
    label: "Bound",
    caption: "A promise made in gold",
    objectPos: "center 45%",
  },
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
    <section id="gallery" className="bg-charcoal overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-20 text-center relative"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(125,30,70,0.12) 0%, transparent 100%)" }}
        />
        <p className="font-body text-[11px] tracking-[0.5em] uppercase text-gold/42 mb-4">
          Moments We Cherish
        </p>
        <h2
          className="font-display select-none"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "#F5EDE0" }}
        >
          Our Gallery
        </h2>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.38))" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/45" />
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.38))" }} />
        </div>
      </motion.div>

      {/* Slideshow */}
      <div
        className="relative h-[78vh] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
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
            <div className="absolute inset-0 bg-black/35" />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)" }}
            />
            {/* Bottom gradient for caption */}
            <div
              className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 pb-20 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cap-${current}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <h3
                className="font-display select-none"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#F5EDE0" }}
              >
                {SLIDES[current].label}
              </h3>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-8 bg-gold/40" />
                <p className="font-heading italic text-ivory/45 text-base">{SLIDES[current].caption}</p>
                <div className="h-px w-8 bg-gold/40" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next arrows */}
        {[
          { dir: "prev", pos: "left-5 md:left-8", action: prev, path: "M10 3L4 8L10 13" },
          { dir: "next", pos: "right-5 md:right-8", action: next, path: "M4 3L10 8L4 13" },
        ].map(btn => (
          <motion.button
            key={btn.dir}
            onClick={btn.action}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`absolute ${btn.pos} top-1/2 -translate-y-1/2 w-11 h-11 border border-ivory/18 flex items-center justify-center text-ivory/40 hover:border-gold/55 hover:text-gold transition-all duration-300 z-10`}
            aria-label={btn.dir}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d={btn.path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        ))}

        {/* Slide number */}
        <div className="absolute top-6 right-6 md:right-10 font-body text-[10px] tracking-[0.25em] text-ivory/30 select-none">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}>
              <motion.div
                animate={{
                  width: i === current ? 28 : 6,
                  background: i === current ? "#C9A84C" : "rgba(245,237,224,0.25)",
                }}
                transition={{ duration: 0.35 }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <AnimatePresence>
          {!paused && (
            <motion.div
              key={`prog-${current}`}
              initial={{ width: "0%", opacity: 1 }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-px"
              style={{ background: "rgba(201,168,76,0.55)" }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="py-14" />
    </section>
  );
}
