"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-03-21T19:00:00+02:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  return {
    hours: String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0"),
    minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
    seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0"),
    done: diff === 0,
  };
}

const Digit = ({ value }: { value: number }) => {
  return (
    <div className="relative w-9 h-14 sm:w-12 sm:h-[4.5rem] overflow-hidden rounded-lg bg-neutral-900 text-white font-mono text-2xl sm:text-4xl font-bold flex items-center justify-center shadow-lg">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

function DigitPair({ value, label }: { value: string; label: string }) {
  const str = String(value);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-[3px]">
        {str.split("").map((d, i) => (
          <Digit key={i} value={parseInt(d)} />
        ))}
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export function FlipClock() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.done) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-medium"
      >
        It&apos;s time.
      </motion.p>
    );
  }

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-4">
      <DigitPair value={time.hours} label="Hours" />
      <span className="text-2xl sm:text-3xl font-bold text-neutral-300 pt-2.5 sm:pt-4 select-none">:</span>
      <DigitPair value={time.minutes} label="Min" />
      <span className="text-2xl sm:text-3xl font-bold text-neutral-300 pt-2.5 sm:pt-4 select-none">:</span>
      <DigitPair value={time.seconds} label="Sec" />
    </div>
  );
}
