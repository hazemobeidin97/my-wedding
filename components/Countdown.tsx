"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WEDDING = new Date("2026-08-25T17:00:00");
const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function pad(n: number) { return String(n).padStart(2, "0"); }
function toArabicDigits(s: string) { return s.replace(/[0-9]/g, d => ARABIC_DIGITS[Number(d)]); }
function diff() {
  const ms = Math.max(0, WEDDING.getTime() - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}

export default function Countdown() {
  const { t, locale } = useLanguage();
  const [time, setTime] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: t.countdown.units.days,    val: time.d },
    { label: t.countdown.units.hours,   val: time.h },
    { label: t.countdown.units.minutes, val: time.m },
    { label: t.countdown.units.seconds, val: time.s },
  ];

  return (
    <section style={{ background: "#140F0B" }} className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.22), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 500, height: 200,
            background: "radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-heading italic mb-9"
          style={{ fontSize: "clamp(0.95rem, 3vw, 1.1rem)", color: "rgba(245,237,232,0.3)" }}
        >
          {t.countdown.subtitle}
        </motion.p>

        <div className="flex items-start justify-center gap-4 sm:gap-10">
          {units.map(({ label, val }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45"
                  style={{ background: "rgba(201,169,110,0.45)" }} />
                <span className="font-heading tabular-nums block"
                  style={{ fontSize: "clamp(2.5rem, 9vw, 5rem)", color: "#FFFFFF",
                    lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  {locale === "ar" ? toArabicDigits(pad(val)) : pad(val)}
                </span>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45"
                  style={{ background: "rgba(201,169,110,0.45)" }} />
              </div>
              <span className="font-body tracking-[0.3em] uppercase mt-5"
                style={{ fontSize: "clamp(7px, 2vw, 9px)", color: "rgba(245,237,232,0.3)" }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.22), transparent)" }} />
    </section>
  );
}
