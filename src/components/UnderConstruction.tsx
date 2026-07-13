"use client";

import { useState } from "react";
import Wordmark from "@/components/Wordmark";

function Divider() {
  return (
    <div className="mt-7 flex items-center gap-3 text-bronze/45">
      <span className="h-px w-14 bg-current" />
      <span className="h-1.5 w-1.5 rotate-45 border border-current" />
      <span className="h-px w-14 bg-current" />
    </div>
  );
}

/** Faint modern-villa line drawing anchored to the bottom of the gate. */
function VillaArt() {
  return (
    <svg
      viewBox="0 0 1200 380"
      className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-bronze opacity-[0.14]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* ground */}
      <path d="M40 350 H1160" />
      {/* villa — upper floor */}
      <rect x="500" y="140" width="200" height="66" />
      <path d="M486 140 H714" />
      <path d="M540 150 V200 M590 150 V200 M640 150 V200" />
      {/* villa — ground floor */}
      <rect x="468" y="206" width="264" height="99" />
      <path d="M452 206 H748" />
      <path d="M520 216 V300 M572 216 V300 M624 216 V300 M676 216 V300" />
      {/* pool + ripples */}
      <rect x="486" y="312" width="228" height="30" rx="9" />
      <path d="M512 322 q14 -6 28 0 t28 0 t28 0" />
      <path d="M540 332 q14 -6 28 0 t28 0" />
      {/* deck */}
      <path d="M430 305 H770" />
      {/* left palm */}
      <path d="M182 350 C188 300 172 272 160 252" />
      <path d="M160 252 Q118 238 86 250 M160 252 Q128 222 100 208 M160 252 Q160 216 162 190 M160 252 Q198 220 220 208 M160 252 Q204 238 236 250" />
      {/* right palm */}
      <path d="M1024 350 C1018 300 1034 272 1046 252" />
      <path d="M1046 252 Q1088 238 1120 250 M1046 252 Q1078 222 1106 208 M1046 252 Q1046 216 1044 190 M1046 252 Q1008 220 986 208 M1046 252 Q1002 238 970 250" />
    </svg>
  );
}

export default function UnderConstruction() {
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-6 py-16 text-ink">
      <VillaArt />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <Wordmark tone="color" priority className="h-14 w-auto md:h-16" />

        <div className="mt-9 text-4xl md:text-5xl" aria-hidden>
          🚨
        </div>

        <h1 className="font-display mt-4 text-5xl font-medium leading-[0.92] tracking-tight text-ink md:text-6xl">
          ACCESS
          <br />
          DENIED
        </h1>

        <Divider />

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Our website is currently under investigation by the FBI, CIA, and MI6. Apparently, the
          secret projects we&apos;re cooking up are classified as{" "}
          <span className="font-semibold text-bronze">
            &ldquo;too exciting for public consumption.&rdquo;
          </span>
        </p>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Until our legal team clears us (or we finish building the actual page), you didn&apos;t
          see anything.
        </p>

        <Divider />

        <p className="mt-6 text-sm font-medium tracking-wide text-bronze">
          Thank you for your patience.
        </p>

        {/* Discreet preview access — tap the heart */}
        <button
          type="button"
          onClick={() => setShowLogin((v) => !v)}
          aria-label="Preview access"
          aria-expanded={showLogin}
          className="mt-3 text-xl text-bronze/70 transition-transform duration-300 hover:scale-125 hover:text-bronze"
        >
          {showLogin ? "♥" : "♡"}
        </button>

        {showLogin && (
          <form onSubmit={submit} className="mt-6 w-full max-w-xs space-y-3 text-left">
            <input
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-bronze"
            />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-bronze"
            />
            {error && <p className="text-xs text-red-600">Incorrect username or password.</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-ink py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "…" : "View Preview"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
