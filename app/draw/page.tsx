"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Fact {
  fact: string;
  name: string;
}

export default function DrawPage() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/facts")
      .then((res) => res.json())
      .then((data) => {
        setFacts(data);
        setLoaded(true);
      })
      .catch(() => setError("Failed to load facts"));
  }, []);

  const next = useCallback(() => {
    if (currentIndex >= facts.length - 1) return;
    setRevealed(false);
    setCurrentIndex((i) => i + 1);
  }, [currentIndex, facts.length]);

  const reveal = useCallback(() => {
    setRevealed(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (revealed) {
          next();
        } else {
          reveal();
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, reveal, revealed, started]);

  if (error) {
    return (
      <div className="text-gray-400 text-lg px-6">{error}</div>
    );
  }

  if (!loaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
      </motion.div>
    );
  }

  if (facts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-gray-300">
          No submissions yet.
        </h2>
      </motion.div>
    );
  }

  // Lobby screen before starting
  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          {"Ready?".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.05,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg mb-12"
        >
          {facts.length} facts from {facts.length / 2} people
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={() => setStarted(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-black text-white rounded-full px-14 py-4 text-lg font-medium tracking-wide hover:bg-gray-900 transition-colors cursor-pointer"
        >
          Start
        </motion.button>
      </motion.div>
    );
  }

  const done = currentIndex >= facts.length;
  const current = facts[currentIndex];

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="text-center px-6"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          That&apos;s all.
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          {facts.length} facts revealed.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 py-16 sm:py-0 sm:min-h-[80vh] relative">
      {/* Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 sm:mb-0 sm:absolute sm:top-0 sm:right-0 text-sm text-gray-300 font-medium tabular-nums"
      >
        {currentIndex + 1} / {facts.length}
      </motion.div>

      {/* Fact */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="text-center max-w-2xl px-2"
        >
          <p className="text-2xl sm:text-4xl md:text-5xl font-medium leading-snug sm:leading-relaxed tracking-tight">
            &ldquo;{current.fact}&rdquo;
          </p>

          {/* Name reveal */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mt-8 sm:mt-10"
              >
                <span className="inline-block text-lg sm:text-xl md:text-2xl font-semibold bg-black text-white px-6 py-2 rounded-full">
                  {current.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-12 sm:mt-0 sm:absolute sm:bottom-0 flex gap-4">
        <motion.button
          onClick={revealed ? next : reveal}
          disabled={revealed && currentIndex >= facts.length - 1}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-black text-white rounded-full px-12 py-4 text-base font-medium tracking-wide hover:bg-gray-900 transition-colors disabled:opacity-30 cursor-pointer"
        >
          {revealed ? "Next" : "Reveal"}
        </motion.button>
      </div>

      {/* Keyboard hint — desktop only */}
      <div className="hidden sm:block sm:absolute sm:bottom-0 sm:right-0 text-xs text-gray-300">
        Space / Arrow Right
      </div>
    </div>
  );
}
