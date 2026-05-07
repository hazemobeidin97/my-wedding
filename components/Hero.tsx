"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FloatingPetals from "./FloatingPetals";

function LetterReveal({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 48, rotate: i % 2 === 0 ? -10 : 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0d0608" }}
    >
      {/* Pulsing core glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 52%, rgba(125,30,70,0.2) 0%, transparent 100%)" }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.82) 100%)" }}
      />

      {/* Gold cinematic lines */}
      {[true, false].map((isTop, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 right-0 h-px origin-left pointer-events-none`}
          style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)" }}
        />
      ))}

      <FloatingPetals />

      {/* Corner ornaments */}
      {["top-14 left-8", "top-14 right-8", "bottom-14 left-8", "bottom-14 right-8"].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.8 + i * 0.1 }}
          className={`absolute ${pos} w-10 h-10 pointer-events-none
            ${i < 2 ? "border-t" : "border-b"}
            ${i % 2 === 0 ? "border-l" : "border-r"}
            border-gold/22`}
        />
      ))}

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="font-body text-[9px] tracking-[0.62em] uppercase text-gold/42 mb-12"
        >
          We&apos;re Getting Married
        </motion.p>

        {/* Names with letter-by-letter twist reveal */}
        <h1
          className="font-display leading-[0.85] select-none"
          style={{
            fontSize: "clamp(5rem, 13vw, 13rem)",
            color: "#F5EDE0",
            textShadow: "0 0 100px rgba(201,168,76,0.12), 0 2px 40px rgba(0,0,0,1)",
          }}
        >
          <LetterReveal text="Hazem" delay={0.6} />
        </h1>

        {/* & separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="flex items-center justify-center gap-5 my-1"
        >
          <div className="h-px flex-1 max-w-[100px]"
            style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))" }} />
          <motion.span
            animate={{
              textShadow: [
                "0 0 8px rgba(201,168,76,0.2)",
                "0 0 50px rgba(201,168,76,0.9)",
                "0 0 8px rgba(201,168,76,0.2)",
              ],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="font-heading text-2xl text-gold italic"
          >
            &amp;
          </motion.span>
          <div className="h-px flex-1 max-w-[100px]"
            style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))" }} />
        </motion.div>

        <h1
          className="font-display leading-[0.85] select-none"
          style={{
            fontSize: "clamp(5rem, 13vw, 13rem)",
            color: "#F5EDE0",
            textShadow: "0 0 100px rgba(201,168,76,0.12), 0 2px 40px rgba(0,0,0,1)",
          }}
        >
          <LetterReveal text="Layla" delay={1.5} />
        </h1>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-10 space-y-2"
        >
          <p className="font-heading text-xl md:text-2xl italic" style={{ color: "rgba(245,237,224,0.52)" }}>
            August 25, 2026
          </p>
          <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: "rgba(245,237,224,0.25)" }}>
            Dortmund, Germany
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-12 flex items-center justify-center gap-5 flex-wrap"
        >
          <a
            href="#rsvp"
            className="px-10 py-4 bg-gold text-charcoal font-body text-[10px] tracking-[0.3em] uppercase hover:bg-champagne transition-colors duration-300"
          >
            RSVP Now
          </a>
          <a
            href="#story"
            className="px-10 py-4 border border-cream/20 text-cream/50 font-body text-[10px] tracking-[0.3em] uppercase hover:border-cream/40 hover:text-cream/80 transition-all duration-300"
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[8px] tracking-[0.45em] uppercase" style={{ color: "rgba(201,168,76,0.32)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.65), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
