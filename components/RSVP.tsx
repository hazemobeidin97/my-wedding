"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EMAILJS_SERVICE  = "service_e02x3bi";
const EMAILJS_TEMPLATE = "template_1omsa6t";
const EMAILJS_KEY      = "xTaRlTtvUjJSW8WFL";
const TO_EMAIL         = "Hazem.obeidin@outlook.com";

// EmailJS payload always uses fixed English labels, regardless of UI language
const ATTENDING_EMAIL_LABEL: Record<"accept" | "decline", string> = {
  accept: "Joyfully Accepts",
  decline: "Regretfully Declines",
};

type Form = {
  name: string; email: string; phone: string;
  attending: "" | "accept" | "decline"; guests: string; message: string;
};

type FormErrors = Partial<Record<keyof Form, string>>;

const BLOOM = Array.from({ length: 55 }, (_, i) => {
  const angle = (i / 55) * Math.PI * 2;
  const dist  = 45 + (i % 5) * 24;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: -(Math.abs(Math.sin(angle + 0.5)) * dist + 55),
    rotate: (i * 137) % 360,
    color: ["#E8A0A8", "#C4707A", "#8B3040", "#E8D5B7", "#6B9E7A", "#C9A96E"][i % 6],
    w: i % 3 === 0 ? 12 : 8,
    h: i % 3 === 0 ? 6  : 10,
    round: i % 5 === 0,
    delay: (i % 8) * 0.05,
  };
});

export default function RSVP() {
  const { t } = useLanguage();
  useEffect(() => { emailjs.init({ publicKey: EMAILJS_KEY }); }, []);

  const [form, setForm]           = useState<Form>({ name: "", email: "", phone: "", attending: "", guests: "1", message: "" });
  const [errors, setErrors]       = useState<FormErrors>({});
  const [focused, setFocused]     = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);

  const set = (field: keyof Form, val: string) => setForm(f => ({ ...f, [field]: val } as Form));

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim())  e.name      = t.rsvp.errors.name;
    if (!form.email.trim()) e.email     = t.rsvp.errors.email;
    if (!form.phone.trim()) e.phone     = t.rsvp.errors.phone;
    if (!form.attending)    e.attending = t.rsvp.errors.attending;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setSendError(false); setLoading(true);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        to_email:      TO_EMAIL,
        reply_to:      form.email,
        guest_name:    form.name,
        guest_email:   form.email,
        guest_phone:   form.phone,
        attending:     ATTENDING_EMAIL_LABEL[form.attending as "accept" | "decline"],
        guest_count:   form.attending === "accept" ? form.guests : "—",
        guest_message: form.message || "—",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = (f: string): React.CSSProperties => ({
    width: "100%",
    background: "#1A1410",
    border: errors[f as keyof Form]
      ? "1px solid rgba(220,60,60,0.6)"
      : focused === f
        ? "1px solid rgba(201,169,110,0.7)"
        : "1px solid rgba(245,237,232,0.1)",
    borderRadius: "10px",
    padding: "13px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    color: "#F5EDE8",
    outline: "none",
    transition: "border-color 0.3s",
    WebkitAppearance: "none",
    appearance: "none",
    colorScheme: "dark",
  });

  return (
    <section id="rsvp" className="relative overflow-hidden" style={{ background: "#0E0B08" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden
        style={{
          background: [
            "radial-gradient(ellipse at 30% 60%, rgba(196,112,122,0.08) 0%, transparent 55%)",
            "radial-gradient(ellipse at 70% 30%, rgba(201,169,110,0.05) 0%, transparent 50%)",
          ].join(", "),
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.18), rgba(196,112,122,0.15), transparent)" }} />

      <div className="max-w-xl mx-auto px-5 sm:px-6 py-20 sm:py-32 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="font-body tracking-[0.55em] uppercase mb-4"
            style={{ fontSize: "clamp(7px, 2vw, 10px)", color: "rgba(201,169,110,0.52)" }}>
            {t.rsvp.eyebrow}
          </p>
          <h2 className="font-display select-none"
            style={{ fontSize: "clamp(3rem, 11vw, 7.5rem)", color: "#FFFFFF" }}>
            {t.rsvp.heading}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5 mb-6">
            <div className="h-px w-12"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "rgba(201,169,110,0.5)" }} />
            <div className="h-px w-12"
              style={{ background: "linear-gradient(to left, transparent, rgba(201,169,110,0.3))" }} />
          </div>
          <p className="font-heading italic"
            style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "rgba(245,237,232,0.3)" }}>
            {t.rsvp.deadline}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }} onSubmit={handleSubmit} className="space-y-7" noValidate
            >
              <div>
                <input type="text" placeholder={t.rsvp.placeholders.name} value={form.name}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  onChange={e => set("name", e.target.value)}
                  style={fieldStyle("name")} className="placeholder-white/20" />
                {errors.name && <p className="mt-1 text-xs font-body" style={{ color: "rgba(220,90,90,0.85)" }}>{errors.name}</p>}
              </div>

              <div>
                <input type="email" placeholder={t.rsvp.placeholders.email} value={form.email}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  onChange={e => set("email", e.target.value)}
                  style={fieldStyle("email")} className="placeholder-white/20" />
                {errors.email && <p className="mt-1 text-xs font-body" style={{ color: "rgba(220,90,90,0.85)" }}>{errors.email}</p>}
              </div>

              <div>
                <input type="tel" placeholder={t.rsvp.placeholders.phone} value={form.phone}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  onChange={e => set("phone", e.target.value)}
                  style={fieldStyle("phone")} className="placeholder-white/20" />
                {errors.phone && <p className="mt-1 text-xs font-body" style={{ color: "rgba(220,90,90,0.85)" }}>{errors.phone}</p>}
              </div>

              <div>
                <p className="font-body tracking-[0.35em] uppercase mb-4"
                  style={{ fontSize: "clamp(7px, 2vw, 9px)", color: "rgba(245,237,232,0.3)" }}>
                  {t.rsvp.attendQuestion}
                </p>
                {errors.attending && <p className="mb-2 text-xs font-body" style={{ color: "rgba(220,90,90,0.85)" }}>{errors.attending}</p>}
                <div className="flex flex-col gap-0.5">
                  {(["accept", "decline"] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-4 cursor-pointer" style={{ minHeight: "48px" }}
                      onClick={() => set("attending", opt)}>
                      <div className="flex-shrink-0 flex items-center justify-center transition-all duration-300"
                        style={{
                          width: 20, height: 20, borderRadius: "50%",
                          border: `1px solid ${form.attending === opt ? "rgba(201,169,110,0.8)" : "rgba(245,237,232,0.15)"}`,
                          background: form.attending === opt ? "rgba(201,169,110,0.12)" : "transparent",
                        }}>
                        {form.attending === opt && (
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(201,169,110,0.95)" }} />
                        )}
                      </div>
                      <span className="font-body text-sm transition-colors duration-300"
                        style={{ color: form.attending === opt ? "rgba(245,237,232,0.88)" : "rgba(245,237,232,0.35)" }}>
                        {t.rsvp.attendance[opt]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {form.attending === "accept" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}>
                    <select value={form.guests}
                      onFocus={() => setFocused("guests")} onBlur={() => setFocused(null)}
                      onChange={e => set("guests", e.target.value)}
                      style={{ ...fieldStyle("guests"), cursor: "pointer" }}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n} style={{ background: "#0E0B08" }}>
                          {t.rsvp.guestOptions[n - 1]}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <textarea placeholder={t.rsvp.placeholders.message} rows={3} value={form.message}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  onChange={e => set("message", e.target.value)}
                  style={{ ...fieldStyle("message"), resize: "none" }}
                  className="placeholder-white/20" />
              </div>

              {sendError && (
                <p className="text-sm font-body text-center" style={{ color: "rgba(220,90,90,0.85)" }}>
                  {t.rsvp.sendError}
                </p>
              )}

              <div className="pt-4">
                <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={loading}
                  className="w-full font-body tracking-[0.38em] uppercase cursor-pointer flex items-center justify-center gap-3 transition-all duration-300"
                  style={{
                    padding: "18px 40px",
                    background: loading ? "rgba(155,58,53,0.6)" : "#9B3A35",
                    color: "#FFFFFF",
                    fontSize: "clamp(9px, 2.5vw, 10px)",
                    border: "none",
                    minHeight: "56px",
                    borderRadius: "10px",
                    boxShadow: loading ? "none" : "0 6px 24px rgba(155,58,53,0.28)",
                  }}>
                  {loading ? (
                    <>
                      <motion.div animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 rounded-full"
                        style={{ border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "#FFFFFF" }} />
                      <span>{t.rsvp.sending}</span>
                    </>
                  ) : t.rsvp.submit}
                </motion.button>
              </div>
            </motion.form>

          ) : (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16 sm:py-24 relative"
            >
              {/* Bloom burst */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                {BLOOM.map(p => (
                  <motion.div key={p.id}
                    initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                    animate={{ opacity: [1, 1, 0], x: p.x, y: [0, p.y, p.y + 180], rotate: p.rotate, scale: [1, 1, 0.5] }}
                    transition={{ duration: 2.2, delay: p.delay, ease: "easeOut" }}
                    style={{
                      position: "absolute", left: "50%", top: "30%",
                      width: p.w, height: p.h, background: p.color,
                      borderRadius: p.round ? "50%" : "50% 0 50% 0",
                      marginLeft: -p.w / 2,
                    }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 180 }}
                className="flex items-center justify-center w-16 h-16 mx-auto mb-8"
                style={{
                  background: "linear-gradient(135deg, rgba(196,112,122,0.25), rgba(201,169,110,0.2))",
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,110,0.4)",
                  boxShadow: "0 8px 28px rgba(196,112,122,0.15)",
                }}
              >
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                  <path d="M2 9L8.5 15.5L22 2" stroke="rgba(201,169,110,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              <motion.h3 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-display mb-4"
                style={{ fontSize: "clamp(2.5rem, 10vw, 5.5rem)", color: "#FFFFFF" }}>
                {t.rsvp.success.title}
              </motion.h3>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-12 h-px mx-auto mb-5 origin-center"
                style={{ background: "linear-gradient(to right, rgba(201,169,110,0.6), rgba(196,112,122,0.5))" }} />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="font-heading italic"
                style={{ fontSize: "clamp(0.95rem, 3vw, 1.15rem)", color: "rgba(245,237,232,0.38)" }}>
                {t.rsvp.success.subtitle}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
