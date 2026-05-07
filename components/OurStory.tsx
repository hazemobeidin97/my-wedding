"use client";

import { motion } from "framer-motion";
import FloralAccent from "./FloralAccent";

const events = [
  {
    title: "We Met",
    description: "We found each other — and everything changed.",
    side: "left" as const,
  },
  {
    title: "We Fell in Love",
    description: "Somewhere along the way, we fell completely and hopelessly in love.",
    side: "right" as const,
  },
  {
    title: "Forever",
    description: "And now we're getting married.",
    side: "left" as const,
  },
];

export default function OurStory() {
  return (
    <section id="story" className="py-28 bg-ivory overflow-hidden relative">
      {/* Side florals — grow as you scroll */}
      <div className="absolute left-0 top-8 hidden lg:block">
        <FloralAccent opacity={0.58} size={1.25} />
      </div>
      <div className="absolute right-0 top-8 hidden lg:block">
        <FloralAccent mirror opacity={0.58} size={1.25} />
      </div>
      {/* Mid-section accent */}
      <div className="absolute left-0 bottom-0 hidden xl:block">
        <FloralAccent opacity={0.35} size={0.75} />
      </div>
      <div className="absolute right-0 bottom-0 hidden xl:block">
        <FloralAccent mirror opacity={0.35} size={0.75} />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="font-body text-[11px] tracking-[0.45em] uppercase text-stone mb-4">
            Our Journey Together
          </p>
          <h2 className="font-display text-6xl md:text-8xl text-burgundy mb-5">Our Story</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px origin-top hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)" }}
          />

          <div className="space-y-16">
            {events.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, x: ev.side === "left" ? -120 : 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative md:flex md:items-center md:gap-0 ${
                  ev.side === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:flex-1 md:px-10">
                  <motion.div
                    whileHover={{ y: -7, boxShadow: "0 24px 60px rgba(125,30,70,0.13)" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`relative bg-white/80 backdrop-blur-sm p-8 shadow-sm border border-blush/25 cursor-default overflow-hidden ${
                      ev.side === "left" ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="relative">
                      <h3 className="font-heading text-2xl md:text-3xl text-charcoal mb-3">{ev.title}</h3>
                      <div className={`h-px w-8 bg-gold/45 mb-4 ${ev.side === "left" ? "md:ml-auto" : ""}`} />
                      <p className="font-body text-sm text-stone/75 leading-relaxed font-light">
                        {ev.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="hidden md:flex flex-shrink-0 relative z-10 items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.35, type: "spring", bounce: 0.5 }}
                    className="w-3.5 h-3.5 rounded-full bg-gold border-2 border-gold ring-4 ring-gold/20"
                  />
                </div>

                <div className="hidden md:block md:flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
