"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralAccent from "./FloralAccent";

const WEDDING = new Date("2026-08-25T18:00:00");

function getTimeLeft() {
  const diff = WEDDING.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function Unit({ value, label, index }: { value: number; label: string; index: number }) {
  const display = String(value).padStart(2, "0");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="flex flex-col items-center gap-2 min-w-[3.2rem] sm:min-w-[4.5rem]"
    >
      <p className="font-body text-[8px] tracking-[0.3em] uppercase text-gold/45">
        {label}
      </p>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className="font-heading tabular-nums"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 4.2rem)",
            color: "#F5EDE0",
            lineHeight: 1.1,
            display: "block",
          }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
      <div className="h-px w-10 sm:w-14" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)" }} />
    </motion.div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days,    label: "Days" },
    { value: time.hours,   label: "Hours" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute left-0 bottom-0 hidden lg:block">
        <FloralAccent opacity={0.38} />
      </div>
      <div className="absolute right-0 bottom-0 hidden lg:block">
        <FloralAccent mirror opacity={0.38} />
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(125,30,70,0.16) 0%, transparent 100%)" }}
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-12"
        >
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/40 mb-3">
            Counting Down To Forever
          </p>
          <h2 className="font-display text-ivory/80" style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)" }}>
            Our Big Day
          </h2>
        </motion.div>

        {/* Counter row */}
        <div className="flex items-end justify-center gap-3 sm:gap-6">
          {units.map((u, i) => (
            <Fragment key={u.label}>
              <Unit value={u.value} label={u.label} index={i} />
              {i < units.length - 1 && (
                <span
                  className="font-heading text-gold/25 mb-8 shrink-0"
                  style={{ fontSize: "clamp(1.2rem, 4vw, 2.2rem)" }}
                >
                  :
                </span>
              )}
            </Fragment>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-12 font-heading italic text-ivory/28"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)" }}
        >
          &ldquo;The best is yet to come.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
