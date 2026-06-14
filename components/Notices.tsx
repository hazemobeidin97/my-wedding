"use client";

import { motion } from "framer-motion";
import DressIllustration from "./DressIllustration";
import KidsIllustration from "./KidsIllustration";
import CameraIllustration from "./CameraIllustration";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Notices() {
  const { t } = useLanguage();
  const [dressCode, littleOnes, unplugged] = t.notices.items;
  return (
    <section className="relative overflow-hidden py-16 sm:py-24" style={{ background: "#0E0B08" }}>

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: 320, height: 320,
          background: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.18), transparent)" }} />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-body tracking-[0.55em] uppercase mb-3"
            style={{ fontSize: "clamp(8px, 2vw, 10px)", color: "rgba(201,169,110,0.55)" }}>
            {t.notices.eyebrow}
          </p>
          <h2 className="font-display select-none"
            style={{ fontSize: "clamp(2.4rem, 9vw, 5rem)", color: "#FFFFFF" }}>
            {t.notices.heading}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(201,169,110,0.5)" }} />
            <div className="h-px w-14"
              style={{ background: "linear-gradient(to left, transparent, rgba(201,169,110,0.3))" }} />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {[dressCode, littleOnes].map((n, i) => (
            <motion.div key={n.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: i * 0.12 }}
              className="text-center p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(196,112,122,0.12)",
                borderRadius: "14px",
              }}
            >
              {i === 0 && (
                <div className="mb-4">
                  <DressIllustration size={72} />
                </div>
              )}
              {i === 1 && (
                <div className="mb-4">
                  <KidsIllustration size={88} />
                </div>
              )}
              <p className="font-body tracking-[0.35em] uppercase mb-3"
                style={{ fontSize: "clamp(8px, 2vw, 10px)", color: "rgba(201,169,110,0.55)" }}>
                {n.label}
              </p>
              <h3 className="font-heading mb-3"
                style={{ fontSize: "clamp(1.3rem, 4vw, 1.7rem)", color: "rgba(245,237,232,0.9)" }}>
                {n.title}
              </h3>
              <p className="font-body leading-relaxed"
                style={{ fontSize: "clamp(12px, 2vw, 14px)", color: "rgba(245,237,232,0.5)" }}>
                {n.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay: 0.24 }}
          className="mt-6 sm:mt-8 p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left rtl:sm:text-right"
          style={{
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(196,112,122,0.12)",
            borderRadius: "14px",
          }}
        >
          <div className="flex-shrink-0">
            <CameraIllustration size={100} />
          </div>
          <div>
            <p className="font-body tracking-[0.35em] uppercase mb-3"
              style={{ fontSize: "clamp(8px, 2vw, 10px)", color: "rgba(201,169,110,0.55)" }}>
              {unplugged.label}
            </p>
            <h3 className="font-heading mb-3"
              style={{ fontSize: "clamp(1.3rem, 4vw, 1.7rem)", color: "rgba(245,237,232,0.9)" }}>
              {unplugged.title}
            </h3>
            <p className="font-body leading-relaxed"
              style={{ fontSize: "clamp(12px, 2vw, 14px)", color: "rgba(245,237,232,0.5)" }}>
              {unplugged.text}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.18), transparent)" }} />
    </section>
  );
}
