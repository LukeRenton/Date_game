"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlipClock } from "@/components/ui/flip-clock";

export default function SubmitPage() {
  const [name, setName] = useState("");
  const [fact1, setFact1] = useState("");
  const [fact2, setFact2] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, fact1, fact2 }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-lg px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
            className="mx-auto w-20 h-20 rounded-full bg-black flex items-center justify-center mb-8"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
          >
            You&apos;re in.
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-gray-400 mb-10"
          >
            See you then!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <FlipClock />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="mb-12 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {"Double Date".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.03,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mt-3 text-base"
          >
            Two facts about you. Try not to make it obvious.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-10"
        >
          <div className="group">
            <label
              htmlFor="name"
              className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3"
            >
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              required
              className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-lg sm:text-xl placeholder:text-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="group">
            <label
              htmlFor="fact1"
              className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3"
            >
              Fact one
            </label>
            <input
              id="fact1"
              type="text"
              value={fact1}
              onChange={(e) => setFact1(e.target.value)}
              placeholder="Something surprising about you"
              required
              className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-lg sm:text-xl placeholder:text-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="group">
            <label
              htmlFor="fact2"
              className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3"
            >
              Fact two
            </label>
            <input
              id="fact2"
              type="text"
              value={fact2}
              onChange={(e) => setFact2(e.target.value)}
              placeholder="Another one"
              required
              className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-lg sm:text-xl placeholder:text-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-all duration-300"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white rounded-full py-4 text-base font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-gray-900"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting
              </span>
            ) : (
              "Submit"
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
