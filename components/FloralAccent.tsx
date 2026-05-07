"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, MotionStyle } from "framer-motion";

const ROSE_DEEP  = "#C45A70";
const ROSE_MID   = "#D4808E";
const ROSE_LIGHT = "#FAD7DC";
const ROSE_BLUSH = "#FDE8EB";
const STEM       = "#7B9B5A";
const LEAF_DARK  = "#5A7D42";
const LEAF_MID   = "#7AAD60";

const P7 = [0, 51, 102, 153, 204, 255, 306];
const P6 = [0, 60, 120, 180, 240, 300];
const P5 = [0, 72, 144, 216, 288];
const P4 = [0, 90, 180, 270];

function Rose({ petals, r, outer, inner }: { petals: number[]; r: number; outer: string; inner: string }) {
  return (
    <>
      {petals.map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={a}
            cx={Math.sin(rad) * r * 0.7}
            cy={-Math.cos(rad) * r * 0.7}
            rx={r * 0.38}
            ry={r * 0.67}
            fill={outer}
            fillOpacity={0.82}
            transform={`rotate(${a})`}
          />
        );
      })}
      {petals.map((a) => {
        const rad = ((a + 30) * Math.PI) / 180;
        return (
          <ellipse
            key={`i${a}`}
            cx={Math.sin(rad) * r * 0.32}
            cy={-Math.cos(rad) * r * 0.32}
            rx={r * 0.2}
            ry={r * 0.38}
            fill={inner}
            fillOpacity={0.55}
            transform={`rotate(${a + 30})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={r * 0.22} fill={inner} fillOpacity={0.9} />
    </>
  );
}

export default function FloralAccent({
  className = "",
  mirror = false,
  opacity = 0.7,
  timed = false,
  size = 1,
}: {
  className?: string;
  mirror?: boolean;
  opacity?: number;
  timed?: boolean;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const s1 = useTransform(scrollYProgress, [0.00, 0.45], [0, 1]);
  const s2 = useTransform(scrollYProgress, [0.05, 0.48], [0, 1]);
  const s3 = useTransform(scrollYProgress, [0.08, 0.52], [0, 1]);
  const l1 = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);
  const l2 = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const l3 = useTransform(scrollYProgress, [0.20, 0.40], [0, 1]);
  const l4 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const l5 = useTransform(scrollYProgress, [0.30, 0.50], [0, 1]);
  const l6 = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const l7 = useTransform(scrollYProgress, [0.38, 0.58], [0, 1]);
  const r1 = useTransform(scrollYProgress, [0.25, 0.50], [0, 1]);
  const r2 = useTransform(scrollYProgress, [0.30, 0.55], [0, 1]);
  const r3 = useTransform(scrollYProgress, [0.35, 0.58], [0, 1]);
  const r4 = useTransform(scrollYProgress, [0.40, 0.62], [0, 1]);
  const r5 = useTransform(scrollYProgress, [0.44, 0.66], [0, 1]);
  const r6 = useTransform(scrollYProgress, [0.48, 0.70], [0, 1]);
  const r7 = useTransform(scrollYProgress, [0.52, 0.74], [0, 1]);

  const ease4: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const pathAnim = (sv: MotionValue<number>, delay: number) =>
    timed
      ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.8, delay, ease: ease4 } }
      : { style: { pathLength: sv } };

  const leafAnim = (sv: MotionValue<number>, delay: number) =>
    timed
      ? { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.55, delay, type: "spring" as const, bounce: 0.45 }, style: { transformOrigin: "0 0" } as MotionStyle }
      : { style: { scale: sv, transformOrigin: "0 0" } as MotionStyle };

  const roseAnim = (sv: MotionValue<number>, delay: number) =>
    timed
      ? { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.65, delay, type: "spring" as const, bounce: 0.4 }, style: { transformOrigin: "0 0" } as MotionStyle }
      : { style: { scale: sv, transformOrigin: "0 0" } as MotionStyle };

  const W = Math.round(160 * size);
  const H = Math.round(540 * size);

  return (
    <div
      ref={ref}
      className={`relative select-none pointer-events-none ${className}`}
      style={{ transform: mirror ? "scaleX(-1)" : undefined, opacity }}
    >
      <svg viewBox="0 0 160 540" width={W} height={H} xmlns="http://www.w3.org/2000/svg" overflow="visible">

        {/* STEMS */}
        <motion.path
          d="M80 538 C78 508 75 485 78 455 C81 425 90 400 93 372 C97 344 94 316 97 288 C100 260 107 234 109 206 C112 178 110 152 112 124 C114 98 116 74 118 46 C119 30 121 16 123 2"
          stroke={STEM} strokeWidth="2.5" fill="none" strokeLinecap="round"
          {...pathAnim(s1, 0.8)}
        />
        <motion.path
          d="M83 342 C67 326 54 308 61 292 C68 278 82 288 81 306"
          stroke={STEM} strokeWidth="2" fill="none" strokeLinecap="round"
          {...pathAnim(s1, 0.9)}
        />
        <motion.path
          d="M87 452 C70 436 59 418 67 404 C75 391 90 401 88 419"
          stroke={STEM} strokeWidth="1.8" fill="none" strokeLinecap="round"
          {...pathAnim(s1, 1.0)}
        />
        <motion.path
          d="M103 212 C121 198 136 182 130 168 C124 156 110 164 108 180"
          stroke={STEM} strokeWidth="2" fill="none" strokeLinecap="round"
          {...pathAnim(s2, 1.0)}
        />
        <motion.path
          d="M100 284 C118 270 130 254 124 240 C118 228 104 236 103 252"
          stroke={STEM} strokeWidth="1.8" fill="none" strokeLinecap="round"
          {...pathAnim(s2, 1.1)}
        />
        <motion.path
          d="M119 90 C107 76 100 60 106 48 C112 38 122 44 123 58"
          stroke={STEM} strokeWidth="1.5" fill="none" strokeLinecap="round"
          {...pathAnim(s3, 1.2)}
        />
        <motion.path
          d="M95 370 C82 356 78 340 85 330 C92 320 102 328 100 344"
          stroke={STEM} strokeWidth="1.4" fill="none" strokeLinecap="round"
          {...pathAnim(s3, 1.15)}
        />

        {/* LEAVES */}
        <g transform="translate(60, 294)">
          <motion.ellipse cx={0} cy={0} rx={16} ry={26} fill={LEAF_DARK} fillOpacity={0.6}
            transform="rotate(-42)" {...leafAnim(l1, 1.0)} />
        </g>
        <g transform="translate(132, 172)">
          <motion.ellipse cx={0} cy={0} rx={12} ry={20} fill={LEAF_MID} fillOpacity={0.55}
            transform="rotate(48)" {...leafAnim(l2, 1.1)} />
        </g>
        <g transform="translate(65, 406)">
          <motion.ellipse cx={0} cy={0} rx={14} ry={22} fill={LEAF_DARK} fillOpacity={0.5}
            transform="rotate(-38)" {...leafAnim(l3, 1.2)} />
        </g>
        <g transform="translate(126, 244)">
          <motion.ellipse cx={0} cy={0} rx={11} ry={18} fill={LEAF_MID} fillOpacity={0.52}
            transform="rotate(52)" {...leafAnim(l4, 1.1)} />
        </g>
        <g transform="translate(122, 50)">
          <motion.ellipse cx={0} cy={0} rx={9} ry={15} fill={LEAF_DARK} fillOpacity={0.45}
            transform="rotate(-45)" {...leafAnim(l5, 1.3)} />
        </g>
        <g transform="translate(83, 498)">
          <motion.ellipse cx={0} cy={0} rx={13} ry={19} fill={LEAF_MID} fillOpacity={0.42}
            transform="rotate(-20)" {...leafAnim(l6, 1.3)} />
        </g>
        <g transform="translate(96, 374)">
          <motion.ellipse cx={0} cy={0} rx={8} ry={13} fill={LEAF_DARK} fillOpacity={0.44}
            transform="rotate(30)" {...leafAnim(l7, 1.2)} />
        </g>

        {/* ROSES */}
        <g transform="translate(123, 2)">
          <motion.g {...roseAnim(r1, 1.4)}>
            <Rose petals={P7} r={18} outer={ROSE_DEEP} inner={ROSE_MID} />
          </motion.g>
        </g>
        <g transform="translate(106, 46)">
          <motion.g {...roseAnim(r2, 1.5)}>
            <Rose petals={P5} r={13} outer={ROSE_LIGHT} inner={ROSE_MID} />
          </motion.g>
        </g>
        <g transform="translate(130, 164)">
          <motion.g {...roseAnim(r3, 1.6)}>
            <Rose petals={P6} r={15} outer={ROSE_MID} inner={ROSE_DEEP} />
          </motion.g>
        </g>
        <g transform="translate(60, 290)">
          <motion.g {...roseAnim(r4, 1.7)}>
            <Rose petals={P5} r={12} outer={ROSE_LIGHT} inner={ROSE_MID} />
          </motion.g>
        </g>
        <g transform="translate(124, 236)">
          <motion.g {...roseAnim(r5, 1.6)}>
            <Rose petals={P4} r={11} outer={ROSE_BLUSH} inner={ROSE_LIGHT} />
          </motion.g>
        </g>
        <g transform="translate(66, 402)">
          <motion.g {...roseAnim(r6, 1.8)}>
            <Rose petals={P6} r={14} outer={ROSE_MID} inner={ROSE_DEEP} />
          </motion.g>
        </g>
        <g transform="translate(80, 510)">
          <motion.g {...roseAnim(r7, 1.9)}>
            <Rose petals={P4} r={8} outer={ROSE_DEEP} inner={ROSE_MID} />
          </motion.g>
        </g>

      </svg>
    </div>
  );
}
