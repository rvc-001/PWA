"use client";

import React from "react";
import Link from "next/link";
import type { TournamentSummary } from "@/types/models";
import { ChevronRightIcon } from "@/components/Icons";

type TournamentCardProps = {
  tournament: TournamentSummary;
  cta?: "Register" | "View" | "Manage";
  href?: string;
};

export default function TournamentCard({ tournament, cta = "View", href }: TournamentCardProps) {
  const url = href ?? `/tournaments/${tournament.id}`;
  const statusColor =
    tournament.status === "live"
      ? "bg-primary/20 text-primary"
      : tournament.status === "upcoming"
        ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
        : "bg-[var(--color-muted)]/20 text-[var(--color-muted)]";

  return (
    <Link
      href={url}
      className="block p-4 rounded-[var(--radius-card)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] border border-[var(--color-border)] hover:border-primary/30 transition-colors"
    >
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center text-lg font-bold text-primary shrink-0">
          {tournament.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold truncate">{tournament.name}</h3>
          <p className="text-sm text-[var(--color-muted)]">
            {tournament.location ?? tournament.venue ?? "—"} · {tournament.startDate}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
              {tournament.status}
            </span>
            {tournament.registeredCount != null && (
              <span className="text-xs text-[var(--color-muted)]">
                {tournament.registeredCount} registered
              </span>
            )}
          </div>
        </div>
        <span className="self-center text-primary font-medium text-sm shrink-0 inline-flex items-center gap-1">
          {cta}
          <ChevronRightIcon size={16} className="text-primary" />
        </span>
      </div>
    </Link>
  );
}
