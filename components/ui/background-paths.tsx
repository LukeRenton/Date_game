"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 12 * position} -${189 + i * 15}C-${
      380 - i * 12 * position
    } -${189 + i * 15} -${312 - i * 12 * position} ${216 - i * 15} ${
      152 - i * 12 * position
    } ${343 - i * 15}C${616 - i * 12 * position} ${470 - i * 15} ${
      684 - i * 12 * position
    } ${875 - i * 15} ${684 - i * 12 * position} ${875 - i * 15}`,
    width: 0.5 + i * 0.05,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <title>Background</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) {
    return <div className="fixed inset-0 bg-white" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
