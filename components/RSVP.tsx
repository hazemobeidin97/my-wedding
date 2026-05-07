"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inputCls =
  "w-full bg-transparent border-b border-gold/35 py-3 font-body text-sm text-charcoal placeholder-stone/45 focus:outline-none focus:border-burgundy transition-colors duration-300";

export default function RSVP() {
  const [form, setForm] = useState({
    name: "", email: "", attending: "", guests: "1", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: string, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-28 bg-cream">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-stone mb-4">
            Join Our Celebration
          </p>
          <h2 className="font-display text-6xl md:text-7xl text-burgundy mb-5">RSVP</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="font-heading text-lg text-stone italic">
            Please respond by September 1, 2026
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              onSubmit={handleSubmit}
              className="space-y-9"
            >
              <div className="grid sm:grid-cols-2 gap-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone mb-5">
                  Will you be attending?
                </p>
                <div className="flex flex-wrap gap-6">
                  {["Joyfully Accepts", "Regretfully Declines"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                      <div
                        onClick={() => set("attending", opt)}
                        className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${
                          form.attending === opt
                            ? "bg-burgundy border-burgundy"
                            : "border-gold/50"
                        }`}
                      >
                        {form.attending === opt && (
                          <div className="w-1.5 h-1.5 rounded-full bg-ivory" />
                        )}
                      </div>
                      <span className="font-body text-sm text-charcoal">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {form.attending === "Joyfully Accepts" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <select
                      className={inputCls}
                      value={form.guests}
                      onChange={(e) => set("guests", e.target.value)}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                placeholder="A message for the couple (optional)"
                rows={3}
                className={`${inputCls} resize-none`}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
              />

              <div className="text-center pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  className="px-12 py-4 bg-burgundy text-ivory font-body text-[11px] tracking-[0.28em] uppercase hover:bg-rose transition-colors duration-300 cursor-pointer"
                >
                  Send RSVP
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                className="w-16 h-16 bg-burgundy/10 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-7"
              >
                <svg className="w-8 h-8 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="font-display text-5xl text-burgundy mb-4">Thank You!</h3>
              <p className="font-heading text-xl text-stone italic">
                We can't wait to celebrate with you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
