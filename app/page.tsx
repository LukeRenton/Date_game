"use client";

import { useState } from "react";

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
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="mx-auto w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            You&apos;re in.
          </h2>
          <p className="text-gray-400 text-sm">
            See you on game night.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Double Date
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Two facts about you. Keep it anonymous.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
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
              className="w-full border-0 border-b border-gray-200 bg-transparent py-2 text-lg placeholder:text-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="fact1"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
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
              className="w-full border-0 border-b border-gray-200 bg-transparent py-2 text-lg placeholder:text-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="fact2"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
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
              className="w-full border-0 border-b border-gray-200 bg-transparent py-2 text-lg placeholder:text-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-3.5 text-sm font-medium tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
