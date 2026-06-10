"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "off" | "starting" | "on";

export default function VideoMoment() {
  const [phase, setPhase] = useState<Phase>("off");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePowerOn = useCallback(() => {
    if (phase !== "off") return;
    if (videoRef.current) {
      videoRef.current.volume = 0;
      videoRef.current.play().catch(() => {});
    }
    setPhase("starting");
  }, [phase]);

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
    return () => { clearTimeout(audioTimer); clearTimeout(phaseTimer); };
  }, [phase]);

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#140F0B" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,112,122,0.18), rgba(201,169,110,0.15), transparent)" }} />

      <div className="absolute inset-0 pointer-events-none" aria-hidden
        style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(196,112,122,0.05) 0%, transparent 55%)" }} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-10 sm:mb-16"
        >
          <p className="font-body tracking-[0.5em] uppercase mb-4"
            style={{ fontSize: "clamp(7px, 2vw, 11px)", color: "rgba(201,169,110,0.5)" }}>
            Relive The Night
          </p>
          <h2 className="font-display select-none"
            style={{ fontSize: "clamp(3rem, 11vw, 7rem)", color: "#FFFFFF" }}>
            Our Moment
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.28))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(201,169,110,0.45)" }} />
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to left, transparent, rgba(196,112,122,0.35))" }} />
          </div>
          <AnimatePresence>
            {phase === "off" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-heading italic mt-5 text-base"
                style={{ color: "rgba(245,237,232,0.28)" }}>
                Click the TV to play
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block w-full max-w-[560px] sm:max-w-[680px] relative"
        >
          <AnimatePresence>
            {phase === "on" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute -inset-16 pointer-events-none rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(196,112,122,0.06) 0%, transparent 65%)",
                  filter: "blur(18px)",
                }}
              />
            )}
          </AnimatePresence>

          <div className="flex justify-center gap-14 mb-0.5 relative z-10">
            {["-rotate-[14deg]", "rotate-[14deg]"].map((r, i) => (
              <motion.div key={i}
                className={`w-0.5 h-16 origin-bottom ${r}`}
                style={{ background: "linear-gradient(to top, rgba(100,80,80,0.6), transparent)" }}
                animate={phase === "on" ? { rotate: [i === 0 ? -14 : 14, i === 0 ? -10 : 10, i === 0 ? -14 : 14] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            ))}
          </div>

          <motion.div
            onClick={handlePowerOn}
            className={`relative rounded-[22px] p-5 md:p-6 ${phase === "off" ? "cursor-pointer group" : "cursor-default"}`}
            style={{
              background: "linear-gradient(145deg, #1a0f0b, #110a07)",
              border: "2px solid rgba(201,169,110,0.1)",
            }}
            animate={{
              boxShadow: phase === "on"
                ? "6px 8px 0 #0a0503, 0 28px 70px rgba(0,0,0,0.5), 0 0 50px rgba(196,112,122,0.06)"
                : "6px 8px 0 #0a0503, 0 20px 50px rgba(0,0,0,0.4)",
            }}
            transition={{ duration: 1 }}
            whileHover={phase === "off" ? { scale: 1.015, y: -2 } : {}}
          >
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex gap-1.5 items-center">
                <motion.div className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: phase === "off" ? "rgba(196,112,122,0.2)" : "rgba(220,50,50,0.9)",
                    boxShadow: phase === "off" ? "none" : "0 0 8px rgba(220,60,60,0.8)",
                  }}
                  transition={{ duration: 0.6 }}
                />
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(201,169,110,0.2)" }} />
              </div>
              <span className="font-display text-sm select-none" style={{ color: "rgba(201,169,110,0.38)" }}>
                H &amp; L
              </span>
              <div className="w-2 h-2 rounded-full" style={{ background: "rgba(196,112,122,0.15)" }} />
            </div>

            <div className="rounded-xl overflow-hidden"
              style={{ background: "#000", padding: "3px", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.9), 0 0 0 3px #0d0805" }}>
              <div className="relative rounded-lg overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>

                <AnimatePresence>
                  {phase === "off" && (
                    <motion.div className="absolute inset-0 z-20" exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }} style={{ background: "#080402" }}>
                      <div className="absolute inset-0"
                        style={{
                          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                          backgroundSize: "180px 180px",
                          opacity: 0.06,
                        }}
                      />
                      <div className="absolute inset-0"
                        style={{ background: "radial-gradient(ellipse at center, rgba(90,20,20,0.4) 0%, transparent 65%)" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.04, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300"
                            style={{ border: "1px solid rgba(245,237,232,0.22)" }}>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                              <path d="M1.5 1.5L12.5 8L1.5 14.5V1.5Z" fill="rgba(245,237,232,0.55)" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {phase === "starting" && (
                  <motion.div className="absolute inset-0 z-30 origin-center"
                    initial={{ scaleY: 0.006, opacity: 1 }}
                    animate={{ scaleY: 1, opacity: [1, 1, 0] }}
                    transition={{
                      scaleY: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.85, times: [0, 0.5, 1] },
                    }}
                    style={{ background: "linear-gradient(to bottom, rgba(200,170,160,0.85), rgba(215,190,180,0.9) 40%, rgba(200,170,160,0.85))" }}
                  />
                )}

                <motion.video ref={videoRef} src="/video/wedding.mp4"
                  loop playsInline preload="auto"
                  className="w-full h-full object-contain"
                  animate={{ opacity: phase === "on" ? 1 : 0 }}
                  transition={{ duration: 0.55 }}
                />

                <div className="absolute inset-0 pointer-events-none z-10"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)" }} />
                <div className="absolute inset-0 pointer-events-none z-10 rounded-lg"
                  style={{ boxShadow: "inset 0 0 24px rgba(0,0,0,0.55)" }} />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 px-1">
              <div className="flex gap-2.5">
                {[1, 2, 3].map(k => (
                  <div key={k} className="w-5 h-5 rounded-full border"
                    style={{ borderColor: "rgba(196,112,122,0.18)", background: "rgba(255,255,255,0.02)" }} />
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {[10, 10, 7].map((w, i) => (
                  <div key={i} className="h-0.5 rounded-full"
                    style={{ width: w * 4, background: "rgba(201,169,110,0.15)" }} />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <div className="w-24 h-2.5 rounded-b-lg"
              style={{ background: "#0d0805", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
          </div>
          <div className="flex justify-center gap-24 mt-0.5">
            {[0, 1].map(i => (
              <div key={i} className="w-7 h-2 rounded-b-md" style={{ background: "#090603" }} />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading italic mt-10 sm:mt-12"
          style={{ fontSize: "clamp(0.9rem, 3vw, 1.1rem)", color: "rgba(245,237,232,0.22)" }}
        >
          &ldquo;Every love story is beautiful — but ours is my favourite.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
