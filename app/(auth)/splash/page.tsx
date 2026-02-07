"use client";

import React from "react";
import Link from "next/link";

export default function SplashPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-background)]">
      <div className="text-center mb-8">
        <span className="text-5xl font-bold text-primary">F</span>
        <h1 className="text-2xl font-bold mt-2">FOREHAND</h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-xs">
          Your all-in-one tournament hub. Manage. Play. Compete.
        </p>
      </div>
      <Link
        href="/auth/finalize"
        className="w-full max-w-xs min-h-[44px] flex items-center justify-center rounded-[var(--radius-button)] bg-primary text-white font-medium"
      >
        Login with Google
      </Link>
      <p className="text-xs text-[var(--color-muted)] mt-4 text-center">
        By continuing, you agree to our Terms of Service.
      </p>
    </div>
  );
}
