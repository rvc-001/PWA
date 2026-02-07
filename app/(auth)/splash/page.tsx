"use client";

import React from "react";
import Link from "next/link";

export default function SplashPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-[var(--color-background)] relative overflow-hidden">
      {/* Decorative orange triangle */}
      <div
        className="absolute top-0 right-0 w-64 h-64"
        style={{
          background: "linear-gradient(225deg, var(--card-orange-light) 0%, var(--card-orange-bg) 100%)",
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-sm">
        {/* Player Image in Circle */}
        <div className="relative mb-8">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/10">
            {/* Placeholder for player image - in real implementation would use next/image */}
            <div className="text-6xl">🏸</div>
          </div>
        </div>

        {/* Branding */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
          <span className="text-4xl font-black text-white">F</span>
        </div>

        <h1 className="text-3xl font-black text-[var(--color-text)] mb-2 tracking-tight">
          FOREHAND
        </h1>

        <p className="text-[var(--color-muted)] text-center max-w-xs mb-8">
          Your all-in-one tournament hub.<br />
          Manage. Play. Compete.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="w-full max-w-sm relative z-10 pb-safe">
        <Link
          href="/finalize"
          className="w-full min-h-[52px] flex items-center justify-center rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: "var(--gradient-orange)" }}
        >
          Login with Google
        </Link>

        <p className="text-xs text-[var(--color-muted)] mt-4 text-center">
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
}
