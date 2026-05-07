"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-20 bg-charcoal">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-display text-5xl md:text-6xl text-gold mb-4">
            Hazem & Layla
          </h2>

          <p className="font-heading text-lg text-ivory/50 italic mb-7">
            August 25, 2026 · Dortmund, Germany
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-14 bg-gold/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <div className="h-px w-14 bg-gold/30" />
          </div>

          <nav className="flex flex-wrap justify-center gap-6 mb-10">
            {["Our Story", "Details", "Gallery", "RSVP"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="font-body text-[10px] tracking-[0.22em] uppercase text-ivory/30 hover:text-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          <p className="font-body text-[10px] tracking-[0.15em] text-ivory/20 uppercase">
            Made with love · H & L
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
