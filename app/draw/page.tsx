"use client";

import { useState, useEffect, useCallback } from "react";

interface Fact {
  fact: string;
  name: string;
}

export default function DrawPage() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
    if (currentIndex >= facts.length - 1 || animating) return;
    setAnimating(true);
    setRevealed(false);

    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setAnimating(false);
    }, 300);
  }, [currentIndex, facts.length, animating]);

  const reveal = useCallback(() => {
    setRevealed(true);
  }, []);

  useEffect(() => {
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
  }, [next, reveal, revealed]);

  if (error) {
    return (
      <div className="text-gray-400 text-lg">{error}</div>
    );
  }

  if (!loaded) {
    return (
      <div className="text-gray-300 text-lg animate-pulse">Loading...</div>
    );
  }

  if (facts.length === 0) {
    return (
      <div className="text-center animate-fade-in">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-300">
          No submissions yet.
        </h2>
      </div>
    );
  }

  const done = currentIndex >= facts.length;
  const current = facts[currentIndex];

  if (done) {
    return (
      <div className="text-center animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
          That&apos;s all.
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          {facts.length} facts revealed.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] relative">
      {/* Counter */}
      <div className="absolute top-0 right-0 text-sm text-gray-300 font-medium tabular-nums">
        {currentIndex + 1} / {facts.length}
      </div>

      {/* Fact */}
      <div
        key={currentIndex}
        className={`text-center max-w-2xl ${animating ? "animate-fade-out" : "animate-fade-in"}`}
      >
        <p className="text-3xl md:text-5xl font-medium leading-relaxed tracking-tight">
          &ldquo;{current.fact}&rdquo;
        </p>

        {/* Name reveal */}
        {revealed && (
          <div className="mt-8 animate-scale-in">
            <span className="inline-block text-xl md:text-2xl font-semibold border-b-2 border-black pb-1">
              {current.name}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 flex gap-4">
        {!revealed ? (
          <button
            onClick={reveal}
            className="bg-black text-white rounded-full px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all cursor-pointer"
          >
            Reveal
          </button>
        ) : (
          <button
            onClick={next}
            disabled={currentIndex >= facts.length - 1}
            className="bg-black text-white rounded-full px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-30 cursor-pointer"
          >
            Next
          </button>
        )}
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-0 right-0 text-xs text-gray-300">
        Space / Arrow Right
      </div>
    </div>
  );
}
