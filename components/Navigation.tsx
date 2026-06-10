"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Our Story", href: "#story"    },
  { label: "The Day",   href: "#timeline" },
  { label: "Venue",     href: "#venue"    },
  { label: "Gallery",   href: "#gallery"  },
  { label: "RSVP",      href: "#rsvp"     },
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(14,11,8,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.12)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">

        <a href="#home" className="font-display text-2xl sm:text-3xl leading-none select-none"
          style={{ color: "rgba(201,169,110,0.8)" }}>
          L &amp; H
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="font-body text-[11px] tracking-[0.22em] uppercase transition-colors duration-300"
              style={{ color: "rgba(245,237,232,0.5)" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(201,169,110,0.85)")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(245,237,232,0.5)")}
            >
              {l.label}
            </a>
          ))}

          <a href="#rsvp"
            className="font-body text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300"
            style={{
              border: "1px solid rgba(201,169,110,0.35)",
              color: "rgba(245,237,232,0.75)",
              background: "rgba(155,58,53,0.08)",
              borderRadius: "6px",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#9B3A35"; el.style.color = "#FFFFFF"; el.style.borderColor = "#9B3A35";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(155,58,53,0.08)";
              el.style.color = "rgba(245,237,232,0.75)";
              el.style.borderColor = "rgba(201,169,110,0.35)";
            }}
          >
            RSVP
          </a>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2"
          style={{ color: "rgba(245,237,232,0.7)" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="space-y-[6px] w-5">
            <span className={`block h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
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
            style={{ background: "rgba(14,11,8,0.98)", borderTop: "1px solid rgba(201,169,110,0.1)" }}
          >
            <div className="px-6 py-4 flex flex-col">
              {links.map(l => (
                <a key={l.label} href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-[11px] tracking-[0.28em] uppercase py-4 transition-colors duration-300"
                  style={{ color: "rgba(245,237,232,0.45)", borderBottom: "1px solid rgba(201,169,110,0.08)" }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(201,169,110,0.8)")}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(245,237,232,0.45)")}
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
