"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TopNavProps = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
};

export default function TopNav({ title, showBack = false, onBack, right }: TopNavProps) {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-[var(--shadow-nav)]"
      role="banner"
    >
      <div className="flex items-center justify-between h-14 px-4 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Go back"
            >
              <span className="text-xl">←</span>
            </button>
          ) : (
            <Link
              href="/home"
              className="font-semibold text-primary truncate"
              aria-label="Forehand home"
            >
              Forehand
            </Link>
          )}
          {title && (
            <h1 className="text-lg font-semibold truncate" id="page-title">
              {title}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Link
            href="/profile"
            className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Profile"
          >
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
              A
            </span>
          </Link>
          {right}
        </div>
      </div>
    </header>
  );
}
