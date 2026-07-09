"use client";

import { useState } from "react";
import Wordmark from "@/components/Wordmark";

export default function UnderConstructionPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        window.location.href = "/";
        return;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-y-auto bg-ink px-6 py-16 text-cream">
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 38%, rgba(131,76,37,0.28), transparent 70%)",
        }}
      />

      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <Wordmark tone="white" priority className="h-16 w-auto md:h-20" />

        <h1 className="font-display mt-12 text-2xl font-medium tracking-tight text-cream md:text-3xl">
          This site is under construction
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-cream/55">
          We&apos;re putting the finishing touches in place. Please check back soon.
        </p>

        {/* Lock — tap to reveal preview access */}
        <button
          type="button"
          onClick={() => setShowLogin((v) => !v)}
          aria-label="Preview access"
          aria-expanded={showLogin}
          className="glass mt-10 flex h-14 w-14 items-center justify-center rounded-full text-cream transition-transform duration-300 hover:scale-105"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {showLogin ? (
              <path
                d="M7 10V7a5 5 0 0 1 9.9-1M6 10h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        {showLogin && (
          <form onSubmit={submit} className="mt-8 w-full max-w-xs space-y-3 text-left">
            <input
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-cream/20 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-cream/50"
            />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-cream/20 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-cream/50"
            />
            {error && (
              <p className="text-xs text-red-300">Incorrect username or password.</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cream py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "…" : "View Preview"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
