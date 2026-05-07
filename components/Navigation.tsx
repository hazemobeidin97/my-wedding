"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Our Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className={`font-display text-2xl leading-none transition-colors duration-500 ${
            scrolled ? "text-burgundy" : "text-gold"
          }`}
        >
          H & L
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`font-body text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-stone hover:text-burgundy"
                  : "text-ivory/60 hover:text-ivory"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className={`md:hidden p-1 transition-colors duration-500 ${scrolled ? "text-burgundy" : "text-ivory/70"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="space-y-[5px] w-6">
            <span className={`block h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-px bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-ivory/96 backdrop-blur-md border-t border-blush/40"
          >
            <div className="px-8 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-[11px] tracking-[0.22em] uppercase text-stone hover:text-burgundy transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
