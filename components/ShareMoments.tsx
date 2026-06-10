"use client";

import { motion, AnimatePresence } from "framer-motion";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState, useRef, useEffect } from "react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function ShareMoments() {
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => () => previews.forEach(p => p && URL.revokeObjectURL(p)), [previews]);

  const { startUpload, isUploading } = useUploadThing("weddingMedia", {
    onClientUploadComplete: () => setUploaded(true),
    onUploadError: (err) => alert(`Upload failed: ${err.message}`),
  });

  const addFiles = (incoming: File[]) => {
    const media = incoming.filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
    const urls = media.map(f => f.type.startsWith("image/") ? URL.createObjectURL(f) : "");
    setFiles(prev => [...prev, ...media]);
    setPreviews(prev => [...prev, ...urls]);
  };

  const removeFile = (i: number) => {
    if (previews[i]) URL.revokeObjectURL(previews[i]);
    setFiles(prev => prev.filter((_, j) => j !== i));
    setPreviews(prev => prev.filter((_, j) => j !== i));
  };

  if (!mounted) return <section id="share" className="py-32 bg-ivory" />;

  return (
    <section id="share" className="py-32 bg-ivory">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-rose/70 mb-4">With our guests</p>
          <h2 className="font-display text-6xl md:text-7xl text-burgundy mb-5">Share Your Moments</h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gold/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <p className="font-heading text-lg text-charcoal/60 italic max-w-lg mx-auto leading-relaxed">
            Captured a moment from our day? We&apos;d love to see it through your eyes.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {uploaded ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16 border border-gold/30 rounded-2xl bg-cream/40"
            >
              <p className="font-display text-5xl text-burgundy mb-3">Thank you</p>
              <p className="font-heading text-base text-charcoal/50 italic">
                Your photos & videos have been received with love.
              </p>
            </motion.div>
          ) : (
            <motion.div key="uploader" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

              {/* Drop zone */}
              <motion.div
                layout
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}
                animate={{ borderColor: isDragging ? "var(--color-gold)" : "color-mix(in srgb, var(--color-gold) 35%, transparent)" }}
                className={`border-2 border-dashed rounded-2xl cursor-pointer transition-colors duration-300 mb-8 text-center
                  ${isDragging ? "bg-gold/5" : "bg-cream/30 hover:bg-cream/50"}
                  ${files.length > 0 ? "py-6 px-6" : "py-16 px-6"}`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={e => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }}
                />
                <p className="font-heading text-charcoal/60 text-base mb-1">
                  {files.length > 0 ? "Add more photos or videos" : "Drop photos & videos here"}
                </p>
                <p className="font-body text-[11px] tracking-widest uppercase text-charcoal/30">
                  or click to browse
                </p>
              </motion.div>

              {/* Preview grid */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10"
                  >
                    {files.map((file, i) => (
                      <motion.div
                        key={`${file.name}-${i}`}
                        initial={{ opacity: 0, scale: 0.75, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.75, y: 12 }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-square rounded-xl overflow-hidden bg-cream group"
                      >
                        {previews[i] ? (
                          <img
                            src={previews[i]}
                            alt={file.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-3">
                            <svg className="w-8 h-8 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="font-body text-[9px] text-charcoal/40 truncate w-full text-center">{file.name}</p>
                          </div>
                        )}

                        {/* Uploading spinner */}
                        {isUploading && (
                          <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                          </div>
                        )}

                        {/* Remove button */}
                        {!isUploading && (
                          <button
                            onClick={e => { e.stopPropagation(); removeFile(i); }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-burgundy/80 backdrop-blur-sm text-ivory text-sm leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-burgundy"
                          >
                            ×
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upload button */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => startUpload(files)}
                      disabled={isUploading}
                      className="bg-burgundy hover:bg-rose disabled:opacity-50 text-ivory font-body text-[11px] tracking-[0.22em] uppercase px-10 py-3.5 rounded-lg transition-colors duration-300"
                    >
                      {isUploading
                        ? "Uploading…"
                        : `Upload ${files.length} ${files.length === 1 ? "file" : "files"}`}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
