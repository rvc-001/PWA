"use client";

import React from "react";

type ScheduleCardProps = {
  sport: string;
  matchName: string;
  venue: string;
  time: string;
  opponent?: string;
  colorVariant?: "volleyball" | "basketball" | "badminton";
};

export default function ScheduleCard({
  sport,
  matchName,
  venue,
  time,
  opponent,
  colorVariant = "badminton",
}: ScheduleCardProps) {
  const variant = {
    volleyball: { label: "VB", accent: "bg-primary/15 text-primary" },
    basketball: { label: "BB", accent: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]" },
    badminton: { label: "BD", accent: "bg-[var(--color-error)]/15 text-[var(--color-error)]" },
  }[colorVariant];

  return (
    <div className="rounded-[var(--radius-card)] p-4 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold ${variant.accent}`} aria-hidden>
              {variant.label}
            </span>
            <p className="text-xs font-medium text-[var(--color-muted)] truncate">{sport}</p>
          </div>
          <h4 className="font-semibold text-sm mb-1 truncate">{matchName}</h4>
          <p className="text-xs text-[var(--color-muted)] truncate">{venue}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-semibold">{time}</p>
          {opponent && <p className="text-xs text-[var(--color-muted)] mt-1">vs {opponent}</p>}
        </div>
      </div>
    </div>
  );
}
