"use client";

import { motion } from "framer-motion";
import FloralAccent from "./FloralAccent";

function Corner({ pos }: { pos: string }) {
  const isTop = pos.includes("top");
  const isLeft = pos.includes("left");
  return (
    <div
      className={`absolute w-8 h-8 ${pos} ${isTop ? "border-t" : "border-b"} ${
        isLeft ? "border-l" : "border-r"
      } border-gold/35`}
    />
  );
}

export default function EventDetails() {
  return (
    <section id="details" className="py-28 bg-cream overflow-hidden relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
        <FloralAccent opacity={0.42} />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
        <FloralAccent mirror opacity={0.42} />
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[11px] tracking-[0.45em] uppercase text-stone mb-4">
            Save the Date
          </p>
          <h2 className="font-display text-6xl md:text-8xl text-burgundy mb-5">Event Details</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, boxShadow: "0 28px 70px rgba(125,30,70,0.11)" }}
            className="relative bg-ivory p-12 text-center border border-gold/20 shadow-sm cursor-default transition-shadow duration-300"
          >
            <Corner pos="top-4 left-4" />
            <Corner pos="top-4 right-4" />
            <Corner pos="bottom-4 left-4" />
            <Corner pos="bottom-4 right-4" />

            <div className="mb-8">
              <svg className="w-10 h-10 mx-auto text-gold/60" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L22.5 11H30L24 15.5L26.5 22.5L20 18L13.5 22.5L16 15.5L10 11H17.5L20 4Z" fill="currentColor" />
                <path d="M20 22C14 26 8 30 8 36H32C32 30 26 26 20 22Z" fill="currentColor" fillOpacity="0.25" />
              </svg>
            </div>

            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-stone mb-2">The</p>
            <h3 className="font-heading text-4xl text-charcoal mb-8">Ceremony</h3>

            <div className="space-y-2 font-body text-sm text-stone/80 font-light">
              <p className="font-medium text-charcoal font-body">Tuesday, August 25, 2026</p>
              <p>6:00 PM</p>
              <div className="h-px w-10 bg-gold/40 mx-auto my-5" />
              <p className="font-medium text-charcoal font-body">Dortmund Venue</p>
              <p>12 Al-Madeena Street</p>
              <p>Dortmund, Germany</p>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, boxShadow: "0 28px 70px rgba(0,0,0,0.35)" }}
            className="relative bg-burgundy p-12 text-center text-ivory overflow-hidden shadow-md cursor-default"
          >
            {/* Background orbs */}
            <motion.div
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/5"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative">
              <div className="mb-8">
                <svg className="w-10 h-10 mx-auto text-gold" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 4V9M20 31V36M4 20H9M31 20H36M8.1 8.1L11.7 11.7M28.3 28.3L31.9 31.9M31.9 8.1L28.3 11.7M11.7 28.3L8.1 31.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-ivory/55 mb-2">The</p>
              <h3 className="font-heading text-4xl text-ivory mb-8">Reception</h3>

              <div className="space-y-2 font-body text-sm text-ivory/75 font-light">
                <p className="font-medium text-ivory font-body">Tuesday, August 25, 2026</p>
                <p>8:00 PM — 1:00 AM</p>
                <div className="h-px w-10 bg-gold/50 mx-auto my-5" />
                <p className="font-medium text-ivory font-body">Dortmund Venue</p>
                <p>12 Al-Madeena Street</p>
                <p>Dortmund, Germany</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10 font-body text-[11px] tracking-[0.28em] uppercase text-stone"
        >
          Dress Code:{" "}
          <span className="text-burgundy font-medium">Black Tie Optional</span>
        </motion.p>
      </div>
    </section>

  );
}
