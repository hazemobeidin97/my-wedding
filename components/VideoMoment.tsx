"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "off" | "starting" | "on";

export default function VideoMoment() {
  const [phase, setPhase] = useState<Phase>("off");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePowerOn = useCallback(() => {
    if (phase !== "off") return;

    // Start video silently within the user-gesture context so browsers allow audio later
    if (videoRef.current) {
      videoRef.current.volume = 0;
      videoRef.current.play().catch(() => {});
    }
    setPhase("starting");
  }, [phase]);

  // Sequence: scanline expands (400ms) → audio fades in → phase "on" (900ms)
  useEffect(() => {
    if (phase !== "starting") return;

    const audioTimer = setTimeout(() => {
      if (!videoRef.current) return;
      let vol = 0;
      const id = setInterval(() => {
        vol = Math.min(0.65, vol + 0.055);
        if (videoRef.current) videoRef.current.volume = vol;
        if (vol >= 0.65) clearInterval(id);
      }, 55);
    }, 420);

    const phaseTimer = setTimeout(() => setPhase("on"), 900);

    return () => {
      clearTimeout(audioTimer);
      clearTimeout(phaseTimer);
    };
  }, [phase]);

  return (
    <section className="py-28 bg-charcoal relative overflow-hidden">
      {/* Subtle section separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }}
      />

      {/* Background pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(125,30,70,0.1) 0%, transparent 100%)" }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <p className="font-body text-[11px] tracking-[0.5em] uppercase text-gold/40 mb-4">
            Relive The Night
          </p>
          <h2
            className="font-display select-none"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "#F5EDE0" }}
          >
            Our Moment
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.38))" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/45" />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.38))" }} />
          </div>

          <AnimatePresence>
            {phase === "off" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-heading italic mt-5 text-base"
                style={{ color: "rgba(245,237,224,0.28)" }}
              >
                Click the TV to play
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── TV ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block w-full max-w-[680px] relative"
        >
          {/* Screen glow when on */}
          <AnimatePresence>
            {phase === "on" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute -inset-16 pointer-events-none rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,220,150,0.07) 0%, transparent 65%)",
                  filter: "blur(18px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Antennae */}
          <div className="flex justify-center gap-14 mb-0.5 relative z-10">
            {["-rotate-[14deg]", "rotate-[14deg]"].map((r, i) => (
              <motion.div
                key={i}
                className={`w-0.5 h-16 origin-bottom ${r}`}
                style={{ background: "linear-gradient(to top, #8C7B70, transparent)" }}
                animate={phase === "on" ? { rotate: [i === 0 ? -14 : 14, i === 0 ? -10 : 10, i === 0 ? -14 : 14] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            ))}
          </div>

          {/* TV body */}
          <motion.div
            onClick={handlePowerOn}
            className={`relative rounded-[22px] p-5 md:p-6 ${phase === "off" ? "cursor-pointer group" : "cursor-default"}`}
            style={{
              background: "linear-gradient(145deg, #3a2e2e, #2C2424)",
              border: "2px solid rgba(255,255,255,0.05)",
            }}
            animate={{
              boxShadow:
                phase === "on"
                  ? "6px 8px 0 #1a1010, 0 28px 70px rgba(0,0,0,0.5), 0 0 50px rgba(255,220,150,0.06)"
                  : "6px 8px 0 #1a1010, 0 20px 50px rgba(0,0,0,0.4)",
            }}
            transition={{ duration: 1 }}
            whileHover={phase === "off" ? { scale: 1.015, y: -2 } : {}}
          >
            {/* Top bar */}
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex gap-1.5 items-center">
                {/* Power LED */}
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: phase === "off" ? "rgba(160,30,40,0.25)" : "rgba(220,50,50,0.9)",
                    boxShadow: phase === "off" ? "none" : "0 0 8px rgba(220,60,60,0.8), 0 0 16px rgba(220,60,60,0.4)",
                  }}
                  transition={{ duration: 0.6 }}
                />
                <div className="w-2 h-2 rounded-full bg-gold/18" />
              </div>
              <span className="font-display text-sm select-none" style={{ color: "rgba(201,168,76,0.32)" }}>
                H & L
              </span>
              <div className="w-2 h-2 rounded-full bg-stone/20" />
            </div>

            {/* Screen bezel */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "#000",
                padding: "3px",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.9), 0 0 0 3px #1a1212",
              }}
            >
              {/* Screen */}
              <div className="relative rounded-lg overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>

                {/* OFF STATE — dark screen with noise + play hint */}
                <AnimatePresence>
                  {phase === "off" && (
                    <motion.div
                      className="absolute inset-0 z-20"
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ background: "#080404" }}
                    >
                      {/* Noise texture */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                          backgroundSize: "180px 180px",
                          opacity: 0.06,
                        }}
                      />
                      {/* Subtle center warmth */}
                      <div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(ellipse at center, rgba(60,30,20,0.5) 0%, transparent 65%)" }}
                      />
                      {/* Play button hint */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.04, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300"
                            style={{ border: "1px solid rgba(245,237,224,0.25)" }}
                          >
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                              <path d="M1.5 1.5L12.5 8L1.5 14.5V1.5Z" fill="rgba(245,237,224,0.55)" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CRT POWER-ON FLASH */}
                {phase === "starting" && (
                  <motion.div
                    className="absolute inset-0 z-30 origin-center"
                    initial={{ scaleY: 0.006, opacity: 1 }}
                    animate={{ scaleY: 1, opacity: [1, 1, 0] }}
                    transition={{
                      scaleY: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.85, times: [0, 0.5, 1] },
                    }}
                    style={{ background: "linear-gradient(to bottom, rgba(210,195,180,0.88), rgba(225,210,195,0.92) 40%, rgba(210,195,180,0.88))" }}
                  />
                )}

                {/* VIDEO */}
                <motion.video
                  ref={videoRef}
                  src="/video/wedding.mp4"
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                  animate={{ opacity: phase === "on" ? 1 : 0 }}
                  transition={{ duration: 0.55 }}
                />

                {/* CRT scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
                  }}
                />

                {/* Inner vignette */}
                <div
                  className="absolute inset-0 pointer-events-none z-10 rounded-lg"
                  style={{ boxShadow: "inset 0 0 24px rgba(0,0,0,0.55)" }}
                />
              </div>
            </div>

            {/* Knobs row */}
            <div className="flex justify-between items-center mt-4 px-1">
              <div className="flex gap-2.5">
                {[1, 2, 3].map((k) => (
                  <div
                    key={k}
                    className="w-5 h-5 rounded-full border"
                    style={{ borderColor: "rgba(140,123,112,0.28)", background: "rgba(255,255,255,0.025)" }}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="h-0.5 w-10 rounded-full bg-stone/18" />
                <div className="h-0.5 w-10 rounded-full bg-stone/14" />
                <div className="h-0.5 w-7 rounded-full bg-stone/10" />
              </div>
            </div>
          </motion.div>

          {/* Stand */}
          <div className="flex justify-center">
            <div className="w-24 h-2.5 rounded-b-lg" style={{ background: "#1e1616", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
          <div className="flex justify-center gap-24 mt-0.5">
            <div className="w-7 h-2 rounded-b-md" style={{ background: "#1a1212" }} />
            <div className="w-7 h-2 rounded-b-md" style={{ background: "#1a1212" }} />
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-lg italic mt-12"
          style={{ color: "rgba(245,237,224,0.28)" }}
        >
          &ldquo;Every love story is beautiful — but ours is my favourite.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
