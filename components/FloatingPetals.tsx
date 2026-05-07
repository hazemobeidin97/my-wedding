"use client";

import { motion } from "framer-motion";

const PETALS = [
  { id: 0,  x: 4,  delay: 0,   duration: 14, size: 0.45, rotate: 45,  color: "#FAD7DC", opacity: 0.50, drift: 70  },
  { id: 1,  x: 11, delay: 2.5, duration: 12, size: 0.55, rotate: 120, color: "#E8D5A0", opacity: 0.45, drift: -55 },
  { id: 2,  x: 20, delay: 0.8, duration: 16, size: 0.40, rotate: 200, color: "#D4808E", opacity: 0.40, drift: 65  },
  { id: 3,  x: 30, delay: 3.2, duration: 13, size: 0.50, rotate: 30,  color: "#FAD7DC", opacity: 0.50, drift: -80 },
  { id: 4,  x: 44, delay: 1.4, duration: 15, size: 0.48, rotate: 270, color: "#E8D5A0", opacity: 0.42, drift: 58  },
  { id: 5,  x: 55, delay: 4.0, duration: 11, size: 0.60, rotate: 90,  color: "#FAD7DC", opacity: 0.45, drift: -65 },
  { id: 6,  x: 67, delay: 0.3, duration: 17, size: 0.42, rotate: 160, color: "#D4808E", opacity: 0.40, drift: 75  },
  { id: 7,  x: 78, delay: 2.0, duration: 13, size: 0.52, rotate: 330, color: "#E8D5A0", opacity: 0.45, drift: -48 },
  { id: 8,  x: 88, delay: 5.0, duration: 14, size: 0.38, rotate: 75,  color: "#FAD7DC", opacity: 0.50, drift: 50  },
  { id: 9,  x: 94, delay: 1.8, duration: 12, size: 0.46, rotate: 220, color: "#D4808E", opacity: 0.38, drift: -62 },
  { id: 10, x: 8,  delay: 6.0, duration: 15, size: 0.55, rotate: 145, color: "#C9A84C", opacity: 0.30, drift: 42  },
  { id: 11, x: 37, delay: 3.8, duration: 11, size: 0.44, rotate: 55,  color: "#FAD7DC", opacity: 0.45, drift: -45 },
  { id: 12, x: 62, delay: 7.0, duration: 16, size: 0.58, rotate: 280, color: "#C9A84C", opacity: 0.28, drift: 60  },
  { id: 13, x: 84, delay: 2.8, duration: 13, size: 0.40, rotate: 180, color: "#D4808E", opacity: 0.40, drift: -55 },
  { id: 14, x: 50, delay: 0.5, duration: 14, size: 0.35, rotate: 310, color: "#C9A84C", opacity: 0.25, drift: 38  },
];

export default function FloatingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: "-5%", scale: p.size }}
          animate={{
            y: ["0vh", "112vh"],
            x: [0, p.drift],
            rotate: [0, 360 * (p.id % 2 === 0 ? 1 : -1)],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
            <path
              d="M10 0C10 0 18 8 18 15C18 20 14.4 24.5 10 24.5C5.6 24.5 2 20 2 15C2 8 10 0 10 0Z"
              fill={p.color}
              fillOpacity={p.opacity}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
