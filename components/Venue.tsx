"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Wambeler+Hellweg+131+44135+Dortmund+Germany";

export default function Venue() {
  const { t } = useLanguage();
  return (
    <section
      id="venue"
      className="relative overflow-hidden"
      style={{ minHeight: "72vh", background: "#0E0B08" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/photos/couple.jpg"
          alt="Venue"
          fill
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "rgba(7,5,3,0.72)" }} />
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse at 15% 50%, rgba(139,48,64,0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 85% 50%, rgba(201,169,110,0.12) 0%, transparent 50%)",
          ].join(", "),
        }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(7,5,3,0.55) 100%)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,112,122,0.18), rgba(201,169,110,0.15), transparent)" }} />

      <div className="relative z-10 flex items-center justify-center min-h-[72vh] px-5 sm:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg"
          style={{
            background: "rgba(14,11,8,0.78)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(201,169,110,0.18)",
            borderRadius: "20px",
            padding: "clamp(2rem, 6vw, 3.5rem)",
          }}
        >
          <p className="font-body tracking-[0.55em] uppercase mb-4 text-center"
            style={{ fontSize: "clamp(7px, 2vw, 9px)", color: "rgba(201,169,110,0.55)" }}>
            {t.venue.eyebrow}
          </p>

          <h2 className="font-display select-none text-center mb-2"
            style={{ fontSize: "clamp(2.4rem, 9vw, 5rem)", color: "#FFFFFF" }}>
            {t.venue.heading}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(201,169,110,0.5)" }} />
            <div className="h-px w-12"
              style={{ background: "linear-gradient(to left, transparent, rgba(201,169,110,0.3))" }} />
          </div>

          <div className="space-y-5 text-center mb-10">
            <div>
              <p className="font-heading"
                style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.55rem)", color: "rgba(245,237,232,0.9)" }}>
                {t.venue.name}
              </p>
            </div>
            <div className="h-px mx-auto" style={{ width: "40px", background: "rgba(196,112,122,0.3)" }} />
            <div className="font-body space-y-1"
              style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: "rgba(245,237,232,0.5)" }}>
              <p>{t.venue.addressLine1}</p>
              <p>{t.venue.addressLine2}</p>
            </div>
            <div className="h-px mx-auto" style={{ width: "40px", background: "rgba(201,169,110,0.25)" }} />
            <div className="font-body space-y-1"
              style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: "rgba(245,237,232,0.45)" }}>
              <p className="font-medium" style={{ color: "rgba(245,237,232,0.75)" }}>
                {t.venue.date}
              </p>
              <p>{t.venue.doors}</p>
            </div>
          </div>

          <div className="text-center">
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 font-body tracking-[0.3em] uppercase transition-all duration-300"
              style={{
                fontSize: "clamp(9px, 2.2vw, 10px)",
                background: "#9B3A35",
                color: "#FFFFFF",
                minHeight: "50px",
                borderRadius: "8px",
                boxShadow: "0 6px 24px rgba(155,58,53,0.28)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#7E2E2A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#9B3A35"; }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden>
                <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  fill="currentColor" />
              </svg>
              {t.venue.cta}
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.18), rgba(196,112,122,0.15), transparent)" }} />
    </section>
  );
}
